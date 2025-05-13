// pages/contato.tsx
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
} from "react-native";
import { useRouter } from "expo-router";

export default function Contato() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = () => {
    if (nome && email && mensagem) {
      Alert.alert("Sucesso", "Sua mensagem foi enviada com sucesso!");
      router.replace("/"); // Exemplo de redirecionamento para a home
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  const handleGoHome = () => {
    router.replace("/"); // Redireciona para a página inicial
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.formWrapper}>
        <Text style={styles.titulo}>LuthStore - Contato 🎸</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

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
          style={[styles.input, { height: 100 }]} // Aumentando a altura para a mensagem
          placeholder="Mensagem"
          placeholderTextColor="#999"
          value={mensagem}
          onChangeText={setMensagem}
          multiline
        />

        <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
          <Text style={styles.botaoTexto}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>

      {/* Apenas a palavra "Página Inicial" que redireciona */}
      <TouchableOpacity onPress={handleGoHome}>
        <Text style={styles.paginaInicial}>Página Inicial</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
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
    marginTop: 40,
  },
});
