import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const QUALITY_ITEMS = [
  { key: 'punctuality', label: 'Puntualidad' },
  { key: 'cleanliness', label: 'Limpieza' },
  { key: 'comfort', label: 'Comodidad' },
  { key: 'communication', label: 'Comunicación' },
];

export function getRefPrice(distanceKm, seats) {
  const base = 0.06; // €/km
  return parseFloat((base * distanceKm * seats).toFixed(2));
}

export function DriverQualityDeclaration({ ratings = {} }) {
  return (
    <View style={styles.qualityContainer}>
      <Text style={styles.qualityTitle}>Calidad declarada</Text>
      {QUALITY_ITEMS.map((item) => (
        <View key={item.key} style={styles.qualityRow}>
          <Text style={styles.qualityLabel}>{item.label}</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text
                key={star}
                style={[styles.star, star <= (ratings[item.key] ?? 0) && styles.starFilled]}
              >
                ★
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

export function PriceBarometer({ price, refPrice, currency = '€' }) {
  const ratio = refPrice > 0 ? price / refPrice : 1;
  const level = ratio < 0.8 ? 'bajo' : ratio > 1.2 ? 'alto' : 'normal';
  const barColor = level === 'bajo' ? colors.success : level === 'alto' ? colors.error : colors.warning;
  const barWidth = Math.min(Math.max(ratio * 50, 10), 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Precio sugerido</Text>
      <View style={styles.row}>
        <Text style={styles.price}>
          {price}{currency}
        </Text>
        <Text style={styles.refPrice}>ref. {refPrice}{currency}</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.bar, { width: `${barWidth}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={[styles.levelLabel, { color: barColor }]}>
        Precio {level}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  price: { ...typography.h2, color: colors.primary },
  refPrice: { ...typography.caption, color: colors.textLight },
  barBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  bar: { height: '100%', borderRadius: 4 },
  levelLabel: { ...typography.caption, marginTop: spacing.xs },
  qualityContainer: { marginTop: spacing.sm },
  qualityTitle: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.xs },
  qualityRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  qualityLabel: { ...typography.body, color: colors.textPrimary },
  stars: { flexDirection: 'row' },
  star: { fontSize: 16, color: colors.border },
  starFilled: { color: colors.warning },
});
