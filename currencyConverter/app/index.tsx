import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from './../assets/styles/style.css';

const CurrencyConverterApp = () => {
    const [amount, setAmount] = useState<string>(''); // Specify type as string
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');
    const [result, setResult] = useState<string | null>(null); // Allow result to be string or null

    const convertCurrency = async () => {
        if (!amount || isNaN(Number(amount))) {
            Alert.alert('Invalid Input', 'Please enter a valid numeric amount.');
            return;
        }

        const API_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates.');
            }
            const data = await response.json();
            const rate = data.rates[toCurrency];
            if (!rate) {
                throw new Error(`Currency ${toCurrency} not supported.`);
            }
            const convertedAmount = (parseFloat(amount) * rate).toFixed(2); // Convert amount to number
            setResult(convertedAmount);
        } catch (error) {
            console.error(error);
            Alert.alert('Conversion Error', error.message);
        }
    };

    return (
        <View style={styles?.container || { padding: 20, backgroundColor: '#f5f5f5' }}>
            <Text style={styles?.title || { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                Currency Converter
            </Text>
            <TextInput
                style={styles?.input || { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <View style={styles?.row || { flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text>From:</Text>
                <TextInput
                    style={styles?.currencyInput || { height: 40, marginHorizontal: 5, borderBottomWidth: 1, flex: 1 }}
                    value={fromCurrency}
                    onChangeText={setFromCurrency}
                />
                <Text>To:</Text>
                <TextInput
                    style={styles?.currencyInput || { height: 40, marginHorizontal: 5, borderBottomWidth: 1, flex: 1 }}
                    value={toCurrency}
                    onChangeText={setToCurrency}
                />
            </View>
            <Button title="Convert" onPress={convertCurrency} />
            {result && (
                <Text style={styles?.result || { fontSize: 18, marginTop: 20 }}>
                    Converted Amount: {result}
                </Text>
            )}
        </View>
    );
};

export default CurrencyConverterApp;
