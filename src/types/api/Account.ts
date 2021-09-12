export interface IAccount {
	id?: number;
	name?: string;
	ownerId?: string;
	typeId?: number;
}

export class DTOAccount implements IAccount {
	id?: number;
	name?: string;
	ownerId?: string;
	typeId?: number;
	constructor(account: IAccount) {
		this.id = account.id;
		this.name = account.name;
		this.ownerId = account.ownerId;
		this.typeId = account.typeId;
	}
}

export class Account extends DTOAccount {
	constructor(account: DTOAccount) {
		super(account);
	}
}
