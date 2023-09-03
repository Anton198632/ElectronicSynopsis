import { useEffect } from 'react';
import './App.css';
import { DrawerAppBar } from './components/app-draw-bar/app-draw-bar';

import "./components/styles/scroll-bar.css"
import useDataBaseService from './services/DataBaseService';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizationForm from './components/authorization-form/authorization-form';

import { setSections, setUser } from './redux/actions';
import Header from './components/header/header';
import Content from './components/content/content';

function App() {

  const {getAuthorizationData, getSections} = useDataBaseService();

  const {user} = useSelector(state=>state);

  const dispatch = useDispatch();


  useEffect(() => {

    getAuthorizationData().then(response => {
      console.log(response);
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



  return (
    <div className="App">

      {user === null ? <AuthorizationForm setDataUser={setDataUser} /> :

        <div>
             <DrawerAppBar />

             <Header />

             <Content />

            
        </div>
      
      
      
      
      
      }

       
      
    </div>
  );
}

export default App;
