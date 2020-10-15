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
    //[RoutePrefix("Poster")]
    public class PosterController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Poster
        public IQueryable<Poster> GetPoster()
        {
            return db.Poster;
        }

        // GET: api/Poster/5
        [ResponseType(typeof(Poster))]
        public IHttpActionResult GetPoster(int id)
        {
            Poster table1 = db.Poster.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            return Ok(table1);
        }

        // PUT: api/Poster/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPoster(int id, Poster table1)
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
                if (!PosterExists(id))
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

        // POST: api/Poster
        [ResponseType(typeof(Poster))]
        public IHttpActionResult PostPoster(Poster table1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Poster.Add(table1);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PosterExists(table1.ID))
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

        // DELETE: api/Poster/5
        [ResponseType(typeof(Poster))]
        public IHttpActionResult DeletePoster(int id)
        {
            Poster table1 = db.Poster.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            db.Poster.Remove(table1);
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

        private bool PosterExists(int id)
        {
            return db.Poster.Count(e => e.ID == id) > 0;
        }
    }
}