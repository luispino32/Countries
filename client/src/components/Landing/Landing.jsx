import styled, { keyframes } from "styled-components";
import GlobeCountry from "../Icons/GlobeCountry";
import { Link } from "react-router-dom";

const DivLanding = styled.div`
    background-image: url('https://publicdomainvectors.org/photocms/files1/countries_flags.svg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;  
    justify-content: center;
    align-items: center;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const BottomEntry = styled.div`
    width: 20%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    
    animation: ${rotateAnimation} 2s linear infinite;
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: inherit;
`;

export default function Landing(){

    return(
        <DivLanding>
          <BottomEntry>
            <StyledLink to='/Home'>
                <GlobeCountry/>
            </StyledLink>
          </BottomEntry>  
        </DivLanding>
    );
}