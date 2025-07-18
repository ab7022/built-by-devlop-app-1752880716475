import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import tw from 'twrnc';

export default function Shimmer({ style }) {
  const translateX = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, { toValue: 100, duration: 1200, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: -100, duration: 0, useNativeDriver: true })
      ])
    ).start();
  }, []);
  return (
    <View style={[tw`overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800`, style]}>
      <Animated.View style={{
        ...tw`absolute left-0 right-0 top-0 bottom-0`,
        transform: [{ translateX }],
        backgroundColor: 'rgba(0,0,0,0.08)',
        width: 120,
        height: '100%',
        opacity: 0.7,
      }} />
    </View>
  );
}
