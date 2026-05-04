import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { colors, spacing, typography } from '../theme';

const FAQ = [
  { q: '¿Cómo reservo un asiento?', a: 'Busca un viaje en la pantalla de Eventos, entra al detalle y pulsa "Unirse al grupo".' },
  { q: '¿Puedo cancelar un viaje?', a: 'Sí, desde el detalle del grupo puedes cancelar tu participación hasta 2 horas antes.' },
  { q: '¿Cómo se gestionan los pagos?', a: 'Los pagos se acuerdan directamente entre los participantes. WaitMate facilita la coordinación.' },
];

export default function HelpScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Preguntas frecuentes</Text>
      {FAQ.map((item, i) => (
        <View key={i} style={styles.faqItem}>
          <Text style={styles.question}>{item.q}</Text>
          <Text style={styles.answer}>{item.a}</Text>
        </View>
      ))}

      <Text style={styles.title}>Contacto</Text>
      <TouchableOpacity style={styles.link} onPress={() => Linking.openURL('mailto:soporte@waitmate.com')}>
        <Text style={styles.linkText}>soporte@waitmate.com</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { ...typography.h3, color: colors.textPrimary, marginVertical: spacing.md },
  faqItem: {
    backgroundColor: colors.surface, borderRadius: 10, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  question: { ...typography.body, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.xs },
  answer: { ...typography.body, color: colors.textSecondary },
  link: { padding: spacing.md, alignItems: 'center' },
  linkText: { color: colors.secondary, ...typography.body, textDecorationLine: 'underline' },
});
