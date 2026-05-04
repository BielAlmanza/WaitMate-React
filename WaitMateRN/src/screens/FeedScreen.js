import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView,
} from 'react-native';
import { eventService } from '../services/eventService';
import { LocationContext } from '../context/LocationContext';
import { colors, spacing, typography } from '../theme';

const CATEGORIES = ['Todos', 'Conciertos', 'Deportes', 'Festivales', 'Teatro', 'Conferencias'];

export default function FeedScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const { userLocation } = useContext(LocationContext);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const filters = category !== 'Todos' ? { category } : {};
        const data = userLocation
          ? await eventService.getNearbyEvents(userLocation.lat, userLocation.lng, 100)
          : await eventService.getEvents(filters);
        setEvents(data ?? []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, userLocation]);

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventDetailScreen', { eventId: item.id, event: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.categoryTag}>{item.category}</Text>
        <Text style={styles.date}>{item.date ? new Date(item.date).toLocaleDateString() : '—'}</Text>
      </View>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterChip, category === cat && styles.filterChipActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.filterText, category === cat && styles.filterTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => navigation.navigate('CreateEventScreen')}
      >
        <Text style={styles.createBtnText}>+ Crear evento</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderEvent}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No hay eventos disponibles.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  filterBar: { maxHeight: 50, marginTop: spacing.sm },
  filterContent: { paddingHorizontal: spacing.md, gap: spacing.sm },
  filterChip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { ...typography.label, color: colors.textSecondary },
  filterTextActive: { color: '#fff' },
  createBtn: {
    marginHorizontal: spacing.md, marginTop: spacing.sm,
    backgroundColor: colors.accent, borderRadius: 10,
    padding: spacing.sm, alignItems: 'center',
  },
  createBtnText: { color: '#fff', ...typography.body, fontWeight: '700' },
  list: { padding: spacing.md },
  card: {
    backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  categoryTag: { ...typography.caption, color: colors.secondary, fontWeight: '600' },
  date: { ...typography.caption, color: colors.textLight },
  eventTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.xs },
  location: { ...typography.caption, color: colors.textSecondary },
  empty: { textAlign: 'center', color: colors.textLight, marginTop: spacing.xl },
});
