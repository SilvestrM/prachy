import { Account } from "./Account";

export interface ITransaction {
	id?: number;
	uuid?: number | string;
	date: Date;
	description?: string;
	amount?: number;
	typeId?: number;
	accountId?: number;
}

export interface TransactionType {
	id?: number;
	name?: string;
}

export class DTOTransaction implements ITransaction {
	id?: number | undefined;
	uuid?: string | number | undefined;
	date: Date = new Date();
	description? = "";
	amount?: number | undefined;
	typeId?: number | undefined;
	accountId?: number;

	constructor(transaction: ITransaction) {
		this.id = transaction.id;
		this.uuid = transaction.uuid;
		this.date = transaction.date;
		this.description = transaction.description;
		this.amount = transaction.amount;
		this.typeId = transaction.typeId;
		this.accountId = transaction.accountId;
	}
}

export class Transaction extends DTOTransaction {
	month?: number;
	account?: Account;
	type?: TransactionType;
	constructor(
		transaction: DTOTransaction,
		account?: Account,
		type?: TransactionType
	) {
		super(transaction);
		this.account = account;
		this.type = type;
		this.month = new Date(transaction.date).getMonth();
	}
}
