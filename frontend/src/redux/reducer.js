import { sortByPk } from "./actions"


const firstInit = {

    connection: true,

    user: {
        id: 1,
        username: "Anton",
        first_name: "",
        is_admin: true,
        avatar: "1.jpg"
    },

    sections: [
        // {id: 1, title: "Алгебра", icon: "555.png"},
        // {id: 1, title: "Геометрия", icon: ""},
        // {id: 1, title: "Физика", icon: ""},
        // {id: 1, title: "Химия", icon: ""},

    ],

       
}



export const reducer = (state = firstInit, action) => {

    switch (action.type){

        
        case "SET_CONNECTION_STATE":
            return {
                ...state, connection: action.isConnect
            }

        case "SET_USER":
            return { ...state, user: action.user }

        case "SET_SECTIONS":
            return {...state, sections: action.sections}

        case "SET_SECTION_ICON":
            const iSections = state.sections.map(section => {
                if (section.id === action.sectionId)
                    return {...section, icon: action.iconPath}

                return section
            })

            console.log(iSections);

            return {...state, sections: iSections}

        case "ADD_SECTION":
            const sections = state.sections

            sections.push(action.section)

            return {...state, sections: sections}

        
        default:
            return state;
    }
}