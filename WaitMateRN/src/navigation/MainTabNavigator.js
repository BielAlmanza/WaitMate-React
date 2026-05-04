import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { BadgeContext } from '../context/BadgeContext';
import { colors } from '../theme';

import MessagesScreen from '../screens/MessagesScreen';
import ConversationScreen from '../screens/ConversationScreen';
import FeedScreen from '../screens/FeedScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import DepartureDatesScreen from '../screens/DepartureDatesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileScreenPublic from '../screens/ProfileScreenPublic';
import PersonalDataScreen from '../screens/PersonalDataScreen';
import MyReviewsScreen from '../screens/MyReviewsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import AddressScreen from '../screens/AddressScreen';
import CommsScreen from '../screens/CommsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import HelpScreen from '../screens/HelpScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const MessagesStack = createStackNavigator();
const EventsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const TAB_ICONS = {
  MessagesTab: '💬',
  EventsTab: '🎟️',
  ProfileTab: '👤',
};

function MessagesNavigator() {
  return (
    <MessagesStack.Navigator screenOptions={stackScreenOptions}>
      <MessagesStack.Screen name="MessagesScreen" component={MessagesScreen} options={{ title: 'Mensajes' }} />
      <MessagesStack.Screen name="ConversationScreen" component={ConversationScreen} options={{ title: '' }} />
      <MessagesStack.Screen name="ProfileScreenPublic" component={ProfileScreenPublic} options={{ title: 'Perfil' }} />
    </MessagesStack.Navigator>
  );
}

function EventsNavigator() {
  return (
    <EventsStack.Navigator screenOptions={stackScreenOptions}>
      <EventsStack.Screen name="FeedScreen" component={FeedScreen} options={{ title: 'Eventos' }} />
      <EventsStack.Screen name="EventDetailScreen" component={EventDetailScreen} options={{ title: 'Detalle evento' }} />
      <EventsStack.Screen name="CreateEventScreen" component={CreateEventScreen} options={{ title: 'Crear evento' }} />
      <EventsStack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{ title: 'Nuevo anuncio', presentation: 'modal' }} />
      <EventsStack.Screen name="PostDetailScreen" component={PostDetailScreen} options={{ title: 'Anuncio', presentation: 'fullScreenModal' }} />
      <EventsStack.Screen name="GroupDetailScreen" component={GroupDetailScreen} options={{ title: 'Grupo de viaje' }} />
      <EventsStack.Screen name="DepartureDatesScreen" component={DepartureDatesScreen} options={{ title: 'Fechas de salida', presentation: 'modal' }} />
      <EventsStack.Screen name="ConversationScreen" component={ConversationScreen} options={{ title: '' }} />
    </EventsStack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={stackScreenOptions}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Mi perfil' }} />
      <ProfileStack.Screen name="ProfileScreenPublic" component={ProfileScreenPublic} options={{ title: 'Perfil público', presentation: 'modal' }} />
      <ProfileStack.Screen name="PersonalDataScreen" component={PersonalDataScreen} options={{ title: 'Datos personales', presentation: 'modal' }} />
      <ProfileStack.Screen name="MyReviewsScreen" component={MyReviewsScreen} options={{ title: 'Mis valoraciones', presentation: 'modal' }} />
      <ProfileStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Cambiar contraseña', presentation: 'modal' }} />
      <ProfileStack.Screen name="AddressScreen" component={AddressScreen} options={{ title: 'Dirección postal', presentation: 'modal' }} />
      <ProfileStack.Screen name="CommsScreen" component={CommsScreen} options={{ title: 'Comunicaciones', presentation: 'modal' }} />
      <ProfileStack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Pagos', presentation: 'modal' }} />
      <ProfileStack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Ayuda', presentation: 'modal' }} />
      <ProfileStack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ title: 'Privacidad', presentation: 'modal' }} />
      <ProfileStack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'Sobre WaitMate', presentation: 'modal' }} />
    </ProfileStack.Navigator>
  );
}

function BadgeDot({ count }) {
  if (!count) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
}

export default function MainTabNavigator() {
  const { messageBadge } = useContext(BadgeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>{TAB_ICONS[route.name]}</Text>
        ),
      })}
    >
      <Tab.Screen
        name="MessagesTab"
        component={MessagesNavigator}
        options={{
          tabBarLabel: 'Mensajes',
          tabBarBadge: messageBadge > 0 ? messageBadge : undefined,
        }}
      />
      <Tab.Screen name="EventsTab" component={EventsNavigator} options={{ tabBarLabel: 'Eventos' }} />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}

const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.primary,
  headerTitleStyle: { fontWeight: '700' },
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
  },
  tabLabel: { fontSize: 11, fontWeight: '600' },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.accent,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
