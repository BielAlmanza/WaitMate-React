import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Alert,
} from 'react-native';
import { postService } from '../services/postService';
import { chatService } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';

export default function PostDetailScreen({ route, navigation }) {
  const { postId } = route.params;
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [contacting, setContacting] = useState(false);

  useEffect(() => {
    postService.getPostById(postId).then(setPost).finally(() => setLoading(false));
  }, [postId]);

  const sendComment = async () => {
    if (!comment.trim()) return;
    await postService.commentPost(postId, comment.trim());
    setComment('');
    Alert.alert('Comentario enviado');
  };

  const join = async () => {
    try {
      await postService.joinRideRequest(postId);
      Alert.alert('¡Te has unido!', 'El conductor recibirá una notificación.');
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message ?? 'No se pudo unir al viaje.');
    }
  };

  const contactDriver = async () => {
    if (!post?.author?.id || post.author.id === user?.id) return;
    setContacting(true);
    try {
      const conversation = await chatService.createConversation(
        post.author.id,
        post.event?.id ?? null,
        post.event?.title ?? 'Viaje compartido',
      );
      navigation.navigate('ConversationScreen', { conversation: {
        id: conversation.id,
        tripTitle: post.event?.title ?? 'Viaje compartido',
        participant: { id: post.author.id, name: post.author.name, avatar: post.author.avatar },
      }});
    } catch {
      Alert.alert('Error', 'No se pudo abrir la conversación.');
    } finally {
      setContacting(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />;
  if (!post) return <Text style={styles.error}>Anuncio no encontrado.</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.type}>{post.type === 'offer' ? 'Ofrezco plaza' : 'Busco plaza'}</Text>
        <Text style={styles.price}>{post.price ? `${post.price}€/persona` : 'Precio a acordar'}</Text>
      </View>

      <Text style={styles.description}>{post.description}</Text>

      <Text style={styles.meta}>Plazas: {post.seats ?? '—'}</Text>
      <Text style={styles.meta}>Publicado por: {post.author?.name ?? '—'}</Text>

      {post.author?.id !== user?.id && (
        <>
          <TouchableOpacity style={styles.joinBtn} onPress={join}>
            <Text style={styles.joinBtnText}>Unirme a este viaje</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contactBtn, contacting && styles.btnDisabled]}
            onPress={contactDriver}
            disabled={contacting}
          >
            <Text style={styles.contactBtnText}>
              {contacting ? 'Abriendo chat...' : 'Contactar conductor'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.sectionTitle}>Comentarios</Text>
      {(post.comments ?? []).map((c, i) => (
        <View key={i} style={styles.commentItem}>
          <Text style={styles.commentAuthor}>{c.author?.name ?? 'Usuario'}</Text>
          <Text style={styles.commentText}>{c.content}</Text>
        </View>
      ))}

      <View style={styles.commentInput}>
        <TextInput
          style={styles.input} value={comment} onChangeText={setComment}
          placeholder="Escribe un comentario…" placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendComment}>
          <Text style={styles.sendBtnText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  type: { ...typography.h3, color: colors.primary },
  price: { ...typography.h3, color: colors.success },
  description: { ...typography.body, color: colors.textSecondary, lineHeight: 22, marginBottom: spacing.md },
  meta: { ...typography.caption, color: colors.textLight, marginBottom: spacing.xs },
  joinBtn: { backgroundColor: colors.primary, borderRadius: 10, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  joinBtnText: { color: '#fff', ...typography.body, fontWeight: '700' },
  contactBtn: { backgroundColor: colors.secondary, borderRadius: 10, padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  contactBtnText: { color: '#fff', ...typography.body, fontWeight: '700' },
  btnDisabled: { opacity: 0.6 },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.sm },
  commentItem: { backgroundColor: colors.surface, borderRadius: 10, padding: spacing.sm, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  commentAuthor: { ...typography.label, color: colors.textPrimary, fontWeight: '700' },
  commentText: { ...typography.body, color: colors.textSecondary },
  commentInput: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  input: {
    flex: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, padding: spacing.sm, ...typography.body, color: colors.textPrimary,
  },
  sendBtn: { backgroundColor: colors.secondary, borderRadius: 10, padding: spacing.sm, justifyContent: 'center' },
  sendBtnText: { color: '#fff', ...typography.label, fontWeight: '700' },
  error: { textAlign: 'center', marginTop: spacing.xl, color: colors.error },
});
