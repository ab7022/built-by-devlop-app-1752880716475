import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';

export default function Button({ title, onPress, loading, style, icon, ...props }) {
  return (
    <TouchableOpacity
      style={[tw`flex-row items-center justify-center px-4 py-3 rounded-xl bg-blue-500 active:bg-blue-600 dark:bg-blue-600 dark:active:bg-blue-700`, style]}
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      {...props}
    >
      {loading ? <ActivityIndicator color="#fff" /> : (
        <View style={tw`flex-row items-center`}>
          {icon && <View style={tw`mr-2`}>{icon}</View>}
          <Text style={tw`text-base font-bold text-white`}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
