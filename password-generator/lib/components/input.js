import React from 'react';
import {StyleSheet} from 'react-native';
import {FormContext} from './form';
import {ButtonElement, InputElement} from './elements';

export class Input extends React.Component {
  render() {
    const {name, type, ...otherProps} = this.props;
    return (
      <FormContext.Consumer>
        {({error, form, _onAction, _onChangeText}) =>
          type === 'submit' ? (
            <ButtonElement
              type={type}
              _onPress={() => _onAction(form)}
              {...otherProps}
            />
          ) : (
            <InputElement
              error={error}
              type={type}
              name={name}
              value={form[name] || ''}
              style={styles.input}
              _onChangeText={_onChangeText}
              {...otherProps}
            />
          )
        }
      </FormContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  input: {},
});
