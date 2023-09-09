import { useDispatch, useSelector } from "react-redux";
import "./data-list.css";
import DataText from "./data-text/data-text";
import DataImage from "./data-image/data-image";
import useDataBaseService from "../../../services/DataBaseService";
import DataFormula from "./data-formula/data-formula";
import DataFile from "./data-file/data-file";
import ConfirmWindow from "../../modal-windows/confirm-window/confirm-window";

import { deleteDataItem } from "../../../redux/actions";
import { useState } from "react";


export default function () {

    const {data} = useSelector(state => state);

    const {getServerAddress, deleteData} = useDataBaseService();
    
    const [deleteConfirm, setDeleteConfirm] = useState({show: false, id: -1, num: -1});

    const dispatch = useDispatch();

    const buildDataList = () => {

        return data.map((dataItem, i) => {

            switch (dataItem.type) {

                case "text":
                    return <DataText key={i} text={dataItem.data_content}
                    showDeleteConfirm={showConfirm}
                    dataItemNum={i} 
                    dataId={dataItem.id}
                    orderId={dataItem.order_id} />
                
                case "image":
                    return <DataImage key={i} 
                    showDeleteConfirm={showConfirm}
                    dataItemNum={i} 
                    dataId={dataItem.id}
                    value={`${getServerAddress()}/static/images/${dataItem.data_content}`}
                    orderId={dataItem.order_id}/>

                case "formula":
                    return <DataFormula key={i}
                    showDeleteConfirm={showConfirm}
                    dataContent={dataItem.data_content}
                    dataItemNum={i} 
                    dataId={dataItem.id}
                    orderId={dataItem.order_id} />

                case "file":
                    return <DataFile key={i}
                    showDeleteConfirm={showConfirm}
                    fileName={dataItem.data_content}
                    dataItemNum={i} 
                    dataId={dataItem.id}
                    orderId={dataItem.order_id} />
            }

           

        })
        

    }


    const onCloseConfirm = () => {
        setDeleteConfirm({show: false, id: -1, num: -1});
    }

    

    const onConfirmDelete = () => {
        deleteData(deleteConfirm.id).then(response => {
            dispatch(deleteDataItem(deleteConfirm.num));
            setDeleteConfirm({show: false, id: -1, num: -1});
        })

    }

    const showConfirm = (id, num) => {
        setDeleteConfirm({show: true, id, num});

    }


    return (
        <div className="data-list">

        <ConfirmWindow 
            show={deleteConfirm.show} 
            close={onCloseConfirm} 
            positive={onConfirmDelete}
            query={"Вы уверены, что желаете удалить эти данные?"} />

            {buildDataList()}

        </div>
    )


}
