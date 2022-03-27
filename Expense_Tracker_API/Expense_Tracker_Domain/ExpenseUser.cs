using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Expense_Tracker_Domain
{
    public class ExpenseUser
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public List<Expense> User { get; set; } = new List<Expense>();
    }
}
