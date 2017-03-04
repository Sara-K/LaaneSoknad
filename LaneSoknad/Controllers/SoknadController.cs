using LaneSoknad.Models;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace LaneSoknad.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class SoknadController : ApiController
    {

        DB db = new DB();

        // GET: Soknad
        public HttpResponseMessage Get()
        {
            List<Soknad> soknader = db.hentAlleSoknader();

            var Json = new JavaScriptSerializer();
            string JsonString = Json.Serialize(soknader);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }

        // GET: Soknad/
        public HttpResponseMessage Get(string personnummer)
        {
            List<Soknad> listeMedSoknader = db.hentListeMedSoknader(personnummer);

            var Json = new JavaScriptSerializer();
            string JsonString = Json.Serialize(listeMedSoknader);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }

        //	POST api/Soknad
        [HttpPost]
        public bool Post([FromBody]Soknad innSoknad)
        {
            Soknad nySoknad = new Models.Soknad()
            {
                personnummer = innSoknad.personnummer,
                telefonnr = innSoknad.telefonnr,
                epost = innSoknad.epost,
                belop = innSoknad.belop,
                ar = innSoknad.ar,
                resultat = innSoknad.resultat
            };

            if (
            db.sendSoknad(nySoknad))
            {
                return true;
            }
            else
                return false;
        }




        ////	POST api/Soknad
        //[HttpPost]
        //public List<Soknad> Post([FromBody]Soknad innSoknad)
        //{
        //    System.Diagnostics.Debug.WriteLine("________"+innSoknad.Personnummer);
        //    db.sendSoknad(innSoknad);
        //    return db.hentAlleSoknader();
        //}
    }
}