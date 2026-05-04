import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, typography } from '../theme';

const OPTIONS = [
  { key: 'push', label: 'Notificaciones push', desc: 'Nuevos mensajes y actualizaciones de viajes' },
  { key: 'email', label: 'Correo electrónico', desc: 'Resumen semanal y confirmaciones' },
  { key: 'sms', label: 'SMS', desc: 'Alertas urgentes' },
  { key: 'marketing', label: 'Comunicaciones promocionales', desc: 'Ofertas y novedades de WaitMate' },
];

export default function CommsScreen({ navigation }) {
  const [prefs, setPrefs] = useState({ push: true, email: true, sms: false, marketing: false });

  const toggle = (key) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const save = () => {
    Alert.alert('Guardado', 'Preferencias de comunicación actualizadas.');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {OPTIONS.map((opt) => (
        <View key={opt.key} style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.label}>{opt.label}</Text>
            <Text style={styles.desc}>{opt.desc}</Text>
          </View>
          <Switch
            value={prefs[opt.key]}
            onValueChange={() => toggle(opt.key)}
            trackColor={{ false: colors.border, true: colors.secondary }}
            thumbColor={prefs[opt.key] ? colors.primary : colors.textLight}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Guardar preferencias</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.surface, borderRadius: 10, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  info: { flex: 1, marginRight: spacing.md },
  label: { ...typography.body, color: colors.textPrimary, fontWeight: '600' },
  desc: { ...typography.caption, color: colors.textLight, marginTop: 2 },
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  btnText: { color: '#fff', ...typography.body, fontWeight: '700' },
});
