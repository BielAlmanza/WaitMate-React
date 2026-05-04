import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { postService } from '../services/postService';
import { colors, spacing, typography } from '../theme';

export default function CreatePostScreen({ route, navigation }) {
  const { eventId } = route.params ?? {};
  const [type, setType] = useState('offer'); // 'offer' | 'request'
  const [description, setDescription] = useState('');
  const [seats, setSeats] = useState('');
  const [price, setPrice] = useState('');
  const [saving, setSaving] = useState(false);

  const publish = async () => {
    setSaving(true);
    try {
      if (eventId) {
        await postService.createRideRequest(eventId, description);
      } else {
        await postService.createPost({ type, description, seats: Number(seats), price: Number(price) });
      }
      Alert.alert('Publicado', 'Tu anuncio ya está visible.');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo publicar el anuncio.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.typeRow}>
        {['offer', 'request'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, type === t && styles.typeBtnActive]}
            onPress={() => setType(t)}
          >
            <Text style={[styles.typeBtnText, type === t && styles.typeBtnTextActive]}>
              {t === 'offer' ? 'Ofrezco plaza' : 'Busco plaza'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textarea]} value={description} onChangeText={setDescription}
        placeholder="Describe el viaje, punto de recogida, condiciones…"
        placeholderTextColor={colors.textLight} multiline numberOfLines={4}
      />

      <Text style={styles.label}>Plazas disponibles</Text>
      <TextInput style={styles.input} value={seats} onChangeText={setSeats} placeholder="2" keyboardType="numeric" />

      <Text style={styles.label}>Precio por persona (€)</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="10.00" keyboardType="decimal-pad" />

      <TouchableOpacity style={[styles.btn, saving && styles.btnDisabled]} onPress={publish} disabled={saving}>
        <Text style={styles.btnText}>{saving ? 'Publicando...' : 'Publicar anuncio'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  typeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  typeBtn: {
    flex: 1, padding: spacing.sm, borderRadius: 10, borderWidth: 1.5,
    borderColor: colors.border, alignItems: 'center',
  },
  typeBtnActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  typeBtnText: { ...typography.body, color: colors.textSecondary, fontWeight: '600' },
  typeBtnTextActive: { color: '#fff' },
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
