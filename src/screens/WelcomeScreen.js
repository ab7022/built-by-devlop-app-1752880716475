import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Logo from '../components/Logo';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-white dark:bg-black justify-center items-center px-8`}>
      <Logo size={80} />
      <Text style={tw`mt-8 text-3xl font-black text-blue-500 dark:text-blue-400`}>Welcome, abdul Bayees!</Text>
      <Text style={tw`mt-2 text-base text-gray-600 dark:text-gray-300 text-center`}>Sign in or create an account to continue</Text>
      <TouchableOpacity
        style={tw`mt-10 w-full bg-blue-500 py-3 rounded-xl`}
        onPress={() => navigation.navigate('Login')}
        accessibilityRole="button"
      >
        <Text style={tw`text-center text-lg font-bold text-white`}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`mt-4 w-full py-3 rounded-xl border border-blue-500`}
        onPress={() => navigation.navigate('Register')}
        accessibilityRole="button"
      >
        <Text style={tw`text-center text-lg font-bold text-blue-500`}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
