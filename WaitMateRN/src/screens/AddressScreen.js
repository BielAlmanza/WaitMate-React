import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { userService } from '../services/userService';
import { colors, spacing, typography } from '../theme';

export default function AddressScreen({ navigation }) {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await userService.updateAddress({ street, city, postalCode });
      Alert.alert('Guardado', 'Dirección actualizada.');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo guardar la dirección.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {[
        { label: 'Calle y número', value: street, setter: setStreet, placeholder: 'Calle Mayor, 1' },
        { label: 'Ciudad', value: city, setter: setCity, placeholder: 'Madrid' },
        { label: 'Código postal', value: postalCode, setter: setPostalCode, placeholder: '28001', keyboard: 'numeric' },
      ].map(({ label, value, setter, placeholder, keyboard }) => (
        <View key={label}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setter}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            keyboardType={keyboard ?? 'default'}
          />
        </View>
      ))}

      <TouchableOpacity style={[styles.btn, saving && styles.btnDisabled]} onPress={save} disabled={saving}>
        <Text style={styles.btnText}>{saving ? 'Guardando...' : 'Guardar dirección'}</Text>
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
