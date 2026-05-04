import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

const MOCK_METHODS = [
  { id: '1', type: 'card', label: 'Visa ···· 4242', expiry: '12/27' },
  { id: '2', type: 'paypal', label: 'PayPal — demo@waitmate.com' },
];

export default function PaymentScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.section}>Métodos de pago</Text>
      {MOCK_METHODS.map((m) => (
        <View key={m.id} style={styles.card}>
          <Text style={styles.cardLabel}>{m.label}</Text>
          {m.expiry && <Text style={styles.cardSub}>Caduca: {m.expiry}</Text>}
        </View>
      ))}
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Añadir método de pago</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Historial de transacciones</Text>
      <Text style={styles.empty}>No hay transacciones recientes.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  section: { ...typography.h3, color: colors.textPrimary, marginVertical: spacing.md },
  card: {
    backgroundColor: colors.surface, borderRadius: 10, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  cardLabel: { ...typography.body, color: colors.textPrimary, fontWeight: '600' },
  cardSub: { ...typography.caption, color: colors.textLight },
  addBtn: { borderWidth: 1.5, borderColor: colors.primary, borderRadius: 10, padding: spacing.md, alignItems: 'center', borderStyle: 'dashed' },
  addBtnText: { color: colors.primary, ...typography.body, fontWeight: '600' },
  empty: { ...typography.body, color: colors.textLight, textAlign: 'center', marginTop: spacing.md },
});
