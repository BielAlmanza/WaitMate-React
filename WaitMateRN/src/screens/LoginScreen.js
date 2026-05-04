import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';

export default function LoginScreen() {
  const { login, register } = useContext(AuthContext);
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Rellena todos los campos');
    }
    if (mode === 'register' && !name) {
      return Alert.alert('Error', 'Introduce tu nombre');
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register(name, email, password);
      }
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message ?? 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.outer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>WaitMate</Text>
        <Text style={styles.subtitle}>Carpooling para eventos</Text>

        <View style={styles.modeRow}>
          {['login', 'register'].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.modeBtn, mode === m && styles.modeBtnActive]}
              onPress={() => setMode(m)}
            >
              <Text style={[styles.modeBtnText, mode === m && styles.modeBtnTextActive]}>
                {m === 'login' ? 'Iniciar sesión' : 'Registrarse'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {mode === 'register' && (
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={colors.textLight}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.textLight}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.textLight}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]} onPress={submit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>{mode === 'login' ? 'Entrar' : 'Crear cuenta'}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: spacing.xl },
  logo: { fontSize: 36, fontWeight: '900', color: colors.primary, textAlign: 'center', marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.xl },
  modeRow: { flexDirection: 'row', marginBottom: spacing.lg, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: colors.primary },
  modeBtn: { flex: 1, padding: spacing.sm, alignItems: 'center', backgroundColor: colors.surface },
  modeBtnActive: { backgroundColor: colors.primary },
  modeBtnText: { ...typography.body, color: colors.primary, fontWeight: '600' },
  modeBtnTextActive: { color: '#fff' },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, padding: spacing.md, ...typography.body, color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', ...typography.body, fontWeight: '700' },
});
