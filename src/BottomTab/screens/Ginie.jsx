import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Ginie = () => {
    const insets=useSafeAreaInsets();
  return (
    <View style={{top:insets.top,flex:1,backgroundColor:"black"}}>
      <Text>Ginie</Text>
    </View>
  )
}

export default Ginie