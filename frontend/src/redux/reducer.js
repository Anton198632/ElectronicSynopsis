import { sortByPk } from "./actions"


const firstInit = {

    connection: true,
    
}



export const reducer = (state = firstInit, action) => {

    switch (action.type){

        
        case "SET_CONNECTION_STATE":
            return {
                ...state, connection: action.isConnect
            }

        
        default:
            return state;
    }
}