import { useSelector } from "react-redux";
import "./header.css";
import Search from "./search/search";

import settingsBlackIcon from "../../images/settings-black-icon.png";
import themeBlackIcon from "../../images/theme-black-icon.png";


export default function () {

    const {selectedSection} = useSelector(state=> state);



    return (
        <div className="header">

            <div className="header-left">
                <Search />
                <div className="selected-section">
                    {selectedSection? selectedSection.title: ""}

                </div>
            </div>

            <div className="header-right">
                <img className="header-icon" src={settingsBlackIcon} />
                <img className="header-icon" src={themeBlackIcon} />

            </div>
            


        </div>
    )



}