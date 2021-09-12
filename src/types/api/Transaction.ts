import { Account } from "./Account";

export interface ITransaction {
	id?: number;
	uuid?: number | string;
	date: Date;
	description: string;
	amount?: number;
	type?: number;
	accountId?: number;
}

export class DTOTransaction implements ITransaction {
	id?: number | undefined;
	uuid?: string | number | undefined;
	date: Date = new Date();
	description = "";
	amount?: number | undefined;
	type?: number | undefined;
	accountId?: number;

	constructor(transaction: ITransaction) {
		this.id = transaction.id;
		this.uuid = transaction.uuid;
		this.date = transaction.date;
		this.description = transaction.description;
		this.amount = transaction.amount;
		this.type = transaction.type;
		this.accountId = transaction.accountId;
	}
}

export class Transaction extends DTOTransaction {
	month?: number;
	account?: Account;
	constructor(transaction: DTOTransaction, account?: Account) {
		super(transaction);
		this.account = account;
		this.month = new Date(transaction.date).getMonth();
	}
}
