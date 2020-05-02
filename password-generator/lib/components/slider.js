import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Container from '@react-native-community/slider';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export class Slider extends React.Component {
  render() {
    const {containerStyle, sliderStyle, value, ...otherProps} = this.props;
    return (
      <>
        <View style={[styles.container, containerStyle]}>
          <View style={styles.textInner}>
            <Text style={styles.text}>{value}</Text>
          </View>
          <View style={styles.sliderInner}>
            <Container
              value={value}
              thumbTintColor={'blue'}
              style={[styles.slider, sliderStyle]}
              minimumValue={4}
              maximumValue={32}
              minimumTrackTintColor="#348fd4"
              maximumTrackTintColor="#000000"
              {...otherProps}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  sliderInner: {
    flex: 1,
  },
  slider: {},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#348fd4',
    borderWidth: 3,
    borderRadius: hp(2.5),
    height: hp(5),
    width: hp(5),
  },
  text: {
    fontWeight: 'bold',
    fontSize: hp(2),
    color: '#348fd4',
  },
});
