namespace Expense_Tracker_Domain.Model
{
    public class Expense
    {
        public Guid Id { get; set; }

        public string? Description { get; set; }

        public int ? Amount { get; set; }

        public DateTime? CreatedDate { get; set;}

        public User? User { get; set; }

        public Guid UserId { get; set; }

        public Card? Card { get; set; }

        public Guid CardId { get; set; }

    }
}
