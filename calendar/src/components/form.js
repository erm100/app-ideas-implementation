import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const FormContext = React.createContext({
  error: false,
  value: {},
  _onAction: () => {},
  _onChange: () => {},
});

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      require: {},
      form: props.value || {},
      _onAction: this._onAction,
      _onChangeText: this._onChangeText,
    };
  }

  _onChangeText = (key, value, require = false) => {
    this.setState(state => {
      if (require) {
        state.require[key] = !!value;
      }
      state.form[key] = value;
      return state;
    });
  };

  _onAction = value => {
    let input;
    for (input of Object.values(this.state.require)) {
      if (!input) {
        this.setState({
          error: true,
        });
        return;
      }
    }

    this.props.action(value);
  };

  render() {
    const {
      value,
      contentContainerStyle,
      containerStyle,
      contentStyle,
      children,
      ...otherProps
    } = this.props;
    return (
      <>
        <FormContext.Provider value={this.state}>
          <KeyboardAwareScrollView
            contentContainerStyle={[styles.container, containerStyle]}
            keyboardShouldPersistTaps="handled"
            {...otherProps}>
            <View style={contentStyle}>{children}</View>
          </KeyboardAwareScrollView>
        </FormContext.Provider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
