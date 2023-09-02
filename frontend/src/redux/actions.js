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