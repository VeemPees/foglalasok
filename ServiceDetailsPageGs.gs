function renderServiceDetailsPage(e)
{
  var list = fetchServices();
  var id = -1;
  
  if (e) {
    if (e.parameter) {
      if (e.parameter.sid) {
        id = e.parameter.sid;
      } else {
        Logger.log("There is no e.parameter.sid");
      }
    } else {
      Logger.log("There is no e.parameter");
    }
  } else {
    Logger.log("There is no e");
  }
  
  var filtered = list.filter(function (item) {
    return item.id == id;
  });
  
  if (filtered.length > 0) {
    return render("ServiceDetailsPage", 
      {
        serviceName : filtered[0].name,
        serviceDescription : filtered[0].details,
        serviceDuration : filtered[0].duration,
        servicePrice : filtered[0].price,
        lookupSlotsUrl : ScriptApp.getService().getUrl() + "?op=cal&sid=" + id
      }, 'Kezelés');
  }
  return render("Error", null, 'Hiba');
}
