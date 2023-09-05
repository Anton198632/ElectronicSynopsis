import { sortByPk } from "./actions"


const firstInit = {

    connection: true,

    theme: "light",

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

    selectedSection: {id: 1, title: "Алгебра", icon: "555.png"},

    items: [
        {
            "id": 1,
            "title": "1. Основы алгебры",
            "icon": "",
            "childs": [
                {
                    "id": 2,
                    "title": "1.01. Косинус",
                    "icon": "",
                    "childs": [
                        {
                            "id": 4,
                            "title": "1.1.01 Определение косинуса",
                            "icon": ""
                        },
                        {
                            "id": 5,
                            "title": "1.1.02 Таблица значений косинуса",
                            "icon": ""
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "1.02 Синус",
                    "icon": ""
                }
            ]
        }
    ],
    
    itemsListWidth: 350,
    selectedItemId: null,
    itemMenuCoords: undefined,
    showAddItemWindow: false,


    data: [
        {
            "id": 1,
            "order_id": 1,
            "type": "text",
            "data_content": "<span class='bold'>А́лгебра</span> (от араб. اَلْجَبْرُ‎ аль-джабр «восполнение»[1]) — раздел математики, который можно нестрого охарактеризовать как обобщение и расширение арифметики; в этом разделе числа и другие математические объекты обозначаются <span style='background: yellow; '>буквами и другими символами</span>, что позволяет записывать и исследовать их свойства в самом общем виде. Слово «алгебра» также употребляется в общей алгебре в названиях различных алгебраических систем. В более широком смысле под алгеброй понимают раздел математики, посвящённый изучению операций над элементами множеств произвольной природы, обобщающий обычные операции сложения и умножения чисел[2]."
        },
        // {
        //     "id": 2,
        //     "order_id": 2,
        //     "type": "image",
        //     "data_content": "1.jpg"
        // }
    ]




       
}

// Функция для установки значения поля "icon" по полю "id"
const setIconById = (items, id, iconValue) => {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].icon = iconValue;
        return; // Если нашли соответствующий элемент, завершаем поиск
      }
      if (items[i].childs) {
        setIconById(items[i].childs, id, iconValue); // Рекурсивный вызов для вложенных элементов
      }
    }
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

        case "SET_SELECTED_SECTION":
            return {...state, selectedSection: action.section}

        case "SET_ITEMS_LIST":
            return {...state, items: action.items}

        case "SET_ITEMS_LIST_WIDTH":
            return {...state, itemsListWidth: action.width}

        case "SET_ITEM_ICON":
            const items = [...state.items]

            setIconById(items, action.id, action.iconValue);

            return {...state, items: items}

        case "SET_ITEM_MENU_COORDS":
            return {...state, itemMenuCoords: action.coords}

        case "SET_SELECTED_ITEM":
            return {...state, selectedItemId: action.item}

        case "SHOW_ADD_ITEM_WINDOW":
            return {...state, showAddItemWindow: action.isShow}
        

        
        default:
            return state;
    }
}