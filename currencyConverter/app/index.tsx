const convertCurrency = async () => {
    const API_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (parseFloat(amount) * rate).toFixed(2); // Convert amount to number
        setResult(convertedAmount);
    } catch (error) {
        console.error(error);
    }
};
