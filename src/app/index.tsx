import React, { useEffect, useState } from 'react';
import { Input } from '@/components/input';
import { StyleSheet,View, Button, Alert, FlatList, Text, TouchableOpacity  } from 'react-native';
import { router } from "expo-router";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';

export default function index(){

    return (
      <View style={styles.container}>
      {/* Header */}
      <Header/>
      {/* Buttons in Rows */}
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/colaborador/colaborador-view") }>
          <FontAwesome name="user-circle" size={30} color="white" />
          <Text style={styles.buttonText}>Colaborades</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: "/ponto/ponto-view", params: {}})}>
          <FontAwesome name="clock-o" size={30} color="white" />
          <Text style={styles.buttonText}>Ponto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Feature Comming Soon !")}>
          <FontAwesome name="file-text" size={30} color="white" />
          <Text style={styles.buttonText}>Relatório</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: "/funcao/funcao-view", params: {} })}>
          <FontAwesome name="briefcase" size={30} color="white" />
          <Text style={styles.buttonText}>Funções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Feature Comming Soon !")}>
          <FontAwesome name="bar-chart" size={30} color="white" />
          <Text style={styles.buttonText}>Gráficos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Feature Comming Soon !")}>
          <FontAwesome name="database" size={30} color="white" />
          <Text style={styles.buttonText}>Sistema</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNav/>
    </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 40,
    textAlign: 'left',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    margin: 30,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007BFF',
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});