import { View, Text ,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { GestureDetector, GestureHandlerRootView, Gesture, GestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
const Ball = () => {
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
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.ball, animatedStyle]}>
          <Text style={styles.text}>Ball</Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
   
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    ball: {
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: 'blue',
      alignSelf: 'center',
    },
  });


export default Ball