//contains splash and bottomNavigation
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigator from '../BottomTab/BottomNavigator';




const AppNavigation = () => {
    const Stack = createNativeStackNavigator();
   
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='tab' screenOptions={{headerShown:false}}>
            <Stack.Screen name='tab' component={BottomNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default AppNavigation