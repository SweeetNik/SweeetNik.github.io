ymaps.ready(init);

function init () {
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
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            clusterHasBalloon: false,
            gridSize: 32
        });
        

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);

    $.ajax({
        url: "data.json"
    }).done(function(data) {
        objectManager.add(data);
    });
});
}