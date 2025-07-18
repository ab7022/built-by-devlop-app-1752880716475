import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import tw from 'twrnc';

export default function SocialButton({ title, icon, onPress, color }) {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center justify-center py-3 px-4 rounded-xl mb-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700`}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={[tw`mr-2`, { width: 24, height: 24 }]}>{icon}</View>
      <Text style={tw`text-base font-semibold text-black dark:text-white`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
