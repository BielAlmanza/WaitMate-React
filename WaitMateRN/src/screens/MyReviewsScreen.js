import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { userService } from '../services/userService';
import { colors, spacing, typography } from '../theme';

function ReviewCard({ review }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.author}>{review.reviewer?.name ?? 'Usuario'}</Text>
        <Text style={styles.stars}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Text>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
      <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</Text>
    </View>
  );
}

export default function MyReviewsScreen() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getReviewsReceived().then(setReviews).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />;

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewCard review={item} />}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.empty}>Aún no tienes valoraciones.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  author: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  stars: { color: colors.warning, fontSize: 16 },
  comment: { ...typography.body, color: colors.textSecondary },
  date: { ...typography.caption, color: colors.textLight, marginTop: spacing.xs },
  empty: { textAlign: 'center', color: colors.textLight, marginTop: spacing.xl },
});
