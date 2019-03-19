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
