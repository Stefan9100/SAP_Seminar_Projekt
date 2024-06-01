sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent"
 ], function(Controller,MessageToast,UIComponent){
    "use strict";
 
    return Controller.extend("ui5.walkthrough.controller.Home", {
        onInit: function() {
            
        },

        onPressNavBack: function() {
            UIComponent.getRouterFor(this).navTo("StartScreenView");
        },
        
        onDelete: function() {
            
            let productTable = this.getView().byId("productTable");
            let selectedItems = productTable.getSelectedItems();
            let productModel = this.getOwnerComponent().getModel("oData");

            if (selectedItems.length >= 1) {
                for (let i = 0; i < selectedItems.length; i++) {
                    let selectedItemsId = selectedItems[i].getBindingContext("oData").getProperty("Id");
                    let productId = `(guid'${selectedItemsId}')`;
                    console.log(productId);

                    let removePath = `/ZC_PRODUCTS${productId}`;
                    productModel.remove(removePath, {
                        success: function (data) {
                            MessageToast.show("Product(s) are removed from shopping list");
                        },
                        error: function (e) {
                            MessageToast.show("Somehting went wrong!");
                        }
                    })
                }
            } else {
                let noItemsSelectedMsg = "Please select products before trying to delete!";
                MessageBox.show(noItemsSelectedMsg);
            }


        }


    });
 });