using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

using Newtonsoft.Json.Linq;

using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    //[RoutePrefix("Hackathon")]
    public class HackathonController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Hackathon
        public IQueryable<Hackathon> GetHackathon()
        {
            return db.Hackathon;
        }

        // GET: api/Hackathon/5
        [ResponseType(typeof(Hackathon))]
        public IHttpActionResult GetHackathon(int id)
        {
            Hackathon table1 = db.Hackathon.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            return Ok(table1);
        }

        // PUT: api/Hackathon/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutHackathon(int id, Hackathon table1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != table1.ID)
            {
                return BadRequest();
            }

            db.Entry(table1).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HackathonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Hackathon
        [ResponseType(typeof(Hackathon))]
        public IHttpActionResult PostHackathon(Hackathon table1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Hackathon.Add(table1);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (HackathonExists(table1.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = table1.ID }, table1);
        }

        // DELETE: api/Hackathon/5
        [ResponseType(typeof(Hackathon))]
        public IHttpActionResult DeleteHackathon(int id)
        {
            Hackathon table1 = db.Hackathon.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            db.Hackathon.Remove(table1);
            db.SaveChanges();

            return Ok(table1);
        }

		protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HackathonExists(int id)
        {
            return db.Hackathon.Count(e => e.ID == id) > 0;
        }
    }
}