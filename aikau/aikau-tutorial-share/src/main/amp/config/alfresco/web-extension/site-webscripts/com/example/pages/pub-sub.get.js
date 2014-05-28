model.jsonModel = {
    widgets: [{
        id: "SET_PAGE_TITLE",
        name: "alfresco/header/SetTitle",
        config: {
            title: "Pub/sub example"
        }
    },
    {
        name: "alfresco/layout/HorizontalWidgets",
        config: {
            widgetWidth: 50,
            widgets: [
                {
                    name: "example/widgets/InputWidget"
                },
                {
                    name: "example/widgets/RenderWidget"
                }
            ]
        }
    }]
};