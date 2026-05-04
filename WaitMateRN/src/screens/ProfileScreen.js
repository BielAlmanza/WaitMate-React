import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';

const menuItems = [
  { key: 'PersonalDataScreen', label: 'Datos personales', icon: '👤' },
  { key: 'MyReviewsScreen', label: 'Mis valoraciones', icon: '⭐' },
  { key: 'ChangePasswordScreen', label: 'Cambiar contraseña', icon: '🔒' },
  { key: 'AddressScreen', label: 'Dirección postal', icon: '📍' },
  { key: 'CommsScreen', label: 'Comunicaciones', icon: '🔔' },
  { key: 'PaymentScreen', label: 'Pagos', icon: '💳' },
  { key: 'HelpScreen', label: 'Ayuda y soporte', icon: '❓' },
  { key: 'PrivacyPolicyScreen', label: 'Política de privacidad', icon: '📄' },
  { key: 'AboutScreen', label: 'Sobre WaitMate', icon: 'ℹ️' },
];

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0] ?? '?'}</Text>
        </View>
        <Text style={styles.name}>{user?.name ?? 'Usuario'}</Text>
        {user?.verificationStatus === 'verified' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓ Verificado</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.publicBtn}
          onPress={() => navigation.navigate('ProfileScreenPublic', { userId: user?.id })}
        >
          <Text style={styles.publicBtnText}>Ver perfil público</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.key)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { alignItems: 'center', paddingVertical: spacing.lg },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '700' },
  name: { ...typography.h2, color: colors.textPrimary },
  badge: {
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.xs,
  },
  badgeText: { color: '#fff', ...typography.caption, fontWeight: '700' },
  publicBtn: { marginTop: spacing.sm },
  publicBtnText: { color: colors.secondary, ...typography.label },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: { fontSize: 18, marginRight: spacing.md },
  menuLabel: { flex: 1, ...typography.body, color: colors.textPrimary },
  chevron: { fontSize: 20, color: colors.textLight },
  logoutBtn: {
    marginTop: spacing.lg,
    alignItems: 'center',
    padding: spacing.md,
  },
  logoutText: { color: colors.error, ...typography.body, fontWeight: '600' },
});
