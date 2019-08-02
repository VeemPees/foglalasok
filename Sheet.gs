// General sheet processing functions and helpers

// Fetch the header row from a sheet
function getHeaderRow(sheetName)
{
  var sh = getSheet(sheetName);

  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];  
}

// Fetch the data from a sheet without the header row
function getDataRows(sheetname)
{
  var sh = getSheet(sheetname);

  return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}

function getSpreadsheetUrl()
{
  
  var url = "https://docs.google.com/spreadsheets/d/";
  var propLiveDataSpreadsheetID = PropertiesService.getScriptProperties().getProperty("propLiveDataSpreadsheetID");
  
  url += propLiveDataSpreadsheetID;
  url += "/edit?";
  return url;
}

function openSpreadsheet()
{
  var url = getSpreadsheetUrl();
  var ss=SpreadsheetApp.openByUrl(url);
  return ss;
}

function getSheet(name)
{
  var ss = openSpreadsheet();
  var sheet = ss.getSheetByName(name);
  return sheet
}