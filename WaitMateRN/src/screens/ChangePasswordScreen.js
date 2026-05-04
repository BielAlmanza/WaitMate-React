import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { userService } from '../services/userService';
import { colors, spacing, typography } from '../theme';

export default function ChangePasswordScreen({ navigation }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (next !== confirm) {
      Alert.alert('Error', 'Las contraseñas nuevas no coinciden.');
      return;
    }
    setSaving(true);
    try {
      await userService.changePassword({ currentPassword: current, newPassword: next });
      Alert.alert('Listo', 'Contraseña actualizada.');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Contraseña actual incorrecta.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {[
        { label: 'Contraseña actual', value: current, setter: setCurrent },
        { label: 'Nueva contraseña', value: next, setter: setNext },
        { label: 'Confirmar nueva contraseña', value: confirm, setter: setConfirm },
      ].map(({ label, value, setter }) => (
        <View key={label}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setter}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={colors.textLight}
          />
        </View>
      ))}

      <TouchableOpacity style={[styles.btn, saving && styles.btnDisabled]} onPress={save} disabled={saving}>
        <Text style={styles.btnText}>{saving ? 'Guardando...' : 'Cambiar contraseña'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  label: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.xs, marginTop: spacing.md },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, padding: spacing.md, ...typography.body, color: colors.textPrimary,
  },
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', ...typography.body, fontWeight: '700' },
});
