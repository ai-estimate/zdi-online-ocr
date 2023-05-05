import Dexie, {Table} from 'dexie';
// import 'dexie-export-import';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumer: string;
  email: string;
  password: string;
}

export interface CrurentPlan {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  type: 'free' | 'standard' | 'premium';
}

export interface CrurentUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumer: string;
  email: string;
  islogin: boolean;
}

// connect to database with user table and crurentPlan table
export class Database extends Dexie {
  users!: Table<User>;
  crurentPlans!: Table<CrurentPlan>;
  crurentUsers!: Table<CrurentUser>;

  constructor() {
    super('userDB');
    this.version(3).stores({
      users: '++id, firstName, lastName, phoneNumer, email, password',
      crurentPlans: '++id, name, description, createdAt',
      crurentUsers: '++id, firstName, lastName, phoneNumer, email, islogin',
    });
  }
}

export const db = new Database();
