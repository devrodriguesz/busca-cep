import React, {useState, useRef} from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, Keyboard } from "react-native";

import api from "./src/services/api";

export default function App(){
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUsuario, setCepUsuario] = useState(null)
  

  function limpar(){
    setCep('');
    inputRef.current.focus();
    setCepUsuario(null);
  }
  
  async function buscar(){
    if (cep==''){
      alert('Digite um CEP válido por favor !!!');
      Keyboard.dismiss();
    }else{
      try {
        const response = await api.get(`/${cep}/json`);
        //console.log(response.data);
        setCepUsuario(response.data);
        setCep('');
        Keyboard.dismiss();
      } catch (error) {
        alert('Por favor verifique se o CEP digitado é válido !!!');
        Keyboard.dismiss();
        setCep('');
      }
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.textoInput}>Digite o CEP</Text>
        <TextInput
        style={styles.input}
        placeholder='Ex: 39401174'
        value={cep}
        onChangeText={(text)=> setCep(text)}
        keyboardType='numeric'
        ref={inputRef}
        />
      </View>

      <View style={styles.areaBotao}>
        <TouchableOpacity onPress={buscar}
        style={[styles.botao,  {backgroundColor: '#4d9de0'}]}>
          <Text style={styles.textoBotao}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={limpar}
        style={[styles.botao,{backgroundColor: '#ff1212'} ]}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>



      {cepUsuario &&       
      
      <View style={styles.areaResultado}>
        <Text style={styles.textoResultado}>CEP: {cepUsuario.cep}</Text>
        <Text style={styles.textoResultado}>Logradouro: {cepUsuario.logradouro}</Text>
        <Text style={styles.textoResultado}>Bairro: {cepUsuario.bairro}</Text>
        <Text style={styles.textoResultado}>Cidade: {cepUsuario.localidade}</Text>
        <Text style={styles.textoResultado}>Estado: {cepUsuario.uf}</Text>
      </View>
      
      }


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#e7ecef'
  },
  textoInput:{
    marginTop:5,
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold'
  },
  input:{
    marginTop: 15,
    borderColor: '#000',
    backgroundColor: '#FFF',
    width: '90%',
    height: 55,
    padding: 15,
    fontSize: 20,
    borderRadius:15,
    borderWidth: 2,
    marginBottom: 15
  },
  areaBotao:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botao:{
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10
  },
  textoBotao:{
    fontSize: 15,
    padding: 5,
    color: '#FFF',
    fontWeight: 'bold'
  },
  areaResultado:{
    marginTop: 50,
    marginLeft: 10,
    marginLeft: 10,
    flex:1,
    backgroundColor: '#e7ecef',
    alignItems: 'center',
  },
  textoResultado:{
    color: '#000',
    fontWeight: '900',
    fontSize: 20
  }
})
