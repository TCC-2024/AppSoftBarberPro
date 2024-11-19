import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function Agenda({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(""); // Data selecionada no calendário
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Dados do agendamento selecionado
  const [isModalVisible, setModalVisible] = useState(false); // Controle do modal

  const appointments = [
    {
      id: "1",
      date: "2024-11-20",
      time: "08:00",
      client: "João Silva",
      service: "Corte de Cabelo",
      price: "R$ 50,00",
    },
    {
      id: "2",
      date: "2024-11-20",
      time: "13:00",
      client: "André Oliveira",
      service: "Barba e Corte",
      price: "R$ 70,00",
    },
    {
      id: "3",
      date: "2024-11-21",
      time: "18:00",
      client: "Pedro Santos",
      service: "Corte de Cabelo",
      price: "R$ 60,00",
    },
  ];

  const appointmentsByDate = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>

      {/* Calendário */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#D0AC4B" },
        }}
        theme={{
          todayTextColor: "#D0AC4B",
          selectedDayBackgroundColor: "#D0AC4B",
          arrowColor: "#D0AC4B",
        }}
      />

      {/* Lista de agendamentos para a data selecionada */}
      {selectedDate && appointmentsByDate.length > 0 ? (
        <FlatList
          data={appointmentsByDate}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.appointmentItem}
              onPress={() => openModal(item)}
            >
              <Text style={styles.clientName}>{item.client}</Text>
              <Text style={styles.appointmentDateTime}>
                {item.time} - {item.service}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noAppointments}>
          {selectedDate
            ? "Nenhum agendamento para essa data."
            : "Selecione uma data no calendário."}
        </Text>
      )}

      {/* Modal para exibir informações detalhadas */}
      {selectedAppointment && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalhes do Agendamento</Text>
              <ScrollView>
                <Text style={styles.modalText}>
                  Cliente: {selectedAppointment.client}
                </Text>
                <Text style={styles.modalText}>
                  Serviço: {selectedAppointment.service}
                </Text>
                <Text style={styles.modalText}>
                  Data: {selectedAppointment.date}
                </Text>
                <Text style={styles.modalText}>
                  Hora: {selectedAppointment.time}
                </Text>
                <Text style={styles.modalText}>
                  Valor: {selectedAppointment.price}
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
    textAlign: "center",
  },
  appointmentItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D0AC4B",
    elevation: 4,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  appointmentDateTime: {
    fontSize: 14,
    color: "#666",
  },
  noAppointments: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#D0AC4B",
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});