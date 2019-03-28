function testDates()
{
  var d = new Date();
  var d2 = new Date();
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d.setDate(d.getDate() + 1);
}

function testSlots()
{
  var r;
  
  r = listSlots(0, 0);
  
  var d = new Date();
  
  d.setDate(d.getDate() + 4);
  r = listSlots(0, d);
  
  d.setDate(d.getDate() + 1);
  r = listSlots(0, d);
  
  d.setDate(d.getDate() + 1);
  r = listSlots(0, d);
  
  d.setDate(d.getDate() + 1);
  r = listSlots(0, d);
  
  d.setDate(d.getDate() + 1);
  r = listSlots(0, d);
}
