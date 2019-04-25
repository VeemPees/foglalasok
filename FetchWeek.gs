function calcWeekStartDate(start)
{
  try {
    var startDate = new Date();
    var today;
    
    today = new Date(start);
    
    var dayNumber = today.getDay();
    // dayNumber == 0 Sunday
    // dayNumber == 1 Monday
    // dayNumber == 6 Saturday
    
    if (dayNumber == 0) { // start from next week if start day is Sunday
      startDate = startDate.addDays(1);
      Logger.log("Start from next week if start day is Sunday");
    } else if (dayNumber == 6) { // start from next week if start day is Saturday
      Logger.log("Start from next week if start day is Saturday");
      startDate = startDate.addDays(2);
    } else if (dayNumber != 1) { // if the start date is not Monday (Tue-Fri), start from the previous Monday
      Logger.log("Start from the previous Monday");
      startDate = startDate.addDays(1 - dayNumber);
    }
    
    return startDate;
    
  } catch(e) {
    logException(e);
  }
}

function getWeekLabel(weekOffsetFromToday)
{
  var startDate = new Date();
  var endDate;
  
  if (weekOffsetFromToday > 0) {
    startDate = startDate.addDays(7 * weekOffsetFromToday);
  }
  
  if (startDate.getDay() != 1) {
    startDate = startDate.addDays(1 - startDate.getDay());
  }
  endDate = startDate.addDays(4);
  
  return Utilities.formatDate(startDate, "GMT", "MMM dd") + " - " + Utilities.formatDate(endDate, "GMT", "MMM dd");
}


function fetchWeek(serviceID, weekOffsetFromToday, allowToday)
{
  try {
    
    var startDate = calcWeekStartDate(new Date());
    
    if (weekOffsetFromToday == 0) {
      // Start from today
      Logger.log("Starting from today");
    } else {
      // Start from a given date, which is a Monday
      Logger.log("Starting from a given day");
      startDate = startDate.addDays(7 * weekOffsetFromToday);
    }
    
    Logger.log("Checking if the start day is Monday");
    
    var weekData = {};
    
    if (startDate.getDay() != 1) { // if it is not Monday, that's a problem, so return blanks
      weekData.errorCode = 1;
      weekData.errorTxt = "Invalid start day, not a Monday";
      Logger.log("Invalid start day, not a Monday");
      return weekData;
    }
    
    Logger.log("Monday confirmed compiling free slots");
    
    var cal = {};
    
    //cal = CalendarApp.getCalendarById("vdl7a88r3mjp71c7gi90bl58t0@group.calendar.google.com");
    
    var theDay = new Date(startDate);
    var days = [];
    
    theDay.setHours(0, 0, 0, 0);
    for (i = 0; i < 5; i++) { // go from Monday through Friday
      days.push(listOneDay(serviceID, i, theDay, allowToday, cal));
      theDay = theDay.addDays(1);
    }
    
    weekData.days = days;
    weekData.errorCode = 0;
    weekData.errorTxt = "";
    weekData.weekOffsetFromToday = weekOffsetFromToday;
    weekData.weekLabel = getWeekLabel(weekOffsetFromToday);
    if (weekData.weekOffsetFromToday > 0) {
      // next or later week, so Monday is the one to highlight
      weekData.dayOffsetToHighlight = 0;
    } else {
      // this week, so today is in the Mon-Fri range for sure (Sat/Sun would mean positive week offset
      var today = new Date();

      // getDay == 0 Sunday
      // getDay == 1 Monday
      // getDay == 6 Saturday
      
      weekData.dayOffsetToHighlight = today.getDay() - 1;
    }
    return weekData;
    
  } catch (e) {
    logException(e);
    var weekData = {};
    weekData.errorCode = -1;
    weekData.errorTxt = "Exception";
    return weekData;
  }
}

function listOneDay(serviceID, dayNumberInWeek, thisDay, allowToday, cal)
{
  var oneDay = {};
  var today = new Date();
  
  today.setHours(0, 0, 0, 0);

  oneDay.serviceID = serviceID;
  oneDay.dayNumberInWeek = dayNumberInWeek;
  oneDay.dayName = getDayName(thisDay);
  oneDay.dayYear = thisDay.getFullYear();
  oneDay.dayMonthIndex = thisDay.getMonth();
  oneDay.dayDay = thisDay.getDate();
  
  if (thisDay < today) {
    oneDay.when = "Past";
    oneDay.hours = createPastDay();
      
  } else if (today < thisDay) {
    oneDay.when = "Future";
    oneDay.hours = createFutureDay(serviceID, cal);
    
  } else {
    
    oneDay.when = "Today";
    
    if (allowToday) {
      oneDay.hours = createToday(serviceID, cal);
    } else {
      oneDay.hours = createPastDay();
    }
  }
  return oneDay;
}

function createToday(serviceID, cal)
{
  var hours = [];
  var today = new Date();
  var thisHour = today.getHours();
  var hour = 0;
  
  thisHour = 11;
  for (hour = 8; hour <= 16; hour++) {
    if (hour <= thisHour) {
      hours.push(createOneSlot(hour, false));
    } else {
      hours.push(createOneSlot(hour, isEmptySlot(serviceID, hour, cal)));
    }
  }
  
  return hours;
}


function createFutureDay(serviceID, cal)
{
  var hours = [];
  
  for (hour = 8; hour <= 16; hour++) {
    hours.push(createOneSlot(hour, isEmptySlot(serviceID, hour, cal)));
  }
  return hours;
}

function createPastDay()
{
  var hours = [];
  
  for (hour = 8; hour <= 16; hour++) {
    hours.push(createOneSlot(hour, false));
  }
  return hours;
}

function createOneSlot(hour, free)
{
  var slot = {};
  
  if (hour < 10) {
    slot.timeLabel = "0" + hour;
  } else {
    slot.timeLabel = hour;
  }
  slot.timeLabel += ":00";
  slot.timeRaw = hour;
  slot.free = free;
  return slot;
}

function isEmptySlot(serviceID, hour, cal)
{
//  var events = cal.getEventsForDay(new Date());
//  
//  for (var i = 0; i < events.length; i++) {
//    
//    var event = events[i];
//    var startTime = hour;
//    var endTime = calcEndTimeForService(serviceID, hour);
//    
//    if (endTime < event.getStartTime().getHours()) {
//      continue;
//    } else if (event.getEndTime().getHours() < startTime) {
//      continue;
//    //} else if (startTime <= event.getStartTime().getHours()) {
//    //  continue;
//    //} else if (startTime <= event.getEndTime().getHours()) {
//    //  continue;
//    //} else if (startTime < event.getStartTime().getHours() && event.getEndTime().getHours() < endTime) {
//    //  continue;
//    } else {
//      return false;
//    }
//  }
  return true;
}

function calcEndTimeForService(serviceID, hour)
{
  return hour + 1;
}