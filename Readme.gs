// Reservation Sheet ID = <propLiveDataSpreadsheetID>
// Live script URL: https://script.google.com/macros/s/<propLiveScriptID>/exec
// Live script ID: <propLiveScriptID>
// Dev script URL: https://script.google.com/macros/s/<propDevScriptID>/dev
// Dev script ID: <propDevScriptID>
// Executable API: MaXKv1Y9EKq_uH_oGSum4YPVtukfi2slr

/*
BetterLog
    https://github.com/peterherrmann/BetterLog
Setup
    This library is already published as an Apps Script:
    Click on the menu item "Resources > Libraries..."
    In the "Find a Library" text box, enter the project key MYB7yzedMbnJaMKECt6Sm7FLDhaBgl_dE and click the "Select" button.
    Logger = BetterLog.useSpreadsheet('your-spreadsheet-key-goes-here');
    function myFunction() {
  try {
    //Now you can log and it will also log to the spreadsheet
    Logger.log("That's all you need to do");  
    // Do something
    
  } catch (e) { //with stack tracing if your exceptions bubble up to here
    e = (typeof e === 'string') ? new Error(e) : e;
    Logger.severe('%s: %s (line %s, file "%s"). Stack: "%s" . While processing %s.',e.name||'', 
               e.message||'', e.lineNumber||'', e.fileName||'', e.stack||'');
    throw e;
  }
  
  Logger.severe(message, optValues);
  Logger.warning(message, optValues);
  Logger.info(message, optValues);
  
  //Best practice for using BetterLog and logging to a spreadsheet: 
  // You can add and set the property "BetterLogLevel" in File > Project Properties and change it to
  // "OFF","SEVERE","WARNING","INFO","CONFIG","FINE","FINER","FINEST" or "ALL" at runtime without editing code.
  Logger = BetterLog.setLevel(ScriptProperties.getProperty('BetterLogLevel')) //defaults to 'INFO' level
  Logger.log('Messages using Logger.log continue to work');
  Logger.config('The current log level is %s', Logger.getLevel());
  Logger.finer('Entering the "%s" function', arguments.callee.name); //only logged if level is FINER, FINEST or ALL.
  Logger.finest('Inside the for loop that does the xyz work. i is currently: %d', i);
  
}
*/