import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface Props {
  onPress: () => void;
}

const AddButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default AddButton;