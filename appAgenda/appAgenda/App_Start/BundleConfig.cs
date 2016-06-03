using System.Web;
using System.Web.Optimization;

namespace appAgenda
{
    public class BundleConfig
    {
        // Para obtener más información sobre Bundles, visite http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));
            //jQuery fullcalendar plugin css
            bundles.Add(new StyleBundle("~/Content/fullcalendar").Include(
                                      "~/Content/fullcalendar.css"));

            //jQuery fullcalendar plugin js
            bundles.Add(new ScriptBundle("~/bundles/fullcalendar").Include(
                                      "~/Scripts/moment.js",  //Include the moment.js
                                      "~/Scripts/fullcalendar.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
