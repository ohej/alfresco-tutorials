define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dojo/_base/lang",
        "example/widgets/_TopicsMixin",
        "dojo/dom-construct",
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/RenderWidget.html"
    ],
    function(declare, _Widget, Core, lang, _TopicsMixin, domConstruct, _Templated, template) {
        return declare([_Widget, Core, _TopicsMixin, _Templated], {

            templateString: template,
            i18nRequirements: [ {i18nFile: "./i18n/PubSub.properties"} ],

            buildRendering: function example_widgets_renderWidget__buildRendering() {
                this.renderWidgetHeading = this.message('renderWidget.heading');
                this.inherited(arguments);
            },

            postCreate: function example_widget_renderWidget__postCreate() {
                this.alfSubscribe(this.TutorialTopic, lang.hitch(this, "_onPayloadReceive"));
            },

            _onPayloadReceive: function example_widgets_renderWidget__onPayloadReceive(payload) {
                var txt = domConstruct.create( "p", { innerHTML: payload }, this.payloadContainer );
            }

        });
    });
