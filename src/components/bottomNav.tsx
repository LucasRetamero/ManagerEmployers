import { StyleSheet, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export function BottomNav() {
  
  return (
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push({pathname: '/', params: {}})}>
          <MaterialIcons name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({pathname: '/ponto/edition/[id]', params: { id: 0}})}>
          <MaterialIcons name="timer" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({pathname: "/funcao/[id]", params:{ id: 0}})}>
          <MaterialIcons name="work" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({pathname: "/colaborador/edition/[id]", params: { id: 0} })}>
          <FontAwesome name="user-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>
  );

  
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007BFF',
    paddingVertical: hp('1%'),
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    // Ensure it is above any potential content or padding from other screens
  },
});