function fetchItems()
{
  try {
    var dataSet = {};
  
    dataSet.Items = buildData("Szolgáltatások");
    
    return dataSet;
  } catch(e) {
    logException(e);
  }
}

function buildData(sheetname)
{
  
  var rows = getDataRows(sheetname);
  
  var data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    
    var row     = rows[r];
    var record  = {};

    record.category = row[0];
    record.name = row[1];
    record.price = row[2];
    record.duration = row[3];
    
    data.push(record);

  }
  return data;
}