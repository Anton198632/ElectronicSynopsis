export const setConnectionState = (isConnect) => (
    {type: 'SET_CONNECTION_STATE', isConnect}
)

export const setUser = (user) => (
    {type: "SET_USER", user}
)

export const setSections = (sections) => (
    {type: "SET_SECTIONS", sections}
)

export const setSectionIcon = (sectionId, iconPath) => (
    {type: "SET_SECTION_ICON", sectionId, iconPath}
)

export const addSection = (section) => (
    {type: "ADD_SECTION", section}
)

export const setSelectedSection = (section) => (
    {type: "SET_SELECTED_SECTION", section}
)

 export const setItemsList = (items) => (
    {type: "SET_ITEMS_LIST", items}
 )

 export const setItemsListWidth = (width) => (
    {type: "SET_ITEMS_LIST_WIDTH", width}
 )

 export const setItemIcon = (id, iconValue) => (
    {type: "SET_ITEM_ICON", id, iconValue}
 )

 export const setItemMenuCoords = (coords) => (
    {type: "SET_ITEM_MENU_COORDS", coords}
 )

 export const setSelectedItem = (item) => (
    {type: "SET_SELECTED_ITEM", item}
 )

 export const setShowAddItemWindow = (isShow) => (
    {type: "SHOW_ADD_ITEM_WINDOW", isShow}
 )