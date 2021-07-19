ymaps.ready(init);

function init () {
    var geolocation = ymaps.geolocation;    // получаем данные о геолокации
    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) { // если геолокация определена
        var mapContainer = $('#map');
        bounds = result.geoObjects.get(0).properties.get('boundedBy');
        mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]

            );
    var myMap = new ymaps.Map('map', mapState, {    // создание карты
            searchControlProvider: 'yandex#search'
        }),
        objectManager = new ymaps.ObjectManager({   // создание objectManager
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

    $.ajax({    // выгрузка данных из data.json
        url: "data.json"
    }).done(function(data) {
        data.features.forEach(each => each.properties.balloonContentBody = "<input type=\"button\" value=\"Выбрать\" id=\"button1\" onclick=\"console.log(document.getElementsByClassName('ymaps-2-1-78-balloon-content__header')[0].innerHTML); document.getElementById('map').style.display = 'none'\">");
        objectManager.add(data);
    });
},
    function(err) { // если геолокация неопределена браузером
    var myMap = new ymaps.Map('map', {
    center: [55.753220, 37.622513], // координаты Москвы
    zoom: 10
}, {
    searchControlProvider: 'yandex#search'
}),
    objectManager = new ymaps.ObjectManager({
            clusterize: true,
            clusterHasBalloon: false,
            gridSize: 32
        });
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);

    $.ajax({
        url: "data.json"
    }).done(function(data) {
        data.features.forEach(each => each.properties.balloonContentBody = "<input type=\"button\" value=\"Выбрать\" id=\"button1\" onclick=\"console.log(document.getElementsByClassName('ymaps-2-1-78-balloon-content__header')[0].innerHTML); document.getElementById('map').style.display = 'none'\">");
        objectManager.add(data);
    });
  }
);
}
