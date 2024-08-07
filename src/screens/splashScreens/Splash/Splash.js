import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { auth } from '../../../config/firebaseConfig';
import { colors } from '../../../utils/Colors';

export default function Splash({ navigation }) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            const unsubscribe = onAuthStateChanged(auth, user => {
                if (user) {
                    navigation.replace('RoutesTab');
                } else {
                    navigation.replace('OnBoarding');
                }
            });
            return () => unsubscribe();
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.image} />
            <ActivityIndicator size="large" color="#d0ac4b" style={styles.loader} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    image: {
        width: 450,
        height: 450,
        resizeMode: 'contain',
    },
    loader: {
        position: 'absolute',
        bottom: 190,
    },
});