import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../config/firebaseConfig";
import Fonts from "../../../../utils/Fonts";
import Toast from 'react-native-toast-message';

export default function Recuperar({ navigation }) {
    const [email, setEmail] = useState("");

    const handleForgot = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Email Enviado',
                    text2: 'Verifique seu email para redefinir sua senha',
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
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: '#000', fontFamily: Fonts["poppins-bold"], marginVertical: 30 }}>Nova Senha</Text>
                    <Text style={{ fontFamily: Fonts["poppins-regular"], marginTop: -20, fontSize: 15, maxWidth: "80%", textAlign: 'center', color: '#848484' }}>Esqueceu sua senha, não se preocupe! Insira o seu e-mail de cadastro e enviaremos instruções para você.</Text>
                </View>
                <View style={styles.containerinput}>
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
                </View>
                <TouchableOpacity onPress={handleForgot}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Receber Instruções</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 55,
        marginLeft: 35,
    },
    containerinput: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        color: "#333",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: "black",
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: Fonts['poppins-bold'],
    },
});