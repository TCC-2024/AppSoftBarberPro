import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, SafeAreaView, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../../../config/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import RNPickerSelect from 'react-native-picker-select';
import Fonts from '../../../utils/Fonts';

export default function CadastroServicos({ navigation }) {

    const [servicos, setServicos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [servico, setServico] = useState('');
    const [duracao, setDuracao] = useState('');
    const [valor, setValor] = useState('');

    const handleExcluirServico = (index) => {
        const novosServicos = [...servicos];
        novosServicos.splice(index, 1);
        setServicos(novosServicos);
    };


    const formatarValor = (value) => {
        const numeralValue = value.replace(/[^\d]/g, '');
        const parts = [];
        for (let i = numeralValue.length; i > 0; i -= 2) {
            parts.unshift(numeralValue.substring(Math.max(0, i - 2), i));
        }
        const formattedValue = parts.join(',');
        return formattedValue;
    };

    const adicionarServico = () => {
        if (servico !== '' && duracao !== '' && valor !== '') {
            const novoServico = { servico, duracao, valor };
            setServicos([...servicos, novoServico]);
            setModalVisible(false);
            setServico('');
            setDuracao('');
            setValor('');
            Toast.show({
                type: 'success',
                text1: 'Serviço adicionado com sucesso!',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Por favor, preencha todos os campos.',
            });
        }
    };

    const handleServico = async () => {
        try {
            const user = auth.currentUser;
            const userId = user.uid;

            await setDoc(doc(db, "CadastroServiços", userId), {
                userId: userId,
                servicos: servicos,
            });
            Toast.show({
                type: 'success',
                text1: 'Sucesso ao cadastrar!',
            });
            navigation.navigate('AlertScreen');
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao cadastrar serviço',
                text2: e.message,
            });
        }
    };

    const horarios = [
        { label: '30 minutos', value: '30 minutos' },
        { label: '1 hora', value: '1 hora' },
        { label: '1 hora e 30 minutos', value: '1 hora e 30 minutos' },
        { label: '2 horas', value: '2 horas' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={styles.title}>Adicione seus Serviços</Text>
                        <Text style={styles.subtitle}>Conte-nos mais sobre sua equipe.</Text>
                    </View>
                    <View style={{ marginVertical: 30 }}>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <AntDesign name="plus" size={20} color="#000" />
                            <Text style={styles.buttonText1}>Adicionar Serviço</Text>
                        </TouchableOpacity>

                        <Modal
                            animationType="slide"
                            statusBarTranslucent
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nome do Serviço"
                                            onChangeText={setServico}
                                            value={servico}
                                        />
                                        <AntDesign name="tagso" size={20} color="#333" style={styles.icon} />
                                    </View>
                                    <View style={styles.pickerContainer}>
                                        <RNPickerSelect
                                            onValueChange={setDuracao}
                                            items={horarios}
                                            placeholder={{
                                                label: 'Selecione a duração',
                                                value: null,
                                            }}
                                            value={duracao}
                                            useNativeAndroidPickerStyle={false}
                                            Icon={() => {
                                                return <AntDesign name="clockcircleo" size={20} color="#333" style={styles.icon} />;
                                            }}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.currencySymbol}>R$</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Valor"
                                            onChangeText={(value) => setValor(formatarValor(value))}
                                            value={valor}
                                            keyboardType="numeric"
                                        />
                                        <AntDesign name="creditcard" size={20} color="#333" style={styles.icon} />
                                    </View>
                                    <TouchableOpacity style={styles.button} onPress={adicionarServico}>
                                        <Text style={styles.buttonText}>Adicionar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <View style={styles.servicosContainer}>
                            {servicos.map((servico, index) => (
                                <View key={index} style={styles.card}>
                                    <View style={styles.servicoDetailRow}>
                                        <AntDesign name="tagso" size={24} color="black" style={styles.servicoDetailIcon1} />
                                        <Text style={styles.servicoDetailText}>Serviço: {servico.servico}</Text>
                                    </View>
                                    <View style={styles.servicoDetailRow}>
                                        <AntDesign name="clockcircleo" size={18} color="black" style={styles.servicoDetailIcon} />
                                        <Text style={styles.servicoDetailText}>Duração: {servico.duracao}</Text>
                                        <View style={styles.iconContainer}>
                                            <View style={styles.iconSeparator} />
                                            <TouchableOpacity onPress={() => handleExcluirServico(index)}>
                                                <AntDesign name="delete" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.servicoDetailRow}>
                                        <AntDesign name="creditcard" size={18} color="black" style={styles.servicoDetailIcon} />
                                        <Text style={styles.servicoDetailText}>Valor: {servico.valor}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity onPress={handleServico} style={styles.button}>
                            <Text style={styles.buttonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: '#000',
        fontFamily: Fonts["poppins-bold"],
        marginVertical: 30,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: Fonts["poppins-regular"],
        marginTop: -20,
        fontSize: 15,
        maxWidth: "80%",
        textAlign: 'center',
        color: '#848484',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },
    currencySymbol: {
        fontSize: 14,
        fontFamily: Fonts["poppins-regular"],
        marginRight: 5,
    },
    input: {
        flex: 1,
        fontFamily: Fonts["poppins-regular"],
        fontSize: 14,
    },
    icon: {
        marginLeft: 10,
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
    button1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 20,
    },
    buttonText1: {
        fontFamily: Fonts["poppins-regular"],
        color: '#000',
        fontSize: 16,
        marginLeft: 10,
        marginBottom: -4,
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    label: {
        marginBottom: 5,
        color: '#000',
        fontSize: 18,
        fontWeight: '300',
    },
    card: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    servicoDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    servicoDetailText: {
        fontSize: 12,
        fontFamily: Fonts['poppins-regular']
    },
    servicoDetailIcon: {
        marginRight: 8,
    },
    servicoDetailIcon1: {
        marginRight: 2,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },
});