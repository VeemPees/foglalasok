function renderMainServiceListPage()
{
  var list = fetchServices();
  var htmlList = list.map(function(s) { return '<a href="' + ScriptApp.getService().getUrl() + '?op=sd&sid=' + s.id + '" class="collection-item">' + s.name + '</a>'}).join('');
  return render("Main", {serviceList: htmlList}, 'Időpont foglalás');
}

function fetchServices()
{
  try {
  
    return buildServiceData("Szolgáltatások");
    
  } catch(e) {
    logException(e);
  }
}

function buildServiceData(sheetname)
{
  
  var rows = getDataRows(sheetname);
  
  var data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    
    var row     = rows[r];
    var service  = {};

    service.id = row[0]
    service.category = row[1];
    service.name = row[2];
    service.price = row[3];
    service.duration = row[4];
    service.details = row[5];
    
    data.push(service);

  }
  return data;
}