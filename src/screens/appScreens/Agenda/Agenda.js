import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

export default function Calendario() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  const data = [
    { id: '1', name: 'Calendário', route: 'calendário' },
    { id: '2', name: 'Perfil', route: 'perfil' },
    { id: '3', name: 'Home', route: 'home' },
    { id: '4', name: 'Adote', route: 'adote' },
    { id: '5', name: 'Adicionar Pet', route: 'AdicionarPet' },
    { id: '6', name: 'Meus Pets', route: 'Pets' },
    { id: '7', name: 'Chats', route: 'ChatList' },
  ];

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  const handleDayPress = (day) => {
    // Ações a serem realizadas ao pressionar um dia, se necessário
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput
          placeholder="Buscar..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />
      </View>
      {searchTerm.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleNavigation(item.route)}
            >
              <Text style={styles.suggestionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{}} // Marcar datas conforme necessário
        theme={{
          arrowColor: "#593C9D",
          monthTextColor: "#593C9D",
          textSectionTitleColor: "#593C9D",
          selectedDayBackgroundColor: "#593C9D",
          todayTextColor: "#593C9D",
          textDayFontWeight: "bold",
          textMonthFontWeight: "bold",
          textDayHeaderFontSize: 14,
          textMonthFontSize: 16,
        }}
      />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventText}>{item.type} - {item.date}</Text>
          </View>
        )}
        contentContainerStyle={[styles.eventList, { paddingBottom: 90 }]}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.listHeader}>Seus Eventos</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#593C9D',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginLeft: 5,
    marginTop: 25,
  },
  suggestionItem: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  eventContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  eventText: {
    fontSize: 16,
    color: "#333",
  },
  listHeader: {
    fontSize: 22,
    color: "#593C9D",
    marginLeft: 10,
  },
});

