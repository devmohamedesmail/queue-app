import React, { useCallback } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const SwipeComponent = () => {

  // Left swipe action rendering (like the "Archive" button)
  const renderLeftActions = useCallback((progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton style={styles.leftAction} onPress={() => alert('Archive')}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  }, []);

  return (
    <GestureHandlerRootView>
      <Swipeable renderLeftActions={renderLeftActions}>
        <View style={styles.row}>
          <Text style={styles.text}>Hello</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#4CAF50', // Green color for "Archive" action
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default SwipeComponent;
