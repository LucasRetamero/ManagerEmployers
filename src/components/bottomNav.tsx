import { StyleSheet, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
        <TouchableOpacity onPress={() => router.push({pathname: '/', params: {}})}>
          <MaterialIcons name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({pathname: '/ponto/ponto-form-view', params: {}})}>
          <MaterialIcons name="timer" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({pathname: "/funcao/[id]", params:{ id: 0}})}>
          <MaterialIcons name="work" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: "/colaborador/colaborador-form-view", params: {} })}>
          <FontAwesome name="user-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>
  );
}
