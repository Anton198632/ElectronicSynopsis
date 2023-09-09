import "./tooltip-menu-item.css"
import { useDispatch, useSelector } from "react-redux";

import { setItemMenuCoords, setShowAddItemWindow, setItemsList } from "../../redux/actions";
import useDataBaseService from "../../services/DataBaseService";
import ConfirmWindow from "../modal-windows/confirm-window/confirm-window";
import { useState } from "react";


export default function () {

    const {itemMenuCoords, selectedItemId, selectedSection } = useSelector(state=>state);

    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const {deleteItem, getItems} = useDataBaseService();

    const dispatch = useDispatch();

    const onClickHandle = (e) => {

        dispatch(setItemMenuCoords(undefined));

        dispatch(setShowAddItemWindow(true));
    }

    const onClickDeleteHandle = (e) => {
        setDeleteConfirm(true);

    }

    const onConfirmDelete = () => {
        setDeleteConfirm(false);
        deleteItem(selectedItemId.id).then(response => {
            getItems(selectedSection.id).then(res => {
                dispatch(setItemsList(res.items));
            })
        });
    }

    const onCloseConfirm = () => {
        setDeleteConfirm(false);
    }


    return (
        <div>

            <ConfirmWindow 
            show={deleteConfirm} 
            close={onCloseConfirm} 
            positive={onConfirmDelete}
            query={"Вы уверены, что желаете удалить элемент?"} />


            {itemMenuCoords? (
                <div className="tooltip-menu" style={{left: itemMenuCoords.x, top: itemMenuCoords.y}}>
                    <div className="tooltip-item" onClick={onClickHandle}>
                        Добавить
                    </div>

                  {selectedItemId?  <div className="tooltip-item" onClick={onClickDeleteHandle}>
                        Удалить
                    </div>
                    : <></>}
                    
                </div>

            ):(<></>)}



        </div>
    )


}