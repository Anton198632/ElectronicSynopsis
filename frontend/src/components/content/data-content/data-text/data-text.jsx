import { useEffect, useRef, useState } from "react";
import "./data-text.css";
import { useDispatch, useSelector } from "react-redux";

import { rewriteTextData, setTextEditMenuCoords } from "../../../../redux/actions";

import iconDelete from "../../../../images/icon-delete.png";

export default function (props) {

    const textareaRef = useRef();

    const [isMouseEnter, setIsMousEnter] = useState(false);

    const {isEditState} = useSelector(state=>state);

    const dispatch = useDispatch();

    useEffect(() => {

        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px";
    })


    const onInputHandle = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

    function getSelectedText() {
        var selectedText = "";
        if (window.getSelection) { // Для большинства современных браузеров

            selectedText = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") { // Для старых версий IE
            selectedText = document.selection.createRange().text;
        }
        return selectedText
    }


    const onContextMenuHandle = (e) => {

        if (!isEditState)
            return

        e.preventDefault();

        console.log(getSelectedText());

        let x = e.clientX;
        let y = e.clientY;

        console.log(window.innerHeight, y);

        if (window.innerWidth - 333 < x)
            x = window.innerWidth - 333

        if (window.innerHeight - 350 < y)
            y = window.innerHeight - 350

        dispatch(setTextEditMenuCoords({x, y}));

    }

    const onEditCompleteHandle = (e) => {

        const ordeId = parseInt(e.target.parentNode.id.toString().substr(9));
        const dataText = e.target.innerHTML;

        dispatch(rewriteTextData(ordeId, dataText));
    }


    const onMouseEnterHandle = () => {
        setIsMousEnter(true);
    }

    const onMouseLeaveHandle = () => {
        setIsMousEnter(false);
    }

    const onClickDeleteHandle = () => {

        props.showDeleteConfirm(props.dataId, props.dataItemNum)
    }


    return (
        <div id={`order-id-${props.orderId}`} 
            className="data-text" 
            onContextMenu={onContextMenuHandle}

            onTouchStart={onMouseEnterHandle}
            onPointerEnter={onMouseEnterHandle}
            onMouseEnter={onMouseEnterHandle}

            onTouchCancel={onMouseLeaveHandle}
            onPointerCancel={onMouseLeaveHandle}
            onMouseLeave={onMouseLeaveHandle}
            >

            <div contentEditable="true"
             
            onBlur={onEditCompleteHandle}
            className="section edit-text" 
            onInput={onInputHandle} ref={textareaRef}
            dangerouslySetInnerHTML={{__html: props.text}} >
             
            </div>

           {isMouseEnter && isEditState?
           <img className="data-del"
            onClick={onClickDeleteHandle} 
            src={iconDelete} />
           :<></>}

        </div>
    )


}