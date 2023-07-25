// get refences to all the settings fields
var callCostSetting = document.querySelector('.callCostSetting');
var smsCostSetting = document.querySelector('.smsCostSetting');
var warningLevelSetting = document.querySelector('.warningLevelSetting');
var criticalLevelSetting = document.querySelector('.criticalLevelSetting');

//get reference to all the totals fields
var callTotalSettings = document.querySelector('.callTotalSettings');
var smsTotalSettings = document.querySelector('.smsTotalSettings');
var totalSettings = document.querySelector('.totalSettings');

//get a reference to the add button
var settingsAddButton = document.querySelector('.settingsAddButton');
//get a reference to the 'Update settings' button
var updateSettings = document.querySelector('.updateSettings');

// create a variables that will keep track of all the settings
var smsSettings = 0;
var callSettings = 0;
var warningLevel = 0;
var criticalLevel = 0;

// create a variables that will keep track of all three totals.
var settingsCallTotal = 0;
var settingsSmsTotal = 0;
var settingsTotal = 0;

//add an event listener for when the add button is pressed

//add an event listener for when the 'Update settings' button is pressed
// *in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the call / sms total
// * add the appropriate value to the overall total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen.
// * check the value thresholds and display the total value in the right color.
function calculateBillSettings(){
    var billItemTypeWithSettings = document.querySelector('input[name="billItemTypeWithSettings"]:checked');
    if(billItemTypeWithSettings){
        var settingsBillType = billItemTypeWithSettings.value;
    }

    settingsBillType.getCallCost()
    settingsBillType.getSmsCost()


    // if(settingsBillType === 'call' && settingsTotal < parseFloat(criticalLevelSetting.value)) {
    //     settingsCallTotal += parseFloat(callCostSetting.value)
    // }else if(settingsBillType = 'sms' && settingsTotal < parseFloat(criticalLevelSetting.value)){
    //     settingsSmsTotal += parseFloat(smsCostSetting.value)
    // }else{
    //     settingsTotal += 0;
    // }

    // callTotalSettings.innerHTML = settingsCallTotal.toFixed(2);
    // smsTotalSettings.innerHTML = settingsSmsTotal.toFixed(2);
    // settingsTotal = settingsCallTotal + settingsSmsTotal;
    // totalSettings.innerHTML = settingsTotal.toFixed(2);

    // //change colors
    // if(settingsTotal >= warningLevelSetting.value){
    //     totalSettings.classList.add('warning');
    // }    
    
    // if(settingsTotal >= criticalLevelSetting.value){
    //     totalSettings.classList.add('danger');
    // }
}

settingsAddButton.addEventListener("click", function(){
    calculateBillSettings();
});

//an added an event listener to update all settings
updateSettings.addEventListener("click", function(){
    // smsSettings = smsCostSetting.value 
    // callSettings = callCostSetting.value
    // warningLevel = warningLevelSetting.value
    // criticalLevel = criticalLevelSetting.value

    // if(warningLevelSetting.value >= settingsTotal){
    //     totalSettings.classList.remove('warning');
    // }    
    // if(criticalLevelSetting.value >= settingsTotal){
    //     totalSettings.classList.remove('danger');
    // }
});
