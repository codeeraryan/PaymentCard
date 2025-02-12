import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const HomeScreen = () => {
    const insets=useSafeAreaInsets();
  return (
    <View style={{top:insets.top,flex:1,backgroundColor:"black"}}>
      <Text>Home</Text>
    </View>
  )
}

export default HomeScreen