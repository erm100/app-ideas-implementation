import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from 'src/assets';
import {format} from 'src/utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export class DateTimeElement extends React.Component {
  state = {
    userEnterData: null,
    isEmpty: null,
    isDatePickerVisible: false,
  };

  componentDidMount() {
    const {value, error, require = false} = this.props;
    if (require && value === '') {
      const {_onChangeText, name} = this.props;

      if (typeof _onChangeText === 'function' && !!name) {
        if (error) {
          this._onChangeText(value);
          return;
        }
        _onChangeText(name, value, require);
      }
    }
  }

  componentDidUpdate() {
    const {value, error, require = false} = this.props;
    if (require && !value && !this.state.isError) {
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

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = date => {
    this.hideDatePicker();
    this._onChangeText(format(date));
  };

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

  _onPress = value => {
    const {onPress} = this.props;

    if (typeof onPress === 'function') {
      onPress(value);
    }

    this.showDatePicker(value);
  };

  render() {
    const {
      readonly,
      style,
      type = '',
      onChange,
      require,
      value,
      onPress,
      ...otherProps
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.inputWrapper,
          {
            borderColor: require && this.state.isEmpty ? '#BB0000' : '#FFFFFF',
            borderWidth: require && this.state.isEmpty ? 1 : 0,
          },
        ]}
        onPress={this._onPress}>
        <TextInput
          value={value}
          editable={false}
          type={type}
          style={[styles.input, style]}
          onChangeText={this._onChangeText}
          {...otherProps}
        />
        <Image
          resizeMode={'contain'}
          source={Images.calendar}
          style={styles.rightIcon}
        />
        <DateTimePickerModal
          date={value ? moment(value).toDate() : new Date()}
          isVisible={this.state.isDatePickerVisible}
          mode={type}
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
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
    borderColor: '#efefef',
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
  rightIcon: {
    marginHorizontal: wp(1),
    height: hp(2.5),
    width: hp(2.5),
  },
});
