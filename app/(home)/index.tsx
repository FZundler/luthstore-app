import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { imagens } from "@/assets/images/images";
import ProdutoCard from "./produtoCard";
import Menu from "../components/menu"; // Novo componente de menu

const { width } = Dimensions.get("window");

const produtos = [
  {
    nome: "Guitarras",
    imagem: imagens.guitarra,
  },
  {
    nome: "Periféricos",
    imagem: imagens.teclado,
  },
  {
    nome: "Instrumentos",
    imagem: imagens.violao,
  },
];

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");

  const handleCardPress = (produtoNome: string) => {
    setProdutoSelecionado(produtoNome);
    setModalVisible(true); // Exibe o modal com o menu específico
  };

  const closeModal = () => {
    setModalVisible(false); // Fecha o modal
    setProdutoSelecionado(""); // Limpa a seleção do produto
  };

  return (
    <ImageBackground
      source={imagens.background}
      style={styles.background}
      resizeMode="cover"
      blurRadius={3}
    >
      <Menu />

      <View style={styles.containerProdutos}>
        {produtos.map((produto, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(produto.nome)} // Chama a função ao clicar
          >
            <ProdutoCard
              nome={produto.nome}
              imagem={produto.imagem}
              tamanho="grande" preco={""}            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal que exibe o menu quando um produto é selecionado */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        {/* TouchableWithoutFeedback detecta toque fora do modal */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback
              onPress={() => {}} /* Impede o fechamento quando clicar dentro do modal */
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Menu: {produtoSelecionado}
                </Text>
                {/* Adicione aqui as opções do menu para o produto */}
                <TouchableOpacity style={styles.buttonWrapper} onPress={() => alert("Comprar clicado")}>
                  <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrapper} onPress={() => alert("Ver Detalhes clicado")}>
                  <Text style={styles.buttonText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  containerProdutos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)", // Fundo mais escuro e profissional
  },
  modalContent: {
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  width: "25%",
  padding: 16,
  borderRadius: 12,
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#fff",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 8,
  marginTop: 500,////<--Adicione essa linha para empurrar o modal para baixo
},

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333", // Cor mais sutil
  },
  buttonWrapper: {
    width: "100%",
    marginVertical: 8, // Distância entre os botões
  },
  buttonText: {
    fontSize: 16,
    color: "#fff", // Cor do texto do botão
    backgroundColor: "#007bff", // Cor do botão
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 8, // Bordas arredondadas
  },
});
