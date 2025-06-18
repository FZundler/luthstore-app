// app/cadastro/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { imagens } from "@/assets/images/images";
import { randomInt } from "crypto";

export default function CadastroInstrumento() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [foto, setFoto] = useState("");

  const handleCadastro = async () => {
    if (!nome || !tipo || !preco || !foto) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const novoProduto = {
        id: randomInt,
        nome,
        tipo,
        preco: Number(preco),
        imagem: foto,
      };

      const response = await axios.post("http://localhost:3000/products", novoProduto, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response)

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Sucesso", "Instrumento cadastrado com sucesso!");
        router.replace("/");
      } else {
        Alert.alert("Erro", "Erro ao cadastrar. Verifique o servidor.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o instrumento.");
    }
  };

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <ImageBackground
      source={imagens.background}
      style={styles.background}
      resizeMode="cover"
      blurRadius={5}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastrar Instrumento</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Instrumento"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo do Instrumento"
          placeholderTextColor="#999"
          value={tipo}
          onChangeText={setTipo}
        />

        <TextInput
          style={styles.input}
          placeholder="Preço"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />

        <TextInput
          style={styles.input}
          placeholder="Link da Foto"
          placeholderTextColor="#999"
          value={foto}
          onChangeText={setFoto}
        />

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoHome}>
          <Text style={styles.paginaInicial}>Página Inicial</Text>
        </TouchableOpacity>
      </View>
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
    width: "100%",
    maxWidth: 400,
  },
  botao: {
    backgroundColor: "#6200ee",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
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
