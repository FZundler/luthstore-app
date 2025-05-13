// pages/productListScreen.tsx
import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import ProdutoCard from "./produtoCard";
import Menu from "../components/menu"; // Novo componente de menu
import { imagens } from "@/assets/images/images";
import { useRouter } from "expo-router"; // Importação do hook de navegação

const { width } = Dimensions.get("window");

const products = [
  { id: 1, nome: "Guitar", preco: "R$ 1.200", imagem: imagens.guitarra },
  { id: 2, nome: "Drums", preco: "R$ 1.500", imagem: imagens.teclado },
  { id: 3, nome: "Piano", preco: "R$ 3.000", imagem: imagens.violao },
  { id: 4, nome: "Violin", preco: "R$ 900", imagem: imagens.guitarra },
  { id: 5, nome: "Trumpet", preco: "R$ 800", imagem: imagens.teclado },
  { id: 6, nome: "Saxophone", preco: "R$ 1.100", imagem: imagens.violao },
  { id: 7, nome: "Flute", preco: "R$ 600", imagem: imagens.guitarra },
  { id: 8, nome: "Timpani", preco: "R$ 2.000", imagem: imagens.teclado },
];

export default function ProductListScreen() {
  const router = useRouter(); // Hook para navegação

  const renderItem = ({ item }: { item: typeof products[0] }) => (
    <View style={styles.cardContainer}>
      <ProdutoCard
        nome={item.nome}
        preco={item.preco}
        imagem={item.imagem}
        tamanho="pequeno"
      />
    </View>
  );

  const handleGoHome = () => {
    router.push("/"); // Redireciona para a página inicial
  };

  return (
    <ImageBackground
      source={imagens.background}
      style={styles.background}
      resizeMode="cover"
      blurRadius={3}
    >
      <Menu />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={4}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Palavra "Página Inicial" fora do card */}
      <TouchableOpacity style={styles.paginaInicialContainer} onPress={handleGoHome}>
        <Text style={styles.paginaInicial}>Página Inicial</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  cardContainer: {
    width: width / 4 - 20, // 4 cards por linha, com margem
    margin: 5,
    alignItems: "center",
  },
  paginaInicialContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  paginaInicial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});
