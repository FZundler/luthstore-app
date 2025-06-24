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
  ImageBackground,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { imagens } from "@/assets/images/images"; // Pega a imagem correta do arquivo

export default function Contato() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async () => {
    if (nome && email && mensagem) {
      const mensagemFormatada = `Nome: ${nome}, Email: ${email}, Mensagem: ${mensagem}`;
      const url = `https://wa.me/5553981568093?text=${encodeURIComponent(
        mensagemFormatada
      )}`;

      try {
        const podeAbrir = await Linking.canOpenURL(url);
        if (podeAbrir) {
          await Linking.openURL(url);
        } else {
          Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
        }
      } catch (error) {
        Alert.alert("Erro", "Algo deu errado ao tentar abrir o WhatsApp.");
        console.error(error);
      }
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  const handleGoHome = () => {
    router.replace("/"); // Voltar para a Home
  };

  return (
    <ImageBackground
      source={imagens.background} // ✅ Aqui ele usa o whats.jpg
      style={styles.background}
      resizeMode="cover"
      blurRadius={2}
    >git
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
            style={[styles.input, { height: 100 }]}
            placeholder="Mensagem"
            placeholderTextColor="#999"
            value={mensagem}
            onChangeText={setMensagem}
            multiline
          />

          <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
            <Text style={styles.botaoTexto}>Enviar via WhatsApp</Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: "rgba(26, 26, 26, 0.85)",
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
    backgroundColor: "#25D366",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  paginaInicial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 30,
  },
});
