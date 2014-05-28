define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core"
    ],
    function(declare, _Widget, Core) {
        return declare([_Widget, Core], {

            postCreate: function example_widgets_MyWidget__postCreate() {
                this.inherited(arguments);
	        alert("Hello world!");
            }

        });
});