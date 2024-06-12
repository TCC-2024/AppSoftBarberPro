import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.logo}
        />
        <Text style={styles.shopName}>Barbearia do João</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.title}>Perfil do Estabelecimento</Text>
        <Text style={styles.description}>
          A Barbearia do João oferece cortes de cabelo e barba de alta qualidade. Nossos barbeiros são experientes e dedicados a proporcionar uma ótima experiência aos nossos clientes.
        </Text>
        <Text style={styles.subtitle}>Horário de Funcionamento</Text>
        <Text style={styles.description}>
          Segunda a Sexta: 09:00 - 19:00
          {'\n'}
          Sábado: 09:00 - 16:00
          {'\n'}
          Domingo: Fechado
        </Text>
        <Text style={styles.subtitle}>Localização</Text>
        <Text style={styles.description}>
          Rua das Barbas, 123 - Centro
          {'\n'}
          Cidade Bela, Estado XPTO
        </Text>
        <Text style={styles.subtitle}>Contato</Text>
        <Text style={styles.description}>
          Telefone: (XX) XXXX-XXXX
          {'\n'}
          Email: contato@barbeariadojoao.com
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});
