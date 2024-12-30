import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput, 
  TouchableOpacity,
   Modal, 
   Text, 
   Alert, 
   StyleSheet, 
   FlatList,
   ScrollView
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Header from '@/components/header';
import { BottomNav } from '@/components/bottomNav';
import { router } from 'expo-router';
import { useFuncaoDatabase, FuncaoDatabase } from '@/database/useFuncaoDatabase';

export default function FuncaoView() {

  //Modal to show or hide
  const [modalVisible, setModalVisible] = useState(false);
  // ID from table
  const [id, setId] = useState(0);
  //Search Variable
  const [search, setSearch] = useState('');
  //Table
  const [funcao, setFuncao] = useState<FuncaoDatabase[]>([]);
  //Manager the database
  const funcaoDatabase = useFuncaoDatabase();
  

  //Get List from database
  async function list() {
    try {
      const response = await funcaoDatabase.searchByNome(search);
      setFuncao(response);
    } catch (error) {
      console.error("Error to get a funcao:", error);
    }
  }

  //Remove data by id from database
  async function remove() {
    try {
      await funcaoDatabase.remove(id);
      await list();
      setId(0);
      setModalVisible(false);
    } catch (error) {
      console.log(error)
    }
  }

  function confirmDeletion(id: number){
     setModalVisible(true);
     setId(id);
  }

  useEffect(() => {
    list()
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entre com a pesquisa"
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          data={funcao}
          renderItem={({ item }) => (
             <ScrollView>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.nome}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => confirmDeletion(item.id)}>
                  <MaterialIcons name="remove-circle-outline" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "/funcao/[id]", params: { id: item.id } })}>
                  <MaterialIcons name="edit" size={24} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
            </ScrollView>
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </View>

        {/* Custom Confirmation Modal */}
        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={ () => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text style={styles.modalMessage}>Deseja realmente remover essa função ? </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={ () => setModalVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={remove}
                style={[styles.button, styles.confirmButton]}
              >
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Example background color
  },
  content: {
    flex: 1, // Takes up the available space
    padding: 16, // Padding applied to content only
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    flex: 1,
    borderWidth: 1,        // Border width
    borderColor: '#007bff', // Blue border color
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'white', // White background for rows
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light gray border
    alignItems: 'center', // Align content vertically
  },
  tableCell: {
    flex: 2, // Adjust column width
    fontSize: 18,
    color: '#007BFF', // Blue text color
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'blue',
  },
  confirmButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});