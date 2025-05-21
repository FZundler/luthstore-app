import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  Image,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { imagens } from "@/assets/images/images";
import ProdutoCard from "./produtoCard"; // seu componente original
import Menu from "../components/menu";

const { width } = Dimensions.get("window");

const categorias = [
  {
    nome: "Guitarras",
    produtos: [
      { id: "g1", nome: "Guitarra Stratocaster", imagem: imagens.guitarra },
      { id: "g2", nome: "Guitarra Les Paul", imagem: imagens.guitarra },
      { id: "g3", nome: "Guitarra SG", imagem: imagens.guitarra },
    ],
  },
  {
    nome: "Acessórios",
    produtos: [
      { id: "a1", nome: "Pedal de efeito", imagem: imagens.teclado },
      { id: "a2", nome: "Cabo P10", imagem: imagens.teclado },
      { id: "a3", nome: "Afinador digital", imagem: imagens.teclado },
    ],
  },
  {
    nome: "Instrumentos",
    produtos: [
      { id: "i1", nome: "Violão Clássico", imagem: imagens.violao },
      { id: "i2", nome: "Violão Folk", imagem: imagens.violao },
      { id: "i3", nome: "Violão elétrico", imagem: imagens.violao },
    ],
  },
];

export default function Home() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [slideAnim] = useState(new Animated.Value(-width));
  const [carrinho, setCarrinho] = useState([]);

  // Abre o modal com categoria selecionada
  const openMenu = (categoriaNome) => {
    const categoria = categorias.find((c) => c.nome === categoriaNome);
    setCategoriaSelecionada(categoria);
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Fecha o modal
  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(false);
      setCategoriaSelecionada(null);
      setCarrinho([]);
    });
  };

  // Adiciona produto ao carrinho (evita duplicatas)
  const addAoCarrinho = (produto) => {
    if (carrinho.some((item) => item.id === produto.id)) {
      Alert.alert("Aviso", "Produto já está no carrinho.");
      return;
    }
    setCarrinho([...carrinho, produto]);
  };

  // Remove produto do carrinho
  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter((item) => item.id !== produtoId));
  };

  // Função para botão comprar
  const comprar = () => {
    if (carrinho.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione algum produto antes de comprar.");
      return;
    }
    const nomes = carrinho.map((p) => p.nome).join(", ");
    Alert.alert("Compra realizada!", `Você comprou: ${nomes}`);
    closeMenu();
  };

  // Função para botão detalhes (aqui apenas alert)
  const detalhes = () => {
    Alert.alert("Detalhes", "Selecione um produto para ver detalhes.");
  };

  // Renderiza cards dentro do modal
  const renderProdutoCard = ({ item }) => (
    <View style={styles.cardModal}>
      <Image source={item.imagem} style={styles.cardModalImage} resizeMode="contain" />
      <Text style={styles.cardModalText}>{item.nome}</Text>

      {carrinho.some((p) => p.id === item.id) ? (
        <TouchableOpacity
          style={[styles.botaoCarrinho, { backgroundColor: "#c0392b" }]}
          onPress={() => removerDoCarrinho(item.id)}
        >
          <Text style={styles.botaoCarrinhoTexto}>Remover</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.botaoCarrinho}
          onPress={() => addAoCarrinho(item)}
        >
          <Text style={styles.botaoCarrinhoTexto}>Adicionar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ImageBackground
      source={imagens.background}
      style={styles.background}
      resizeMode="cover"
      blurRadius={3}
    >
      <Menu />

      <View style={styles.containerProdutos}>
        {categorias.map((categoria, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openMenu(categoria.nome)}
            activeOpacity={0.8}
          >
            <ProdutoCard
              nome={categoria.nome}
              imagem={categoria.produtos[0].imagem}
              tamanho="grande"
              preco={""}
            />
          </TouchableOpacity>
        ))}
      </View>

      {menuVisible && categoriaSelecionada && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            {/* evitar fechar ao clicar dentro do modal */}
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
                <View style={styles.headerMenu}>
                  <Text style={styles.menuTitle}>Categoria: {categoriaSelecionada.nome}</Text>
                  <TouchableOpacity onPress={closeMenu} style={styles.closeIcon}>
                    <MaterialIcons name="close" size={24} color="#aaa" />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={categoriaSelecionada.produtos}
                  keyExtractor={(item) => item.id}
                  renderItem={renderProdutoCard}
                  horizontal={false}
                  numColumns={2}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />

                <View style={styles.carrinhoContainer}>
                  <Text style={styles.carrinhoTitulo}>
                    Carrinho: {carrinho.length} item(s)
                  </Text>
                  {carrinho.map((item) => (
                    <Text key={item.id} style={styles.carrinhoItem}>
                      • {item.nome}
                    </Text>
                  ))}
                </View>

                <View style={styles.botoesFooter}>
                  <TouchableOpacity style={styles.botaoFooter} onPress={detalhes}>
                    <Text style={styles.botaoFooterTexto}>Detalhes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.botaoFooter} onPress={comprar}>
                    <Text style={styles.botaoFooterTexto}>Comprar</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
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
    gap: 15,
    paddingTop: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "60%",
    backgroundColor: "#121212",
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 12,
  },
  headerMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  closeIcon: {
    padding: 5,
  },

  cardModal: {
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    margin: 8,
    padding: 12,
    alignItems: "center",
    width: "45%", // dois cards por linha
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  cardModalImage: {
    width: 100,
    height: 70,
    marginBottom: 8,
  },
  cardModalText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },

  botaoCarrinho: {
    backgroundColor: "#2980b9",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  botaoCarrinhoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  carrinhoContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 10,
  },
  carrinhoTitulo: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 6,
  },
  carrinhoItem: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 2,
  },

  botoesFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },

  botaoFooter: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 120,
  },
  botaoFooterTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
