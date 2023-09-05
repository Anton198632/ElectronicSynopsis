import { Cookie } from "@mui/icons-material";
import { useEffect, useState } from "react";

import "./tooltip-menu-item.css"
import { useDispatch, useSelector } from "react-redux";

import { setItemMenuCoords, setShowAddItemWindow } from "../../redux/actions";


export default function () {

    const {itemMenuCoords, selectedItemId } = useSelector(state=>state);

    const dispatch = useDispatch();

    const onClickHandle = (e) => {

        dispatch(setItemMenuCoords(undefined));

        dispatch(setShowAddItemWindow(true));
    }


    return (
        <div>

            {itemMenuCoords? (
                <div className="tooltip-menu" style={{left: itemMenuCoords.x, top: itemMenuCoords.y}}>
                    <div className="tooltip-item" onClick={onClickHandle}>
                        Добавить
                    </div>
                    
                </div>

            ):(<></>)}

        </div>
    )


}