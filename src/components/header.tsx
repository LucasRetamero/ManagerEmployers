import { View, Text, StyleSheet } from "react-native";

export default function Header() {

  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#FFF', // White background for the header
      paddingVertical: 20, // Adds vertical padding to make it taller
      flexDirection: 'row', // Ensures the text and border are in a row
      alignItems: 'center', // Vertically aligns the text and border
    },
    border: {
      width: 5, // Thickness of the left border
      height: '100%', // Full height of the header
      backgroundColor: '#007bff', // Blue border color
      marginLeft: 10, // Adds some space between the border and the text
    },
    text: {
      color: '#007bff', // Blue text color
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 10, // Adds space between the left border and the text
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.border}></View>
      <Text style={styles.text}>CRM Manager</Text>
    </View>
  );
}
