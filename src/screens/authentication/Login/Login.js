import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import Toast from 'react-native-toast-message';
import Fonts from '../../../utils/Fonts';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log(user);
          setEmail("");
          setSenha("");
          Toast.show({
            type: 'success',
            text1: 'Login bem-sucedido',
            text2: 'Bem-vindo de volta!',
          });
          navigation.navigate("RoutesTab");
        } else {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Seu e-mail ainda não foi verificado. Por favor, verifique seu e-mail antes de fazer login.',
          });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: errorMessage,
        });
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 30, color: '#000', fontFamily: Fonts["poppins-bold"], marginVertical: 30 }}>Iniciar Sessão</Text>
          <Text style={{ fontFamily: Fonts["poppins-regular"], marginTop: -20, fontSize: 15, maxWidth: "80%", textAlign: 'center', color: '#848484' }}>Seja Bem vindo novamente!</Text>
        </View>
        <View style={{ marginVertical: 30 }}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"#626262"}
            value={email}
            onChangeText={setEmail}
            style={{
              fontFamily: Fonts["poppins-regular"],
              fontSize: 14,
              padding: 17,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            marginVertical: 10,
          }}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor={"#626262"}
              value={senha}
              onChangeText={setSenha}
              style={{
                fontFamily: Fonts["poppins-regular"],
                fontSize: 14,
                padding: 17,
                flex: 1,
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <AntDesign
                name={showPassword ? "eye" : "eyeo"}
                size={24}
                color="#333"
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Recuperar")}>
            <Text style={{ fontFamily: Fonts["poppins-semiBold"], fontSize: 14, color: '#000' }}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={{
          padding: 12,
          backgroundColor: '#000',
          marginVertical: 30,
          borderRadius: 10,
        }}>
          <Text style={{ fontFamily: Fonts["poppins-bold"], color: '#fff', textAlign: 'center', fontSize: 20 }}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate("Cadastro")}>
          <Text style={{ fontFamily: Fonts["poppins-semiBold"], color: '#000', textAlign: 'center', fontSize: 14 }}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
        <View style={styles.connectWithContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.connectWithText}>Ou conecte com</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.googleButtonContainer}>
          <TouchableOpacity style={styles.googleButton}>
            <AntDesign
              name="google"
              size={24}
              color="black"
              style={styles.googleIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  connectWithContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  connectWithText: {
    color: "#333",
    paddingHorizontal: 10,
    fontFamily: Fonts["poppins-regular"],
  },
  googleButtonContainer: {
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  googleIcon: {
    textAlign: "center",
    fontSize: 35,
  },
});