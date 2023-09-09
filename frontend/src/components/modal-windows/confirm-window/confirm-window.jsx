import "./confirm-window.css";

import { Transition } from "react-transition-group";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function (props) {

    const duration = 300;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: 'hidden',
        background: '#969ba1c2'
    }

    const transitionStyles = {
        entering: {opacity: 1, visibility: 'visible'},
        entered: {opacity: 1, visibility: 'visible'},
        exiting: {opacity: 0, visibility: 'hidden'},
        exited: {opacity: 0, visibility: 'hidden'} 
    }

    const onCloseModalwindow = () => {
        props.close()
    }

    const onClickOK = () => {
        props.positive();
    }


    return (

        <Transition in={props.show} timeout={duration}>
           {
                state => (
                    <div className="modal d-block" style={{
                        ...defaultStyle, ...transitionStyles[state]
                    }}>
                        <div className="modal-dialog" style={{display: !props.show?'none':'block'}}>
                            <div className="modal-content">
                            <div className="modal-header">
                            {props.query}
                                <button onClick={onCloseModalwindow } type="button" className="btn-close" aria-label="Close"></button>

                            </div>
                            {/* <div className="modal-body">
                                {props.query}
                            </div> */}
                            <div className="modal-footer">
                                <button onClick={onCloseModalwindow} className="btn btn-secondary">
                                    Отмена
                                </button>
                                <button onClick={onClickOK} className="btn btn-secondary">
                                    Да
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                )

           }

        </Transition>
        
    )


}

