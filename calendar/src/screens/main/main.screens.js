/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Text,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  listenOrientationChange,
  removeOrientationListener,
} from 'react-native-responsive-screen';
import ProgressCircle from 'react-native-progress-circle';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import EventCalendar from 'react-native-events-calendar';

import {Add, Icon, Event} from 'src/components';
import {Images} from 'src/assets';
import isObject from 'isobject';
import isArray from 'isarray';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.calendarEvents = React.createRef();
    this.state = {
      orientation: '',
      editMode: {
        editPanelOpacity: new Animated.Value(0),
        ids: [],
        activeEvent: null,
      },
      interval: null,
      percent: 100,
    };
  }

  componentDidMount() {
    listenOrientationChange.bind(this)(this);
  }

  componentWillUnmount() {
    this._clearIntervalRecove();
    removeOrientationListener.bind(this)(this);
  }

  _goEditMode = ev => {
    const event = this.props.events[this.props.ids[ev.id]];
    this.setState(
      state => {
        let activeEvent;
        // TODO: replace
        if (!state.editMode.activeEvent) {
          activeEvent = event;
          state.editMode.ids.push(event.id);
        } else if (isObject(state.editMode.activeEvent)) {
          if (state.editMode.ids.includes(event.id)) {
            activeEvent = null;
            state.editMode.ids = [];
          } else {
            activeEvent = [state.editMode.activeEvent, event];
            state.editMode.ids.push(event.id);
          }
        } else if (isArray(state.editMode.activeEvent)) {
          if (state.editMode.ids.includes(event.id)) {
            const index = state.editMode.ids.indexOf(event.id);
            state.editMode.activeEvent.splice(index, 1);
            state.editMode.ids.splice(index, 1);
            activeEvent =
              state.editMode.activeEvent.length === 1
                ? state.editMode.activeEvent[0]
                : state.editMode.activeEvent;
          } else {
            activeEvent = [...state.editMode.activeEvent, event];
            state.editMode.ids.push(event.id);
          }
        }

        state.editMode.activeEvent = activeEvent;

        return state;
      },
      () => {
        if (!this.state.editMode.activeEvent) {
          this._leaveEditMode();
          return;
        }

        Animated.timing(this.state.editMode.editPanelOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      },
    );
  };

  _leaveEditMode = () => {
    this.setState(
      state => ({
        editMode: {
          ...state.editMode,
          ids: [],
          activeEvent: null,
        },
      }),
      () => {
        Animated.timing(this.state.editMode.editPanelOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      },
    );
  };

  _editEvent = () => {
    clearInterval(this.state.interval);
    this.props.navigation.navigate('Editor', {
      mode: 'edit',
      event: this.state.editMode.activeEvent,
    });
    this._leaveEditMode();
  };

  _removeEvent = () => {
    this._clearIntervalRecove();
    this.props.remove(this.state.editMode.activeEvent);
    this._leaveEditMode();
  };

  _recoveEvent = () => {
    this._clearIntervalRecove();
    this.props.recove(this.props.delEvent);
  };

  _addEvent = () => {
    this._clearIntervalRecove();
    this.props.navigation.navigate('Editor', {
      mode: 'create',
    });
    this._leaveEditMode();
  };

  _updateInteval = () => {
    if (this.state.percent <= 0) {
      this._clearIntervalRecove();
      this.props.nextState();
      return;
    }
    this.setState(state => ({
      percent: state.percent - 10,
    }));
  };

  _clearIntervalRecove = () => {
    clearInterval(this.state.interval);
    this.setState({
      percent: 100,
      interval: null,
    });
  };

  _setIntervalRecove = () => {
    if (
      !!this.state.interval ||
      this.state.percent <= 0 ||
      !this.props.delEvent
    ) {
      return;
    }
    this.setState({interval: setInterval(this._updateInteval, 1000)});
  };

  render() {
    const width = wp(100);
    return (
      <>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent
        />
        <View style={styles.navbar}>
          <Text style={styles.title}>Planner</Text>
          <Animated.View
            style={{
              flexDirection: 'row',
              opacity: this.state.editMode.editPanelOpacity,
            }}>
            {!!this.state.editMode.activeEvent &&
              isObject(this.state.editMode.activeEvent) && (
                <Icon
                  onPress={this._editEvent}
                  source={Images.pencil}
                  iconStyle={styles.barIcon}
                />
              )}
            <Icon
              onPress={this._removeEvent}
              source={Images.trash}
              iconStyle={styles.barIcon}
            />
          </Animated.View>
        </View>
        <ScrollView style={styles.container}>
          <TouchableWithoutFeedback
            disabled={!this.state.editMode.activeEvent}
            onPress={this._leaveEditMode}>
            <View
              key={
                this.state.orientation
                  ? `EventCalendar-${this.state.orientation}`
                  : 'EventCalendar'
              }
              style={{flex: 1}}>
              <EventCalendar
                styles={{
                  event: styles.event,
                  headerText: {
                    fontSize: 18,
                    fontFamily: 'Lato-Regular',
                  },
                  arrow: {
                    height: 20,
                    width: 20,
                  },
                  timeLabel: {
                    fontSize: 12,
                  },
                }}
                renderEvent={event => (
                  <Event
                    key={`${JSON.stringify(event)}-${this.state.editMode
                      .activeEvent &&
                      ((isObject(this.state.editMode.activeEvent) &&
                        this.state.editMode.activeEvent.id === event.id) ||
                        (isArray(this.state.editMode.activeEvent) &&
                          this.state.editMode.ids.includes(event.id)))}`}
                    style={{
                      opacity:
                        this.state.editMode.activeEvent &&
                        ((isObject(this.state.editMode.activeEvent) &&
                          this.state.editMode.activeEvent.id === event.id) ||
                          (isArray(this.state.editMode.activeEvent) &&
                            this.state.editMode.ids.includes(event.id)))
                          ? 0.5
                          : 1,
                    }}
                    color={
                      event.id === this.props.addId
                        ? '#F01000'
                        : event.id === this.props.editId
                        ? '#1F5CF6'
                        : '#404040'
                    }
                    onLongPress={() => this._goEditMode(event)}
                    event={event}
                  />
                )}
                onRef={ref => (this.calendarEvents = ref)}
                events={this.props.events}
                width={width}
                numberOfDay={14}
                format24h
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {!!this.props.delEvent &&
          (this._setIntervalRecove(),
          (
            <TouchableOpacity style={styles.recove} onPress={this._recoveEvent}>
              <ProgressCircle
                outerCircleStyle={styles.recoveSpinner}
                percent={this.state.percent}
                radius={hp(2.5)}
                borderWidth={hp(0.5)}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff">
                <Text style={styles.recovePercent}>
                  {Math.ceil(this.state.percent / 10)}
                </Text>
              </ProgressCircle>
              <Text style={styles.recoveText}>Recove event</Text>
            </TouchableOpacity>
          ))}
        <Add onPress={this._addEvent} style={styles.add} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  recove: {
    flexDirection: 'row',
    backgroundColor: '#FFA0A0',
    borderRadius: hp(1),
    alignItems: 'center',
    left: wp(15),
    bottom: hp(4.5),
    position: 'absolute',
    width: wp(55),
    height: hp(7),
  },
  recovePercent: {
    fontSize: hp(2),
  },
  recoveText: {
    fontWeight: 'bold',
    fontSize: hp(2.5),
    color: '#ffffff',
  },
  recoveSpinner: {
    marginLeft: wp(2),
    marginRight: wp(3),
  },
  navbar: {
    paddingTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(7.5) + getStatusBarHeight(),
    paddingHorizontal: wp(2.5),
  },
  title: {
    paddingHorizontal: wp(5),
    alignSelf: 'center',
    fontSize: hp(5.5),
    fontWeight: '500',
    fontFamily: 'DancingScript-Bold',
  },
  event: {
    opacity: 1,
    borderWidth: 0,
    borderRadius: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
    backgroundColor: '#EFEFEF',
  },
  container: {
    flex: 1,
  },
  barIcon: {
    height: hp(5),
    width: hp(5),
    marginLeft: wp(4.5),
  },
  add: {
    position: 'absolute',
    right: wp(5),
    bottom: hp(5),
  },
});
