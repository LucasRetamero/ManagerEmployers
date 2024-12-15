import { StyleSheet, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export function BottomNav() {
  const styles = StyleSheet.create({
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#007BFF',
      paddingVertical: 20,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      // Ensure it is above any potential content or padding from other screens
    },
  });

  return (
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => Alert.alert("Going to HOME")}>
          <MaterialIcons name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Going to Ponto")}>
          <MaterialIcons name="timer" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Going to relatorio")}>
          <MaterialIcons name="bar-chart" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Going to colaboradores")}>
          <FontAwesome name="user-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>
  );
}
