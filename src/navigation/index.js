import React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function Navigation() {
  const user = useSelector(state => state.auth.user);
  return user ? <AppStack /> : <AuthStack />;
}
