const esVendedor = (usuarioId, propiedadUsuarioId) =>{
    return usuarioId === propiedadUsuarioId 
} 

const formatearFecha = fecha => {
    const nDate = new Date(fecha).toISOString().slice(0, 10)

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Date(nDate).toLocaleDateString('es-ES', opciones)
}

export {
    esVendedor,
    formatearFecha
}