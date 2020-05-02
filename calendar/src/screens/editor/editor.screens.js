/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, StatusBar, Text, View, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import shortid from 'shortid';

import {Form, Input, Icon, Label} from 'src/components';
import {Images} from 'src/assets';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
      isEmpty: {
        title: null,
        startDate: null,
      },
      mode: (props.route.params && props.route.params.mode) || 'create',
      event: (props.route.params && props.route.params.event) || {},
    };
  }

  _editEvent = () => {
    const event = this.state.event;
    switch (this.state.mode) {
      case 'create':
        event.id = shortid();
        this.props.add(event);
        break;
      case 'edit':
        this.props.edit(event);
        break;
      default:
        break;
    }
    this.props.navigation.navigate('Main');
  };

  _onSubmit = event => {
    this.setState(
      {
        event: event,
      },
      this._editEvent,
    );
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent
        />
        <View style={styles.screen}>
          <Form
            onSubmitEditing={() => this.setState({next: true})}
            containerStyle={styles.container}
            contentStyle={styles.content}
            action={this._onSubmit}
            value={this.state.event}>
            <Text style={styles.title}>
              {this.state.mode === 'edit' ? 'Edit' : 'Add'} event
            </Text>
            <View style={styles.form}>
              <Label>Title</Label>
              <Input
                autoFocus={this.state.mode === 'create'}
                require
                placeholder={'Title'}
                name={'title'}
              />
              <Label>Start time</Label>
              <Input
                require
                type={'datetime'}
                placeholder={'Start time'}
                name={'start'}
              />
              <Label>
                End time
                <Text style={styles.optional}>*</Text>
              </Label>
              <Input type={'datetime'} placeholder={'End time'} name={'end'} />
              <Label>
                Summary
                <Text style={styles.optional}>*</Text>
              </Label>
              <Input
                multiline={true}
                textAlignVertical={'top'}
                style={styles.summary}
                placeholder={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                }
                name={'summary'}
              />

              <Input
                style={styles.button}
                type={'submit'}
                value={this.state.mode}
              />
            </View>
          </Form>
          {this.state.mode === 'edit' ? (
            <Icon
              onPress={() => this.props.navigation.goBack()}
              source={Images.cross}
              style={[styles.navabarIconInner, styles.navabarRightIcon]}
              iconStyle={styles.navabarIcon}
            />
          ) : (
            <></>
          )}
          {this.state.mode === 'create' ? (
            <Icon
              onPress={() => this.props.navigation.goBack()}
              source={Images.arrow}
              style={[styles.navabarIconInner, styles.navabarLeftIcon]}
              iconStyle={[styles.navabarIcon]}
            />
          ) : (
            <></>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#5fa8ff',
  },
  title: {
    fontSize: hp(5),
    marginBottom: hp(2),
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  optional: {
    color: 'red',
    fontWeight: 'bold',
  },
  navabarIconInner: {
    position: 'absolute',
    top: getStatusBarHeight() + hp(2),
  },
  navabarIcon: {
    width: hp(4.5),
    height: hp(4.5),
  },
  navabarLeftIcon: {
    left: wp(2),
  },
  navabarRightIcon: {
    right: wp(2),
  },
  button: {
    backgroundColor: '#1be1af',
    alignSelf: 'center',
    marginVertical: hp(3),
  },
  form: {
    width: wp(80),
    borderRadius: hp(0.5),
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  summary: {
    minHeight: hp(10),
  },
  container: {
    minHeight: Dimensions.get('window').height - getStatusBarHeight(),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
