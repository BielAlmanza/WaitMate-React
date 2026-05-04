import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../theme';

const MOCK_DATES = [
  { id: '1', date: '2026-06-14', time: '08:00', seats: 3, price: 12 },
  { id: '2', date: '2026-06-14', time: '10:30', seats: 1, price: 10 },
  { id: '3', date: '2026-06-15', time: '09:00', seats: 4, price: 8 },
];

export default function DepartureDatesScreen({ route, navigation }) {
  const [selected, setSelected] = useState(null);

  const confirm = () => {
    if (!selected) return;
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      <Text style={styles.title}>Fechas de salida disponibles</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {MOCK_DATES.map((d) => (
          <TouchableOpacity
            key={d.id}
            style={[styles.card, selected === d.id && styles.cardSelected]}
            onPress={() => setSelected(d.id)}
          >
            <View style={styles.row}>
              <Text style={styles.dateText}>
                {new Date(d.date).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' })}
              </Text>
              <Text style={styles.time}>{d.time}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.seats}>{d.seats} plaza{d.seats !== 1 ? 's' : ''}</Text>
              <Text style={styles.price}>{d.price}€/persona</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.confirmBtn, !selected && styles.confirmBtnDisabled]}
        onPress={confirm}
        disabled={!selected}
      >
        <Text style={styles.confirmBtnText}>Confirmar salida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  handle: {
    width: 40, height: 4, backgroundColor: colors.border,
    borderRadius: 2, alignSelf: 'center', marginTop: spacing.sm,
  },
  title: { ...typography.h2, color: colors.textPrimary, textAlign: 'center', marginVertical: spacing.md },
  list: { padding: spacing.md },
  card: {
    backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 2, borderColor: colors.border,
  },
  cardSelected: { borderColor: colors.primary, backgroundColor: '#FFF3E8' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  dateText: { ...typography.body, color: colors.textPrimary, fontWeight: '600' },
  time: { ...typography.body, color: colors.secondary, fontWeight: '700' },
  seats: { ...typography.caption, color: colors.textSecondary },
  price: { ...typography.body, color: colors.success, fontWeight: '700' },
  confirmBtn: {
    backgroundColor: colors.primary, margin: spacing.md,
    borderRadius: 10, padding: spacing.md, alignItems: 'center',
  },
  confirmBtnDisabled: { opacity: 0.4 },
  confirmBtnText: { color: '#fff', ...typography.body, fontWeight: '700' },
});
