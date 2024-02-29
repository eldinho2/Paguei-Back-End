const prisma = new PrismaClient()

async function main() {
  // Verifique se o mês e o ano já existem
  let month = await prisma.month.findFirst({
    where: {
      month: 2, // Fevereiro
      year: 2024
    }
  })

  // Se não existir, crie um novo
  if (!month) {
    month = await prisma.month.create({
      data: {
        month: 2, // Fevereiro
        year: 2024
      }
    })
  }

  // Crie a despesa
  const expense = await prisma.expense.create({
    data: {
      amount: 100.0, // Substitua pelo valor da despesa
      description: 'Despesa do usuário 1', // Substitua pela descrição da despesa
      fixed: false, // Substitua por true se a despesa for fixa
      monthId: month.id
    }
  })

  console.log(expense)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })