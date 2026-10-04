using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WinReview.Migrations
{
    /// <inheritdoc />
    public partial class FronEndChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_EmpID",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Name",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ProjectName",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Feedbacks_FeedbackStatus",
                table: "Feedbacks");

            migrationBuilder.DropIndex(
                name: "IX_Feedbacks_FeedbackToUser_FeedbackStatus",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "DeptName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "EmpID",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "MicrosoftObjectId",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectName",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "JoinedAt",
                table: "ProjectMembers",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

          migrationBuilder.DropCheckConstraint(
                name: "CK_Feedback_Status",
                table: "Feedbacks");

          migrationBuilder.AlterColumn<string>(
                name: "FeedbackStatus",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "Pending",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true,
                oldDefaultValue: "Pending");

           migrationBuilder.AddCheckConstraint(
                name: "CK_Feedback_Status",
                table: "Feedbacks",
                sql: "[FeedbackStatus] IN ('Pending','Approved','Declined')");

            migrationBuilder.CreateIndex(
                name: "IX_Users_MicrosoftObjectId",
                table: "Users",
                column: "MicrosoftObjectId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_FeedbackToUser",
                table: "Feedbacks",
                column: "FeedbackToUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_MicrosoftObjectId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Feedbacks_FeedbackToUser",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "MicrosoftObjectId",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "EmpID",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "DeptName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectName",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "JoinedAt",
                table: "ProjectMembers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FeedbackStatus",
                table: "Feedbacks",
                type: "nvarchar(450)",
                nullable: true,
                defaultValue: "Pending",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "Pending");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EmpID",
                table: "Users",
                column: "EmpID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectName",
                table: "Projects",
                column: "ProjectName");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_FeedbackStatus",
                table: "Feedbacks",
                column: "FeedbackStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_FeedbackToUser_FeedbackStatus",
                table: "Feedbacks",
                columns: new[] { "FeedbackToUser", "FeedbackStatus" });
        }
    }
}
