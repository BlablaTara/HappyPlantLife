import React, { useState } from 'react';
import { View, Text, Modal, FlatList, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const PlantCalendar = ({ markedDates, onDayPress, selectedDate, plantsForSelectedDate }) => {
  return (
    <View>
      <Calendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          selectedDayBackgroundColor: '#156130',
          todayTextColor: '#00adf5',
          arrowColor: '#156130',
        }}
      />
      {selectedDate && (
        <Modal visible={true} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Planter der skal vandes den {selectedDate}</Text>
              <FlatList
                data={plantsForSelectedDate}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.plantName}>{item}</Text>}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  plantName: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default PlantCalendar;
