import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ViewStyle } from "react-native";

const { width } = Dimensions.get("window");

type ProdutoCardProps = {
  nome: string;
  imagem: any;
  preco: number | string;
  tamanho?: "grande" | "pequeno";
};

export default function ProdutoCard({ nome, imagem, preco, tamanho = "pequeno" }: ProdutoCardProps) {
  const grande = tamanho === "grande";

  // Formata o preço para R$ x.xxx,xx
  const precoFormatado = typeof preco === "number"
    ? preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : preco;

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
      <Text style={styles.preco}>{precoFormatado}</Text>
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
    width: width > 768 ? 320 : 280,
    marginHorizontal: 12,
    marginBottom: 24,
  },
  cardGrandeMargin: {
    marginTop: 120,
  },
  cardPequeno: {
    width: width > 768 ? width / 4 - 30 : 160,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  imagemProduto: {
    borderRadius: 8,
  },
  imgGrande: {
    width: "100%",
    height: 200,
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
