
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [ hasPermission, setHasPermission ] = useState(false);

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
      <Button
        title='Schedule Notification (15s)'
        onPress={async ()=>{
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "week12Notif",
              body: "Here is your notification!",
            },
            trigger: {
              seconds: 15
            }
          })
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