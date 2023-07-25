export default function settingsBill(){
    //string input
    var callInput = 0;
    var smsInput = 0;
    var warningInput = 0;
    var criticalInput = 0;
    var totalCallCost = 0;
    var totalSmsCost = 0;

    // get call cost from the textarea in the DOM
    function setCallCost(callCost){
        callInput = callCost;
    }
    
    function getCallCost(){
        return callInput;
    }

    // get sms cost from input section in the DOM
    function setSmsCost(smsCost){
        smsInput = smsCost;
    }
    
    function getSmsCost(){
        return smsInput
    }

    //get warning level from input section
    function setWarningLevel(warningLevel){
        warningInput = warningLevel;
    }

    function getWarningLevel(){
        return warningInput
    }

    //get critical level from input section
    function setCriticalLevel(criticalLevel){
        criticalInput = criticalLevel;
    }

    function getCriticalLevel(){
        return criticalInput
    }
    
    //use call values
    function useCall(){
        if(!critcalLevelIsReached()){
            totalCallCost += callInput;
        }
    }
    //use sms values
    function useSms(){
        if(!critcalLevelIsReached()){
            totalSmsCost += smsInput;
        }
    }
    //get total calls cost
    function getTotalCallCost(){
        return totalCallCost
    }

    //get total sms  cost
    function getTotalSmsCost(){
        return totalSmsCost
    }
    //get total for calls and smses
    function getTotalCost(){
        return totalCallCost + totalSmsCost;
    }

    //critcal level reached
    function critcalLevelIsReached(){
        return getTotalCost() >= getCriticalLevel()
    }
    //get warning 
    function addWarningClass(){
        if(getTotalCost() >= getWarningLevel()){
            return "warning"
        }
    }
    //get critical 
    function addDangerClass(){
        if(critcalLevelIsReached()){
            return "danger"
        }
    }
    //return all functions
    return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        useCall,
        useSms,
        getTotalCallCost,
        getTotalSmsCost,
        getTotalCost,
        addWarningClass,
        addDangerClass,
        critcalLevelIsReached,
    }
}