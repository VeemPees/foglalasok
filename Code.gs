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

function doGet(e) {
  
  try {
    
    /*
    **
    ** Developer mode has a different script ID and URL than the normal one
    ** 
    ** Published script 
    **
    */
    var _developerMode_ = true;
    
    if (_developerMode_) {
      Logger.log("Developer mode");
    } else {
      Logger.log("Normal mode");
    }
    
    // There is no op/action, so render the entire HTML page
    
    var template = HtmlService.createTemplateFromFile("TestHtmlHost");
    
    var propScriptID = "";
    var scriptUrl = "";
    
    if (_developerMode_) {
      
      //In develope mode there is a different URL and script ID
      
      //propScriptID = PropertiesService.getScriptProperties().getProperty("propDevScriptID");
      //scriptUrl = "https://script.google.com/macros/s/" + propScriptID + "/dev";
    } else {
      
      //In normale mode there is a different URL and script ID
      
      //propScriptID = PropertiesService.getScriptProperties().getProperty("propLiveScriptID");
      //scriptUrl = "https://script.google.com/macros/s/" + propScriptID + "/exec";
    }
    template.developerMode = _developerMode_;
    template.scriptUrl = scriptUrl;
    
    var html = template.evaluate();
    return html;
  } catch(e) {
    logException(e);
  }
}
