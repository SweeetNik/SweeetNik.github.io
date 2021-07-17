ymaps.ready(function () {
    var geolocation = ymaps.geolocation;
    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        var gloc = ymaps.geolocation.get();
        var mapContainer = $('#map');
        bounds = result.geoObjects.get(0).properties.get('boundedBy');
        mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]

            );
        var myMap = new ymaps.Map('map', mapState, {
            searchControlProvider: 'yandex#search'
        }),


        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
            clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: false,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });
    


    

        localStorage.setItem('data_json', JSON.stringify(data));
        var data_json = JSON.parse(localStorage.getItem('data_json')).features;

        localStorage.setItem('icons_json', JSON.stringify(icons));
        var icons_json = JSON.parse(localStorage.getItem('icons_json')).icons;

        //console.log(icons_json[2799].icon);

        geoObjects = [];
        id_c = null;

        for (i = 0, m = data_json.length; i<m; i++){
            var coordinates = [];
            coordinates[0] = data_json[i].geometry.coordinates[0];
            coordinates[1] = data_json[i].geometry.coordinates[1];
            id_c = data_json[i].id;
            geoObjects[i] = new ymaps.Placemark(coordinates, {
            balloonContentHeader: data_json[i].id,
            balloonContentBody: '<input type="button" value="Выбрать" id="button1" onclick="console.log(document.getElementsByClassName(\'ymaps-2-1-78-balloon-content__header\')[0].innerHTML); document.getElementById(\'map\').style.display = \'none\'">'
        }, {
            iconLayout: 'default#image',
            iconImageHref: icons_json[i].icon,
            iconImageSize: [32, 32],
            iconImageOffset: [-5, -38]
        }); 
        }


    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);



    });
});
