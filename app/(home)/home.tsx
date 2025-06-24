import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
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
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { imagens } from "@/assets/images/images";
import ProdutoCard from "./produtoCard";
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
  const [searchText, setSearchText] = useState("");
  const [filteredCategorias, setFilteredCategorias] = useState(categorias);
  const [filtroAtivo, setFiltroAtivo] = useState(null);

  // Abrir menu lateral com produtos da categoria
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

  // Fechar menu lateral
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

  // Adicionar produto ao carrinho
  const addAoCarrinho = (produto) => {
    if (carrinho.some((item) => item.id === produto.id)) {
      Alert.alert("Aviso", "Produto já está no carrinho.");
      return;
    }
    setCarrinho([...carrinho, produto]);
    Alert.alert("Sucesso", `${produto.nome} adicionado ao carrinho!`);
  };

  // Remover produto do carrinho
  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter((item) => item.id !== produtoId));
    Alert.alert("Produto removido do carrinho");
  };

  // Limpar carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // Confirmar compra
  const comprar = () => {
    if (carrinho.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione algum produto antes de comprar.");
      return;
    }
    const nomes = carrinho.map((p) => p.nome).join(", ");
    Alert.alert("Compra realizada!", `Você comprou: ${nomes}`);
    closeMenu();
  };

  // Renderizar card do produto dentro do menu lateral
  const renderProdutoCard = ({ item }) => (
    <View style={styles.cardModal}>
      <Image source={item.imagem} style={styles.cardModalImage} resizeMode="contain" />
      <Text style={styles.cardModalText}>{item.nome}</Text>

      {carrinho.some((p) => p.id === item.id) ? (
        <TouchableOpacity
          style={[styles.botaoCarrinho, styles.botaoRemover]}
          onPress={() => removerDoCarrinho(item.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoCarrinhoTexto}>Remover</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.botaoCarrinho, styles.botaoAdicionar]}
          onPress={() => addAoCarrinho(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoCarrinhoTexto}>Adicionar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Lógica de filtro e busca corrigida
  useEffect(() => {
    let data = categorias;

    if (filtroAtivo) {
      data = categorias.filter((cat) => cat.nome === filtroAtivo);
    }

    if (searchText.trim() !== "") {
      const termo = searchText.toLowerCase();

      data = data
        .map((cat) => ({
          ...cat,
          produtos: cat.produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(termo)
          ),
        }))
        .filter((cat) => cat.produtos.length > 0);
    }

    setFilteredCategorias(data);
  }, [searchText, filtroAtivo]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={imagens.background}
          style={styles.background}
          resizeMode="cover"
          blurRadius={2}
        >
          <Menu />

          <View style={styles.header}>
            <Text style={styles.titulo}>LuthStore 🎸</Text>
            <TouchableOpacity
              style={styles.carrinhoIcon}
              onPress={() =>
                openMenu(
                  categoriaSelecionada?.nome ||
                    (filteredCategorias[0] && filteredCategorias[0].nome) ||
                    categorias[0].nome
                )
              }
            >
              <Ionicons name="cart" size={28} color="#fff" />
              {carrinho.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{carrinho.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={22} color="#666" />
            <TextInput
              placeholder="Buscar produtos..."
              placeholderTextColor="#666"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              clearButtonMode="while-editing"
            />
            {searchText !== "" && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <MaterialIcons name="close" size={22} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtroCategorias}>
            <TouchableOpacity
              onPress={() => setFiltroAtivo(null)}
              style={[styles.filtroBotao, filtroAtivo === null && styles.filtroBotaoAtivo]}
            >
              <Text style={[styles.filtroTexto, filtroAtivo === null && styles.filtroTextoAtivo]}>
                Todas
              </Text>
            </TouchableOpacity>

            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat.nome}
                onPress={() => setFiltroAtivo(cat.nome)}
                style={[styles.filtroBotao, filtroAtivo === cat.nome && styles.filtroBotaoAtivo]}
              >
                <Text style={[styles.filtroTexto, filtroAtivo === cat.nome && styles.filtroTextoAtivo]}>
                  {cat.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {filteredCategorias.length === 0 ? (
              <Text style={styles.semProdutosTexto}>Nenhum produto encontrado.</Text>
            ) : (
              filteredCategorias.map((categoria, index) => (
                <View key={index} style={styles.categoriaContainer}>
                  <Text style={styles.categoriaTitulo}>{categoria.nome}</Text>
                  <View style={styles.containerProdutos}>
                    {categoria.produtos.map((produto) => (
                      <TouchableOpacity
                        key={produto.id}
                        onPress={() => openMenu(categoria.nome)}
                        activeOpacity={0.85}
                        style={styles.touchCategoria}
                      >
                        <ProdutoCard
                          nome={produto.nome}
                          imagem={produto.imagem}
                          tamanho="medio"
                          preco={""}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.rodape}>
            <Text style={styles.rodapeTexto}>🎵 Entrega para todo o Brasil</Text>
            <Text style={styles.rodapeTexto}>📞 Suporte: (51) 99999-9999</Text>
            <Text style={styles.rodapeTexto}>© 2025 LuthStore. Todos os direitos reservados.</Text>
          </View>

          {menuVisible && categoriaSelecionada && (
            <TouchableWithoutFeedback onPress={closeMenu}>
              <View style={styles.overlay}>
                <TouchableWithoutFeedback>
                  <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
                    <View style={styles.headerMenu}>
                      <Text style={styles.menuTitle}>Categoria: {categoriaSelecionada.nome}</Text>
                      <TouchableOpacity onPress={closeMenu} style={styles.closeIcon} activeOpacity={0.7}>
                        <MaterialIcons name="close" size={28} color="#bbb" />
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      data={categoriaSelecionada.produtos}
                      keyExtractor={(item) => item.id}
                      renderItem={renderProdutoCard}
                      horizontal={false}
                      numColumns={2}
                      contentContainerStyle={{ paddingBottom: 24 }}
                      showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.carrinhoContainer}>
                      <Text style={styles.carrinhoTitulo}>Carrinho: {carrinho.length} item(s)</Text>
                      {carrinho.map((item) => (
                        <Text key={item.id} style={styles.carrinhoItem}>
                          • {item.nome}
                        </Text>
                      ))}
                      {carrinho.length > 0 && (
                        <TouchableOpacity
                          style={[styles.botaoCarrinho, styles.botaoRemover, { marginTop: 12 }]}
                          onPress={limparCarrinho}
                        >
                          <Text style={styles.botaoCarrinhoTexto}>Limpar Carrinho</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.botoesFooter}>
                      <TouchableOpacity
                        style={[styles.botaoFooter, styles.botaoDetalhes]}
                        onPress={() => Alert.alert("Detalhes", "Ver detalhes do produto.")}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.botaoFooterTexto}>Detalhes</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.botaoFooter, styles.botaoComprar]}
                        onPress={comprar}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.botaoFooterTexto}>Comprar</Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  titulo: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  carrinhoIcon: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 4,
  },
  filtroCategorias: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  filtroBotao: {
    backgroundColor: "#444",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filtroBotaoAtivo: {
    backgroundColor: "#1abc9c",
  },
  filtroTexto: {
    color: "#ccc",
    fontWeight: "600",
  },
  filtroTextoAtivo: {
    color: "#111",
  },
  scrollContent: {
    paddingBottom: 120, // Espaço para o rodapé fixo
  },
  categoriaContainer: {
    marginBottom: 18,
  },
  categoriaTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    paddingLeft: 8,
  },
  containerProdutos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  touchCategoria: {
    margin: 6,
  },
  semProdutosTexto: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  rodape: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#111",
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  rodapeTexto: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 4,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "62%",
    backgroundColor: "#181818",
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 12,
    elevation: 14,
  },
  headerMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ddd",
  },
  closeIcon: {
    padding: 4,
  },
  cardModal: {
    flex: 1,
    margin: 6,
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  cardModalImage: {
    width: 120,
    height: 100,
    marginBottom: 12,
  },
  cardModalText: {
    color: "#eee",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  botaoCarrinho: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  botaoAdicionar: {
    backgroundColor: "#1abc9c",
  },
  botaoRemover: {
    backgroundColor: "#e74c3c",
  },
  botaoCarrinhoTexto: {
    color: "#fff",
    fontWeight: "700",
  },
  carrinhoContainer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 12,
  },
  carrinhoTitulo: {
    fontWeight: "700",
    fontSize: 16,
    color: "#ccc",
    marginBottom: 8,
  },
  carrinhoItem: {
    color: "#ddd",
    fontSize: 14,
    marginVertical: 2,
  },
  botoesFooter: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoFooter: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: "center",
  },
  botaoDetalhes: {
    backgroundColor: "#555",
  },
  botaoComprar: {
    backgroundColor: "#1abc9c",
  },
  botaoFooterTexto: {
    color: "#fff",
    fontWeight: "700",
  },
});
