using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Expense_Tracker_Data.Migrations
{
    public partial class init_v6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Expenses",
                newName: "expenseDate");

            migrationBuilder.AddColumn<string>(
                name: "expenseCategory",
                table: "Expenses",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "expenseCategory",
                table: "Expenses");

            migrationBuilder.RenameColumn(
                name: "expenseDate",
                table: "Expenses",
                newName: "CreatedDate");
        }
    }
}
