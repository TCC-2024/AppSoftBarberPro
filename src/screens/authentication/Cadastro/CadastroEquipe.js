import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { auth, db } from '../../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import Fonts from '../../../utils/Fonts';
import Toast from 'react-native-toast-message';

export default function CadastroEquipe({ navigation }) {

    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(true);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
    };

    const handleCheckboxChange2 = () => {
        setIsChecked(false);
        setIsChecked2(true);
        setIsChecked3(false);
        setIsChecked4(false);
    };

    const handleCheckboxChange3 = () => {
        setIsChecked(false);
        setIsChecked2(false);
        setIsChecked3(true);
        setIsChecked4(false);
    };

    const handleCheckboxChange4 = () => {
        setIsChecked(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(true);
    };

    const handleCheckEquipe = async () => {
        try {
            let equipeSize = '';
            if (isChecked) {
                equipeSize = 'Sou o único';
            } else if (isChecked2) {
                equipeSize = 'De 2 á 3';
            } else if (isChecked3) {
                equipeSize = 'De 4 á 6';
            } else if (isChecked4) {
                equipeSize = 'Acima de 6';
            }

            const user = auth.currentUser;
            const userId = user.uid;
            await setDoc(doc(db, "CadastroEquipe", userId), {
                userId: userId,
                equipeSize: equipeSize
            });
            Toast.show({
                type: 'success',
                text1: 'Sucesso ao cadastrar!',
            });
            navigation.navigate("CadastroFuncionamento");
        } catch (e) {
            console.error("Erro ao cadastrar equipe: ", e.message);
            Toast.show({
                type: 'error',
                text1: 'Erro ao cadastrar equipe:',
                text2: e.message
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ padding: 20 }}>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={styles.title}>Qual é o tamanho da sua equipe?</Text>
                    <Text style={styles.subtitle}>Conte-nos mais sobre sua equipe.</Text>
                </View>
                <View style={{ marginVertical: 30 }}>

                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity onPress={handleCheckboxChange} style={styles.checkbox}>
                            {isChecked && <Ionicons name="checkmark-circle" size={24} color="black" />}
                            {!isChecked && <Ionicons name="checkmark-circle-outline" size={24} color="black" />}
                        </TouchableOpacity>
                        <Text style={styles.checkboxLabel}>Sou o único</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity onPress={handleCheckboxChange2} style={styles.checkbox}>
                            {isChecked2 && <Ionicons name="checkmark-circle" size={24} color="black" />}
                            {!isChecked2 && <Ionicons name="checkmark-circle-outline" size={24} color="black" />}
                        </TouchableOpacity>
                        <Text style={styles.checkboxLabel}>De 2 á 3</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity onPress={handleCheckboxChange3} style={styles.checkbox}>
                            {isChecked3 && <Ionicons name="checkmark-circle" size={24} color="black" />}
                            {!isChecked3 && <Ionicons name="checkmark-circle-outline" size={24} color="black" />}
                        </TouchableOpacity>
                        <Text style={styles.checkboxLabel}>De 4 á 6</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity onPress={handleCheckboxChange4} style={styles.checkbox}>
                            {isChecked4 && <Ionicons name="checkmark-circle" size={24} color="black" />}
                            {!isChecked4 && <Ionicons name="checkmark-circle-outline" size={24} color="black" />}
                        </TouchableOpacity>
                        <Text style={styles.checkboxLabel}>Acima de 6</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleCheckEquipe} style={styles.button}>
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontFamily: Fonts["poppins-regular"],
        fontSize: 14,
        color: '#333',
    },
});
