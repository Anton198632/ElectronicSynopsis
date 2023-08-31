import { Password } from "@mui/icons-material";
import { useHttp } from "../hooks/http.hook"
import { IS_DEBUG } from "../settings";

const useDataBaseService = () => {

    const {request, process, setProcess} = useHttp();

    let address = `http://${window.location.hostname}:${window.location.port}`;
    if (IS_DEBUG)
        address = 'http://192.168.8.100:8000'

    const getServerAddress = () => {
        return address;
    }


    const enterPhone = async (phone, apiId, apiHash) => {
        const _phone =  encodeURIComponent(phone);
        const _apiId = encodeURIComponent(apiId);
        const _apiHash = encodeURIComponent(apiHash);
        return await request("", `${address}/enter_phone?phone=${_phone}&apiId=${_apiId}&apiHash=${_apiHash}`);
    }


    return {

        getServerAddress,

    }

}


export default useDataBaseService;