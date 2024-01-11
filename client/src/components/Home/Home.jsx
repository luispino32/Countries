import Cards from "../Cards/Cards";
import styled  from "styled-components";
import Paginacion from "../Paginacion/Paginacion";

const DivGeneral = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DivPaginacion = styled.div`
    display: flex;
    width: 94%;
    justify-content: end;
    align-items: end;
`;

export default function Home({dataCards, paginacion, setPaginacion, paginas}){

    return(
        <DivGeneral>
            <DivPaginacion>
                <Paginacion paginas={paginas}
                            paginacion={paginacion} 
                            setPaginacion={setPaginacion}/>
            </DivPaginacion>
    
            <Cards data={dataCards} />
        </DivGeneral>
    )
}