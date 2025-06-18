import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LoggedUserProps {
  email: string;
  onLogout: () => void;
}

const LoggedUser: React.FC<LoggedUserProps> = ({ email, onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.email}>Logado como: {email}</Text>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoggedUser;