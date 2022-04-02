namespace Expense_Tracker_Domain.Model
{
    public class Expense
    {
        public Guid Id { get; set; }

        public string? Description { get; set; }

        public decimal ? Amount { get; set; }

        public DateTime? expenseDate { get; set;}

        public string? expenseCategory { get; set; }

        //public Guid UserId { get; set; }

        public Guid CardId { get; set; }

    }
}
