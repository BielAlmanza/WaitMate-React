import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { postService } from '../services/postService';
import { PriceBarometer, DriverQualityDeclaration, getRefPrice } from '../components/PriceBarometer';
import { colors, spacing, typography } from '../theme';

export default function GroupDetailScreen({ route, navigation }) {
  const { eventId, event } = route.params;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService.getEventRideRequests(eventId).then(setRequests).finally(() => setLoading(false));
  }, [eventId]);

  const refPrice = getRefPrice(event?.distanceKm ?? 50, 3);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Grupos para {event?.title ?? 'este evento'}</Text>

      <PriceBarometer price={event?.avgPrice ?? 0} refPrice={refPrice} />
      <DriverQualityDeclaration ratings={event?.ratings ?? {}} />

      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => navigation.navigate('DepartureDatesScreen', { eventId })}
      >
        <Text style={styles.dateBtnText}>Ver fechas de salida disponibles</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Solicitudes activas</Text>
      {requests.length === 0 ? (
        <Text style={styles.empty}>No hay solicitudes aún. ¡Sé el primero!</Text>
      ) : (
        requests.map((req) => (
          <TouchableOpacity
            key={req.id}
            style={styles.card}
            onPress={() => navigation.navigate('PostDetailScreen', { postId: req.id })}
          >
            <Text style={styles.cardAuthor}>{req.author?.name ?? 'Usuario'}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>{req.description}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  title: { ...typography.h2, color: colors.textPrimary, marginBottom: spacing.md },
  dateBtn: {
    backgroundColor: colors.surface, borderRadius: 10, padding: spacing.md,
    alignItems: 'center', borderWidth: 1, borderColor: colors.secondary, marginVertical: spacing.sm,
  },
  dateBtnText: { color: colors.secondary, ...typography.body, fontWeight: '600' },
  section: { ...typography.h3, color: colors.textPrimary, marginVertical: spacing.md },
  card: {
    backgroundColor: colors.surface, borderRadius: 10, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  cardAuthor: { ...typography.label, color: colors.primary, fontWeight: '700' },
  cardDesc: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  empty: { ...typography.body, color: colors.textLight, textAlign: 'center', marginTop: spacing.md },
});
