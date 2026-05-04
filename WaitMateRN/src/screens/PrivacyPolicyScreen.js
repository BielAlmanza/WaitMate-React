import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Política de Privacidad</Text>
      <Text style={styles.updated}>Última actualización: enero 2025</Text>
      <Text style={styles.body}>
        WaitMate recopila únicamente los datos necesarios para facilitar la organización de viajes compartidos entre sus usuarios. Los datos personales (nombre, email, ubicación) se usan exclusivamente para el funcionamiento de la app y no se ceden a terceros sin consentimiento expreso del usuario.{'\n\n'}
        Puedes ejercer tus derechos de acceso, rectificación, supresión y portabilidad contactando con nosotros en privacidad@waitmate.com.{'\n\n'}
        La app puede solicitar acceso a tu ubicación para mostrarte eventos cercanos. Este permiso es opcional y puedes revocarlo en cualquier momento desde la configuración de tu dispositivo.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { ...typography.h2, color: colors.textPrimary, marginBottom: spacing.xs },
  updated: { ...typography.caption, color: colors.textLight, marginBottom: spacing.lg },
  body: { ...typography.body, color: colors.textSecondary, lineHeight: 22 },
});
