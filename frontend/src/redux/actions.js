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

 export const setData = (data) => (
   {type: "SET_DATA", data}
 )

 export const setCurrentEditTextNumder = (num) => (
   {type: "SET_CURRENT_EDIT_TEXT_NUMBER", num}
 )

 export const setTextEditMenuCoords = (coords) => (
    {type: "SET_TEXT_EDIT_MENU_COORDS", coords}
 )

 export const setTextEditMenuFont = (font) => (
    {type: "SET_TEXT_EDIT_MENU_FONT", font}
 )

 export const addTextFieldToData = () => (
   {type: "ADD_TEXT_FIELD_TO_DATA",}
 )

 export const addImageFieldData = (imagePath) => (
   {type: "ADD_IMAGE_FIELD_TO_DATA", imagePath}
 )

 export const rewriteTextData = (orderId, text) => (
   {type: "REWRITE_TEXT_DATA", orderId, text}
 )