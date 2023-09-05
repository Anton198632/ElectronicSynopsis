import "./text-edit-menu.css"
import { useDispatch, useSelector } from "react-redux";

import { setTextEditMenuCoords } from "../../redux/actions";
import { Select, MenuItem, Button } from "@mui/material";
import { useState } from "react";

import iconBold from "../../images/icon-bold.png";
import iconItalic from "../../images/icon-italic.png";


export default function () {

    const {textEditMenuCoords } = useSelector(state=>state);

    const [font, setFont] = useState({
        fontSize: 14,
        fontBold: false,
        fontItalic: false,
        fontColor: "black",
        fontBackground: "white"
    })

    const dispatch = useDispatch();

    // const onClickHandle = (e) => {
    //     dispatch(setTextEditMenuCoords(undefined));
    // }

    const handleChange = (event) => {
        setFont({...font, fontSize: event.target.value});
    };

    const onClickBold = () => {
        setFont({...font, fontBold: !font.fontBold})
    }

    const onClickItalic = () => {
        setFont({...font, fontItalic: !font.fontItalic})
    }

    const formatText = (e) => {

        // Получаем текущее выделение
        var selection = window.getSelection();
        
        if (selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);

            // Создаем спан для выделения
            var span = document.createElement("span");
            span.className = "text-bold"; // Добавляем класс для стилизации

            // Заменяем выделенный текст спаном
            range.surroundContents(span);

            // Очищаем выделение
            selection.removeAllRanges();
        }

        dispatch(setTextEditMenuCoords(undefined));


    }

    return (
        <div>

            {textEditMenuCoords? (
                <div className="edit-text-menu" style={{left: textEditMenuCoords.x, top: textEditMenuCoords.y}}>
                    <div className="edit-text-list">
                    <Select
                      value={font.fontSize}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={14}><em>14</em></MenuItem>
                      <MenuItem value={16}>16</MenuItem>
                      <MenuItem value={18}>18</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                    </Select>
                    <div className={`icon-bold ${font.fontBold?"selected": ""}`} onClick={onClickBold}>
                        <img src={iconBold} alt="" />
                    </div>
                    <div className={`icon-bold ${font.fontItalic?"selected": ""}`} onClick={onClickItalic}>
                        <img src={iconItalic} alt="" />
                    </div>
                    <div className="icon-bold text-color">
                        T
                        <div>color</div>
                    </div>
                    <div className="icon-bold text-background selected">
                        T
                        <div>back</div>
                    </div>
                    </div>
                    
                    <Button sx={{color: "#1abc9c !important"}} onClick={formatText}>Применить</Button>
                    
                </div>

            ):(<></>)}

        </div>
    )


}

