// app/login/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { imagens } from "@/assets/images/images";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    if (email.toLowerCase() === "admin@email.com" && senha === "123456") {
      try {
        await AsyncStorage.setItem("userName", email);
        router.replace("/home");
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar o login.");
      }
    } else {
      Alert.alert("Erro", "Email ou senha inválidos.");
    }

    setLoading(false);
  };

  const handleGoHome = () => {
    router.replace("/home");
  };

  return (
    <ImageBackground
      source={imagens.background}
      style={styles.background}
      resizeMode="cover"
      blurRadius={6}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.formWrapper}>
          <Text style={styles.titulo}>LuthStore - Login 🎸</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            textContentType="emailAddress"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#bbb"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            editable={!loading}
            textContentType="password"
          />

          <TouchableOpacity
            style={[styles.botao, loading && styles.botaoDisabled]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.botaoTexto}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleGoHome} activeOpacity={0.7}>
          <Text style={styles.paginaInicial}>Página Inicial</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(18, 18, 18, 0.9)",
    paddingVertical: 32,
    paddingHorizontal: 28,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 12,
  },
  titulo: {
    fontSize: 30,
    color: "#f7f7f7",
    marginBottom: 32,
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  input: {
    height: 54,
    backgroundColor: "#2a2a2a",
    color: "#eee",
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 22,
    fontSize: 18,
    fontWeight: "600",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  botao: {
    backgroundColor: "#3467eb",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2f52e0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  botaoDisabled: {
    backgroundColor: "#6b85d6",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  paginaInicial: {
    color: "#ccc",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 32,
    textDecorationLine: "underline",
  },
});
