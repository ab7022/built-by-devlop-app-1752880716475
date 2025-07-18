import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import tw from 'twrnc';
import Input from '../components/Input';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginWithProvider } from '../store/slices/authSlice';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'At least 6 chars').required('Password required'),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    try {
      await schema.validate(form, { abortEarly: false });
      await dispatch(login(form)).unwrap();
    } catch (err) {
      if (err.name === 'ValidationError') {
        let obj = {};
        err.inner.forEach(e => { obj[e.path] = e.message });
        setErrors(obj);
      } else {
        Alert.alert('Login Error', err.message || error);
      }
    }
    setLoading(false);
  };

  const handleSocial = async (provider) => {
    setLoading(true);
    try {
      await dispatch(loginWithProvider(provider)).unwrap();
    } catch (err) {
      Alert.alert('Social Login Error', err.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={tw`flex-1 bg-white dark:bg-black px-8 pt-14`}>
      <Text style={tw`text-3xl font-black text-blue-500 dark:text-blue-400 mb-8`}>Sign In</Text>
      <Input label="Email" value={form.email} onChangeText={v => handleChange('email', v)} keyboardType="email-address" error={errors.email} />
      <Input label="Password" value={form.password} onChangeText={v => handleChange('password', v)} secureTextEntry error={errors.password} />
      <Button title="Sign In" onPress={handleSubmit} loading={loading} style={tw`mt-2`} />
      <TouchableOpacity style={tw`mt-4 mb-6`} onPress={() => navigation.navigate('ResetPassword')} accessibilityRole="button">
        <Text style={tw`text-center text-blue-500 font-semibold`}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={tw`flex-row items-center mb-2`}>
        <View style={tw`flex-1 h-px bg-gray-200 dark:bg-gray-700`} />
        <Text style={tw`mx-2 text-gray-500 dark:text-gray-400`}>or</Text>
        <View style={tw`flex-1 h-px bg-gray-200 dark:bg-gray-700`} />
      </View>
      <SocialButton
        title="Sign in with Google"
        icon={<AntDesign name="google" size={24} color="#ea4335" />}
        onPress={() => handleSocial('google')}
      />
      <SocialButton
        title="Sign in with GitHub"
        icon={<AntDesign name="github" size={24} color="#171515" />}
        onPress={() => handleSocial('github')}
      />
      <View style={tw`flex-row justify-center mt-4`}>
        <Text style={tw`text-gray-500 dark:text-gray-400`}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} accessibilityRole="button">
          <Text style={tw`text-blue-500 font-semibold`}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
