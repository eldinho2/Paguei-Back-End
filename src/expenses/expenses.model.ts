export class Expense {
  id?: string;
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
  createdAt?: string | Date;
  installments?: number;
}
