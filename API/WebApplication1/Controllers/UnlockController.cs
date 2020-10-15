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
    //[RoutePrefix("Unlock")]
    public class UnlockController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Unlock
        public IQueryable<Unlock> GetUnlock()
        {
            return db.Unlock;
        }

        // GET: api/Unlock/5
        [ResponseType(typeof(Unlock))]
        public IHttpActionResult GetUnlock(int id)
        {
            Unlock table1 = db.Unlock.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            return Ok(table1);
        }

        // PUT: api/Unlock/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUnlock(int id, Unlock table1)
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
                if (!UnlockExists(id))
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

        // POST: api/Unlock
        [ResponseType(typeof(Unlock))]
        public IHttpActionResult PostUnlock(Unlock table1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Unlock.Add(table1);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UnlockExists(table1.ID))
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

        // DELETE: api/Unlock/5
        [ResponseType(typeof(Unlock))]
        public IHttpActionResult DeleteUnlock(int id)
        {
            Unlock table1 = db.Unlock.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            db.Unlock.Remove(table1);
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

        private bool UnlockExists(int id)
        {
            return db.Unlock.Count(e => e.ID == id) > 0;
        }
    }
}