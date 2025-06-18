import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState('');
  const router = useRouter();
  const user = auth().currentUser;

  const handleAdicionar = async () => {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Digite um título para a tarefa');
      return;
    }

    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    try {
      await firestore().collection('tarefas').add({
        titulo: titulo.trim(),
        userId: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Sucesso', 'Tarefa adicionada!');
      router.back();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a tarefa');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <Button title="Adicionar Tarefa" onPress={handleAdicionar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});