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

    // Simulação de autenticação — substitua pela sua lógica real
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
      blurRadius={5}
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
            placeholderTextColor="#999"
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
            placeholderTextColor="#999"
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
            <Text style={styles.botaoTexto}>{loading ? "Entrando..." : "Entrar"}</Text>
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
    padding: 20,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#121212",
    padding: 28,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  titulo: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 28,
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 1,
  },
  input: {
    height: 50,
    backgroundColor: "#222",
    color: "#eee",
    borderRadius: 10,
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 17,
    fontWeight: "500",
  },
  botao: {
    backgroundColor: "#4a90e2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoDisabled: {
    backgroundColor: "#6c8ecf",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  paginaInicial: {
    color: "#bbb",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 26,
    textDecorationLine: "underline",
  },
});
