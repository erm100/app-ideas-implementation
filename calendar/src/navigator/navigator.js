import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Main, Editor} from 'src/screens';

const Stack = createStackNavigator();

const defaultOptions = {
  header: () => null,
};

class Navigator extends React.Component {
  navigator = React.createRef(null);

  render() {
    return (
      <NavigationContainer ref={this.navigator}>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} options={defaultOptions} />
          <Stack.Screen
            name="Editor"
            component={Editor}
            options={defaultOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
