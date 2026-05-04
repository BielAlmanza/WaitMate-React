import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { chatService } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';

export default function ConversationScreen({ route, navigation }) {
  const { conversation } = route.params;
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({ title: conversation.tripTitle });
    chatService.getMessages(conversation.id).then(setMessages);
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const msg = await chatService.sendMessage(conversation.id, input.trim());
    setMessages((prev) => [...prev, msg]);
    setInput('');
    listRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }) => {
    const isMe = item.senderId === user?.id;
    return (
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{item.text}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escribe un mensaje..."
          placeholderTextColor={colors.textLight}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Text style={styles.sendText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  messageList: { padding: spacing.md, paddingBottom: spacing.xl },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderColor: colors.primary },
  bubbleText: { ...typography.body, color: colors.textPrimary },
  bubbleTextMe: { color: '#fff' },
  timestamp: { ...typography.caption, color: colors.textLight, marginTop: 2, alignSelf: 'flex-end' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  sendText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
