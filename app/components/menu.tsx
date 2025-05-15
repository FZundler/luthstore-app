// components/Menu.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { imagens } from "@/assets/images/images";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Menu() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  // Carrega o nome do usuário logado ao montar o componente
  useEffect(() => {
    const loadUser = async () => {
      try {
        const loggedUser = await AsyncStorage.getItem("userName");
        if (loggedUser) {
          setUserName(loggedUser);
        }
      } catch (error) {
        console.error("Erro ao carregar o usuário:", error);
      }
    };

    loadUser();
  }, []);

  // Função de logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userName");
      setUserName(null);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <View style={styles.menu}>
      <View style={styles.logoContainer}>
        <Image source={imagens.logo} style={styles.logoMenu} />
        <Text style={styles.logoTexto}>Luth Store</Text>
      </View>

      <View style={styles.links}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.link}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/productListScreen")}>
          <Text style={styles.link}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/contato")}>
          <Text style={styles.link}>Contato</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuDireita}>
        <TouchableOpacity>
          <Text style={styles.carrinho}>🛒</Text>
        </TouchableOpacity>

        {/* Exibe o nome do usuário logado ou o botão de "Cadastrar" */}
        {userName ? (
          <Text style={styles.link}>{userName}</Text>
        ) : (
          <TouchableOpacity onPress={() => router.push("/cadastro")}>
            <Text style={styles.link}>Cadastrar</Text>
          </TouchableOpacity>
        )}

        {/* Exibe "Sair" se o usuário estiver logado ou "Entrar" se não */}
        <TouchableOpacity onPress={userName ? handleLogout : () => router.push("/login")}>
          <Text style={styles.link}>{userName ? "Sair" : "Entrar"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoMenu: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 8,
  },
  logoTexto: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Pacifico",
    fontWeight: "600",
  },
  links: {
    flexDirection: "row",
    gap: 15,
  },
  link: {
    color: "#fff",
    fontSize: 16,
  },
  carrinho: {
    fontSize: 24,
    color: "#fff",
  },
  menuDireita: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
