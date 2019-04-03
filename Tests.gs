function testDates()
{
  var d = new Date();
  var d2 = new Date();
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d = d.addDays(1);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  d = d.addDays(6);
  
  d2 = calcListStartDate(d);
  Logger.log("%s %s" , d, d2);
  
}

function testDayAdd()
{
  var d = new Date();
  var d2;
  
  d2 = d.addDays(1);
  d2 = d.addDays(-2);
  d2 = d.addDays(-1);
  
  d2 = calcListStartDate(d);
}

function testSlots()
{
  var r;

  // 0 service, from today, today is not allowed  
  r = listSlots(1, 0, false);
  if (r.errorCode != 0) {
    Logger.log(r.errorTxt);
  }
  
  // 0 service, from today, today is allowed  
  r = listSlots(0, 0, true);
  if (r.errorCode != 0) {
    Logger.log(r.errorTxt);
  }

}

function testDateString()
{
  var s = "";
  
  s = getDayName(new Date());
  Logger.log(s);
}
