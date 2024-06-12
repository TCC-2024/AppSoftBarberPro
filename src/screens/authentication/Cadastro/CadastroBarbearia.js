import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import Fonts from '../../../utils/Fonts';
import { auth, db } from '../../../config/firebaseConfig';

export default function CadastroBarbearia({ navigation }) {
    const [nomebarbeariacadastro, setNomeBarbeariacadastro] = useState("");
    const [sobre, setSobre] = useState("");

    const handleBarbearia = async () => {
        if (!nomebarbeariacadastro || !sobre) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Por favor, preencha todos os campos.',
                visibilityTime: 3000,
                position: 'top'
            });
            return;
        }
        try {
            const user = auth.currentUser;
            const userId = user.uid;
            await setDoc(doc(db, "CadastroBarbearia", userId), {
                userId: userId,
                nomebarbeariacadastro: nomebarbeariacadastro,
                sobre: sobre,
            });

            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Barbearia cadastrada com sucesso!',
                visibilityTime: 3000,
                position: 'top'
            });

            navigation.navigate('CadastroEndereco');
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao cadastrar',
                text2: e.message,
                visibilityTime: 3000,
                position: 'top'
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ padding: 20 }}>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={styles.title}>Criar Conta</Text>
                    <Text style={styles.subtitle}>Crie sua conta, para aproveitar ao máximo.</Text>
                </View>
                <View style={{ marginVertical: 30 }}>
                    <TextInput
                        placeholder="Nome da Barbearia"
                        placeholderTextColor={"#626262"}
                        onChangeText={setNomeBarbeariacadastro}
                        value={nomebarbeariacadastro}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Sobre sua Barbearia"
                        placeholderTextColor={"#626262"}
                        onChangeText={setSobre}
                        multiline
                        value={sobre}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity onPress={handleBarbearia} style={styles.button}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: '#000',
        fontFamily: Fonts["poppins-bold"],
        marginVertical: 30,
    },
    subtitle: {
        fontFamily: Fonts["poppins-regular"],
        marginTop: -20,
        fontSize: 15,
        maxWidth: "80%",
        textAlign: 'center',
        color: '#848484',
    },
    input: {
        fontFamily: Fonts["poppins-regular"],
        fontSize: 14,
        padding: 17,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginVertical: 10,
    },
    button: {
        padding: 12,
        backgroundColor: '#000',
        marginVertical: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: Fonts["poppins-bold"],
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
});
