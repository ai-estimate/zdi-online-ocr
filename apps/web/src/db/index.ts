import Dexie, {Table} from 'dexie';
import 'dexie-export-import';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumer: string;
  email: string;
  password: string;
}

export interface CrurentPlan {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  type: 'free' | 'standard' | 'premium';
}

export interface CrurentUser {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumer: string;
  email: string;
}

// connect to database with user table and crurentPlan table
export class Database extends Dexie {
  users!: Table<User>;
  crurentPlans!: Table<CrurentPlan>;
  crurentUsers!: Table<CrurentUser>;

  constructor() {
    super('userDB');
    this.version(2).stores({
      users: 'id, firstName, lastName, phoneNumer, email, password',
      crurentPlans: 'id name, description, createdAt',
      crurentUsers: 'id, firstName, lastName, phoneNumer, email',
    });
  }
}

export const db = new Database();
