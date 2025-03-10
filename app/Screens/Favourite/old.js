import React from 'react'
import { GestureDetector, GestureHandlerRootView, Gesture, GestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Button, Div, Text } from 'react-native-magnus'
import { Image } from "react-native-magnus";
import { StyleSheet } from 'react-native';

export default function FavouriteItem({ item }) {


 // Shared values to track position
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
  
    // Define the pan gesture
    const panGesture = Gesture.Pan()
      .onUpdate((event) => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      })
      .onEnd(() => {
        // Optionally add an animation to make the ball bounce back
        translateX.value = withSpring(0, { damping: 2 });
        translateY.value = withSpring(0, { damping: 2 });
      });
  
    // Animated styles for the ball
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
      };
    });




    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.item, animatedStyle]}>
                <Div>
                    <Image
                        h={100}
                        w={100}

                        rounded="md"
                        source={{
                            uri:
                                "https://picsum.photos/200",
                        }}
                    />
                </Div>

                <Div px={10} pt={10} overflow='hidden'>
                    <Text fontWeight='bold' fontSize={17}>{item.title}</Text>
                    <Text overflow='hidden' numberOfLines={3} pr={20}>{item.address}</Text>
                </Div>
            </Animated.View>
            </GestureDetector>
           
        </GestureHandlerRootView>


    )
}


const styles = StyleSheet.create({
item:{
    flexDirection:'row',
    marginBottom:10,
    borderColor:'gray400',
    borderWidth:1,
    borderRadius:10,
    margin:'auto',
    width:"95%"
}
})