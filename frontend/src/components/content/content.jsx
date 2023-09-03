import "react-reflex/styles.css"

import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import "./content.css";

export default function () {

    return (

        <div className="content">

            <ReflexContainer orientation="vertical" style={{height: "100%"}}>

                <ReflexElement className="left-pane">
                    Левая часть

                </ReflexElement>

                <ReflexSplitter />

                <ReflexElement className="right-pane">
                    Правая часть

                </ReflexElement>



            </ReflexContainer>


        </div>

    )


}