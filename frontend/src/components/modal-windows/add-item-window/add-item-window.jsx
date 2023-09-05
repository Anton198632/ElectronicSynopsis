import "./add-item-window.css";

import { Transition } from "react-transition-group";
import { Form } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import useDataBaseService from "../../../services/DataBaseService";
import { useDispatch, useSelector } from "react-redux";

import { setShowAddItemWindow, setItemsList } from "../../../redux/actions";

export default function () {

    const {selectedSection, selectedItemId, showAddItemWindow} = useSelector(state => state)

    const { addNewItem } = useDataBaseService()

    const dispatch = useDispatch();

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
        const inputData = document.querySelector('input[aria-describedby="inputDataGroupLink"]')
        inputData.value = ''
        dispatch(setShowAddItemWindow(false))

    }

    const onClickOK = () => {
        setTimeout(()=> {
            const inputData = document.querySelector('input[aria-describedby="inputDataGroupLink"]')

            const itemId = selectedItemId?selectedItemId.id:null;

            addNewItem(selectedSection.id, itemId, inputData.value).then(response => {
                dispatch(setItemsList(response.items))
            })

            inputData.value = ''
            dispatch(setShowAddItemWindow(false))

        }, duration)

    }


    return (
        <Transition in={showAddItemWindow} timeout={duration}>
           {
                state => (
                    <div className="modal d-block" style={{
                        ...defaultStyle, ...transitionStyles[state]
                    }}>
                        <div className="modal-dialog" style={{display: !showAddItemWindow?'none':'block'}}>
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Добавление раздела</h5>
                                <button onClick={onCloseModalwindow } type="button" className="btn-close" aria-label="Close"></button>

                            </div>
                            <div className="modal-body">
                                            <Form.Control
                                                style={{visibility: 'visible'}}
                                                placeholder="Название раздела"
                                              type="text"
                                              id="inputDataGroupLink"
                                              aria-describedby="inputDataGroupLink"/>

                            </div>
                            <div className="modal-footer">
                                <button onClick={onClickOK} className="btn btn-secondary">
                                    OK
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

