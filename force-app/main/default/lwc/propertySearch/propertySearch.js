import { LightningElement, track, api, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import getProperties from '@salesforce/apex/PropertySearchController.getProperties';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import TYPE_FIELD from '@salesforce/schema/Property__c.Project_Type__c';
import CONSTRUCTION_STATUS_FIELD from '@salesforce/schema/Property__c.Availability_Status__c';

export default class PropertySearch extends LightningElement {

    @api flexipageRegionWidth;
    isMobile = false;
    showSpinner = false;
    @track properties;
    @track propertyTypeOptions;
    @track constructionStatusOptions;
    @track bhkOptions;

    connectedCallback(){
        this.bhkOptions = 
        [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
        ];
        this.fetchProperties();        
    }

    /* As record type id is mandatory, if we need specific we can pass that id*/
    /* Here just to get default values provided below invalid id, getObjectInfo is not working for task */
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', 
    fieldApiName: TYPE_FIELD })
    setTypePicklistOptions({error, data}) {
        if (data) {
            this.propertyTypeOptions = data.values;            
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', 
    fieldApiName: CONSTRUCTION_STATUS_FIELD })
    setStatusPicklistOptions({error, data}) {
        if (data) {
            this.constructionStatusOptions = data.values;            
        } else if (error) {
            this.error = error;
        }
    }

    fetchProperties(){
        this.showSpinner = true;
        this.properties = [];
        getProperties({}).then(response =>{
            this.properties = response;
            this.showSpinner = false;
        }).catch(error =>{
            this.showSpinner = false;
            this.showToast('Something went wrong. Please try later.','error','Error!');
            this.error = error;            
        })
    }

    showToast(message, variant, title){
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    applyFilters(){
        
    }
    
    /*
    
    showPopover = false;
    orderData = [];

    connectedCallback(){
        this.orderData = [
            {"orderType":"Mixed", "OrderId":"123445", "orderStatus":"Cancelled", "externalOrderId":"99220469", "orderSubmittedDateTime":"2022-06-16T12:45:09-04:00"},
            {"orderType":"Mixed", "OrderId":"4534543", "orderStatus":"Cancelled", "externalOrderId":"4345444", "orderSubmittedDateTime":"2022-06-19T12:45:09-04:00"}
        ];
    }

    openPopover(event){
        console.log('---class---'+event.target.className);        
        const elements = this.template.querySelectorAll("."+event.target.className);
        if (elements) {
            elements.forEach(e => {
                console.log('--------'+e.className);
                console.log('--------'+e.classList);
                if(e.classList.contains("hover-modal")){
                    e.style.display = "inline";
                }
            });
        }
    }

    closePopover(event){
        const elements = this.template.querySelectorAll("."+event.target.className);
        if (elements) {
            elements.forEach(e => {
                console.log('--------'+e.className);
                console.log('--------'+e.classList);
                if(e.classList.contains("hover-modal")){
                    e.style.display = "none";
                }
            });
        }
    }
    
    
    */
}
