import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import tw from 'twrnc';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/authSlice';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'At least 6 chars').required('Password required'),
  confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    try {
      await schema.validate(form, { abortEarly: false });
      await dispatch(register({ email: form.email, password: form.password })).unwrap();
      Alert.alert('Registration', 'Check your email to confirm registration.');
    } catch (err) {
      if (err.name === 'ValidationError') {
        let obj = {};
        err.inner.forEach(e => { obj[e.path] = e.message });
        setErrors(obj);
      } else {
        Alert.alert('Registration Error', err.message || error);
      }
    }
    setLoading(false);
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={tw`flex-1 bg-white dark:bg-black px-8 pt-14`}>
      <Text style={tw`text-3xl font-black text-blue-500 dark:text-blue-400 mb-8`}>Create Account</Text>
      <Input label="Email" value={form.email} onChangeText={v => handleChange('email', v)} keyboardType="email-address" error={errors.email} />
      <Input label="Password" value={form.password} onChangeText={v => handleChange('password', v)} secureTextEntry error={errors.password} />
      <Input label="Confirm Password" value={form.confirm} onChangeText={v => handleChange('confirm', v)} secureTextEntry error={errors.confirm} />
      <Button title="Register" onPress={handleSubmit} loading={loading} style={tw`mt-2`} />
      <View style={tw`flex-row justify-center mt-4`}>
        <Text style={tw`text-gray-500 dark:text-gray-400`}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} accessibilityRole="button">
          <Text style={tw`text-blue-500 font-semibold`}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
