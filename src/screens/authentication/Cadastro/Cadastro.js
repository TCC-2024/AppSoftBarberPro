import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebaseConfig';
import Fonts from '../../../utils/Fonts';
import Toast from 'react-native-toast-message';

export default function Cadastro({ navigation }) {

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCadastro = () => {
    if (isChecked) {
      createUserWithEmailAndPassword(auth, email, senha)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userId = user.uid;
          await setDoc(doc(db, "UsersBarbeiros", userId), {
            nome: nome,
            telefone: telefone,
            email: email,
            senha: senha,
          });
          setNome('');
          setTelefone('');
          setEmail('');
          setSenha('');
          navigation.navigate('CadastroBarbearia')
          Toast.show({
            type: 'success',
            text1: 'Parabens conta criada com sucesso!',
            text2: 'Por favor continue cadastrando sua barbearia!',
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: errorMessage,
          });
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Você deve concordar com os Termos & Condições para continuar.',
      });
    }
  };

  const formatPhoneNumber = (text) => {
    const formattedText = text.replace(/[^\d]/g, '');

    let formattedPhoneNumber = '';
    for (let i = 0; i < formattedText.length; i++) {
      if (i === 0) {
        formattedPhoneNumber += '(' + formattedText[i];
      } else if (i === 1) {
        formattedPhoneNumber += formattedText[i] + ') ';
      } else if (i === 6) {
        formattedPhoneNumber += formattedText[i] + '-';
      } else {
        formattedPhoneNumber += formattedText[i];
      }
    }
    return formattedPhoneNumber;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 30, color: '#000', fontFamily: Fonts["poppins-bold"], marginVertical: 30 }}>Criar Conta</Text>
          <Text style={{ fontFamily: Fonts["poppins-regular"], marginTop: -20, fontSize: 15, maxWidth: "80%", textAlign: 'center', color: '#848484' }}>Crie sua conta, para aproveitar ao maxímo.</Text>
        </View>
        <View style={{ marginVertical: 30 }}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor={"#626262"}
            value={nome}
            onChangeText={setNome}
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
          <TextInput
            placeholder="Telefone"
            placeholderTextColor={"#626262"}
            onChangeText={setTelefone}
            value={formatPhoneNumber(telefone)}
            maxLength={15}
            keyboardType="phone-pad"
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
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleCheckboxChange} style={styles.checkbox}>
            {isChecked && <AntDesign name="checksquare" size={20} color="black" />}
            {!isChecked && <AntDesign name="checksquareo" size={20} color="black" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Concordo com os Termos & Condições</Text>
        </View>
        <TouchableOpacity onPress={handleCadastro} style={{
          padding: 12,
          backgroundColor: '#000',
          marginVertical: 30,
          borderRadius: 10,
        }}>
          <Text style={{ fontFamily: Fonts["poppins-bold"], color: '#fff', textAlign: 'center', fontSize: 20 }}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontFamily: Fonts["poppins-semiBold"], color: '#000', textAlign: 'center', fontSize: 14 }}>Já tem uma conta? Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: -20,
  },
  checkbox: {
    textAlign: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#333',
    fontFamily: Fonts['poppins-regular'],
  },
});
