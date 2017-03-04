using LaneSoknad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaneSoknad
{
    public class DB
    {
        public List<Soknad> hentAlleSoknader()
        {
            DBContext db = new DBContext();

            List<Soknad> alleSoknader = db.Soknader.ToList();

            return alleSoknader;
        }

        public List<Soknad> hentListeMedSoknader(string innPersonnummer)
        {
            DBContext db = new DBContext();

            List<Soknad> listeMedSoknader = db.Soknader.Where(s => s.personnummer.StartsWith(innPersonnummer)).ToList();

            return listeMedSoknader;
        }

        public bool sendSoknad(Soknad innSoknad)
        {
            var nySoknad = new Soknad()
            {
                belop = innSoknad.belop,
                ar = innSoknad.ar,
                resultat = innSoknad.resultat,
                personnummer = innSoknad.personnummer,
                telefonnr = innSoknad.telefonnr,
                epost = innSoknad.epost
            };

            var db = new DBContext();
            try
            {
                db.Soknader.Add(nySoknad);
                db.SaveChanges();
                return true;
            }
            catch (Exception feil)
            {
                return false;
            }
        }
    }
}