function calcListStartDate(start)
{
  try {
    var startDate;
    
    startDate = new Date(start);
    
    var dayNumber = startDate.getDay();
    // dayNumber == 0 Sunday
    // dayNumber == 1 Monday
    // dayNumber == 6 Saturday
    
    if (dayNumber == 0) { // start from next week if start day is Sunday
      startDate.setDate(startDate.getDate() + 1);
    } else if (dayNumber == 6) { // start from next week if start day is Saturday
      startDate.setDate(startDate.getDate() + 2);
    } else if (dayNumber != 1) { // if the start date is not Monday (Tue-Fri), start from the previous Monday
      startDate.setDate(startDate.getDate() - dayNumber + 1);
    }
    
    return startDate;
    
  } catch(e) {
    logException(e);
  }
}

function listSlots(id, start)
{
  try {
    Logger.log("Listing slots for %s from %s", id, start);
    
    var slots = {};
    
    var days = [];
    
    var startDate;
    
    if (start == 0) {
      // Start from today
      startDate = calcListStartDate(new Date());
    } else {
      // Start from a given date, which is a Monday
      startDate = new Date(start);
    }
    
    // if it is not Monday, that's a problem, so return blanks
    if (startDate.getDay() != 1) {
      slots.errorCode = 1;
      slots.errorTxt = "Invalid start day, not a Monday";
      
      return slots;
    }
    
    var theDay = new Date(startDate);
    
    theDay.setHours(0, 0, 0, 0);
    for (i = 0; i < 5; i++) { // go from Monday through Friday
      days.push(listOneDay(id, i, theDay));
      theDay.setDate(theDay.getDate() + 1);
    }
    
    slots.days = days;
    slots.errorCode = 0;
    slots.errorTxt = "";
    return slots;
    
  } catch (e) {
    var slots = {};
    slots.errorCode = -1;
    slots.errorTxt = "Exception";
    return slots;
  }
}

function listOneDay(service, dayNumberInWeek, thisDay)
{
  var oneDay = {};
  var today = new Date();
  
  today.setHours(0, 0, 0, 0);

  oneDay.service = service;
  oneDay.dayNumberInWeek = dayNumberInWeek;
  if (thisDay < today) {
    oneDay.when = "Past";
  } else if (today < thisDay) {
    oneDay.when = "Future";
  } else {
    oneDay.when = "Today";
  }
  return oneDay;
}



