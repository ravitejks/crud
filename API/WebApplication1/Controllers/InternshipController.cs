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
    //[RoutePrefix("Internship")]
    public class InternshipController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Internship
        public IQueryable<Internship> GetInternship()
        {
            return db.Internship;
        }

        // GET: api/Internship/5
        [ResponseType(typeof(Internship))]
        public IHttpActionResult GetInternship(int id)
        {
            Internship table1 = db.Internship.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            return Ok(table1);
        }

        // PUT: api/Internship/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInternship(int id, Internship table1)
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
                if (!InternshipExists(id))
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

        // POST: api/Internship
        [ResponseType(typeof(Internship))]
        public IHttpActionResult PostInternship(Internship table1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Internship.Add(table1);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (InternshipExists(table1.ID))
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

        // DELETE: api/Internship/5
        [ResponseType(typeof(Internship))]
        public IHttpActionResult DeleteInternship(int id)
        {
            Internship table1 = db.Internship.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            db.Internship.Remove(table1);
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

        private bool InternshipExists(int id)
        {
            return db.Internship.Count(e => e.ID == id) > 0;
        }
    }
}