/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RangeInput = props => {
  const [value, setValue] = React.useState(0);
  const {style, onlyPositive, onChangeValue, ...otherProps} = props;
  return (
    <View style={[styles.container, style]} {...otherProps}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value + ''}
        onChangeText={text => {
          const int = parseInt(text, 10);
          const tmp = Number.isNaN(int) ? 0 : int;
          onChangeValue(tmp);
          setValue(tmp);
        }}
      />
      <View>
        <TouchableOpacity
          onPress={() => {
            const tmp = value + 1;
            onChangeValue(tmp);
            setValue(tmp);
          }}
          style={styles.topTriangle}
        />
        <TouchableOpacity
          onPress={() => {
            const tmp = value - 1;
            if (onlyPositive && tmp < 0) {
              return;
            }
            onChangeValue(tmp);
            setValue(tmp);
          }}
          style={styles.bottomTrinagle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C3C3C3',
    width: wp(10),
    height: hp((40 / 812) * 100),
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 0,
    flex: 1,
    overflow: 'hidden',
    color: '#6D6D6D',
    fontSize: hp((16 / 812) * 100),
  },
  topTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: hp((5 / 812) * 100),
    borderBottomWidth: hp((10 / 812) * 100),
    borderLeftWidth: hp((5 / 812) * 100),
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    borderLeftColor: 'transparent',
    marginBottom: hp((2 / 812) * 100),
  },
  bottomTrinagle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: hp((10 / 812) * 100),
    borderRightWidth: hp((5 / 812) * 100),
    borderBottomWidth: 0,
    borderLeftWidth: hp((5 / 812) * 100),
    borderTopColor: 'black',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

export default RangeInput;
