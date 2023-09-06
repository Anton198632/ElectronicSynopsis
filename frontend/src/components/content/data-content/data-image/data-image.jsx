import { useState } from "react";
import "./data-image.css";
import styled from 'styled-components';
import { useSelector } from "react-redux";

export default function (props) {


    const [isFullScreen, setIsFullScreen] = useState(false);
    
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const {theme} = useSelector(state=>state)
    const isLightTheme = theme==="light";


    const ImageContainer = styled.div`
  position: relative;
  margin: 12px;
  width: 80%;
  overflow: hidden;
  border: 1px solid ${isLightTheme?"rgb(198 198 198 / 19%)":"#393939"};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('${props.value}'); /* Замените на URL вашего изображения */
    background-size: cover; /* Задайте желаемое поведение фонового изображения */
    filter: blur(5px); /* Задайте желаемую степень размытия */
    opacity: .3;
  }
`;

    return (

      <ImageContainer className="image-container code-image code-item" 
          >
            
            <img 
            src={props.value} 
            alt="Image"
            className={`${isFullScreen ? 'fullscreen-image' : ''} `}
            onClick={toggleFullScreen}
          />


      </ImageContainer>

)


} 