(function() {
    const lat = document.querySelector('#lat').value || -38.0175666;
    const lng = document.querySelector('#lng').value || -57.6005341;
    const mapa = L.map('mapa').setView([lat, lng ], 12);
    let marker;

    // Utilizar provide y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService()
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //El Pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    // Detectar el movimiento del pin
    marker.on('moveend', function(event){
        marker = event.target
        const posicion = marker.getLatLng()
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))
        // Obtener la info de las calles
        geocodeService.reverse().latlng(posicion, 12).run(function(err, resultado){
            if (err) console.log ('Error obteniendo el nombre de las calles')
            
            marker.bindPopup(resultado.address.LongLabel)

            //Llenar los campos
            document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
            document.querySelector('#calle').value = resultado?.address?.Address ?? '';
            document.querySelector('#lat').value =  resultado?.latlng?.lat ?? '';
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
        })
    })

})()