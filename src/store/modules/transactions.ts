import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { supabase } from "@/api/supabase";
import { RootState } from "..";
import {
	DTOTransaction,
	Transaction,
	TransactionType,
} from "@/types/api/Transaction";
import { Account } from "@/types/api/Account";

export interface TransactionsState {
	transactions: Array<Transaction>;
	transactionTypes: Array<TransactionType>;
}

const state: TransactionsState = {
	transactions: [],
	transactionTypes: [],
};

const mutations: MutationTree<TransactionsState> = {
	setTransactions(state, transactions: Array<Transaction>) {
		state.transactions = transactions;
	},
	setTransaction(state, transaction) {
		// const index = state.transactions.findIndex((id) => id === transaction.id);
		// if (index !== -1) {
		// 	state.transactions.splice(index, 1, transaction);
		// }

		const item = state.transactions.find((item) => item.id === transaction.id);
		if (item) {
			Object.assign(item, transaction);
		}
	},
	setTransactionTypes(state, transTypes) {
		state.transactionTypes = transTypes;
	},
};

const getters: GetterTree<TransactionsState, RootState> = {
	getTransactions(state) {
		return state.transactions;
	},
	getTransactionById: (state) => (id: number) => {
		return state.transactions.find((item) => item.id === id);
	},
	getTransactionTypes(state) {
		return state.transactionTypes.filter(
			(type: TransactionType) => type.id !== 4
		);
	},
};

const actions: ActionTree<TransactionsState, RootState> = {
	async fetchTransactions({ commit, dispatch }) {
		//TODO improve foregin keys
		const { data: transactions, error } = await supabase
			.from("transactions")
			.select(
				`*, account: accountId (id, name, type: typeId (name)), type: typeId (id, name)`
			);

		commit(
			"setTransactions",
			transactions?.map(
				(trans) => new Transaction(trans, trans.account, trans.type)
			)
		);
		await dispatch("fetchTransactionTypes");
	},

	async fetchTransactionTypes({ commit, state }) {
		const { data: transaction_types, error } = await supabase
			.from("transaction_type")
			.select("id, name");
		commit("setTransactionTypes", transaction_types);
	},
	async createTransaction({ commit, rootState }, transaction: Transaction) {
		transaction.uuid = rootState.session.user.id;
		await supabase.from("transactions").insert(new DTOTransaction(transaction));
	},
	async updateTransaction({ commit, dispatch }, transaction: Transaction) {
		await supabase
			.from("transactions")
			.update(new DTOTransaction(transaction))
			.eq("id", transaction.id);
		//dispatch("fetchTransactionAccountById", {accountId: transaction.accountId, transId: transaction.id});
		const { data: account, error } = await supabase
			.from("accounts")
			.select(`id, name, type:typeId(name)`)
			.eq("id", transaction.accountId);
		if (account) {
			transaction = new Transaction(
				transaction,
				new Account(account[0]),
				state.transactionTypes.find((type) => type.id === transaction.typeId)
			);
		}

		commit("setTransaction", transaction);
	},
};

export const transactions: Module<TransactionsState, RootState> = {
	state,
	mutations,
	getters,
	actions,
};
