export interface IAccount {
	id?: number;
	name?: string;
	ownerId?: string;
	typeId?: number;
	currency?: string;
}

export class DTOAccount implements IAccount {
	id?: number;
	name?: string;
	ownerId?: string;
	typeId?: number;
	currency?: string;
	constructor(account: IAccount) {
		this.id = account.id;
		this.name = account.name;
		this.ownerId = account.ownerId;
		this.typeId = account.typeId;
		this.currency = account.currency;
	}
}

export class Account extends DTOAccount {
	constructor(account: DTOAccount) {
		super(account);
	}
}
