import { useEffect, useRef } from "react";
import "./data-text.css";
<<<<<<< HEAD


export default function (props) {

    const textareaRef = useRef()
=======
import { useDispatch } from "react-redux";

import { setTextEditMenuCoords } from "../../../../redux/actions";

export default function (props) {

    const textareaRef = useRef();

    const dispatch = useDispatch();
>>>>>>> origin/master

    useEffect(() => {

        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px";

    })

    const onInputHandle = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

<<<<<<< HEAD

    return (
        <div className="data-text">
            <div contentEditable="true" 
            className="section edit-text" 
            onInput={onInputHandle} ref={textareaRef}
            dangerouslySetInnerHTML={{__html: props.text}}
             >
=======
    function getSelectedText() {
        var selectedText = "";
        if (window.getSelection) { // Для большинства современных браузеров
            console.log(getSelection());
            selectedText = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") { // Для старых версий IE
            selectedText = document.selection.createRange().text;
        }
        return selectedText
    }


    const onContextMenuHandle = (e) => {
        e.preventDefault();

        console.log(getSelectedText());

        dispatch(setTextEditMenuCoords({x:e.clientX, y:e.clientY}));

    }



    return (
        <div className="data-text" onContextMenu={onContextMenuHandle}>
            <div contentEditable="true" 
            className="section edit-text" 
            onInput={onInputHandle} ref={textareaRef}
            dangerouslySetInnerHTML={{__html: props.text}} >
>>>>>>> origin/master
             
            </div>

        </div>
    )


}