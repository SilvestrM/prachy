import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { supabase } from "@/api/supabase";
import { RootState } from "..";
import { Account } from "@/types/api/Account";

export interface AccountsState {
	accounts: Array<Account>;
}

const state: AccountsState = {
	accounts: [],
};

const mutations: MutationTree<AccountsState> = {
	setAccounts(state, accounts: Array<Account>) {
		state.accounts = accounts;
	},
};

const getters: GetterTree<AccountsState, RootState> = {
	getAccounts(state) {
		return state.accounts;
	},
};

const actions: ActionTree<AccountsState, RootState> = {
	async fetchAccounts({ commit }) {
		const { data: accounts, error } = await supabase
			.from("accounts")
			.select("*");

		commit(
			"setAccounts",
			accounts?.map((acc) => new Account(acc))
		);
	},

	// async createTransaction({ commit }, transaction: Transaction) {
	// 	await supabase.from("accounts").insert(new DTOTransaction(transaction));
	// },
	// async updateTransaction({ commit }, transaction: Transaction) {
	// 	await supabase
	// 		.from("accounts")
	// 		.update(new DTOTransaction(transaction))
	// 		.eq("id", transaction.id);
	// },
};

export const accounts: Module<AccountsState, RootState> = {
	state,
	mutations,
	getters,
	actions,
};
