using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Expense_Tracker_Domain.Model
{
    public class User
    {
        public Guid Id { get; set; }

        public string? Name { get; set; }

        public List<Expense>? Expenses { get; set; } = new List<Expense>();

        public List<Card>? Cards { get; set; }=new List<Card>();
    }
}
