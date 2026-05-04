import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { userService } from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';

export default function PersonalDataScreen({ navigation }) {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const updated = await userService.updateProfile({ name, email, phone });
      updateUser(updated);
      Alert.alert('Guardado', 'Datos actualizados correctamente.');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudieron guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Nombre completo</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tu nombre" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="tu@email.com" keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+34 000 000 000" keyboardType="phone-pad" />

      <TouchableOpacity style={[styles.btn, saving && styles.btnDisabled]} onPress={save} disabled={saving}>
        <Text style={styles.btnText}>{saving ? 'Guardando...' : 'Guardar cambios'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  label: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.xs, marginTop: spacing.md },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: spacing.md,
    ...typography.body,
    color: colors.textPrimary,
  },
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', ...typography.body, fontWeight: '700' },
});
