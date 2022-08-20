({
	doInit : function(component, event, helper) {
		
	},
    handleComplete : function(component, event, helper) {
        //component.set("v.checkValue1", !component.get("v.checkValue1"));
    },
    handleCompleteCancel : function(component, event, helper) {
        console.log('----showCompleteCancel----'+component.get("v.showCompleteCancel"));
        component.set("v.showCancelConfirmModal", true);
    },
    handleRadioChange : function(component, event, helper) {
        var changeValue = event.getParam("value");
        console.log('----changeValue----'+changeValue);
        if(changeValue == 'Yes'){
            component.set("v.showCompleteCancel", true);
        }else{
            component.set("v.showCompleteCancel", false);
        }
    },
    getValueFromLwc : function(component, event, helper) {
        console.log('-----getValueFromLwc------'+event.getParam('value'))
        component.set("v.showCancelConfirmModal", false);
    }

})