using appAgenda.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace appAgenda.Controllers
{
    public class HomeController : Controller
    {
        static List<Event> clientList = new List<Event>();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult getClientes(double start, double end)
        {
            var rows = clientList.ToArray();
            return Json(rows, JsonRequestBehavior.AllowGet);
        }

        public void Delete(int ID)
        {
            var client = clientList.Where(x => x.id == ID).FirstOrDefault();
            clientList.Remove(clientList.Where(x => x.id == ID).FirstOrDefault());
        }

      
        public bool Save(string Name, string startDate)
        {
           
            if (checkDate(startDate))
            {
                Random num = new Random();

                Event nuevo = new Event()
                {
                    id= num.Next(9999),
                    title = Name,
                    start = DateTime.Parse(startDate).ToString("s"),
                    end = DateTime.Parse(startDate).ToString("s")
                };
                clientList.Add(nuevo);
                return true;
            }else
            {
                return false;
            }     
           
        }
        private bool checkDate(string startDate)
        {
            foreach(var item in clientList)
            {
                if(item.start == DateTime.Parse(startDate).ToString("s"))
                {
                    return false;
                }
            }
            return true;
        }

    }
}