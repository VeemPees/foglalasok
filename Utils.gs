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

function loadImageBytes()
{
    var id = PropertiesService.getScriptProperties().getProperty("propLogoID");
    var bytes = DriveApp.getFileById(id).getBlob().getBytes();
    return Utilities.base64Encode(bytes);
}

function render(file, args, title)
{
  var template = HtmlService.createTemplateFromFile(file);
  
  if (args) {
    var k = Object.keys(args);
    k.forEach(function(key) {
     template[key] = args[key]; 
    });
  }
  
  var html = template.evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setTitle(title);
  return html;
}
