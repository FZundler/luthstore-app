import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ViewStyle } from "react-native";

const { width } = Dimensions.get("window");

type ProdutoCardProps = {
  nome: string;
  imagem: any;
  preco: string;
  tamanho?: "grande" | "pequeno";
};

export default function ProdutoCard({ nome, imagem, preco, tamanho = "pequeno" }: ProdutoCardProps) {
  const grande = tamanho === "grande";

  return (
    <View
      style={[
        styles.card,
        grande ? styles.cardGrande : styles.cardPequeno,
        grande && styles.cardGrandeMargin
      ]}
    >
      <Image source={imagem} style={[styles.imagemProduto, grande ? styles.imgGrande : styles.imgPequena]} />
      <Text style={styles.nomeProduto}>{nome}</Text>
      <Text style={styles.preco}>{preco}</Text>
    </View>
  );
}

const estiloBaseCard: ViewStyle = {
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 10,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
};

const styles = StyleSheet.create({
  card: {
    ...estiloBaseCard,
  } as ViewStyle,
  cardGrande: {
    width: width > 768 ? 320 : 280, // Aumentado
    marginHorizontal: 12,            // Espaço entre os cards
    marginBottom: 24,                // Espaço vertical
  },
  cardGrandeMargin: {
    marginTop: 120, // Espaço extra da barra de menu
  },
  cardPequeno: {
    width: width > 768 ? width / 4 - 30 : 160,
    marginHorizontal: 8,            // Espaço entre os cards
    marginBottom: 16,               // Espaço vertical
  },
  imagemProduto: {
    borderRadius: 8,
  },
  imgGrande: {
    width: "100%",
    height: 200, // Aumentado
  },
  imgPequena: {
    width: "100%",
    height: 100,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  preco: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
