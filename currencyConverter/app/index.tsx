import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './../assets/styles/style.css';

const CurrencyConverterApp = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState(null);

    const convertCurrency = async () => {
        const API_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            setResult(convertedAmount);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Currency Converter</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <View style={styles.row}>
                <Text>From:</Text>
                <TextInput
                    style={styles.currencyInput}
                    value={fromCurrency}
                    onChangeText={setFromCurrency}
                />
                <Text>To:</Text>
                <TextInput
                    style={styles.currencyInput}
                    value={toCurrency}
                    onChangeText={setToCurrency}
                />
            </View>
            <Button title="Convert" onPress={convertCurrency} />
            {result && <Text style={styles.result}>Converted Amount: {result}</Text>}
        </View>
    );
};

export default CurrencyConverterApp;
