import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Provider} from '@ant-design/react-native'
import Login from './pages/account/login'
import UserInfo from './pages/account/userInfo'
import Demo from './pages/account/demo'


const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      {/* 应antd要求 如果使用toast 需要在外层包裹Provider */}
      <Provider>
        <Stack.Navigator headerMode="none" initialRouteName="Demo">
          <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default Nav;
