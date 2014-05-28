define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "alfresco/core/CoreXhr",
        "dojo/dom-construct",
        "dojo/_base/array",
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/AjaxWidget.html"
    ],
    function(declare, _Widget, Core, AlfCoreXhr, domConstruct, array, _Templated, template) {
        return declare([_Widget, Core, AlfCoreXhr, _Templated], {
            templateString: template,
            cssRequirements: [{cssFile:"./css/AjaxWidget.css"}],
            i18nRequirements: [ {i18nFile: "./i18n/AjaxWidget.properties"} ],

            buildRendering: function example_widgets_AjaxWidget__buildRendering() {
                this.widgetTitle       = this.message('widgetTitle');
                this.columnName        = this.message('columnName');
                this.columnDescription = this.message('columnDescription');
                this.inherited(arguments);
            },

            postCreate: function example_widgets_AjaxWidget__postCreate() {
                var url = Alfresco.constants.PROXY_URI + "slingshot/doclib/treenode/node/alfresco/company/home";
                this.serviceXhr({url : url,
                                 method: "GET",
                                 successCallback: this._onSuccessCallback,
                                 callbackScope: this});
            },

            _onSuccessCallback: function example_widgets_AjaxWidget__onSuccessCallback(response, config) {
                if (response.totalResults != undefined && response.totalResults > 0) {
                    var parentNode = this.containerNode;
                    array.forEach( response.items, function(item) {
                        var row = domConstruct.create( "tr", {}, parentNode );
                        domConstruct.create( "td", { innerHTML: item.name }, row);
                        domConstruct.create( "td", { innerHTML: item.description }, row);
                    });
                }
            }
        });
});