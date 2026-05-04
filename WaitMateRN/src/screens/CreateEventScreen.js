import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { eventService } from '../services/eventService';
import { colors, spacing, typography } from '../theme';

export default function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const parseDate = (str) => {
    const [day, month, year] = str.split('/');
    if (!day || !month || !year) return null;
    const d = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    return isNaN(d.getTime()) ? null : d.toISOString();
  };

  const create = async () => {
    if (!title || !location || !date) {
      Alert.alert('Campos obligatorios', 'Título, lugar y fecha son requeridos.');
      return;
    }
    const isoDate = parseDate(date);
    if (!isoDate) {
      Alert.alert('Fecha inválida', 'Usa el formato DD/MM/AAAA, por ejemplo: 15/06/2026');
      return;
    }
    setSaving(true);
    try {
      await eventService.createEvent({ title, location, date: isoDate, category, description });
      Alert.alert('¡Creado!', 'Evento publicado correctamente.');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo crear el evento.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {[
        { label: 'Título del evento *', value: title, setter: setTitle, placeholder: 'Ej: Concierto de Coldplay' },
        { label: 'Lugar *', value: location, setter: setLocation, placeholder: 'Ej: Estadio Wanda Metropolitano, Madrid' },
        { label: 'Fecha (DD/MM/AAAA) *', value: date, setter: setDate, placeholder: '15/06/2025' },
        { label: 'Categoría', value: category, setter: setCategory, placeholder: 'Conciertos, Deportes…' },
      ].map(({ label, value, setter, placeholder }) => (
        <View key={label}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input} value={value} onChangeText={setter}
            placeholder={placeholder} placeholderTextColor={colors.textLight}
          />
        </View>
      ))}

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={description} onChangeText={setDescription}
        placeholder="Descripción opcional del evento…"
        placeholderTextColor={colors.textLight}
        multiline numberOfLines={4}
      />

      <TouchableOpacity style={[styles.btn, saving && styles.btnDisabled]} onPress={create} disabled={saving}>
        <Text style={styles.btnText}>{saving ? 'Publicando...' : 'Publicar evento'}</Text>
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
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', ...typography.body, fontWeight: '700' },
});
