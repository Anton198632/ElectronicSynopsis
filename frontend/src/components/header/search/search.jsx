import { IconButton, InputBase, Paper, ThemeProvider, createTheme} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";




export default function () {

    const refInput = useRef(null);

    const {theme, selectedLang} = useSelector(state=>state);
    const isLightTheme = theme==="light";

    const dispatch = useDispatch();

    // const {getCodeListBySearch, getCodeListByLang} = useDataBaseService();

    const defaultTheme = createTheme({})

    const darkTheme = createTheme({
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        background: "black",
                        

                    }
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        color: "white"
                    }
                }
            },

            MuiIconButton: {
                styleOverrides: {
                  root: {
                    '&:hover': {
                      backgroundColor: '#1e1e1e', // Здесь вы можете указать желаемый цвет для эффекта нажатия
                    },
                  },
                },
            },
            
        }
    })


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            searchOnClickHandle(event);
          
        }
    };



    const searchOnClickHandle = (e) => {

        // dispatch(setCodeList(null));
        // dispatch(setCodeData([]));

        // if (refInput.current.value !== "")
        //         getCodeListBySearch(selectedLang.alias, refInput.current.value).then(response => {
        //             dispatch(setCodeList(response.catalogData));
        //         })
        // else 
        //     getCodeListByLang(selectedLang.alias).then(response => {
        //         dispatch(setCodeList(response.catalogData));
        //     })
    }


    return (
        <div className="search">
            <ThemeProvider theme={isLightTheme?defaultTheme:darkTheme} >
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%" }}>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Поиск"
                    inputRef={refInput}
                    onKeyPress={handleKeyPress}
                    />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
                    onClick={searchOnClickHandle}  >
                    <SearchIcon style={{color: '#c6c6c6'}} />
                </IconButton>

            </Paper>

            </ThemeProvider>
            
            


        </div>
    )


}