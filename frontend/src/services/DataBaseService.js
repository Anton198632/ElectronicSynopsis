import { Password } from "@mui/icons-material";
import { useHttp } from "../hooks/http.hook"
import { IS_DEBUG } from "../settings";

const useDataBaseService = () => {

    const {request, process, setProcess} = useHttp();

    let address = `http://${window.location.hostname}:${window.location.port}`;
    if (IS_DEBUG)
        address = 'http://localhost:8000'

    const getServerAddress = () => {
        return address;
    }


    const getAuthorizationData = async () => {

        return await request("", `${address}/get_authorization_data`);
    }

    const logIn = async (login, password) => {
        const json_data = JSON.stringify({login, password})

        return await request("", `${address}/login?`, "POST", json_data);
    }

    const logOut = async () => {
        return await request("", `${address}/logout?`);
    }

    const changeUserAvatar = async (userId, file) => {
        return await request("", `${address}/change_user_avatar?user_id=${userId}`, "POST", file, {})
    }

    
    const getSections = async (userName) => {
        const _userName = encodeURIComponent(userName);
        return await request("", `${address}/get_sections?username=${_userName}`)
    }

    const uploadSectionImage = async (sectionId, file) => {
        return await request("", `${address}/upload_section_image?sectionId=${sectionId}`, "POST", file, {})
    }

    const addNewSection = async (userName, title) => {
        const _title = encodeURIComponent(title);
        const _userName = encodeURIComponent(userName);
        return await request("", `${address}/add_new_section?username=${_userName}&title=${_title}`)
    } 


    const getItems = async (sectionId) => {
        return await request("", `${address}/get_items?section_id=${sectionId}`)
    }

    const uploadItemImage = async (itemId, file) => {
        return await request("", `${address}/upload_item_image?itemId=${itemId}`, "POST", file, {})
    }

    const addNewItem = async (sectionId, itemId, title) => {
        const _title = encodeURIComponent(title);
        return await request("", `${address}/add_new_item?sectionId=${sectionId}&itemId=${itemId}&title=${_title}`)
    }

    const deleteItem = async (itemId) => {
        return await request("", `${address}/delete_item?itemId=${itemId}`)
    }

    const getItemsByWords = async(sectionId, words) => {
        const _words = encodeURIComponent(words);
        return await request("", `${address}/get_items_by_words?section_id=${sectionId}&words=${_words}`)
    }

    
    const getData = async (itemId) => {
        return await request("", `${address}/get_data?itemId=${itemId}`)
    }

    const uploadDataImage = async (file) => {
        return await request("", `${address}/upload_data_image`, "POST", file, {})
    }

    const uploadFile = async (fileName, file) => {
        const _fileName = encodeURIComponent(fileName);
        return await request("", `${address}/upload_file?fileName=${_fileName}`, "POST", file, {})
    }

    const saveData = async (itemId, data) => {
        const json_data = JSON.stringify({itemId, data})

        return await request("", `${address}/save_data?`, "POST", json_data);
    }

    const deleteData = async (dataId) => {
        return await request("", `${address}/delete_data?dataId=${dataId}`);
    }




    return {

        getServerAddress,

        getAuthorizationData,
        logIn,
        logOut,
        changeUserAvatar,

        getSections,
        uploadSectionImage,
        addNewSection,

        getItems,
        getItemsByWords,
        uploadItemImage,
        addNewItem,
        deleteItem,

        getData,
        uploadDataImage,
        saveData,
        deleteData, 
        uploadFile
    }

}


export default useDataBaseService;