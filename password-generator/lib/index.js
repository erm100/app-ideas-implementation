/**
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Form, Input} from 'src/components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import generator from 'src/generate-password';

class App extends Component {
  constructor(props) {
    super(props);
    this.generator = generator;
    this.state = {
      password: 'Configure and generate a password!',
      tooltip: 'Click and copy!',
      config: {
        length: 10,
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: false,
      },
    };
  }

  _setTooltip = tooltip => {
    this.setState({
      tooltip: tooltip || 'Click and copy!',
    });
  };

  _successCopy = () => {
    this._setTooltip('Copied!');
    setTimeout(this._setTooltip, 1000);
  };

  _failedCopy = () => {
    this._setTooltip('Opps...');
    setTimeout(this._setTooltip, 1000);
  };

  _copy = async () => {
    if (this.state.password) {
      try {
        Clipboard.setString(this.state.password);
        this._successCopy();
      } catch (ignore) {
        this._failedCopy();
      }
    }
  };

  _onAction = config => {
    this.setState({
      password: this.generator.generate(config),
    });
  };

  _isValid = config => {
    return (
      !!config.lowercase ||
      !!config.uppercase ||
      !!config.numbers ||
      !!config.symbols
    );
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <View style={styles.screen}>
          <Form
            containerStyle={styles.containerStyle}
            contentStyle={styles.contentStyle}
            valid={this._isValid}
            value={this.state.config}
            action={this._onAction}>
            <TouchableOpacity
              style={styles.output}
              onPress={this._copy}
              underlayColor="white">
              <Text style={styles.password}>{this.state.password}</Text>
              <Text style={styles.tooltip}>{this.state.tooltip}</Text>
            </TouchableOpacity>
            <Input
              containerStyle={styles.slider}
              name={'length'}
              type={'slider'}
            />
            <Input
              containerStyle={styles.checkbox}
              name={'uppercase'}
              label={'Include uppercase'}
              type={'checkbox'}
            />
            <Input
              containerStyle={styles.checkbox}
              name={'lowercase'}
              label={'Include lowercase'}
              type={'checkbox'}
            />
            <Input
              containerStyle={styles.checkbox}
              name={'numbers'}
              label={'Include numbers'}
              type={'checkbox'}
            />
            <Input
              containerStyle={styles.checkbox}
              name={'symbols'}
              label={'Include symbols'}
              type={'checkbox'}
            />
            <Input style={styles.submit} value={'generate'} type={'submit'} />
          </Form>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    margin: hp(1),
    borderRadius: hp(1),
    height: hp(6),
    width: wp(80),
  },
  checkbox: {
    padding: hp(1),
    margin: hp(1),
    backgroundColor: '#686868',
    borderRadius: hp(1),
    height: hp(6),
  },
  screen: {
    flex: 1,
    minHeight: Dimensions.get('screen').height - getStatusBarHeight(),
    backgroundColor: '#303030',
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp(5),
  },
  contentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp(5),
    paddingVertical: hp(5),
    borderRadius: hp(2),
  },
  output: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(80),
    padding: hp(1),
    margin: hp(1),
    backgroundColor: '#505050',
    borderRadius: hp(1),
    height: hp(6),
  },
  password: {
    fontSize: hp(1.85),
    color: '#FFFFFF',
  },
  tooltip: {
    fontSize: hp(1.25),
    color: '#FFFFFF',
  },
  submit: {
    marginTop: hp(2),
    borderRadius: hp(1),
    height: hp(6),
    backgroundColor: '#FF0000',
  },
});

export default App;
