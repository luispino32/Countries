import { useDispatch, useSelector } from 'react-redux';
import { clearFilters } from "../../redux/actions";

import style from './FilterBar.module.css';

export default function FilterBar({ continent, activity, order, resetPaginacion }){
    const { filtroContinente, setFiltroContinente } = continent;
    const { filtroActividad, setFiltroActividad } = activity;
    const { orden, setOrden } = order;

    const dispatch = useDispatch();

    const continents = useSelector((state) => state.continents);
    const activities = useSelector((state) => state.activities);

    const handleReiniciarFiltros = () => {
        setFiltroContinente('');
        setFiltroActividad('');
        setOrden('');

        dispatch(clearFilters());
    }

    return (
        <div className={style.divGeneral}>
            <div className={style.divFilter}>
                <label>Filtrar por Continente:</label>
                <select value={filtroContinente} 
                        onChange={(e) => {
                            resetPaginacion();
                            setFiltroContinente(e.target.value)}}>
                    <option value="">Todos</option>
                    {continents.map(continent => <option key={continent} value={continent}>{continent}</option>)}
                </select>
            </div>

            <div className={style.divFilter}>
                <label>Filtrar por Actividad:</label>
                <select value={filtroActividad} 
                        onChange={(e) => {
                            resetPaginacion();
                            setFiltroActividad(e.target.value)}}>
                    <option value="">Todas</option>
                    {activities.map(activity => <option key={activity.name} value={activity.name}>{activity.name}</option>)}
                </select>
            </div>

            <div className={style.divFilter}>
                <label>Ordenar:</label>
                <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                    <option value="">Ninguno</option>
                    <option value="ascendente">Ascendente</option>
                    <option value="descendente">Descendente</option>
                </select>
            </div>

            <button onClick={handleReiniciarFiltros}>Reiniciar Filtros</button>
        </div>
    )
}