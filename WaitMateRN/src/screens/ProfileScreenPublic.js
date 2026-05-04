import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { userService } from '../services/userService';
import { colors, spacing, typography } from '../theme';

export default function ProfileScreenPublic({ route }) {
  const userId = route.params?.userId;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getUserProfile(userId).then(setProfile).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile?.name?.[0] ?? '?'}</Text>
        </View>
        <Text style={styles.name}>{profile?.name ?? 'Usuario'}</Text>
        <Text style={styles.member}>
          Miembro desde {profile?.createdAt ? new Date(profile.createdAt).getFullYear() : '—'}
        </Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{profile?.tripsCompleted ?? 0}</Text>
          <Text style={styles.statLabel}>Viajes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{profile?.averageRating?.toFixed(1) ?? '—'}</Text>
          <Text style={styles.statLabel}>Valoración</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{profile?.reviewCount ?? 0}</Text>
          <Text style={styles.statLabel}>Reseñas</Text>
        </View>
      </View>
      <Text style={styles.bio}>{profile?.bio ?? 'Sin descripción.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { alignItems: 'center', paddingVertical: spacing.lg },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '700' },
  name: { ...typography.h2, color: colors.textPrimary, marginTop: spacing.sm },
  member: { ...typography.caption, color: colors.textLight },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.lg },
  stat: { alignItems: 'center' },
  statValue: { ...typography.h2, color: colors.primary },
  statLabel: { ...typography.caption, color: colors.textSecondary },
  bio: { ...typography.body, color: colors.textPrimary, textAlign: 'center' },
});
