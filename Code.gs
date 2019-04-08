// Use the Log tab of the reservation sheet (1DINbzvJkETop5xb8sdiT6Z4WVy7WQmB6QVb9cV606QQ) to capture logs
Logger = BetterLog.useSpreadsheet('1DINbzvJkETop5xb8sdiT6Z4WVy7WQmB6QVb9cV606QQ');

function onFormSubmit(e)
{
    try {
      Logger.log("Static test text");
    } catch (e) {
      logException(e);
    }
}

function testFetch()
{
  try {
    var par = {};
    par.action = "fetch";
    
    var p = {};
    p.parameter = par;
    
    doGet(p);
  } catch(e) {
    logException(e);
  }
}

function doGet(e) {
  
  try {
    
    /*
    **
    ** Developer mode has a different script ID and URL than the normal one
    ** 
    */
    var _developerMode_ = true;
    
    if (_developerMode_) {
      Logger.log("Developer mode");
    } else {
      Logger.log("Normal mode");
    }
    
    /* what to do
    **
    ** The action can be one of these: 'fetch', 'listSlots'
    **
    */
    var op = e.parameter.action;
    
    Logger.log("In doGet");
    
    if (op) {
      
      Logger.log("Operation is " + op);
      
      if (op == 'fetch') {
        
        var ds = fetchServices();
        
        Logger.log("DataSet built");
        
        var output  = ContentService.createTextOutput();
        
        output.setContent(JSON.stringify(ds));
        output.setMimeType(ContentService.MimeType.JSON);
        
        return output;
      }
      
      if (op == 'listSlots') {
        
        var ds = listSlots(e);
        
        Logger.log("Slot list built");
        
        var output  = ContentService.createTextOutput();
        
        output.setContent(JSON.stringify(ds));
        output.setMimeType(ContentService.MimeType.JSON);
        
        return output;
      }
      
    } else {
      
      // There is no op/action, so render the entire HTML page
      
      Logger.log("There is no op/action, so render the entire HTML page");
      
    
      var template = HtmlService.createTemplateFromFile("Main");
      
      var propScriptID = "";
      var scriptUrl = "";
      
      if (_developerMode_) {
        
        //In develope mode there is a different URL and script ID
        
        propScriptID = PropertiesService.getScriptProperties().getProperty("propDevScriptID");
        scriptUrl = "https://script.google.com/macros/s/" + propScriptID + "/dev";
      } else {
        
        //In normale mode there is a different URL and script ID
        
        propScriptID = PropertiesService.getScriptProperties().getProperty("propLiveScriptID");
        scriptUrl = "https://script.google.com/macros/s/" + propScriptID + "/exec";
      }
      template.developerMode = _developerMode_;
      template.scriptUrl = scriptUrl;
      
      var html = template.evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setTitle('Időpont foglalás');
      return html;
    }
  } catch(e) {
    logException(e);
  }
}
