import { useSelector } from "react-redux";
import "./data-list.css";
import DataText from "./data-text/data-text";


export default function () {

    const {data} = useSelector(state => state);


    const buildDataList = () => {

        return data.map(dataItem => {

            if (dataItem.type === "text") {
                return <DataText text={dataItem.data_content} />
               
            }

        })
        

    }


    return (
        <div className="data-list">
            {buildDataList()}

        </div>
    )


}
