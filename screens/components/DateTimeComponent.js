import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

const DateTimePickerComponentTest = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date and Time:</Text>
      <DatePicker
        style={styles.datePicker}
        date={selectedDate}
        mode="datetime"
        placeholder="Select date and time"
        format="YYYY-MM-DD HH:mm"
        minDate="2021-01-01"
        maxDate="2023-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
            borderWidth: 0,
          },
          dateText: {
            fontSize: 18,
          },
          placeholderText: {
            fontSize: 18,
          },
        }}
        onDateChange={(date) => setSelectedDate(date)}
      />
      <Text style={styles.selectedDateText}>
        Selected Date and Time: {selectedDate.toString()}
      </Text>
      <Button
        title="Clear"
        onPress={() => setSelectedDate(new Date())}
        color="#FF5733"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  selectedDateText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default DateTimePickerComponentTest;
