import { View, Text, TouchableOpacity, StatusBar, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import { Snowflake, Copy, Eye, EyeClosed, EyeOff } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate
} from 'react-native-reanimated';
import { faker } from '@faker-js/faker';

const generateCardDetails = () => {
  return {
    cardNumber: faker.finance.creditCardNumber('#### #### #### ####'),
    expiryDate: faker.date.future().toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }),
    cvv: faker.finance.creditCardCVV(),
    holderName: faker.person.fullName().toUpperCase()
  };
};

const YoloPay = () => {
    const insets = useSafeAreaInsets();
    const [freeze, setFreeze] = useState(false);
    const [pay, setPay] = useState(false);
    const [eyeCvv, setEyeCvv] = useState(false);
    const [cardDetails] = useState(generateCardDetails());
    
    const freezeProgress = useSharedValue(0);
    
    const toggleFreezeSwitch = () => {
        setFreeze((prev) => !prev);
        freezeProgress.value = withSpring(freeze ? 0 : 1, {
            damping: 10,
            stiffness: 80
        });
    };

    const cardAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(freezeProgress.value, [0, 1], [1, 0.98]) }]
    }));

    const normalCardStyle = useAnimatedStyle(() => ({
        opacity: interpolate(freezeProgress.value, [0, 1], [1, 0]),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }));

    const blurredCardStyle = useAnimatedStyle(() => ({
        opacity: interpolate(freezeProgress.value, [0, 1], [0, 1]),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }));

    const CardContent = ({ isBlurred }) => (
        <View style={tailwind`absolute inset-0 p-4 justify-between`}>
            <View style={tailwind`flex-1 mt-16 flex-row gap-5`}>
                <Text style={tailwind`text-white text-lg w-20 tracking-wider font-medium`}>
                    {isBlurred ? null : cardDetails.cardNumber}
                </Text>
                <View>
                    <Text style={tailwind`text-gray-400`}>{isBlurred ? null : 'expiry'}</Text>    
                    <Text style={tailwind`text-white`}>{isBlurred ? null : cardDetails.expiryDate}</Text>
                </View>
            </View>
            
            <View style={tailwind`mb-15`}>
                <View style={tailwind`flex-row justify-between items-end`}>
                    {!isBlurred && (
                        <View>
                            <Text style={tailwind`text-red-500 text-xs mb-1`}>
                                <TouchableOpacity style={tailwind`flex-row items-center gap-2`}>
                                    <Copy size={16} color="red" />
                                    <Text style={tailwind`text-red-500`}>copy details</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                    )}
                    {!isBlurred && (
    <View style={tailwind`items-end`}>
        <Text style={tailwind`text-white/50 text-xs mb-1 mr-8`}>CVV</Text>
        <View style={tailwind`justify-center items-center flex-row gap-2`}>
            <Text style={tailwind`text-white`}>
             ***
            </Text>
         <EyeOff color={'red'}/>  
        </View>
    </View>
)}
                </View>
            </View>
        </View>
    );

    return (
        <View style={{top: insets.top, flex: 1, backgroundColor: 'black'}}>
            <View style={tailwind`mx-4 mt-10 gap-10`}>
                <View style={tailwind`gap-4`}>
                    <Text style={tailwind`font-semibold text-2xl text-white`}>select payment mode</Text>
                    <Text style={tailwind`text-white/50`}>choose your preferred payment method to make payment</Text>
                </View>
                <View style={tailwind`flex-row gap-2`}>
                    <TouchableOpacity 
                        onPress={() => setPay(true)} 
                        style={tailwind`p-2 px-8 border-[1px] border-b-0 rounded-full ${pay ? 'border-red-500' : 'border-white'}`}>
                        <Text style={tailwind`${pay ? 'text-red-500' : 'text-white'} text-xl`}>Pay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setPay(false)} 
                        style={tailwind`p-2 px-8 border-[1px] border-b-0 rounded-full ${pay ? 'border-white' : 'border-red-500'}`}>
                        <Text style={tailwind`${pay ? 'text-white' : 'text-red-500'} text-xl`}>Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={tailwind`mx-4 mt-10`}>
                <Text style={tailwind`text-white/30`}>Your digital debit card</Text>
                <View style={tailwind`flex-row gap-10 items-center mt-2`}>
                    <Animated.View style={[tailwind`h-82 w-52 rounded-xl`, cardAnimatedStyle]}>
                        <View style={tailwind`relative h-full w-full`}>
                            <Animated.View style={normalCardStyle}>
                                <Image
                                    style={tailwind`h-full w-full rounded-xl`}
                                    source={require("../../../assets/images/card.jpg")}
                                />
                                <CardContent isBlurred={false} />
                            </Animated.View>
                            <Animated.View style={blurredCardStyle}>
                                <Image
                                    style={tailwind`h-full w-full rounded-xl`}
                                    source={require("../../../assets/images/BlurCard.png")}
                                />
                                <CardContent isBlurred={true} />
                            </Animated.View>
                        </View>
                    </Animated.View>
                    <View style={tailwind`items-center gap-2`}>
                        <TouchableOpacity 
                            onPress={toggleFreezeSwitch} 
                            style={tailwind`p-6 justify-center items-center border-[0.2px] border-b-0 rounded-full ${freeze ? 'border-red-500' : 'border-white'}`}>
                            <Snowflake color={freeze ? 'red' : 'white'}/>
                        </TouchableOpacity>
                        <Text style={tailwind`${freeze ? 'text-red-500' : 'text-white'}`}>
                            {freeze ? "unfreeze" : "freeze"}
                        </Text>
                    </View>
                </View>
                
            </View>
            <StatusBar barStyle={'light-content'} hidden={false} />
        </View>
    );
};

export default YoloPay;