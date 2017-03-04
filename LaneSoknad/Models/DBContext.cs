using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace LaneSoknad.Models
{
    public class Soknad
    {
        [Key]
        public int KId { set; get; }
        public string belop { set; get; }
        public string ar { set; get; }
        public string resultat { set; get; }
        public string personnummer { set; get; }
        public string telefonnr { set; get; }
        public string epost { set; get; }
    }

    public class DBContext : DbContext
    {
        public DBContext()
            : base("name=Soknad")
        {
            Database.CreateIfNotExists();
        }

        public DbSet<Soknad> Soknader { set; get; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}