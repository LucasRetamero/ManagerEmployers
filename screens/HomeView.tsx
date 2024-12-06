import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HomeView = () => {
  return (
    <View style={styles.container}>
      <Text> Look at me !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default HomeView;