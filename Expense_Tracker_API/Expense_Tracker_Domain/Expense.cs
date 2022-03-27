namespace Expense_Tracker_Domain
{
    public class Expense
    {
        public int Id { get; set; }

        public string? Description { get; set; }

        public int ? Amount { get; set; }

        public DateTime? CreatedDate { get; set;}

        public ExpenseUser? User { get; set; }

        public int UserId { get; set; }


    }
}
