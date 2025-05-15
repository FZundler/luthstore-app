// app/cadastro/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { imagens } from "@/assets/images/images";

export default function CadastroInstrumento() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  const selecionarImagem = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        setFoto(result.assets[0].uri);
      }
    } else {
      Alert.alert("Permissão necessária", "Precisamos de permissão para acessar a galeria.");
    }
  };

  const handleCadastro = async () => {
    if (!nome || !tipo || !preco || !foto) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const novoInstrumento = {
        id: Date.now(), // ID simples
        nome,
        tipo,
        preco,
        foto,
      };

      const instrumentosSalvos = await AsyncStorage.getItem("instrumentos");
      const instrumentos = instrumentosSalvos ? JSON.parse(instrumentosSalvos) : [];

      instrumentos.push(novoInstrumento);
      await AsyncStorage.setItem("instrumentos", JSON.stringify(instrumentos));

      Alert.alert("Sucesso", "Instrumento cadastrado com sucesso!");
      router.replace("/"); // Redireciona para a home
    } catch (error) {
      console.error("Erro ao salvar instrumento:", error);
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

        <TouchableOpacity style={styles.botaoImagem} onPress={selecionarImagem}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.imagemPreview} />
          ) : (
            <Text style={styles.botaoTexto}>Selecionar Foto</Text>
          )}
        </TouchableOpacity>

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
  botaoImagem: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  imagemPreview: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  paginaInicial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 40,
  },
});
