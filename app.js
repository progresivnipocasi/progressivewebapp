
if ('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('sw.js');
        console.log("Funguje");
    } catch (error) {
        console.log("Nefunguje");
    }
}

$(document).ready(function () {

    var server = "https://api.openweathermap.org/data/2.5/forecast?q="
    var owm_key = "&lang=cz&APPID=afb6e76426a0802ed7f8dcdb42900eab&units=metric"

    function dump() {
        $("#error_message").empty();
        $(".results").children().empty();
        $(".top").empty();
    }

    $('.vypln').submit(function (e) {
        searched_city = $('#mesto').val();
        e.preventDefault();
        
        hide();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": server + searched_city + owm_key,
            "method": "GET",
            error: function (e) {
                dump();
                $("#error_message").append("Nenalezeno");
            }
        }


        $.ajax(settings).done(function (response) {

            console.log(searched_city);

            dump();
            console.log(response);

            obdobi = $("#predpoved").val();

            localStorage.setItem(searched_city, JSON.stringify(response));

            //var getJSON_response = JSON.parse(localStorage.getItem(searched_city));
            
/*
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
                    .setContent(searched_city + ": " + response.list[0].main.temp)
                    .openOn(map);
            
            });*/
            
            var arr_temp = [];
            var arr_dates = [];
            var i;
            for (i = 0; i < 16; i++) {
                arr_temp.push(response.list[i].main.temp);
                let trimmed_date = (response.list[i].dt_txt).slice(11, -3);
                arr_dates.push(trimmed_date);
            } 

            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                height: 150,
                width: 400,
                data: {
                    labels: arr_dates,
                    datasets: [{
                        label: 'Teplota',
                        data: arr_temp,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });


            //NASTAVENI     //.serializeArray    var div = $("<div></div>");   div.append("ahoj");

            $("#mesto_show").append(searched_city);
            
            //teplota
            if ($("#teplota_radio").is(":checked") === true) {
                teplota = (response.list[0].main.temp);
                $("#teplota").append(teplota + "°C");
            }

            //vlhkost
            if ($("#vlhkost_radio").is(":checked") === true) {
                vlhkost = (response.list[0].main.humidity);
                $("#vlhkost").append("Vlhkost v " + searched_city + " je právě " + vlhkost);
            }

            //min. teplota
            if ($("#min_teplota_radio").is(":checked") === true) {
                min_temp = (response.list[0].main.temp_min);
                $("#min-temp").append("Min. teplota v " + searched_city + " je právě " + min_temp + "°C");
            }

            //max. teplota
            if ($("#max_teplota_radio").is(":checked") === true) {
                max_temp = (response.list[0].main.temp_max);
                $("#max-temp").append("Max. teplota v " + searched_city + " je právě " + max_temp + "°C");
            }

            //tlak
            if ($("#tlak_radio").is(":checked") === true) {
                tlak = (response.list[0].main.pressure);
                $("#tlak").append("Tlak v " + searched_city + " je právě " + tlak);
            }

            //vitr
            if ($("#vitr_radio").is(":checked") === true) {
                vitr = (response.list[0].wind.speed);
                $("#vitr").append("Vitr v " + searched_city + " je právě " + vitr);
            }

            var selection = $(".results");
            console.log(selection);


        });
    });

    $('.nastaveni').click(function () {
        $(this).toggleClass("nastaveni_rotate nastaveni_transition");
        $(".nastaveni_panel").toggle("slide");
    });

    function hide() {
        $(this).toggleClass("close_search");
        $(".overlay").toggleClass("displayed");
    };

    $('.search_button').click(function () {
        hide();
    });
});



