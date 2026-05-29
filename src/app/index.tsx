import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function HomeScreen() {
  const [inputNome, setInputNome] = useState('');
  const [inputCapital, setInputCapital] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Consulta de Países 🌍</Text>

      {/* Bloco 1: Busca por Nome */}
      <View style={styles.cardBusca}>
        <Text style={styles.subtitulo}>Buscar por Nome</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite o nome (Ex: Brasil, Japan)..." 
          value={inputNome}
          onChangeText={setInputNome}
          placeholderTextColor="#888"
        />
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => Alert.alert('Aviso', 'A busca por nome será implementada no próximo commit.')}
        >
          <Text style={styles.textBotao}>Buscar por Nome</Text>
        </TouchableOpacity>
      </View>

      {/* Bloco 2: Busca por Capital */}
      <View style={styles.cardBusca}>
        <Text style={styles.subtitulo}>Buscar por Capital</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite a capital (Ex: Paris, Tokyo)..." 
          value={inputCapital}
          onChangeText={setInputCapital}
          placeholderTextColor="#888"
        />
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => Alert.alert('Aviso', 'A busca por capital será implementada em breve.')}
        >
          <Text style={styles.textBotao}>Buscar por Capital</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: '#f4f7f6', alignItems: 'center', minHeight: '100%' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50', marginBottom: 25 },
  cardBusca: { width: '100%', maxWidth: 400, backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  subtitulo: { fontSize: 16, fontWeight: '600', color: '#34495e', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#cfd8dc', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16, backgroundColor: '#fff', color: '#333' },
  botao: { backgroundColor: '#3498db', padding: 14, borderRadius: 8, alignItems: 'center' },
  textBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
