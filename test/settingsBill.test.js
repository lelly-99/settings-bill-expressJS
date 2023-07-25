import assert from "assert";
import settingsBill from "../factory-functions/settingsBill.js";

describe ("Bill with settings", function(){
    //get the values
    describe('Get user inputs', function(){
        //test for call cost
        describe ("getCallCost", function (){
            it("should  be able to set the call cost of '2.75' ", function(){
                let billOne = settingsBill();
                billOne.setCallCost(2.75);
                assert.equal(2.75, billOne.getCallCost())
            })
    
            it("should  be able to set the call cost of '1.75'", function(){
                let billTwo = settingsBill();
                billTwo.setCallCost(1.75);
                assert.equal(1.75, billTwo.getCallCost())
            })
    
            it("should  be able to set the call cost of '2.50'", function(){
                let billThree = settingsBill();
                billThree.setCallCost(2.50);
                assert.equal(2.50, billThree.getCallCost())
            })
        })

        //test for sms cost 
        describe ("getSmsCost", function (){
            it("should  be able to set the sms cost of '0.25'", function(){
                let billOne = settingsBill();
                billOne.setSmsCost(0.25);
                assert.equal(0.25, billOne.getSmsCost())
            })
    
            it("should  be able to set the sms cost of '0.75'", function(){
                let billTwo = settingsBill();
                billTwo.setSmsCost(0.75);
                assert.equal(0.75, billTwo.getSmsCost())
            })
    
            it("should  be able to set the sms cost of '0.50'", function(){
                let billThree = settingsBill();
                billThree.setSmsCost(0.50);
                assert.equal(0.50, billThree.getSmsCost())
            })
        })

        //test for warning level
        describe ("getWarningLevel", function (){
            it("should  be able to set the warning level of '10'", function(){
                let warningOne = settingsBill();
                warningOne.setWarningLevel(10);
                assert.equal(10, warningOne.getWarningLevel())
            })
    
            it("should  be able to set the warning level of '15'", function(){
                let warningTwo = settingsBill();
                warningTwo.setWarningLevel(15);
                assert.equal(15, warningTwo.getWarningLevel())
            })
    
            it("should  be able to set the warning level of '20'", function(){
                let warningThree = settingsBill();
                warningThree.setWarningLevel(20);
                assert.equal(20, warningThree.getWarningLevel())
            })
        })
        //test for critical level
        describe ("getCriticalLevel", function (){
            it("should  be able to set the critical level of '20'", function(){
                let criticalOne = settingsBill();
                criticalOne.setCriticalLevel(20);
                assert.equal(20, criticalOne.getCriticalLevel())
            })
    
            it("should  be able to set the critical level of '25'", function(){
                let criticalTwo = settingsBill();
                criticalTwo.setCriticalLevel(25);
                assert.equal(25, criticalTwo.getCriticalLevel())
            })
    
            it("should  be able to set the critical level of '30'", function(){
                let criticalThree = settingsBill();
                criticalThree.setCriticalLevel(30);
                assert.equal(30, criticalThree.getCriticalLevel())
            })
        })
    })
    //use the values
    describe('use call and sms inputs to get totals', function(){
        //test for call totals
        describe ("getTotalCallCost", function (){
            it("should  be able to use the call cost for 2 calls at 2.75 each", function(){
                let callCostOne = settingsBill();
    
                callCostOne.setCallCost(2.75);
                callCostOne.setCriticalLevel(10)

                callCostOne.useCall();
                callCostOne.useCall();
    
                assert.equal(5.5, callCostOne.getTotalCallCost())
            })
    
            it("should  be able to use the call cost for 3 calls at 1.75 each", function(){
                let callCostTwo = settingsBill();
    
                callCostTwo.setCallCost(1.75)
                callCostTwo.setCriticalLevel(10)
               
                callCostTwo.useCall();
                callCostTwo.useCall();
                callCostTwo.useCall();
    
                assert.equal(5.25, callCostTwo.getTotalCallCost())
            })
    
            it("should  be able to use the call cost for 4 calls at 2.50 each", function(){
                let callCostThree = settingsBill();
    
                callCostThree.setCallCost(2.50)
                callCostThree.setCriticalLevel(15)
               
                callCostThree.useCall();
                callCostThree.useCall();
                callCostThree.useCall();
                callCostThree.useCall();
    
                assert.equal(10, callCostThree.getTotalCallCost())
            })
        })
        //test for sms totals
        describe ("getTotalSmsCost", function (){
            it("should  be able to use the sms cost for 2 smses at 0.75 each", function(){
                let smsCostOne = settingsBill();
    
                smsCostOne.setSmsCost(0.75);
                smsCostOne.setCriticalLevel(5)
               
                smsCostOne.useSms();
                smsCostOne.useSms();
    
                assert.equal(1.50, smsCostOne.getTotalSmsCost())
            })
    
            it("should  be able to use the sms cost for 3 smses at 0.50 each", function(){
                let smsCostTwo = settingsBill();
    
                smsCostTwo.setSmsCost(0.50);
                smsCostTwo.setCriticalLevel(5);
               
                smsCostTwo.useSms();
                smsCostTwo.useSms();
                smsCostTwo.useSms();
    
                assert.equal(1.50, smsCostTwo.getTotalSmsCost())
            })
    
            it("should  be able to use the sms cost for 4 smses at 0.25 each", function(){
                let smsCostThree = settingsBill();
    
                smsCostThree.setSmsCost(0.25)
                smsCostThree.setCriticalLevel(5)
               
                smsCostThree.useSms();
                smsCostThree.useSms();
                smsCostThree.useSms();
                smsCostThree.useSms();
    
                assert.equal(1, smsCostThree.getTotalSmsCost())
            }) 
        })
        //test for all totals
        describe ("getTotalCost", function (){
            it("should  be able to use the sms and call cost for 2 smses snd calls at 0.75 and 2.75 each respectively", function(){
                let totalCostOne = settingsBill();
    
                totalCostOne.setSmsCost(0.75);
                totalCostOne.setCallCost(2.75)
                totalCostOne.setCriticalLevel(15)
               
                totalCostOne.useSms();
                totalCostOne.useSms();
                totalCostOne.useCall();
                totalCostOne.useCall();
    
                assert.equal(7, totalCostOne.getTotalCost())
            })
    
            it("should  be able to use the sms and call cost for 3 smses snd calls at 0.75 and 2.75 each respectively", function(){
                let totalCostTwo = settingsBill();
    
                totalCostTwo.setSmsCost(0.75);
                totalCostTwo.setCallCost(2.75)
                totalCostTwo.setCriticalLevel(16)
               
                totalCostTwo.useSms();
                totalCostTwo.useSms();
                totalCostTwo.useCall();
                totalCostTwo.useCall();
                totalCostTwo.useSms();
                totalCostTwo.useCall();
    
                assert.equal(10.50, totalCostTwo.getTotalCost())
            })
    
            it("should  be able to use the sms and call cost for 4 smses snd calls at 0.35 and 2.25 each respectively", function(){
                let totalCostThree = settingsBill();
    
                totalCostThree.setSmsCost(0.35);
                totalCostThree.setCallCost(2.25);
                totalCostThree.setCriticalLevel(17);
               
                totalCostThree.useSms();
                totalCostThree.useSms();
                totalCostThree.useCall();
                totalCostThree.useCall();
                totalCostThree.useSms();
                totalCostThree.useSms();
                totalCostThree.useCall();
                totalCostThree.useCall();
    
                assert.equal(10.40, totalCostThree.getTotalCost())
            })
        })
    
    })
    //warning and critical level
    describe('add warning and critical classes', function(){
        //test for warning class
        describe("addWarningClass", function(){
            it('it should return the class name "warning" when total of 10 is reached', function(){
                let warningClassOne = settingsBill()
    
                warningClassOne.setCallCost(2.75);
                warningClassOne.setSmsCost(0.75);
                warningClassOne.setWarningLevel(10);
                warningClassOne.setCriticalLevel(15)
               
    
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useSms();
                warningClassOne.useSms();
                warningClassOne.useSms();
    
                assert.equal('warning', warningClassOne.addWarningClass())
            })
    
            it('it should return the class name "warning" when total of 15 is reached', function(){
                let warningClassOne = settingsBill()
    
                warningClassOne.setCallCost(1.95);
                warningClassOne.setSmsCost(0.85);
                warningClassOne.setWarningLevel(15);
                warningClassOne.setCriticalLevel(20)
               
    
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useSms();
                warningClassOne.useSms();
                warningClassOne.useSms();
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useSms();
    
                assert.equal('warning', warningClassOne.addWarningClass())
            })
    
            it('it should return the class name "warning" when total of 20 is reached', function(){
                let warningClassOne = settingsBill()
    
                warningClassOne.setCallCost(2.45);
                warningClassOne.setSmsCost(1.85);
                warningClassOne.setWarningLevel(20);
                warningClassOne.setCriticalLevel(30);
               
    
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useSms();
                warningClassOne.useSms();
                warningClassOne.useSms();
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useCall();
                warningClassOne.useSms();
    
                assert.equal('warning', warningClassOne.addWarningClass())
            })
        })
        //test for critical class
        describe("addDangerClass", function(){
            it('it should return the class name "danger" when total of 15 is reached', function(){
                let criticalClassOne = settingsBill()
    
                criticalClassOne.setCallCost(2.75);
                criticalClassOne.setSmsCost(0.75);
                criticalClassOne.setCriticalLevel(15);
               
    
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                
    
                assert.equal('danger', criticalClassOne.addDangerClass())
            })
    
            it('it should return the class name "danger" when total of 25 is reached', function(){
                let criticalClassOne = settingsBill()
    
                criticalClassOne.setCallCost(3.75);
                criticalClassOne.setSmsCost(0.25);
                criticalClassOne.setCriticalLevel(25);
               
    
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useSms();
                criticalClassOne.useCall();
                criticalClassOne.useSms();
                
    
                assert.equal('danger', criticalClassOne.addDangerClass())
            })
    
            it('it should return the class name "danger" when total of 35 is reached', function(){
                let criticalClassOne = settingsBill()
    
                criticalClassOne.setCallCost(3.75);
                criticalClassOne.setSmsCost(1.25);
                criticalClassOne.setCriticalLevel(35);
               
    
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                criticalClassOne.useCall();
                criticalClassOne.useCall();
                criticalClassOne.useSms();
                criticalClassOne.useSms();
                
    
                assert.equal('danger', criticalClassOne.addDangerClass())
            })
        })
        //both classes added
        describe("adding both classes at once", function(){
            it('it should return the class name "warning" and "danger" when total of 10 and 15 have been reached respectively', function(){
                let bothClassesOne = settingsBill()
    
                bothClassesOne.setCallCost(2.75);
                bothClassesOne.setSmsCost(0.75);
                bothClassesOne.setWarningLevel(10)
                bothClassesOne.setCriticalLevel(15);
               
    
                bothClassesOne.useCall();
                bothClassesOne.useCall();
                bothClassesOne.useCall();
                bothClassesOne.useSms();
                bothClassesOne.useSms();
                bothClassesOne.useSms();
                bothClassesOne.useCall();
                bothClassesOne.useCall();
                bothClassesOne.useCall();
                bothClassesOne.useSms();
                bothClassesOne.useSms();
                bothClassesOne.useSms();
                

                assert.equal('warning', bothClassesOne.addWarningClass())
                assert.equal('danger', bothClassesOne.addDangerClass())
            })

            it('it should return the class name "warning" and "danger" when total of 15 and 25 have been reached respectively', function(){
                let bothClassesTwo = settingsBill()
    
                bothClassesTwo.setCallCost(2.75);
                bothClassesTwo.setSmsCost(0.75);
                bothClassesTwo.setWarningLevel(15)
                bothClassesTwo.setCriticalLevel(25);
               
    
                bothClassesTwo.useCall();
                bothClassesTwo.useCall();
                bothClassesTwo.useSms();
                bothClassesTwo.useCall();
                bothClassesTwo.useCall();
                bothClassesTwo.useCall();
                bothClassesTwo.useSms();
                bothClassesTwo.useSms();
                bothClassesTwo.useCall();
                bothClassesTwo.useSms();
                bothClassesTwo.useCall();
                bothClassesTwo.useCall();
                bothClassesTwo.useCall();
                bothClassesTwo.useSms();
                bothClassesTwo.useSms();
                
                assert.equal('warning', bothClassesTwo.addWarningClass())
                assert.equal('danger', bothClassesTwo.addDangerClass())
            })

            it('it should return the class name "warning" and "danger" when total of 25 and 35 have been reached respectively', function(){
                let bothClassesThree = settingsBill()
    
                bothClassesThree.setCallCost(2.75);
                bothClassesThree.setSmsCost(0.75);
                bothClassesThree.setWarningLevel(25)
                bothClassesThree.setCriticalLevel(35);
               
    
                bothClassesThree.useCall();
                bothClassesThree.useCall();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useCall();
                bothClassesThree.useCall();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useCall();
                bothClassesThree.useCall();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useCall();
                bothClassesThree.useCall();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useCall();
                bothClassesThree.useCall();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                bothClassesThree.useSms();
                
                assert.equal('warning', bothClassesThree.addWarningClass())
                assert.equal('danger', bothClassesThree.addDangerClass())
            })
        })
        describe('stop total cost when critical is reached', function(){
            it('should stop adding total cost when critial level 10 is reached', function(){
                var stopTotalOne = settingsBill()

                stopTotalOne.setCallCost(2.75);
                stopTotalOne.setSmsCost(0.75);
                stopTotalOne.setWarningLevel(5)
                stopTotalOne.setCriticalLevel(10);


                stopTotalOne.useCall();
                stopTotalOne.useCall();
                stopTotalOne.useSms();
                stopTotalOne.useSms();
                stopTotalOne.useCall();
                stopTotalOne.useSms();

                assert.equal(10.5, stopTotalOne.getTotalCost());
                assert.equal('danger', stopTotalOne.addDangerClass());
                assert.equal('warning', stopTotalOne.addWarningClass());
            })

            it('should stop adding total cost when critial level 15 is reached', function(){
                var stopTotalTwo = settingsBill()

                stopTotalTwo.setCallCost(2.75);
                stopTotalTwo.setSmsCost(0.75);
                stopTotalTwo.setWarningLevel(10);
                stopTotalTwo.setCriticalLevel(15);


                stopTotalTwo.useCall();
                stopTotalTwo.useCall();
                stopTotalTwo.useSms();
                stopTotalTwo.useSms();
                stopTotalTwo.useCall();
                stopTotalTwo.useSms();
                stopTotalTwo.useSms();
                stopTotalTwo.useSms();
                stopTotalTwo.useCall();
                stopTotalTwo.useSms();
                stopTotalTwo.useSms();
                stopTotalTwo.useSms();
                stopTotalTwo.useCall();

                assert.equal(15.5, stopTotalTwo.getTotalCost());
                assert.equal('danger', stopTotalTwo.addDangerClass());
                assert.equal('warning', stopTotalTwo.addWarningClass());
            })

            it('should stop adding total cost when critial level 25 is reached', function(){
                var stopTotalThree = settingsBill()

                stopTotalThree.setCallCost(2.75);
                stopTotalThree.setSmsCost(0.75);
                stopTotalThree.setWarningLevel(15);
                stopTotalThree.setCriticalLevel(25);


                stopTotalThree.useCall();
                stopTotalThree.useCall();
                stopTotalThree.useSms();
                stopTotalThree.useSms();
                stopTotalThree.useCall();
                stopTotalThree.useSms();
                stopTotalThree.useSms();
                stopTotalThree.useSms();
                stopTotalThree.useCall();
                stopTotalThree.useSms();
                stopTotalThree.useSms();
                stopTotalThree.useSms();
                stopTotalThree.useCall();
                stopTotalThree.useSms();
                stopTotalThree.useCall();
                stopTotalThree.useSms();
                stopTotalThree.useSms();
                stopTotalThree.useSms();
                stopTotalThree.useCall();

                assert.equal(25.5, stopTotalThree.getTotalCost());
                assert.equal('danger', stopTotalThree.addDangerClass());
                assert.equal('warning', stopTotalThree.addWarningClass());
            })
        })
    })
});