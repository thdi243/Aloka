export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Profile {
  id: string;
  full_name: string | null;
  currency: string;
  created_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  name: string;
  balance: number;
  created_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string | null;
  color: string | null;
  created_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  month_year: string;
  allocated_amount: number;
  created_at: string;
  category?: Category;
}

export interface Transaction {
  id: string;
  user_id: string;
  wallet_id: string;
  to_wallet_id: string | null;
  category_id: string | null;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  transaction_date: string;
  notes: string | null;
  created_at: string;
  wallet?: Wallet;
  to_wallet?: Wallet;
  category?: Category;
}
