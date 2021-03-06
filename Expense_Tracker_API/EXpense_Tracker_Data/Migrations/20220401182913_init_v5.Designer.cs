// <auto-generated />
using System;
using Expense_Tracker_Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Expense_Tracker_Data.Migrations
{
    [DbContext(typeof(ExpenseContext))]
    [Migration("20220401182913_init_v5")]
    partial class init_v5
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Expense_Tracker_Domain.Model.Card", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CardDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CardExpiryDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CardName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CardNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CardStatementDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CardType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("Expense_Tracker_Domain.Model.Expense", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<Guid>("CardId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CardId");

                    b.HasIndex("UserId");

                    b.ToTable("Expenses");
                });

            modelBuilder.Entity("Expense_Tracker_Domain.Model.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Expense_Tracker_Domain.Model.Card", b =>
                {
                    b.HasOne("Expense_Tracker_Domain.Model.User", null)
                        .WithMany("Cards")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Expense_Tracker_Domain.Model.Expense", b =>
                {
                    b.HasOne("Expense_Tracker_Domain.Model.Card", null)
                        .WithMany("Expenses")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Expense_Tracker_Domain.Model.User", null)
                        .WithMany("Expenses")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Expense_Tracker_Domain.Model.Card", b =>
                {
                    b.Navigation("Expenses");
                });

            modelBuilder.Entity("Expense_Tracker_Domain.Model.User", b =>
                {
                    b.Navigation("Cards");

                    b.Navigation("Expenses");
                });
#pragma warning restore 612, 618
        }
    }
}
