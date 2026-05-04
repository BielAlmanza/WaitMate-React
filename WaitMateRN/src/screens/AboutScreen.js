import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>WM</Text>
      </View>
      <Text style={styles.appName}>WaitMate</Text>
      <Text style={styles.version}>Versión 1.0.0</Text>
      <Text style={styles.description}>
        WaitMate es una plataforma de movilidad compartida que conecta a personas que viajan en la misma dirección. Reducimos huella de carbono y costes de desplazamiento conectando comunidades.
      </Text>
      <Text style={styles.copyright}>© 2025 WaitMate. Todos los derechos reservados.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, alignItems: 'center', paddingTop: spacing.xxl },
  logo: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: { color: '#fff', fontSize: 32, fontWeight: '800' },
  appName: { ...typography.h1, color: colors.textPrimary, marginBottom: spacing.xs },
  version: { ...typography.caption, color: colors.textLight, marginBottom: spacing.lg },
  description: { ...typography.body, color: colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: spacing.xl },
  copyright: { ...typography.caption, color: colors.textLight },
});
