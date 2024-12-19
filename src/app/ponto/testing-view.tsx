import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns-tz';

const BRAZILIAN_TIMEZONE = 'America/Sao_Paulo';

export default function App() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatToBrazilianTime = (date: Date): string => {
    return format(date, 'dd-MM-yyyy HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE });
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      // Update only the date portion
      selectedDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setSelectedDateTime(new Date(selectedDateTime));
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    if (event.type === 'set' && time) {
      // Update only the time portion
      selectedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setSelectedDateTime(new Date(selectedDateTime));
    }
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Date and Time</Text>
      <Text style={styles.dateTimeText}>
        Brazilian Time: {formatToBrazilianTime(selectedDateTime)}
      </Text>

      {/* Open Date Picker */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      {/* Open Time Picker */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.buttonText}>Select Time</Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDateTime}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedDateTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
