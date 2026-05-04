import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { chatService } from '../services/chatService';
import { BadgeContext } from '../context/BadgeContext';
import { colors, spacing, typography } from '../theme';

export default function MessagesScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clearMessageBadge } = useContext(BadgeContext);

  useEffect(() => {
    clearMessageBadge();
    chatService.getConversations().then(setConversations).finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ConversationScreen', { conversation: item })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.participant.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.tripTitle}>{item.tripTitle}</Text>
        <Text style={styles.participantName}>{item.participant.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={styles.loader} color={colors.primary} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No tienes conversaciones aún.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loader: { flex: 1 },
  list: { padding: spacing.md },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: { color: '#fff', ...typography.h3 },
  info: { flex: 1 },
  tripTitle: { ...typography.label, color: colors.textSecondary },
  participantName: { ...typography.body, color: colors.textPrimary, fontWeight: '600' },
  lastMessage: { ...typography.caption, color: colors.textLight, marginTop: 2 },
  badge: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  empty: { textAlign: 'center', color: colors.textLight, marginTop: spacing.xl },
});
