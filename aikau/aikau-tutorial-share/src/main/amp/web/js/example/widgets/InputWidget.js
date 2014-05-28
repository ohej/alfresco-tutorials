define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dojo/_base/lang",
        "alfresco/buttons/AlfButton",
        "alfresco/forms/controls/DojoTextarea",
        "example/widgets/_TopicsMixin",
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/InputWidget.html"
    ],
    function(declare, _Widget, Core, lang, AlfButton, DojoTextarea, _TopicsMixin, _Templated, template) {
        return declare([_Widget, Core, _Templated, _TopicsMixin], {

            templateString: template,
            i18nRequirements: [ {i18nFile: "./i18n/PubSub.properties"} ],

            postCreate: function example_widgets_InputWidget__postCreate() {
                this.inherited(arguments);

                this.textArea = new DojoTextarea({
                   label: this.message("inputWidget.inputLabel")
                });
                this.textArea.placeAt(this.inputTopicNode);

                var btn = new AlfButton({
                    label: "Publish",
                    onClick: lang.hitch(this, '_onPublish')
                });
                btn.placeAt(this.publishTopicNode);

            },

            _onPublish: function example_widgets_InputWidget__onPublish() {
                this.alfPublish(this.TutorialTopic, this.textArea.getValue());
            }

        });
});