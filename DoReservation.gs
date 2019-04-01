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
      startDate.setDate(startDate.addDays(1));
    } else if (dayNumber == 6) { // start from next week if start day is Saturday
      startDate.setDate(startDate.addDays(2));
    } else if (dayNumber != 1) { // if the start date is not Monday (Tue-Fri), start from the previous Monday
      startDate.setDate(startDate.addDays(1 - dayNumber));
    }
    
    return startDate;
    
  } catch(e) {
    logException(e);
  }
}

function listSlots(id, start, allowToday)
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
      days.push(listOneDay(id, i, theDay, allowToday));
      theDay.setDate(theDay.addDays(1));
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

function listOneDay(service, dayNumberInWeek, thisDay, allowToday)
{
  var oneDay = {};
  var today = new Date();
  
  today.setHours(0, 0, 0, 0);

  oneDay.service = service;
  oneDay.dayNumberInWeek = dayNumberInWeek;
  oneDay.dayName = getDayName(thisDay);
  
  if (thisDay < today) {
    oneDay.when = "Past";
    oneDay.hours = createPastDay();
      
  } else if (today < thisDay) {
    oneDay.when = "Future";
    oneDay.hours = createFutureDay();
    
  } else {
    
    oneDay.when = "Today";
    
    if (allowToday) {
      oneDay.hours = createToday();
    } else {
      oneDay.hours = createPastDay();
    }
  }
  return oneDay;
}

function createToday()
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
      hours.push(createOneSlot(hour, isEmptySlot(hour)));
    }
  }
  Logger.log(hours);
  return hours;
}


function createFutureDay()
{
  var hours = [];
  
  for (hour = 8; hour <= 16; hour++) {
    hours.push(createOneSlot(hour, isEmptySlot(hour)));
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

function isEmptySlot(hour)
{
  var cal = CalendarApp.getCalendarById("vdl7a88r3mjp71c7gi90bl58t0@group.calendar.google.com");
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