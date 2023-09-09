import { useEffect } from 'react';
import './App.css';
import { DrawerAppBar } from './components/app-draw-bar/app-draw-bar';

import "./components/styles/scroll-bar.css"
import useDataBaseService from './services/DataBaseService';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizationForm from './components/authorization-form/authorization-form';

import { setItemMenuCoords, setSections, setUser, setTextEditMenuCoords } from './redux/actions';
import Header from './components/header/header';
import Content from './components/content/content';
import TooltipMenuItem from './components/menu/tooltip-menu-item';
import AddItemWindow from './components/modal-windows/add-item-window/add-item-window';
import TextEditMenu from './components/menu/text-edit-menu';
import ConfirmWindow from './components/modal-windows/confirm-window/confirm-window';

function App() {

  const {getAuthorizationData, getSections} = useDataBaseService();

  const {user} = useSelector(state=>state);

  const dispatch = useDispatch();


  useEffect(() => {

    getAuthorizationData().then(response => {
      if (response.user === "anonymous_user") {
        dispatch(setUser(null));
      } else {
        setDataUser(response.user);
      }
    })


  }, [])


  const setDataUser = (user) => {
    dispatch(setUser(user));

    getSections(user.username).then(response => {

      if (response.registration === "logout")
        dispatch(setUser(null));

      if (response.sections)
        dispatch(setSections(response.sections));
    })
  }


  const onClickHandle = (e) => {

    e.preventDefault();

    dispatch(setItemMenuCoords(undefined));
    // dispatch(setTextEditMenuCoords(undefined));
  }




  return (
    <div className="App" onClick={onClickHandle}>

      {user === null ? <AuthorizationForm setDataUser={setDataUser} /> :

        <div>

              

             <DrawerAppBar />
             <TooltipMenuItem />
             <TextEditMenu />
             <AddItemWindow />

             <Header />

             <Content />

             

            
        </div>
      
      
      
      
      
      }

       
      
    </div>
  );
}

export default App;
