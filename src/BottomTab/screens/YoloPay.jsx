import { View, Text, Touchable, TouchableOpacity, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import { Snowflake } from 'lucide-react-native';

const YoloPay = () => {
    const insets=useSafeAreaInsets();
    const [freeze,setFreeze]=useState(false);
    const [pay,setPay]=useState(false);
    const toggleFreezeSwitch=()=>{
      setFreeze((prev)=>!prev);
    }
  return (
    <View style={{top:insets.top,flex:1,backgroundColor:'black'}}>
     <View style={tailwind`mx-4 mt-10 gap-10`}>
        <View style={tailwind`gap-4`}><Text style={tailwind`font-semibold text-2xl text-white `}>select payment mode</Text>
        <Text style={tailwind`text-white/50`}>choose your preferred payment method to make payment</Text></View>
        <View style={tailwind`flex-row gap-2`}>
        <TouchableOpacity onPress={()=>setPay(true)} style={tailwind`p-2 px-8 border-[1px] border-b-0 rounded-full ${pay? `border-red-500`:`border-white`}`}><Text style={tailwind`${pay? `text-red-500`:`text-white`} text-xl`}>Pay</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setPay(false)} style={tailwind`p-2 px-8 border-[1px] border-b-0 rounded-full ${pay? `border-white`:`border-red-500`}`}><Text style={tailwind`${pay? `text-white`:`text-red-500`} text-xl`}>Card</Text></TouchableOpacity>
        </View>
     </View>
     <View style={tailwind`mx-4 mt-10 `}>
        <Text style={tailwind`text-white/30`}>Your digital debit card</Text>
        <View style={tailwind`flex-row gap-10 items-center mt-2`}>
        <View><Image  style={tailwind` h-82 w-52 rounded-xl  `} source={freeze?require("../../../assets/images/BlurCard.png"):require("../../../assets/images/Card.png")}/></View>
        <View style={tailwind`items-center gap-2`}><TouchableOpacity onPress={toggleFreezeSwitch} style={tailwind`p-6  justify-center items-center border-[0.2] start
          px] border-b-0 rounded-full ${freeze? `border-red-500`:`border-white`} `}><Snowflake color={freeze?'red':'white'}/></TouchableOpacity><Text style={tailwind`${freeze? `text-red-500`:`text-white`}`}>{freeze?"unfreeze":"freeze"}</Text></View> 
       </View>
     </View>
     <StatusBar barStyle={'light-content'} hidden={false}  />
        </View>
  )
}

export default YoloPay