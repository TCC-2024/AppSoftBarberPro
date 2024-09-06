import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore'; // Assegure-se de ter a versão correta do Firebase SDK
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { db } from '../../../config/firebaseConfig';

export default function Perfil() {
  const [nomeUser, setNomeUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [telefoneUser, setTelefoneUser] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userDoc = doc(db, 'UsersBarbeiros', user.uid);

      const unsubscribe = onSnapshot(userDoc, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setNomeUser(userData.nome);
          setEmailUser(userData.email);
          setTelefoneUser(userData.telefone);
          setImage(userData.imageURL);
          setLoading(false);
        } else {
          console.log('No such document!');
          setLoading(false);
        }
      });

      return () => unsubscribe();
    } else {
      setLoading(false); // Caso o usuário não esteja autenticado
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.logo}
          />
        ) : (
          <View style={styles.logoPlaceholder} />
        )}
        <Text style={styles.shopName}>{nomeUser}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.title}>Perfil do Estabelecimento</Text>
        <Text style={styles.description}>Email: {emailUser}</Text>
        <Text style={styles.description}>Telefone: {telefoneUser}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 75,
  },
  logoPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#ddd',
    borderRadius: 75,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileInfo: {
    alignItems: 'center', // Centraliza horizontalmente
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});
