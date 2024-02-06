import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomesModule } from './incomes/incomes.module';

@Module({
  imports: [UsersModule,AuthModule, ExpensesModule, IncomesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
