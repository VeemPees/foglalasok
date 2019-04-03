function calcListStartDate(start)
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
  endDate = startDate.addDays(5);
  
  return Utilities.formatDate(startDate, "GMT", "MMM dd") + " - " + Utilities.formatDate(endDate, "GMT", "MMM dd");
}


function listSlots(id, weekOffsetFromToday, allowToday)
{
  try {
    
    var startDate = calcListStartDate(new Date());
    
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
    
    var theDay = new Date(startDate);
    var days = [];
    
    theDay.setHours(0, 0, 0, 0);
    for (i = 0; i < 5; i++) { // go from Monday through Friday
      days.push(listOneDay(id, i, theDay, allowToday));
      theDay = theDay.addDays(1);
    }
    
    weekData.days = days;
    weekData.errorCode = 0;
    weekData.errorTxt = "";
    weekData.weekOffsetFromToday = weekOffsetFromToday;
    weekData.weekLabel = getWeekLabel(weekOffsetFromToday);
    return weekData;
    
  } catch (e) {
    logException(e);
    var weekData = {};
    weekData.errorCode = -1;
    weekData.errorTxt = "Exception";
    return weekData;
  }
}

function listOneDay(service, dayNumberInWeek, thisDay, allowToday)
{
  var oneDay = {};
  var today = new Date();
  var cal = CalendarApp.getCalendarById("vdl7a88r3mjp71c7gi90bl58t0@group.calendar.google.com");
  
  today.setHours(0, 0, 0, 0);

  oneDay.service = service;
  oneDay.dayNumberInWeek = dayNumberInWeek;
  oneDay.dayName = getDayName(thisDay);
  
  if (thisDay < today) {
    oneDay.when = "Past";
    oneDay.hours = createPastDay();
      
  } else if (today < thisDay) {
    oneDay.when = "Future";
    oneDay.hours = createFutureDay(cal);
    
  } else {
    
    oneDay.when = "Today";
    
    if (allowToday) {
      oneDay.hours = createToday(cal);
    } else {
      oneDay.hours = createPastDay();
    }
  }
  return oneDay;
}

function createToday(cal)
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
      hours.push(createOneSlot(hour, isEmptySlot(hour, cal)));
    }
  }
  
  return hours;
}


function createFutureDay(cal)
{
  var hours = [];
  
  for (hour = 8; hour <= 16; hour++) {
    hours.push(createOneSlot(hour, isEmptySlot(hour, cal)));
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
  
  slot.timeLabel = hour;
  slot.free = free;
  return slot;
}

function isEmptySlot(hour, cal)
{
  var events = cal.getEventsForDay(new Date());
  
  for (var i = 0; i < events.length; i++) {
    
    var event = events[i];
    var startTime = hour;
    var endTime = calcEndTimeForService(hour);
    
    if (endTime < event.getStartTime().getHours()) {
      continue;
    } else if (event.getEndTime().getHours() < startTime) {
      continue;
    //} else if (startTime <= event.getStartTime().getHours()) {
    //  continue;
    //} else if (startTime <= event.getEndTime().getHours()) {
    //  continue;
    //} else if (startTime < event.getStartTime().getHours() && event.getEndTime().getHours() < endTime) {
    //  continue;
    } else {
      return false;
    }
  }
  return true;
}

function calcEndTimeForService(hour)
{
  return hour + 1;
}