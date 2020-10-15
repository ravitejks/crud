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
    //[RoutePrefix("Table1")]
    public class Table1Controller : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Table1
        public IQueryable<Table1> GetTable1()
        {
            return db.Table1;
        }

        // GET: api/Table1/5
        [ResponseType(typeof(Table1))]
        public IHttpActionResult GetTable1(int id)
        {
            Table1 table1 = db.Table1.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            return Ok(table1);
        }

        // PUT: api/Table1/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTable1(int id, Table1 table1)
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
                if (!Table1Exists(id))
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

        // POST: api/Table1
        [ResponseType(typeof(Table1))]
        public IHttpActionResult PostTable1(Table1 table1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Table1.Add(table1);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Table1Exists(table1.ID))
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

        // DELETE: api/Table1/5
        [ResponseType(typeof(Table1))]
        public IHttpActionResult DeleteTable1(int id)
        {
            Table1 table1 = db.Table1.Find(id);
            if (table1 == null)
            {
                return NotFound();
            }

            db.Table1.Remove(table1);
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

        private bool Table1Exists(int id)
        {
            return db.Table1.Count(e => e.ID == id) > 0;
        }
    }
}