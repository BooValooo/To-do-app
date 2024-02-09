import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainScreen from './Views/main-screen';
// import Test from './Views/test';
import Calendar from './Views/Calendar';
<<<<<<< Updated upstream
=======
import OnBoarding1 from './Views/OnBoarding1';
import OnBoarding2 from './Views/OnBoarding2';
import Settings from './Views/Settings';
>>>>>>> Stashed changes

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white' },
        tabBarLabelStyle: { fontSize: 16 },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: { backgroundColor: 'blue' },
        swipeEnabled: true, // スワイプでの画面遷移を許可
      }}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      {/* <Tab.Screen name="Test" component={Test} /> */}
      <Tab.Screen name="Calendar" component={Calendar} />
<<<<<<< Updated upstream
=======
      <Tab.Screen name="Welcome2" component={OnBoarding2} />
      <Tab.Screen name="Settings" component={Settings} />
>>>>>>> Stashed changes
    </Tab.Navigator>
  );
}

export default App;
