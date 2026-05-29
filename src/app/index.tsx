import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Linking, Alert } from 'react-native';

export default function HomeScreen() {
  const [inputNome, setInputNome] = useState('');
  const [inputCapital, setInputCapital] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  // --- REQUISITO 2: FUNÇÃO DE BUSCA POR NOME ---
  const buscarPorNome = async () => {
    if (!inputNome.trim()) return Alert.alert('Aviso', 'Digite um nome de país!');
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${inputNome.trim()}`);
      if (!response.ok) throw new Error('País não encontrado.');
      
      const dados = await response.json();
      const pais = dados[0]; // Pega o primeiro objeto do Array

      // Mapeia os dados da API exatamente com o JSON que você inspecionou
      setResultado({
        tipo: 'nome',
        nomeComum: pais.translations?.por?.common || pais.name.common, // Nome comum em PT-BR
        nomeOficial: pais.name.official,                               // Nome oficial
        nomeRusso: pais.translations?.rus?.official || 'Não disponível', // Traduzido para russo
        mapaLink: pais.maps?.openStreetMaps,                           // Link do OpenStreetMap
      });
    } catch (erro: any) {
      Alert.alert('Erro', erro.message);
      setResultado(null);
    }
  };

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
        {/* Aciona a função que criamos acima */}
        <TouchableOpacity style={styles.botao} onPress={buscarPorNome}>
          <Text style={styles.textBotao}>Buscar por Nome</Text>
        </TouchableOpacity>
      </View>

      {/* Bloco 2: Busca por Capital (Pendente para o próximo commit) */}
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
          onPress={() => Alert.alert('Aviso', 'A busca por capital será implementada no próximo commit.')}
        >
          <Text style={styles.textBotao}>Buscar por Capital</Text>
        </TouchableOpacity>
      </View>

      {/* Exibição condicional do resultado da Busca por Nome */}
      {resultado && resultado.tipo === 'nome' && (
        <View style={styles.cardResultado}>
          <Text style={styles.resultadoTitulo}>📍 {resultado.nomeComum}</Text>
          <Text style={styles.texto}><Text style={styles.negrito}>Nome Oficial:</Text> {resultado.nomeOficial}</Text>
          <Text style={styles.texto}><Text style={styles.negrito}>Nome em Russo:</Text> {resultado.nomeRusso}</Text>
          
          <TouchableOpacity 
            style={styles.botaoMapa} 
            onPress={() => Linking.openURL(resultado.mapaLink)}
          >
            <Text style={styles.textBotaoMapa}>🗺️ Visualizar no OpenStreetMap</Text>
          </TouchableOpacity>
        </View>
      )}
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
  cardResultado: { width: '100%', maxWidth: 400, backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.12, shadowRadius: 5, elevation: 4, marginTop: 10 },
  resultadoTitulo: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  texto: { fontSize: 15, color: '#555', marginVertical: 5, textAlign: 'center' },
  negrito: { fontWeight: 'bold', color: '#2c3e50' },
  botaoMapa: { marginTop: 15, backgroundColor: '#e6f4ea', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  textBotaoMapa: { color: '#137333', fontWeight: '600', fontSize: 15 }
});
