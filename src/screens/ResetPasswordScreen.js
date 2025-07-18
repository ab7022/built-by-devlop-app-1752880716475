import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../store/slices/authSlice';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await schema.validate({ email });
      await dispatch(resetPassword(email)).unwrap();
      Alert.alert('Reset Password', 'Check your email for reset instructions.');
      navigation.goBack();
    } catch (err) {
      if (err.name === 'ValidationError') setError(err.message);
      else setError(err.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={tw`flex-1 bg-white dark:bg-black px-8 pt-14`}>
      <Text style={tw`text-3xl font-black text-blue-500 dark:text-blue-400 mb-8`}>Reset Password</Text>
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" error={error} />
      <Button title="Send Reset Email" onPress={handleSubmit} loading={loading} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mt-8`} accessibilityRole="button">
        <Text style={tw`text-center text-blue-500 font-semibold`}>Back to Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
