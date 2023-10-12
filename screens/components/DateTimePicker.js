import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { themeColors } from "../../styles/base";

export default function DateTimePickerComponent({ formData, setFormData, type }) {
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setFormData({ ...formData, eventStart: currentDate });

  };

  return (
    <View>
      <RNDateTimePicker testID="dateTimePicker"
        value={date}
        themeVariant="light"
        textColor="red"
        mode="date"
        minimumDate={new Date()}
        style={{ backgroundColor: 'white' }}
        accentColor={themeColors.primary || undefined}
        negativeButton={{ label: 'Cancel', textColor: themeColors.primary }}
        onChange={onChange} />
    </View>
  );
}
