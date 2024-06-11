export class Income {
  id?: string;
  amount: number;
  isPaid: boolean;
  description: string;
  fixed: boolean;
  userId: string;
  createdAt?: string | Date;
  totalInstallments?: number;
  expiresAt?: string | Date;
}
