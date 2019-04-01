// Write a nicely formatted log from a string or exception type. Put this into the catch 
function logException(e) {
  e = (typeof e === 'string') ? new Error(e) : e;
  Logger.severe('%s: %s (line %s, file "%s"). Stack: "%s" . ',e.name||'', 
             e.message||'', e.lineNumber||'', e.fileName||'', e.stack||'');
}

// For some reason this is either missing or not implemented the way is should be, so adding here as a utility function

function include(File) {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
};

//function getDayName(date, locale)
//{
//    var date = new Date(date);
//    return date.toLocaleDateString(locale, { weekday: 'long' });        
//}

function getDayName(date)
{
    var weekdays = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
    return weekdays[date.getDay()];
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function t()
{
  var cal = CalendarApp.getCalendarById("vdl7a88r3mjp71c7gi90bl58t0@group.calendar.google.com");
  var events = cal.getEventsForDay(new Date());
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    Logger.log('%s: %s - %s', event.getTitle(), event.getStartTime(), event.getEndTime());
  }
}
