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
using WebApplication1.Models;
using System.Reflection;

namespace WebApplication1.Controllers
{
    public class DefaultController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Default
        public IHttpActionResult GetSchema()
        {
			db.Database.Connection.Open();
			DataTable dt = db.Database.Connection.GetSchema("Columns");

			Dictionary<string, DataTable> tableList = new Dictionary<string, DataTable>();
			foreach (DataRow row in dt.Rows)
			{
				if (!tableList.ContainsKey(row["TABLE_NAME"].ToString()))
				{
					DataTable table = new DataTable(row["TABLE_NAME"].ToString());
					table.Columns.Add("COLUMN_NAME");
					table.Columns.Add("ORDINAL_POSITION");
					table.Columns.Add("IS_NULLABLE");
					table.Columns.Add("DATA_TYPE");
					table.Columns.Add("CHARACTER_MAXIMUM_LENGTH");
					table.Rows.Add(row["COLUMN_NAME"].ToString(), row["ORDINAL_POSITION"].ToString(), row["IS_NULLABLE"].ToString(), row["DATA_TYPE"].ToString(), row["CHARACTER_MAXIMUM_LENGTH"].ToString());

					tableList.Add(row["TABLE_NAME"].ToString(), table);
				}
				else
				{
					tableList.TryGetValue(row["TABLE_NAME"].ToString(), out DataTable table);
					if (table != null)
					{
						table.Rows.Add(row["COLUMN_NAME"].ToString(), row["ORDINAL_POSITION"].ToString(), row["IS_NULLABLE"].ToString(), row["DATA_TYPE"].ToString(), row["CHARACTER_MAXIMUM_LENGTH"].ToString());
					}
				}
			}

			return Ok(tableList);
        }
		
		protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}