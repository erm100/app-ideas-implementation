import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export class Event extends React.Component {
  render() {
    const {event, style, readonly, color, ...otherProps} = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style, {borderColor: color}]}
        {...otherProps}>
        <Text style={[styles.title, {color}]}>{event.title}</Text>
        <Text style={[styles.summary, {color}]}>{event.summary}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 1,
    borderLeftWidth: hp(0.8),
    padding: hp(0.5),
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: hp(2),
    fontWeight: 'bold',
  },
  summary: {
    fontSize: hp(1.75),
  },
});
