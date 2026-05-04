import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { eventService } from '../services/eventService';
import { PriceBarometer, getRefPrice } from '../components/PriceBarometer';
import { colors, spacing, typography } from '../theme';

export default function EventDetailScreen({ route, navigation }) {
  const { eventId, event: initialEvent } = route.params;
  const [event, setEvent] = useState(initialEvent ?? null);
  const [loading, setLoading] = useState(!initialEvent);

  useEffect(() => {
    if (!initialEvent) {
      eventService.getEventById(eventId).then(setEvent).finally(() => setLoading(false));
    }
  }, [eventId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />;
  if (!event) return <Text style={styles.error}>Evento no encontrado.</Text>;

  const refPrice = getRefPrice(event.distanceKm ?? 50, event.seats ?? 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{event.location}</Text>
      <Text style={styles.meta}>{event.date ? new Date(event.date).toLocaleDateString('es-ES') : '—'}</Text>

      <Text style={styles.description}>{event.description}</Text>

      <PriceBarometer price={event.price ?? 0} refPrice={refPrice} />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('CreatePostScreen', { eventId: event.id })}
      >
        <Text style={styles.btnText}>Publicar oferta/solicitud</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.btnSecondary]}
        onPress={() => navigation.navigate('GroupDetailScreen', { eventId: event.id, event })}
      >
        <Text style={styles.btnText}>Ver grupos de viaje</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: spacing.sm },
  meta: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xs },
  description: { ...typography.body, color: colors.textSecondary, marginVertical: spacing.md, lineHeight: 22 },
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  btnSecondary: { backgroundColor: colors.secondary },
  btnText: { color: '#fff', ...typography.body, fontWeight: '700' },
  error: { textAlign: 'center', marginTop: spacing.xl, color: colors.error },
});
