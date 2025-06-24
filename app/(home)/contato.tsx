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
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const backgroundImage = require("../../assets/images/contato.jpg");

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
    router.replace("/");
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Contato - LuthStore 🎶</Text>

          <Text style={styles.introText}>
            Tem alguma dúvida ou quer fazer um orçamento? Entre em contato conosco via WhatsApp, e-mail ou telefone. Estamos prontos para ajudar você!
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoItem}>📞 Telefone: (53) 98156-8093</Text>
            <Text style={styles.infoItem}>✉️ Email: contato@luthstore.com</Text>
            <Text style={styles.infoItem}>📍 Endereço: Rua das Cordas, 123 - Pelotas, RS</Text>
          </View>

          <View style={styles.formWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#ccc"
              value={nome}
              onChangeText={setNome}
              keyboardAppearance="dark"
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              keyboardAppearance="dark"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Mensagem"
              placeholderTextColor="#ccc"
              value={mensagem}
              onChangeText={setMensagem}
              multiline
              textAlignVertical="top"
              keyboardAppearance="dark"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar via WhatsApp</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleGoHome} style={{ marginTop: 24 }}>
            <Text style={styles.goHomeText}>Voltar para página inicial</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <Text style={styles.footerText}>
            © 2025 LuthStore. Todos os direitos reservados.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.8,
  },
  introText: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 22,
    maxWidth: 360,
  },
  infoBox: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 10,
    padding: 16,
    marginBottom: 28,
    width: "90%",
    maxWidth: 380,
  },
  infoItem: {
    color: "#eee",
    fontSize: 15,
    marginBottom: 8,
  },
  formWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    maxWidth: 380,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 9,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#fff",
    height: 42,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  textArea: {
    height: 90,
  },
  button: {
    backgroundColor: "#25D366",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
    shadowColor: "#128C7E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  goHomeText: {
    color: "#ddd",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 30,
    width: "90%",
    maxWidth: 380,
    alignSelf: "center",
    borderRadius: 1,
  },
  footerText: {
    color: "#aaa",
    fontSize: 13,
    textAlign: "center",
  },
});
