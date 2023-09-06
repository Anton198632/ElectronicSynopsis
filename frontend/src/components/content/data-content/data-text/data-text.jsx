import { useEffect, useRef } from "react";
import "./data-text.css";
import { useDispatch } from "react-redux";

import { setTextEditMenuCoords } from "../../../../redux/actions";

export default function (props) {

    const textareaRef = useRef();

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

        e.preventDefault();

        console.log(getSelectedText());

        let x = e.clientX;

        console.log(window.innerWidth, x);

        if (window.innerWidth - 333 < x)
            x = window.innerWidth - 333

        dispatch(setTextEditMenuCoords({x:x, y:e.clientY}));

    }





    return (
        <div id={`order-id-${props.orderId}`} className="data-text" onContextMenu={onContextMenuHandle}>
            <div contentEditable="true" 
            className="section edit-text" 
            onInput={onInputHandle} ref={textareaRef}
            dangerouslySetInnerHTML={{__html: props.text}} >
             
            </div>

        </div>
    )


}