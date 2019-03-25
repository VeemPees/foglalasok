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

    record.id = row[0]
    record.category = row[1];
    record.name = row[2];
    record.price = row[3];
    record.duration = row[4];
    record.details = row[5];
    
    data.push(record);

  }
  return data;
}