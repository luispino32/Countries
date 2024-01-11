import style from "./Paginacion.module.css";

export default function Paginacion({ paginacion, setPaginacion, paginas }){
    const ultimaPagina = paginacion < 5 ? paginas < 5 ? paginas : 5 : paginacion;
    const numPage = Array.from({ length: paginas < 5 ? paginas : 5 }, (_, index) => ultimaPagina - index);

    return(
        <div className={style.general}>
            <button onClick={() => setPaginacion(paginas)}
                    className={`${style.button} ${paginacion === paginas ? style.inactivo : ''}`}>{'>>'}</button>
            
            <button onClick={() => setPaginacion(paginacion < paginas ? paginacion+1 : paginacion)}
                    className={`${style.button} ${paginacion === paginas ? style.inactivo : ''}`}>{'>'}</button>

            {numPage.map(page => <div key={`Pag_${page}`}
                                      className={style.pages} 
                                      style={{border: paginacion === page ? '2px solid blue' : ''}}>
                                        {page}
                                 </div>)}

            <button onClick={() => setPaginacion(paginacion > 1 ? paginacion-1 : 1)}
                    className={`${style.button} ${paginacion === 1 ? style.inactivo : ''}`}>{'<'}</button>

            <button onClick={() => setPaginacion(1)}
                    className={`${style.button} ${paginacion === 1 ? style.inactivo : ''}`}>{'<<'}</button>
        </div>
    )
}