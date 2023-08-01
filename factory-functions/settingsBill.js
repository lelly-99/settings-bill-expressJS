export default function settingsBill() {
  var callInput = 0;
  var smsInput = 0;
  var warningInput = 0;
  var criticalInput = 0;
  var totalCallCost = 0;
  var totalSmsCost = 0;
  var actionList = [];
  var cost = 0;

  function setCallCost(callCost) {
    callInput = callCost;
  }

  function getCallCost() {
    return callInput;
  }

  function setSmsCost(smsCost) {
    smsInput = smsCost;
  }

  function getSmsCost() {
    return smsInput;
  }

  function setWarningLevel(warningLevel) {
    warningInput = warningLevel;
  }

  function getWarningLevel() {
    return warningInput;
  }

  function setCriticalLevel(criticalLevel) {
    criticalInput = criticalLevel;
  }

  function getCriticalLevel() {
    return criticalInput;
  }
  //use call values
  function useCall() {
    if (!critcalLevelIsReached()) {
      totalCallCost += callInput;
    }
  }
  //use sms values
  function useSms() {
    if (!critcalLevelIsReached()) {
      totalSmsCost += smsInput;
    }
  }

  function getTotalCallCost() {
    return totalCallCost.toFixed(2);
  }

  function getTotalSmsCost() {
    return totalSmsCost.toFixed(2);
  }

  function getTotalCost() {
    return totalCallCost + totalSmsCost;
  }

  function critcalLevelIsReached() {
    return getTotalCost() >= getCriticalLevel();
  }

  function addWarningClass() {
    if (getTotalCost() >= getWarningLevel()) {
      return "warning";
    }
  }
  function addDangerClass() {
    if (critcalLevelIsReached()) {
      return "danger";
    }
  }
  
  function setSettings(settings) {
    setCallCost(settings.callCost);
    setSmsCost(settings.smsCost);
    setWarningLevel(settings.warningLevel);
    setCriticalLevel(settings.criticalLevel);
  }

  function getSettings() {
    return {
      callCost: getCallCost(),
      smsCost: getSmsCost(),
      warningLevel: getWarningLevel(),
      criticalLevel: getCriticalLevel(),
    };
  }

  function totals() {
    const totalCalls = getTotalCallCost();
    const totalSmses = getTotalSmsCost();
    const overallTotal = getTotalCost().toFixed(2);

    return {
      totalCalls,
      totalSmses,
      overallTotal,
    };
  }
  // displayed in a table in actions
  function callAction(action, callInput, smsInput) {
    if (action === "call") {
      useCall();
      cost = callInput;
    } else if (action === "sms") {
      useSms();
      cost = smsInput;
    }
 
    if (cost > 0) {
      actionList.push({
        type: action,
        cost: cost.toFixed(2),
        timestamp: new Date(),
      });
    }
  }
  
  function actions() {
    return actionList
  }

  // Return only the actions for a specific type
  function actionsFor(type) {
    return actionList.filter((action) => action.type === type);
  }

  return {
    actions,
    actionsFor,
    callAction,
    totals,
    setSettings,
    getSettings,
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
  };
}
