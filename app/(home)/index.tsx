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
import { imagens } from "@/assets/images/images"; // Importe suas imagens aquii

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (email === "admin@email.com" && senha === "123456") {
      localStorage.setItem("userName", email); // Armazenando o nome do usuário no localStorage
      router.replace("/home"); // Redireciona para a home
    } else {
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  };

  const handleGoHome = () => {
    router.replace("/home"); // Redireciona para a página inicial
  };

  return (
    <ImageBackground
      source={imagens.background} // Substitua com o caminho da sua imagem de fundo
      style={styles.background}
      resizeMode="cover"
      blurRadius={5} // Defina o valor para o nível de desfoque
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
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>
        </View>

        {/* Palavra "Página Inicial" fora do card */}
        <TouchableOpacity onPress={handleGoHome}>
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
    backgroundColor: "#1a1a1a",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  input: {
    height: 48,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 16,
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#6200ee",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  paginaInicial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
});
