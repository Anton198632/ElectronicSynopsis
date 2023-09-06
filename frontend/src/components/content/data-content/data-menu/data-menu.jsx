import "./data-menu.css";

import textIcon from "../../../../images/text-icon.png";
import imgIcon from "../../../../images/icon-img.png";
import formulaIcon from "../../../../images/icon-formula.png";
import codeIcon from "../../../../images/icon-code.png";
import saveIcon from "../../../../images/icon-save.png";
import { useDispatch, useSelector } from "react-redux";
import { addImageFieldData, addTextFieldToData } from "../../../../redux/actions";
import useDataBaseService from "../../../../services/DataBaseService";

import {store} from "../../../../index";

export default function () {

    const dispatch = useDispatch()

    const {uploadDataImage} = useDataBaseService();

    


    const onTextClickHandle = () => {
        dispatch(addTextFieldToData());
    }

    // Загрузка файла-картинки на сервер 
    const onClickImageHandle = () => {

        const element = document.querySelector("#inputFileUploader")
  
          const clickElement = new MouseEvent("click", {});
  
          element.onchange = e => {
              const [file] = element.files;
  
              if (file) {
                  const data = new FormData();
  
                  data.append("file", file)
                  
  
                  uploadDataImage(data).then(response => {
  
                    dispatch(addImageFieldData(response.imagePath))
                      
                  })
  
                  element.value = null;                
              }
  
          }
  
          element.dispatchEvent(clickElement);
    }

    const onClickSave = () => {

        !!!!!!!!!!!!!!!!!!!!!!
       console.log(store.getState().data);

    }


    return (
        <div className="data-menu">
            <div className="data-menu-text">
                <img src={textIcon} className="data-menu-icon" 
                onClick={onTextClickHandle} />
            </div>
            <img src={imgIcon} className="data-menu-icon" onClick={onClickImageHandle} />
            <img src={formulaIcon} className="data-menu-icon"/>
            <div className="data-menu-code" >
                <img src={codeIcon} className="data-menu-icon"/>
            </div>
            <img src={saveIcon} className="data-menu-icon" 
            onClick={onClickSave}/>
        </div>
    )


}
