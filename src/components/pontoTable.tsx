import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type TableDataItem = {
  id: string;
  name: string;
  inputDate: string;
  inputTime: string;
  outputDate: string;
  outputTime: string;
};

type PointTableProps = {
  data: TableDataItem[];
};

export default function PontoTable({ data }: PointTableProps) {
  return (
    <FlatList
      data={data}
      ListHeaderComponent={() => (
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.nameColumn]}>Nome</Text>
          <Text style={[styles.tableHeaderCell, styles.dateColumn]}>Entrada</Text>
          <Text style={[styles.tableHeaderCell, styles.dateColumn]}>Saída</Text>
          <Text style={[styles.tableHeaderCell, styles.dateColumn]}>Ações</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.nameColumn]}>{item.name}</Text>
          <Text style={[styles.tableCell, styles.dateColumn]}>
            {item.inputDate} | {item.inputTime}
          </Text>
          <Text style={[styles.tableCell, styles.dateColumn]}>
            {item.outputDate} | {item.outputTime}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => alert('Remove ' + item.name)}>
              <MaterialIcons name="remove-circle-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Edit ' + item.name)}>
              <MaterialIcons name="edit" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                alert('View details of ' + item.name)
              }
            >
              <MaterialIcons name="visibility" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#0056b3',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  nameColumn: {
    flex: 1,
  },
  dateColumn: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#007bff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
});
