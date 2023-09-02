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



    return {

        getServerAddress,

        getAuthorizationData,
        logIn,
        logOut,

        getSections,
        uploadSectionImage,
        addNewSection,

    }

}


export default useDataBaseService;