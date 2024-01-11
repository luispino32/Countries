import { Link } from 'react-router-dom';
import styled  from "styled-components";

const DivGeneral = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const DivContent = styled.div`
    display: flex;
    width: 50%;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    background-color: #f5f1f1;
    justify-content: space-around;
`;

const StyledLink = styled(Link)`
    padding-left: 10px;
    padding-right: 10px;
    text-decoration: none; 
    color: white; 
    border: 1px green solid;
    background-color: green;

    &:hover{
        background-color: white; 
        color: green;
    }
`;

const TextoBoton = styled.p`
    margin-top: 5px;
    margin-bottom: 5px;
`

export default function NavBar(){

    return(
        <DivGeneral>
            <DivContent>
                <StyledLink to="/">
                    <TextoBoton>Landing</TextoBoton>
                </StyledLink>

                <StyledLink to="/Home">
                    <TextoBoton>Home</TextoBoton>
                </StyledLink>

                <StyledLink to="/Activity">
                    <TextoBoton>Actividad</TextoBoton>
                </StyledLink>
            </DivContent>
        </DivGeneral>
    )
}