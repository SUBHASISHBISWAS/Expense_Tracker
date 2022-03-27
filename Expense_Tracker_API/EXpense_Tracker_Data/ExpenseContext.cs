using Expense_Tracker_Domain;
using Microsoft.EntityFrameworkCore;

namespace EXpense_Tracker_Data
{
    public class ExpenseContext:DbContext
    {
        public DbSet<Expense>? Expenses { get; set; }

        public DbSet<ExpenseUser>? ExpenseUsers { get; set; }
    }
}