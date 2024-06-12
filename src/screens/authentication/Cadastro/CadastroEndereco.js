import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { auth, db } from '../../../config/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';
import Fonts from '../../../utils/Fonts';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export default function CadastroEndereco({ navigation }) {
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");

    const estados = [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'Tocantins', value: 'TO' },
    ];

    const handleEndereco = async () => {
        if (!rua || !numero || !estado || !cidade || !cep) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Por favor, preencha todos os campos obrigatórios.'
            });
            return;
        }
        try {
            const user = auth.currentUser;
            const userId = user.uid;
            await setDoc(doc(db, "CadastroEndereço", userId), {
                userId: userId,
                rua: rua,
                numero: numero,
                estado: estado,
                cidade: cidade,
                cep: cep
            });

            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Documento de endereço criado com sucesso para o usuário: ' + userId
            });

            navigation.navigate('CadastroEquipe');
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao cadastrar endereço: ' + e.message
            });
        }
    };

    const buscarCEP = async () => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;
            setRua(data.logradouro);
            setCidade(data.localidade);
            setEstado(data.uf);
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Por favor confira o CEP'
            });
        }
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ padding: 20 }}>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={styles.title}>Ache seu Endereço</Text>
                    <Text style={styles.subtitle}>Conte-nos mais sobre onde você trabalha.</Text>
                </View>
                <View style={{ marginVertical: 30 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Coloque seu CEP"
                        onChangeText={setCep}
                        placeholderTextColor={"#626262"}
                        onBlur={buscarCEP}
                        keyboardType='phone-pad'
                        maxLength={9}
                        value={cep}
                    />
                    <TextInput
                        placeholder="Nome da Rua"
                        placeholderTextColor={"#626262"}
                        onChangeText={setRua}
                        value={rua}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Número da Barbearia"
                        placeholderTextColor={"#626262"}
                        onChangeText={setNumero}
                        value={numero}
                        keyboardType="phone-pad"
                        style={styles.input}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cidade"
                        placeholderTextColor={"#626262"}
                        onChangeText={setCidade}
                        value={cidade}
                    />
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            onValueChange={setEstado}
                            items={estados}
                            placeholder={{
                                label: 'Selecione um estado...',
                                value: null,
                            }}
                            placeholderTextColor={"#626262"}
                            value={estado}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={handleEndereco} style={styles.button}>
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginVertical: 10,
        padding: 3,
    },
});
