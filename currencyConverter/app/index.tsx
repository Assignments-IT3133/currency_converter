import React, { useState } from 'react';
import { View, Text } from 'react-native';

const CurrencyConverterApp = () => {
    const [amount, setAmount] = useState<string>(''); // Specify type as string
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');
    const [result, setResult] = useState<string | null>(null); // Allow result to be string or null

    return (
        <View>
            <Text>Currency Converter</Text>
        </View>
    );
};

export default CurrencyConverterApp;
