/*
 * Copied from https://issues.alfresco.com/jira/browse/ALF-19930
 * because of https://issues.alfresco.com/jira/browse/ALF-20384
 * For 4.2.e it's simply not possible to remove stuff from the header
 */
function findAndRemoveIn(obj, arrContext, arrIdx, id) {
    var idx, max, key;
    if (obj !== undefined && obj !== null) {
        if (Object.prototype.toString.apply(obj) === "[object Object]") {
            if (obj.hasOwnProperty("id") && obj.id === id) {
                if (arrContext !== null && arrIdx !== null)
                {
                    arrContext.splice(arrIdx, 1);
                }
                else
                {
                    logger.debug("Unexpected match outside of array structure: " + jsonUtils.toJSONString(obj));
                }
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key))
                    {
                        findAndRemoveIn(obj[key], null, null, id);
                    }
                }
            }
        } else if (Object.prototype.toString.apply(obj) === "[object Array]") {
            for (idx = 0, max = obj.length; idx < max; idx++)
            {
                findAndRemoveIn(obj[idx], obj, idx, id);
            }
        }
    }
}


var headerMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_APP_MENU_BAR");

if (headerMenu != null) {
    /* Add menu item to My profile */
    headerMenu.config.widgets.push({
        id: "HEADER_CUSTOM_PROFILE_LINK",
        name: "alfresco/menus/AlfMenuBarItem",
            config: {
                label: "My profile",
                targetUrl: "user/" + encodeURIComponent(user.name) + "/profile"
            }
    });

    /* Dropdown example */
    headerMenu.config.widgets.push({
        id: "HEADER_CUSTOM_DROPDOWN",
        name: "alfresco/header/AlfMenuBarPopup",
        config: {
            label: "Dropdown",
            widgets: [
                {
                    name: "alfresco/menus/AlfMenuBarItem",
                    config: {
                        label: "Link #1",
                        targetUrl: "/"
                    }
                }
            ]
        }
    });

    /* Remove Shared files */
    findAndRemoveIn(model.jsonModel.widgets, null, null, "HEADER_SHARED_FILES");
}

/* Add link on user dashboard */
if (page.titleId == "page.userDashboard.title") {
    var navMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_NAVIGATION_MENU_BAR");
    if (navMenu != null) {
        navMenu.config.widgets.push({
            name: "alfresco/menus/AlfMenuBarItem",
            config: {
                label: "Custom link"
            }
        });
    }
}



