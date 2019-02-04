
if ('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('sw.js');
        console.log("Funguje");
    } catch (error) {
        console.log("Nefunguje");
    }
}


$(document).ready(function () {
    

    $.backstretch("images/background-clouds.gif");

    var server = "https://api.openweathermap.org/data/2.5/forecast?q="
    var api_klic = "&APPID=afb6e76426a0802ed7f8dcdb42900eab&units=metric"


    function vyprazdnit() {
        $("#error_message").empty();
        $(".results").children().empty();
    }

    $('.vypln').submit(function (e) {
        e.preventDefault();
        mesto = $('#mesto').val();

        hide();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": server + mesto + api_klic,
            "method": "GET",
            error: function (e) {
                vyprazdnit();
                $("#error_message").append("Nenalezeno");
            }
        }


        $.ajax(settings).done(function (response) {

            vyprazdnit();

            obdobi = $("#predpoved").val();

            latitude = (response.city.coord.lat);
            longitude = (response.city.coord.lon);

            const options = {

                // Required: API key
                key: '6sZ6r5filmvn76tOGHe1sYXh140hwHiu',
            
                // Put additional console output
                verbose: true,
            
                // Optional: Initial state of the map
                lat: latitude,
                lon: longitude,
                zoom: 5,
            }
            
            // Initialize Windy API
            windyInit(options, windyAPI => {
                // windyAPI is ready, and contain 'map', 'store',
                // 'picker' and other usefull stuff
            
                const { map } = windyAPI
                // .map is instance of Leaflet map
            
                L.popup()
                    .setLatLng([latitude, longitude])
                    .setContent("teplota je " + response.list[0].main.temp + " stupňů")
                    .openOn(map);
            
            });


            //NASTAVENI     //.serializeArray    var div = $("<div></div>");   div.append("ahoj");
            //teplota
            if ($("#teplota_radio").is(":checked") === true) {
                teplota = (response.list[0].main.temp);
                $("#teplota").append("Teplota v " + mesto + " je právě " + teplota + "°C");
            }

            //vlhkost
            if ($("#vlhkost_radio").is(":checked") === true) {
                vlhkost = (response.list[0].main.humidity);
                $("#vlhkost").append("Vlhkost v " + mesto + " je právě " + vlhkost);
            }

            //min. teplota
            if ($("#min_teplota_radio").is(":checked") === true) {
                min_temp = (response.list[0].main.temp_min);
                $("#min-temp").append("Min. teplota v " + mesto + " je právě " + min_temp + "°C");
            }

            //max. teplota
            if ($("#max_teplota_radio").is(":checked") === true) {
                max_temp = (response.list[0].main.temp_max);
                $("#max-temp").append("Max. teplota v " + mesto + " je právě " + max_temp + "°C");
            }

            //tlak
            if ($("#tlak_radio").is(":checked") === true) {
                tlak = (response.list[0].main.pressure);
                $("#tlak").append("Tlak v " + mesto + " je právě " + tlak);
            }

            //vitr
            if ($("#vitr_radio").is(":checked") === true) {
                vitr = (response.list[0].wind.speed);
                $("#vitr").append("Vitr v " + mesto + " je právě " + vitr);
            }

            var selection = $(".results");
            console.log(selection);


        });
    });

    $('.nastaveni').click(function () {
        $(this).toggleClass("nastaveni_rotate nastaveni_transition");
        $(".nastaveni_panel").toggle("1000", "swing");
    });

    function hide() {
        $(this).toggleClass("close_search");
        $(".overlay").toggleClass("displayed");
    };

    $('.search_button').click(function () {
        hide();
    });

    
});



