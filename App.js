import React, {useEffect, useState} from 'react';
import {Button, View, TextInput, Text, StyleSheet} from 'react-native';
import {NativeModules, DeviceEventEmitter} from 'react-native';

function App(props) {
  const MyModule = NativeModules.MyModule;
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [sumResult, setSumResult] = useState('');
  const [multiplyResult, setMultiplyResult] = useState('');
  const [propsResult, setPropsResult] = useState('');

  useEffect(() => {
    const onPropsSetListener = DeviceEventEmitter.addListener(
      'onPropsSet',
      params => {
        const prop1 = params.prop1;
        const prop2 = params.prop2;

        setPropsResult(`Parametri: ${prop1}, ${prop2}`);
        console.log(params.prop1, params.prop2);
      },
    );

    return () => {
      onPropsSetListener.remove();
    };
  }, []);

  const handleSum = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    MyModule.sum(num1, num2)
      .then(result => setSumResult(result.toString()))
      .catch(error => console.log(error));
  };

  const handleMultiply = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    MyModule.multiply(num1, num2)
      .then(result => setMultiplyResult(result.toString()))
      .catch(error => console.log(error));
  };

  const handleProps = () => {
    const parsedParam2 = parseFloat(param2);

    MyModule.propsMethod(param1, parsedParam2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Inserisci il primo parametro"
          value={param1}
          onChangeText={text => setParam1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Inserisci il secondo parametro"
          value={param2}
          onChangeText={text => setParam2(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Props" onPress={handleProps} />
        </View>
        <Text style={styles.result}>{propsResult}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Inserisci il primo numero"
          value={number1}
          onChangeText={text => setNumber1(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Inserisci il secondo numero"
          value={number2}
          onChangeText={text => setNumber2(text)}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <Button title="Somma" onPress={handleSum} />
          <Button title="Moltiplica" onPress={handleMultiply} />
        </View>
        <Text style={styles.result}>Risultato somma: {sumResult}</Text>
        <Text style={styles.result}>
          Risultato moltiplicazione: {multiplyResult}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
  },
});

export default App;
