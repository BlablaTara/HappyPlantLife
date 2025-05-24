import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";

const PlantCalendar = ({
  markedDates,
  onDayPress,
  selectedDate,
  setSelectedDate,
  plantsForSelectedDate,
}) => {
  return (
    <View>
      <Calendar
        hideArrows={false}
        enableSwipeMonths={true}
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          selectedDayBackgroundColor: "#156130",
          selectedDayTextColor: "#fff",
          todayBackgroundColor: "#156130",
          todayTextColor: "#fff",
          arrowColor: "#156130",
          dotColor: "#156130",
          textDayFontWeight: "bold",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "bold",
        }}
        style={styles.calendar}
      />

      {selectedDate && (
        <Modal
          transparent
          animationType="slide"
          visible={true}
          onRequestClose={() => setSelectedDate(null)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Planter der skal vandes:</Text>
              <FlatList
                data={plantsForSelectedDate}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.plantItem}>💧 {item}</Text>
                )}
              />
              <TouchableOpacity
                onPress={() => setSelectedDate(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Luk</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 30,
    paddingBottom: 10,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  plantItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#156130",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PlantCalendar;
