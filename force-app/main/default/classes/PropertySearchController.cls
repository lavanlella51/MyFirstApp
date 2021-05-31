public without sharing class PropertySearchController {
    //Git commit demo
    @AuraEnabled
    public static List<Property__c> getProperties(){
        return [SELECT Id, Name, Address__c, Age_of_Property__c, Apartment_Society__c, 
            Availability_Status__c, Available_From__c, Available_for__c, Built_Up_Area__c, Expected_Price__c, 
            Furnishing_Status__c, Apartment_Society__r.Name, Apartment_Society__r.Image_URL__c, 
            Apartment_Society__r.Description__c, Min_Budget_Forumula__c, Max_Budget_Forumula__c,
            Price_sqft__c,  
            Locality_Sector__c, Max_Budget__c, Min_Budget__c, No_of_Bathrooms__c, No_of_Bedrooms__c, 
            Plot_Area__c, Posted_On__c, Project_Type__c, Project_Title__c, Registered__c, Total_Floors__c 
            FROM Property__c WHERE Apartment_Society__r.Image_URL__c != null AND Price_sqft__c != null LIMIT 30];
    }
}
