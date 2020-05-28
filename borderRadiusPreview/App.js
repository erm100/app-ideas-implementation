/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Clipboard from '@react-native-community/clipboard';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RangeInput from 'BorderRadiusPreview/RangeInput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const App: () => React$Node = () => {
  const [dimensions, setDimensions] = React.useState({
    width: Math.round(wp(80) - hp(5)),
    height: Math.round(hp(80) / 2),
  });
  const [borderRadius, setBorderRadius] = React.useState({
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  });
  const formatOutput = function(border) {
    return `borderTopLeftRadius: ${
      border.borderTopLeftRadius
    },\nborderTopRightRadius: ${
      border.borderTopRightRadius
    },\nborderBottomLeftRadius: ${
      border.borderBottomLeftRadius
    },\nborderBottomRightRadius: ${border.borderBottomRightRadius},\nheight: ${
      dimensions.height
    },\nwidth: ${dimensions.width}`;
  };
  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <ScrollView>
        <View style={styles.screen}>
          <Slider
            thumbTintColor={'#B6B6B6'}
            minimumTrackTintColor={'#B6B6B6'}
            maximumTrackTintColor={'#B6B6B6'}
            style={[
              styles.slider,
              {
                marginLeft: -hp(37.5),
                marginRight: -hp(37.5),
                transform: [
                  {
                    translateY: hp(85) / 2,
                  },
                  {
                    rotate: '90deg',
                  },
                ],
                width: hp(80),
                height: hp(5),
              },
            ]}
            value={dimensions.height}
            onValueChange={value =>
              setDimensions({...dimensions, height: value})
            }
            minimumValue={0}
            step={1}
            maximumValue={Math.round(hp(80))}
          />

          <View style={[styles.container, {marginLeft: hp(5)}]}>
            <View style={styles.column}>
              <RangeInput
                onlyPositive
                style={styles.counter}
                onChangeValue={value =>
                  setBorderRadius({...borderRadius, borderTopLeftRadius: value})
                }
              />
              <Text style={styles.counter}>{dimensions.height}</Text>
              <RangeInput
                onlyPositive
                style={styles.counter}
                onChangeValue={value =>
                  setBorderRadius({
                    ...borderRadius,
                    borderBottomLeftRadius: value,
                  })
                }
              />
            </View>
            <View
              key={borderRadius}
              style={[
                styles.box,
                {
                  borderBottomLeftRadius: borderRadius.borderBottomLeftRadius,
                  borderBottomRightRadius: borderRadius.borderBottomRightRadius,
                  borderTopLeftRadius: borderRadius.borderTopLeftRadius,
                  borderTopRightRadius: borderRadius.borderTopRightRadius,
                  width: dimensions.width,
                  height: dimensions.height,
                },
              ]}>
              <Text style={styles.tooltip}>{'Click and copy!'}</Text>
              <TouchableOpacity
                onPress={() => Clipboard.setString(formatOutput(borderRadius))}>
                <Text style={styles.text}>{formatOutput(borderRadius)}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.column}>
              <RangeInput
                onlyPositive
                onChangeValue={value =>
                  setBorderRadius({
                    ...borderRadius,
                    borderTopRightRadius: value,
                  })
                }
              />
              <RangeInput
                onlyPositive
                onChangeValue={value =>
                  setBorderRadius({
                    ...borderRadius,
                    borderBottomRightRadius: value,
                  })
                }
              />
            </View>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.counter}>{dimensions.width}</Text>
          </View>
          <Slider
            thumbTintColor={'#B6B6B6'}
            minimumTrackTintColor={'#B6B6B6'}
            maximumTrackTintColor={'#B6B6B6'}
            style={[
              styles.slider,
              {
                height: hp(5),
                width: wp(80) - hp(5),
                marginLeft: wp(10) + hp(5),
                marginRight: wp(10) - hp(5),
              },
            ]}
            value={dimensions.width}
            onValueChange={value =>
              setDimensions({...dimensions, width: value})
            }
            minimumValue={0}
            maximumValue={Math.round(wp(80) - hp(5))}
            step={1}
          />
        </View>
      </ScrollView>
    </>
  );
};

/*

*/
const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#B6B6B6',
  },
  tooltip: {
    color: '#323232',
  },
  counter: {
    color: 'white',
    fontSize: hp((16 / 812) * 100),
  },
  container: {
    flexDirection: 'row',
  },
  column: {
    width: wp(10),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    backgroundColor: Colors.lighter,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(80) + hp(5),
    marginLeft: wp(10),
    marginVertical: 5
  },
  text: {
    backgroundColor: '#929292',
    padding: 10,
    color: '#F3F3F3',
    fontSize: hp((16 / 812) * 100),
  },
  slider: {
    backgroundColor: '#929292',
  },
});

export default App;
