function convertToSubcurrency(value: number, subcurrencyFactor = 100): number {
	return Math.round(value * subcurrencyFactor);
}

export default convertToSubcurrency;
