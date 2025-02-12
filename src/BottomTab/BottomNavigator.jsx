import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native';
import YoloPay from './screens/YoloPay';
import Ginie from './screens/Ginie';
import { HomeIcon, Percent, QrCode } from 'lucide-react-native';
import tailwind from 'twrnc';
import HomeScreen from './screens/HomeScreen';


const BottomNavigator = () => {
    const tab=createBottomTabNavigator();
    
  return (
    <tab.Navigator  initialRouteName='yolo pay'  screenOptions={{headerShown:false,tabBarShowLabel:false,tabBarStyle:{backgroundColor:"black",height:300,width:"120%",borderColor:"white",borderTopWidth:1,borderLeftWidth:0.1,borderRightWidth:0.1,position:"absolute",bottom:-220,paddingInline:100,paddingVertical:0,borderCurve:"circular",borderRadius:"50%",marginLeft:-40}}}>
        <tab.Screen  name="home" component={HomeScreen}  options={{tabBarIcon:tabInfo=><View style={tailwind`p-3 py-6 border-[0.5px] border-b-0 rounded-full border-white/30  justify-center items-center mt-15`}><HomeIcon color={tabInfo.focused?"white":"gray"} /></View>}} />
        <tab.Screen  name="yolo pay" component={YoloPay} options={{tabBarIcon:tabInfo=><View style={tailwind`p-3.5 py-6.5 border-[0.5px] border-b-0 rounded-full border-white justify-center items-center mt-12`}><QrCode  color={tabInfo.focused?"white":"gray"} /></View>}} />
        <tab.Screen  name="ginie" component={Ginie} options={{tabBarIcon:tabInfo=><View style={tailwind`p-3 py-6 border-[0.5px] border-b-0 rounded-full border-white/30 justify-center items-center mt-15`}><Percent color={tabInfo.focused?"white":"gray"} /></View>}} />
    </tab.Navigator>
  )
}

export default BottomNavigator