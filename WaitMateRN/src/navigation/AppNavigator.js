import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { LocationProvider } from '../context/LocationContext';
import { BadgeProvider } from '../context/BadgeContext';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import { colors } from '../theme';

function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return user ? <MainTabNavigator /> : <LoginScreen />;
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <LocationProvider>
        <BadgeProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </BadgeProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
