using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PinMapper.Web.Models;

namespace PinMapper.Web.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SectorHierarchy> SectorHierarchies { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserSubSectorMapping> UserSubSectorMappings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=RACIT035;Initial Catalog=PinMappingDB;Integrated Security=True;Trust Server Certificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role", "KBL_PinCodeMapping");

            entity.Property(e => e.CreatedBy)
                .HasMaxLength(128)
                .HasDefaultValueSql("(coalesce(suser_sname(),'?'))")
                .HasColumnName("created_by");
            entity.Property(e => e.CreatedDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_dt");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedBy)
                .HasMaxLength(128)
                .HasDefaultValueSql("(coalesce(suser_sname(),'?'))")
                .HasColumnName("updated_by");
            entity.Property(e => e.UpdatedDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("updated_dt");
        });

        modelBuilder.Entity<SectorHierarchy>(entity =>
        {
            entity.ToTable("SectorHierarchy", "KBL_PinCodeMapping");

            entity.Property(e => e.CreatedBy)
                .HasMaxLength(128)
                .HasDefaultValueSql("(coalesce(suser_sname(),'?'))")
                .HasColumnName("created_by");
            entity.Property(e => e.CreatedDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_dt");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedBy)
                .HasMaxLength(128)
                .HasDefaultValueSql("(coalesce(suser_sname(),'?'))")
                .HasColumnName("updated_by");
            entity.Property(e => e.UpdatedDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("updated_dt");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users", "KBL_PinCodeMapping");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.ContactNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(128)
                .HasDefaultValueSql("(coalesce(suser_sname(),'?'))")
                .HasColumnName("created_by");
            entity.Property(e => e.CreatedDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_dt");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedBy)
                .HasMaxLength(128)
                .HasDefaultValueSql("(coalesce(suser_sname(),'?'))")
                .HasColumnName("updated_by");
            entity.Property(e => e.UpdatedDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("updated_dt");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Users_Role");

            entity.HasOne(d => d.SectorHierarchy).WithMany(p => p.Users)
                .HasForeignKey(d => d.SectorHierarchyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Users_SectorHierarchy");
        });

        modelBuilder.Entity<UserSubSectorMapping>(entity =>
        {
            entity.ToTable("UserSubSectorMapping", "KBL_PinCodeMapping");

            entity.HasOne(d => d.SectorHierarchy).WithMany(p => p.UserSubSectorMappings)
                .HasForeignKey(d => d.SectorHierarchyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserSubSectorMapping_SectorHierarchy");

            entity.HasOne(d => d.User).WithMany(p => p.UserSubSectorMappings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserSubSectorMapping_Users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
