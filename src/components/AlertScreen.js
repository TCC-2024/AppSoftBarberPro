import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AlertScreen({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#00ef81' }}>
            <View style={styles.container}>
                <View style={styles.alert}>
                    <View style={styles.alertContent}>
                        <View style={styles.alertTop}>
                            <AntDesign
                                name="checkcircleo"
                                size={16}
                                color="#fff"
                            />
                            <Text style={styles.alertTopText}>Tudo feito!</Text>
                        </View>
                        <Text style={styles.alertTitle}>Sua Barbearia foi criada!</Text>
                        <Text style={styles.alertMessage}>
                            Obrigado por apoiar o SoftBarberPro!
                            {'\n'}
                            Estamos ansiosos para ajudar você!
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>CONTINUAR</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    alert: {
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    alertContent: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    alertTop: {
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertTopText: {
        fontSize: 17,
        fontWeight: '500',
        marginLeft: 4,
        color: '#fff',
        textAlign: 'center',
    },
    alertTitle: {
        fontSize: 32,
        lineHeight: 44,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
    },
    alertMessage: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 36,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    btnText: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: '600',
        color: '#000',
    },
});
