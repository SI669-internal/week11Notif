
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [ hasPermission, setHasPermission ] = useState(false);
  const [ date, setDate ] = useState(new Date());
  const [ inputText, setInputText ] = useState('');
  console.log('current date:', date);
  console.log('current hours', date.getHours());

  useEffect(() => {
    async function getPermissions(){
      const { status } = await Notifications.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }
    getPermissions();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Notification permissions not granted.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={date}
        mode="date"
        onChange={(evt, newDate) => {
          // update Y/M/D, keep H/M          
          setDate(new Date(newDate.getFullYear(),
            newDate.getMonth(), 
            newDate.getDate(),
            date.getHours(),
            date.getMinutes()));
        }}
      />
      <DateTimePicker
        value={date}
        mode="time"
        onChange={(evt, newDate) => {
          // keep Y/M/D, update H/M
          setDate(new Date(date.getFullYear(),
            date.getMonth(), 
            date.getDate(),
            newDate.getHours(),
            newDate.getMinutes()));
        }}
      />
      <TextInput
        style={{
          width: '80%',
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          padding: '3%'
        }}
        value={inputText}
        onChangeText={(text)=>{setInputText(text)}}
        placeholder="Remind me..."
      />
      <Button
        title='Schedule Notification'
        onPress={async ()=>{
          console.log('scheduling notif for', date);
          console.log(date.getHours());
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "week11Notif",
              body: inputText,
            },
            trigger: {
              // year: date.getFullYear(),
              // month: date.getMonth(),
              // day: date.getDate(),
              // hour: date.getHours(),
              // minute: date.getMinutes()
              date: date
            }
          });
          console.log('scheduled notification for', date);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});