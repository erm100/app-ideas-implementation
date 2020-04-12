import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import 'mobx-react-lite/batchingForReactNative';
import {Observer} from 'mobx-react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  listenOrientationChange,
  removeOrientationListener,
} from 'react-native-responsive-screen';

import {Button} from './components';
import {state} from './store';
import {Context} from './context';
import {createStyle} from './styles';

import Vector from './assets/images/vector.svg';
import Union from './assets/images/union.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateContext = () => {
      this.setState({
        styles: this.createStyle(),
      });
    };

    this.createStyle = createStyle;
    this.state = {
      styles: this.createStyle(),
      updateContext: this.updateContext,
    };

    const setState = this.updateContext;
    listenOrientationChange({setState});
  }

  componentWillUnMount() {
    removeOrientationListener();
  }

  render() {
    const {styles} = this.state;
    return (
      <>
        <Context.Provider value={this.state}>
          <StatusBar translucent backgroundColor={'transparent'} />
          <ScrollView style={styles.screen}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputInner}>
                <Observer>
                  {() => <Text style={styles.input}>{state.input}</Text>}
                </Observer>
              </View>
            </View>
            <TouchableOpacity style={styles.downbtn}>
              <Vector
                width={wp((18 / 261) * 100)}
                height={hp((7 / 465) * 100)}
              />
            </TouchableOpacity>
            <View style={styles.keyboard}>
              <View style={[styles.row, styles.row1]}>
                <Button onPress={() => state.clear()}>C</Button>
                <Button onPress={() => state.type('/')}>/</Button>
                <Button onPress={() => state.type('*')}>*</Button>
                <Button
                  style={styles.rowEnd1}
                  onPress={() => state.backspace()}>
                  <Union
                    width={wp((24.5 / 261) * 100)}
                    height={hp((16 / 465) * 100)}
                  />
                </Button>
              </View>
              <View style={[styles.row, styles.row2]}>
                <Button onPress={() => state.type('7')}>7</Button>
                <Button onPress={() => state.type('8')}>8</Button>
                <Button onPress={() => state.type('9')}>9</Button>
                <Button
                  textColor={'#F4EBE5'}
                  style={styles.rowEnd2}
                  onPress={() => state.type('-')}>
                  -
                </Button>
              </View>
              <View style={[styles.row, styles.row1]}>
                <Button onPress={() => state.type('4')}>4</Button>
                <Button onPress={() => state.type('5')}>5</Button>
                <Button onPress={() => state.type('6')}>6</Button>
                <Button
                  textColor={'#F4EBE5'}
                  style={styles.rowEnd1}
                  onPress={() => state.type('+')}>
                  +
                </Button>
              </View>
              <View style={[styles.row, styles.row2]}>
                <Button onPress={() => state.type('3')}>3</Button>
                <Button onPress={() => state.type('2')}>2</Button>
                <Button onPress={() => state.type('1')}>1</Button>
                <Button
                  textColor={'#F4EBE5'}
                  style={styles.rowEnd2}
                  onPress={() => state.priority()}>
                  ( )
                </Button>
              </View>
              <View style={[styles.row, styles.row1]}>
                <Button onPress={() => state.type('0')}>0</Button>
                <Button onPress={() => state.type('.')}>.</Button>
                <Button onPress={() => state.invert()}>+/-</Button>
                <Button
                  textColor={'#F4EBE5'}
                  style={styles.rowEnd1}
                  onPress={() => state.calculate()}>
                  =
                </Button>
              </View>
            </View>
          </ScrollView>
        </Context.Provider>
      </>
    );
  }
}

export default App;
