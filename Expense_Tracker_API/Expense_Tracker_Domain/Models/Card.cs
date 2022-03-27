using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Expense_Tracker_Domain.Model
{
    public class Card
    {
        public Guid Id { get; set; }

        public string? CardName { get; set; }

        public string? CardNumber {get;set;}  
        
        public string? CardType { get; set;}

        public string? CardDescription { get; set; }

        public DateTime? CardExpiryDate { get; set; }

        public DateTime? CardStatementDate  { get; set; }

        public List<Expense>? Expenses { get; set; }=new List<Expense> { };

        
    }
}
