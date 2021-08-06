import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup, AuthSelect}  from '../Auth/Screen'
import Stories from '../stories';


const Stack = createNativeStackNavigator();

function Landing() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Instagram" component={AuthSelect} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name="Stories" component={Stories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


  

export default Landing;