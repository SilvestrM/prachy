import axios from "axios";

class Currency {
	code: string;
	country: string;

	constructor(code: string, country: string) {
		this.code = code;
		this.country = country;
	}
}

export async function getCurrencies() {
	const { data: currencies } = await axios.get(
		"https://openexchangerates.org/api/currencies.json"
	);
	return Object.keys(currencies).map(
		(key) => new Currency(key, currencies[key])
	);
}
