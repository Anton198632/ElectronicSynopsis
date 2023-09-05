import { useEffect, useRef } from "react";
import "./data-text.css";


export default function (props) {

    const textareaRef = useRef()

    useEffect(() => {

        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px";

    })

    const onInputHandle = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }


    return (
        <div className="data-text">
            <div contentEditable="true" 
            className="section edit-text" 
            onInput={onInputHandle} ref={textareaRef}
            dangerouslySetInnerHTML={{__html: props.text}}
             >
             
            </div>

        </div>
    )


}