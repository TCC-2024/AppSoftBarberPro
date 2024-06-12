import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import Fonts from '../../../utils/Fonts';

const Tab = createMaterialTopTabNavigator();

export default function Agenda() {
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const monthsOfYear = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const totalDaysInMonth = getDaysInMonth(date);

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <Tab.Screen
        key={day}
        name={day}
        component={DayScreen}
        options={{ tabBarLabel: () => <Text style={styles.tabLabel}>{day}</Text> }}
      />
    ));
  };

  const previousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const DayScreen = ({ route }) => {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.hoursColumn}>
            {renderHours()}
          </View>
          <View style={styles.taskContainer}>
            <View style={styles.taskCard}>
              <Text style={styles.taskText}>Cortar Cabelo - Adriano</Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <Text>{route.params?.name}</Text>
        </View>
      </View>
    );
  };

  const renderHours = () => {
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      hours.push(
        <View key={hour} style={styles.hourContainer}>
          <Text style={styles.hourText}>{hour < 10 ? `0${hour}:00` : `${hour}:00`}</Text>
        </View>
      );
    }
    return hours;
  };

  const toggleMonthSelector = () => {
    setShowMonthSelector(!showMonthSelector);
  };

  const selectMonth = (month) => {
    setDate(new Date(date.getFullYear(), month, 1));
    setShowMonthSelector(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar translucent={false} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={previousMonth}>
            <AntDesign name="left" size={24} style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMonthSelector}>
            <Text style={styles.headerText}>{`${monthsOfYear[date.getMonth()]} ${date.getFullYear()}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextMonth}>
            <AntDesign name="right" size={24} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Tab.Navigator>
            {renderDaysOfWeek()}
          </Tab.Navigator>
        </View>
      </View>
      <Modal visible={showMonthSelector} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.monthSelector}>
            {monthsOfYear.map((month, index) => (
              <TouchableOpacity key={index} onPress={() => selectMonth(index)}>
                <Text style={styles.monthOption}>{month}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button title="Fechar" onPress={toggleMonthSelector} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts['poppins-bold']
  },
  arrow: {
    fontWeight: 'bold',
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: Fonts['poppins-regular']
  },
  hoursColumn: {
    width: 50,
    backgroundColor: '#f0f0f0',
    marginRight: -15,
    paddingTop: 10,
    alignItems: 'center',
  },
  hourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  hourText: {
    fontSize: 12,
    fontFamily: Fonts['poppins-regular'],
    marginBottom: 10,
  },
  taskContainer: {
    position: 'absolute',
    left: 70,
    textAlign: 'center'
  },
  taskCard: {
    width: 200,
    marginBottom: 10,
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 12,
  },
  scrollView: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  monthSelector: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  monthOption: {
    fontSize: 18,
    paddingVertical: 10,
  },
});
