(function(){
    const lat = -38.0175666;
    const lng = -57.6005341;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 12);

    let markers = new L.FeatureGroup().addTo(mapa)

    let propiedades = [];
    
    // Filtros 
    const filtros = {
        categoria: '',
        precio: '',
    }
    
    const categoriasSelect = document.querySelector('#categorias');
    const preciosSelect = document.querySelector('#precios');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    categoriasSelect.addEventListener('change', e =>{
        filtros.categoria =  +e.target.value
        filtrarPropiedades();
    })
    
    preciosSelect.addEventListener('change', e =>{
        filtros.precio =  +e.target.value
        filtrarPropiedades();
    })
    
    const obtenerPropiedades = async () =>{
        try {
            const url = 'api/propiedades'
            const respuesta = await fetch(url)
            propiedades = await respuesta.json()
            
            // console.log('PROPIEDADES ->', propiedades)
            mostrarPropiedades( propiedades )

        } catch (error) {
            console.log(error)
        }
    }

    const mostrarPropiedades = propiedades => {

        // Limpiar markers previos
        markers.clearLayers();

        propiedades.forEach(propiedad => {
            // Agregar los pines
            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true
            }) 
            .addTo(mapa)
            .bindPopup(`
                <p class="text-indigo-600 font-bold">${propiedad.categoria.nombre}</p>
                <h1 class="text-xl font-extrabold uppercase my-2">${propiedad?.titulo}
                </h1>
                <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad?.titulo}">
                <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
                <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase text-white ">Ver Propiedad</a>
            `)

            markers.addLayer(marker)
        });

    }

    const filtrarPropiedades = () => {
        const resultado = propiedades.filter( filtrarCategoria ).filter( filtrarPrecio )
        console.log('resultado ->', resultado)
        mostrarPropiedades(resultado)
    }

    const filtrarCategoria = ( propiedad ) => {
        // console.log('FILTROS ->', propiedad)
       return filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad
    }
    const filtrarPrecio = ( propiedad ) => {
        // console.log('FILTROS ->', propiedad)
       return filtros.precio ? propiedad.precioId === filtros.precio : propiedad
    }

    obtenerPropiedades()
})()