import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export class TextInputElement extends React.Component {
  state = {
    isError: null,
    userEnterData: null,
    isEmpty: null,
    isDatePickerVisible: false,
  };

  componentDidMount() {
    const {value, error, require = false} = this.props;
    if (require && value === '') {
      const {_onChangeText, name} = this.props;

      if (typeof _onChangeText === 'function' && !!name) {
        _onChangeText(name, value, require);
      }

      if (typeof _onChangeText === 'function' && !!name && error) {
        this._onChangeText(value);
      }
    }
  }

  /* eslint-disable */
  componentDidUpdate() {
    const {value, error, require = false} = this.props;
    if (require && value === '' && !this.state.isError) {
      const {_onChangeText, name} = this.props;
      if (typeof _onChangeText === 'function' && !!name && error) {
        this.setState({
          isError: true,
        });
        this._onChangeText(value);
      }
    }
    return true;
  }
  /* eslint-enable */

  static getDerivedStateFromProps(props, state) {
    if (!state.userEnterData) {
      return null;
    }

    if (props.value === '') {
      return {
        isEmpty: true,
      };
    } else {
      return {
        isEmpty: false,
      };
    }
  }

  _onChangeText = value => {
    const {_onChangeText, onChangeText, require, name} = this.props;

    if (typeof _onChangeText === 'function' && !!name) {
      _onChangeText(name, value, require);
    }

    if (typeof onChangeText === 'function') {
      onChangeText(value);
    }

    if (!this.state.userEnterData) {
      this.setState({
        userEnterData: true,
      });
    }
  };

  render() {
    const {
      readonly,
      style,
      type = '',
      onChange,
      require,
      ...otherProps
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.inputWrapper,
          {
            borderColor: require && this.state.isEmpty ? '#BB0000' : '#F0F0F0',
          },
        ]}
        onPress={this.showDatePicker}>
        <TextInput
          editable={readonly}
          type={type}
          style={[styles.input, style]}
          onChangeText={this._onChangeText}
          {...otherProps}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: hp(0.1),
    borderColor: '#F0F0F0',
    borderWidth: 1,
    marginVertical: hp(0.1),
  },
  input: {
    flex: 1,
    paddingLeft: wp(2),
    fontSize: hp(2.2),
    lineHeight: hp(2 * 1.2),
    color: '#636363',
    fontFamily: 'serif',
  },
});
