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

var Route = {};
Route.path = function(route, callback) {
  Route[route] = callback;
}

function doGet(e) {
  
  try {
    
    /* what to do
    **
    ** The action can be one of these: 'fetch', 'fetchWeek'
    **
    */
    
    Route.path("sd", renderServiceDetailsPage);
           
    if (Route[e.parameters.op]) {
      return Route[e.parameters.op]();
    } else {
      return renderMainServiceListPage();
    }
  } catch(e) {
    logException(e);
  }
}

function renderServiceDetailsPage()
{
  return render("ServiceDetailsPage", null, 'Kezelés');
}

