import "./data-menu.css";

import textIcon from "../../../../images/text-icon.png";
import imgIcon from "../../../../images/icon-img.png";
import formulaIcon from "../../../../images/icon-formula.png";
import codeIcon from "../../../../images/icon-code.png";

export default function () {


    return (
        <div className="data-menu">
            <div className="data-menu-text">
                <img src={textIcon} className="data-menu-icon" />
            </div>
            <img src={imgIcon} className="data-menu-icon" />
            <img src={formulaIcon} className="data-menu-icon"/>
            <div className="data-menu-code" >
                <img src={codeIcon} className="data-menu-icon"/>
            </div>

        </div>
    )


}
