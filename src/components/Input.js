import React from 'react';
import { View, TextInput, Text } from 'react-native';
import tw from 'twrnc';

export default function Input({ label, error, ...props }) {
  return (
    <View style={tw`mb-4 w-full`}>
      {label && <Text style={tw`mb-1 text-sm text-gray-700 dark:text-gray-200 font-semibold`}>{label}</Text>}
      <TextInput
        style={tw`bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl text-base text-black dark:text-white border border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400`}
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        {...props}
      />
      {!!error && <Text style={tw`text-xs text-red-500 mt-1`}>{error}</Text>}
    </View>
  );
}
