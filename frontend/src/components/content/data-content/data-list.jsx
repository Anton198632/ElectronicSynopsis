import { useSelector } from "react-redux";
import "./data-list.css";
import DataText from "./data-text/data-text";
import DataImage from "./data-image/data-image";
import useDataBaseService from "../../../services/DataBaseService";


export default function () {

    const {data} = useSelector(state => state);

    const {getServerAddress} = useDataBaseService();


    const buildDataList = () => {

        return data.map((dataItem, i) => {

            switch (dataItem.type) {

                case "text":
                    return <DataText key={i} text={dataItem.data_content} orderId={dataItem.order_id} />
                
                case "image":
                    return <DataImage key={i} value={`${getServerAddress()}/static/images/${dataItem.data_content}`}/>

            }

           

        })
        

    }


    return (
        <div className="data-list">
            {buildDataList()}

        </div>
    )


}
