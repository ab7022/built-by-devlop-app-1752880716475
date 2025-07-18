import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Logo from '../components/Logo';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  return (
    <View style={tw`flex-1 bg-white dark:bg-black px-8 pt-20 items-center`}>
      <Logo size={72} />
      <Text style={tw`mt-8 text-2xl font-bold text-blue-500 dark:text-blue-400`}>Welcome, {user?.email || 'User'}!</Text>
      <Text style={tw`mt-2 text-base text-gray-600 dark:text-gray-300 text-center`}>You are signed in 🎉</Text>
      <TouchableOpacity
        style={tw`mt-16 w-full bg-red-500 py-3 rounded-xl flex-row items-center justify-center`}
        onPress={() => dispatch(logout())}
        accessibilityRole="button"
      >
        <MaterialCommunityIcons name="logout" size={22} color="#fff" style={tw`mr-2`} />
        <Text style={tw`text-center text-lg font-bold text-white`}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
