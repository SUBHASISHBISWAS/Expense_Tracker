﻿using Expense_Tracker_Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Expense_Tracker_Data
{
    public class ExpenseContext:DbContext
    {
        string connectionString = "Data Source=SHERLOCK;Initial Catalog=Expense;Integrated Security=True";

        public DbSet<Expense>? Expenses { get; set; }

        public DbSet<User>? Users { get; set; }

        public DbSet<Card>? Cards { get; set; }

        public ExpenseContext(DbContextOptions<ExpenseContext> option) : base(option) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}