import React, { useEffect, useState } from 'react';
import { Input } from '@/components/input';
import {
  StyleSheet,
  View,
  Button,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { router } from "expo-router";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function index() {

  //Get Screen size
  const windowW = Dimensions.get('window').width
  const windowH = Dimensions.get('window').height

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />
      {/* Buttons in Rows */}
      <View style={styles.button}>
      <FontAwesome.Button name="user-circle" size={30}  backgroundColor="#007BFF" onPress={() => router.push("/colaborador/colaborador-view")}>
       Colaboradores
      </FontAwesome.Button>
      </View>
      
      <View style={styles.button}>
      <FontAwesome.Button name="clock-o" size={30}  backgroundColor="#007BFF" onPress={() => router.push({ pathname: "/ponto/ponto-view" })}>
       Ponto
      </FontAwesome.Button>
      </View>
      
      <View style={styles.button}>
      <FontAwesome.Button name="briefcase" size={30} backgroundColor="#007BFF" onPress={() => router.push({ pathname: "/funcao/funcao-view"})}>
       Funções
      </FontAwesome.Button>
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNav />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  rowContainer: {
    justifyContent: 'center',
    marginLeft: wp('4%'),
    marginBottom: hp('1%'),
  },
  button: {
   marginBottom: hp('2%'),
  },

  buttonText: {
    color: 'white',
    fontSize: hp('3%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
});