using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace azkindle.api.dbAccess;

public partial class AzkindleDbContext : DbContext
{
    public AzkindleDbContext()
    {
    }

    public AzkindleDbContext(DbContextOptions<AzkindleDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblBook> TblBooks { get; set; }

    public virtual DbSet<TblOrder> TblOrders { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-SKIQHOO;Database=AZKindleDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblBook>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblBooks__3213E83F482327BB");

            entity.ToTable("tblBooks");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Author)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("author");
            entity.Property(e => e.BookName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("book_name");
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.Stock).HasColumnName("stock");
        });

        modelBuilder.Entity<TblOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblOrder__3213E83F2CAC62DA");

            entity.ToTable("tblOrders");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.DateOfOrder)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("date_of_order");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Book).WithMany(p => p.TblOrders)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblOrders__bookI__4CA06362");

            entity.HasOne(d => d.User).WithMany(p => p.TblOrders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblOrders__userI__4D94879B");
        });

        modelBuilder.Entity<TblUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblUsers__3213E83F70E884B4");

            entity.ToTable("tblUsers");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Comments)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("comments");
            entity.Property(e => e.EmailAddress)
                .IsRequired()
                .HasMaxLength(250)
                .HasColumnName("email_address");
            entity.Property(e => e.FullName)
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnName("full_name");
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .IsRequired()
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
