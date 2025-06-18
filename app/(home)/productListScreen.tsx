import React, { useEffect, useState } from "react";
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
import Menu from "../components/menu";
import { imagens } from "@/assets/images/images";
import { useRouter } from "expo-router";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function ProductListScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]); // Tipar corretamente se possível
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardContainer}>
      <ProdutoCard
        nome={item.nome}
        preco={item.preco}
        imagem={item.imagem || imagens.guitarra} // fallback caso imagem venha nula
        tamanho="pequeno"
      />
    </View>
  );

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <ImageBackground
      source={imagens.background}
      style={styles.background}
      resizeMode="cover"
      blurRadius={3}
    >
      <Menu />

      {loading ? (
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>Carregando...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={4}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

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
    width: width / 4 - 20,
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
