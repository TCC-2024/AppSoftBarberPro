import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Fonts from '../../../utils/Fonts'


export default function OnBoarding({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { marginTop: 90 }]}>
          <Image source={require('../../../assets/images/logosf.png')} style={styles.image} />
        </View>
      </View>
      <View style={{ marginBottom: 60 }}>
        <View style={{ paddingHorizontal: 10, paddingTop: 10 * 6 }}>
          <Text style={{ fontSize: 28, color: '#000', fontFamily: Fonts["poppins-bold"], textAlign: "center" }}>
            Otimize a gestão das {"\n"}suas barbearias
          </Text>
        </View>
        <View style={{
          paddingHorizontal: 10 * 4,
        }}>

          <Text style={{ fontSize: 14, color: '#000', fontFamily: Fonts["poppins-regular"], textAlign: "center", marginTop: 10 * 2 }}>
            Aproveite todas as oportunidades para fazer das suas barbearias destaques em atendimento e estilo.
          </Text>
          <View style={{ paddingHorizontal: 10 * 1, paddingTop: 10 * 3 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ backgroundColor: '#000', padding: 6 * 2.0, borderRadius: 10 }}>
              <Text style={{ fontFamily: Fonts["poppins-bold"], color: '#fff', fontSize: 18, textAlign: 'center' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} style={{ paddingTop: 15 }}>
              <Text style={{ fontFamily: Fonts['poppins-regular'], fontSize: 14, textAlign: 'center' }}>Não tem uma conta? <Text style={{ textDecorationLine: 'underline' }}>Cadastre-se</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 450,
    height: 450,
    resizeMode: 'contain',
  },
})