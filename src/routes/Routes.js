import React from "react";
import { StyleSheet, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../screens/authentication/Login/Login";
import Cadastro from "../screens/authentication/Cadastro/Cadastro";
import OnBoarding from "../screens/authentication/OnBoarding/OnBoarding";
import CadastroBarbearia from "../screens/authentication/Cadastro/CadastroBarbearia";
import CadastroEndereco from "../screens/authentication/Cadastro/CadastroEndereco";
import CadastroEquipe from "../screens/authentication/Cadastro/CadastroEquipe";
import CadastroFuncionamento from "../screens/authentication/Cadastro/CadastroFuncionamento";
import CadastroServicos from "../screens/authentication/Cadastro/CadastroServicos";
import AlertScreen from "../components/AlertScreen";
import Splash from "../screens/splashScreens/Splash/Splash";
import Recuperar from "../screens/authentication/Login/RecoverPdassword/Recuperar";
import Agenda from "../screens/appScreens/Agenda/Agenda";
import Perfil from "../screens/appScreens/Perfil/Perfil";
import Fonts from "../utils/Fonts";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Recuperar" component={Recuperar} />
      <Stack.Screen name="CadastroBarbearia" component={CadastroBarbearia} />
      <Stack.Screen name="CadastroEndereco" component={CadastroEndereco} />
      <Stack.Screen name="CadastroEquipe" component={CadastroEquipe} />
      <Stack.Screen name="CadastroFuncionamento" component={CadastroFuncionamento} />
      <Stack.Screen name="CadastroServicos" component={CadastroServicos} />
      <Stack.Screen name="AlertScreen" component={AlertScreen} />
      <Stack.Screen name="RoutesTab" component={RoutesTab} />

    </Stack.Navigator>
  );
}

function RoutesTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
        headerShown: false,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === 'ios' && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          },
        ],
        tabBarItemStyle: {
          marginBottom: 4,
          marginTop: 10
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#000',
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <Tab.Screen
        name="Agenda"
        component={Agenda}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="calendar"
              size={24}
              color={focused ? '#000' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="appstore-o"
              size={21}
              color={focused ? '#000' : 'gray'}
            />
          ),
        }}
        name="Perfil"
        component={Perfil}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    height: 60,
  },
  label: {
    textTransform: 'capitalize',
    fontFamily: Fonts['poppins-regular'],
    fontSize: 12,
  },
});