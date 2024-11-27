import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import Toast from 'react-native-toast-message';
import Fonts from '../../../utils/Fonts';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !senha) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Preencha todos os campos antes de continuar.',
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          setEmail("");
          setSenha("");
          Toast.show({
            type: 'success',
            text1: 'Login bem-sucedido',
            text2: 'Bem-vindo de volta!',
          });
          navigation.navigate("RoutesTab");
        } else {
          auth.signOut(); // Desloga o usuário
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Seu e-mail não foi verificado. Reenviamos o e-mail de verificação.',
          });
          handleResendVerification();
        }
      })
      .catch((error) => {
        const friendlyMessage = getFriendlyErrorMessage(error.code);
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: friendlyMessage,
        });
      });
  };

  const handleResendVerification = () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Email enviado',
            text2: 'Verifique sua caixa de entrada para confirmar seu e-mail.',
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Não foi possível reenviar o e-mail de verificação.',
          });
        });
    }
  };

  const getFriendlyErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/user-not-found": "Usuário não encontrado.",
      "auth/wrong-password": "Senha incorreta.",
      "auth/invalid-email": "Formato de e-mail inválido.",
      "auth/too-many-requests": "Muitas tentativas de login. Tente novamente mais tarde.",
    };
    return errorMessages[errorCode] || "Ocorreu um erro inesperado. Tente novamente.";
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 30, color: '#d0ac4b', fontFamily: Fonts["poppins-bold"], marginVertical: 30 }}>
            Iniciar Sessão
          </Text>
          <Text style={{ fontFamily: Fonts["poppins-regular"], marginTop: -20, fontSize: 15, maxWidth: "80%", textAlign: 'center', color: '#848484' }}>
            Seja bem-vindo novamente!
          </Text>
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
            <Text style={{ fontFamily: Fonts["poppins-semiBold"], fontSize: 14, color: '#d0ac4b' }}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={{
          padding: 12,
          backgroundColor: '#d0ac4b',
          marginVertical: 30,
          borderRadius: 10,
        }}>
          <Text style={{ fontFamily: Fonts["poppins-bold"], color: '#fff', textAlign: 'center', fontSize: 20 }}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate("Cadastro")}>
          <Text style={{ fontFamily: Fonts["poppins-semiBold"], color: '#000', textAlign: 'center', fontSize: 14 }}>
            Não tem uma conta? <Text style={{ textDecorationLine: 'underline', color: '#d0ac4b' }}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
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
});
