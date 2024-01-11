
const validation = (activity, errors, setErrors) => {
    let newErrors = errors;

    if(!activity.name.trim()    ) newErrors = {...newErrors, name: "Nombre vacio"}
    else newErrors = {...newErrors, name: ""}


    if(!activity.dificult) newErrors = {...newErrors, dificult: "Campo vacio"}
    else{
        if(Number.isInteger(parseFloat(activity.dificult))){
            if(activity.dificult >= 1){
                if(activity.dificult <= 5) newErrors = {...newErrors, dificult: ""}
                else newErrors = {...newErrors, dificult: "Debe ser <= 5"}
            }else newErrors = {...newErrors, dificult: "Debe ser >= 1"}  
        }else newErrors = {...newErrors, dificult: "No es Entero"}
    } 

    if(!activity.duration) newErrors = {...newErrors, duration: "Campo vacio"}
    else{
        if(Number.isInteger(parseFloat(activity.duration))){
            if(activity.duration >= 1) newErrors = {...newErrors, duration: ""}
            else newErrors = {...newErrors, duration: "Debe ser > 0"}
        }else newErrors = {...newErrors, duration: "No es Entero"}
    } 

    if(activity.countrieSave.length > 0) newErrors = {...newErrors, countries: ""}
    else newErrors = {...newErrors, countries: "Debe tener al menos un pais asignado"}

    setErrors(newErrors);
}

export default validation;