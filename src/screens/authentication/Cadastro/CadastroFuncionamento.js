import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import { auth, db } from '../../../config/firebaseConfig';
import Fonts from '../../../utils/Fonts';

export default function CadastroFuncionamento({ navigation }) {
    const [horarios, setHorarios] = useState({
        segunda: { inicio: null, fim: null },
        terca: { inicio: null, fim: null },
        quarta: { inicio: null, fim: null },
        quinta: { inicio: null, fim: null },
        sexta: { inicio: null, fim: null },
        sabado: { inicio: null, fim: null },
        domingo: { inicio: null, fim: null },
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentDay, setCurrentDay] = useState('');
    const [currentType, setCurrentType] = useState('');

    const showDatePicker = (day, type) => {
        setCurrentDay(day);
        setCurrentType(type);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setHorarios({
            ...horarios,
            [currentDay]: {
                ...horarios[currentDay],
                [currentType]: date,
            },
        });
        hideDatePicker();
    };

    const handleHorarios = async () => {
        if (Object.values(horarios).some(horario => !horario.inicio || !horario.fim)) {
            Toast.show({
                type: 'info',
                text1: 'Por favor, preencha todos os horários.',
            });
            return;
        }

        try {
            const user = auth.currentUser;
            const userId = user.uid;
            await setDoc(doc(db, "CadastroHorarios", userId), {
                userId: userId,
                horarios: horarios
            });
            Toast.show({
                type: 'success',
                text1: 'Sucesso ao cadastrar!',
            });
            navigation.navigate('CadastroServicos');
        } catch (e) {
            console.error("Erro ao cadastrar horários: ", e.message);
            Toast.show({
                type: 'error',
                text1: 'Erro ao cadastrar horários:',
                text2: e.message
            });
        }
    };

    const formatTime = (time) => {
        if (!time) return 'Início';
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    const renderHorarioPicker = (day) => (
        <View style={styles.horarioContainer} key={day}>
            <Text style={styles.label}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
            <View style={styles.pickerRow}>
                <TouchableOpacity onPress={() => showDatePicker(day, 'inicio')}>
                    <Text style={styles.pickerText}>
                        {formatTime(horarios[day].inicio)}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.ate}>até</Text>
                <TouchableOpacity onPress={() => showDatePicker(day, 'fim')}>
                    <Text style={styles.pickerText}>
                        {formatTime(horarios[day].fim)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={styles.title}>Defina os Hórarios</Text>
                        <Text style={styles.subtitle}>Informe os horários de funcionamento.</Text>
                    </View>
                    <View style={{ marginVertical: 30 }}>
                        {['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'].map(renderHorarioPicker)}
                        <TouchableOpacity onPress={handleHorarios} style={styles.button}>
                            <Text style={styles.buttonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
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
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    pickerText: {
        fontSize: 16,
        color: '#333',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: 20,
        flex: 1,
    },
    ate: {
        marginHorizontal: 0,
        fontSize: 16,
    },
    horarioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: '300',
        marginRight: -200,
        flex: 1,
    },
});
