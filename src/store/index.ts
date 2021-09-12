import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { accounts } from "./modules/accounts";
import { transactions } from "./modules/transactions";

export interface RootState {
	session: string;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export default createStore<RootState>({
	state: {
		session: "",
	},
	mutations: {},
	actions: {},
	modules: {
		transactions,
		accounts,
	},
});
