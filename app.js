
if('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('sw.js');
        console.log("Funguje");
    } catch (error) {
        console.log("Nefunguje");
    }
}

$( document ).ready(function() {

    $.backstretch("images/background-clouds.gif");

    var server = "https://api.openweathermap.org/data/2.5/forecast?q="
    var api_klic = "&APPID=afb6e76426a0802ed7f8dcdb42900eab&units=metric"


    function vyprazdnit() {
        $("#error_message").empty();
        $(".results").children().empty();
    }

    $('.nastaveni_panel input').click(function() {
        
        pes = $(this).closest('label').html();
    });

    
	/*	var stred = SMap.Coords.fromWGS84(14.41, 50.08);
		var mapa = new SMap(JAK.gel("mapa"), stred, 10);
		mapa.addDefaultLayer(SMap.DEF_BASE).enable();
		mapa.addDefaultControls();	   */   	      

    $('.vypln').submit(function(e){
        e.preventDefault();
        mesto = $('#mesto').val();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": server + mesto + api_klic,
            "method": "GET",
            error: function(e) {
                vyprazdnit();
                $("#error_message").append("Nenalezeno");
            }
          }


        $.ajax(settings).done(function (response) {
            
            vyprazdnit();

            obdobi = $("#predpoved").val();
            

            //NASTAVENI     //.serializeArray    var div = $("<div></div>");   div.append("ahoj");
            //teplota
            if($("#teplota_radio").is(":checked") === true) {
                teplota = (response.list[0].main.temp); 
                $("#teplota").append("Teplota v " + mesto + " je právě " + teplota + "°C");
            }

            //vlhkost
            if($("#vlhkost_radio").is(":checked") === true) {
                vlhkost = (response.list[0].main.humidity);
                $("#vlhkost").append("Vlhkost v " + mesto + " je právě " + vlhkost);
            }

            //min. teplota
            if($("#min_teplota_radio").is(":checked") === true) {
                min_temp = (response.list[0].main.temp_min);
                $("#min-temp").append("Min. teplota v " + mesto + " je právě " + min_temp + "°C");
            }

            //max. teplota
            if($("#max_teplota_radio").is(":checked") === true) {
                max_temp = (response.list[0].main.temp_max);
                $("#max-temp").append("Max. teplota v " + mesto + " je právě " + max_temp + "°C");
            }

            //tlak
            if($("#tlak_radio").is(":checked") === true) {
                tlak = (response.list[0].main.pressure);
                $("#tlak").append("Tlak v " + mesto + " je právě " + tlak);
            }

            //vitr
            if($("#vitr_radio").is(":checked") === true) {
                vitr = (response.list[0].wind.speed);
                $("#vitr").append("Vitr v " + mesto + " je právě " + vitr);
            }

            var selection = $(".results");
            console.log(selection);


        });
    });


    /* TESTOVACI PODMINKY */
    $(".test_button").click(function(){
        var ahoj = $(".test_vysledek test_plny_div").children().not(":empty");
        console.log(ahoj);

        textik = $(".test_error_message").html();
        console.log(textik);
        if (textik == "Nenalezeno") {
            console.log("error podminka funguje");
        }

        if($(".test_vysledek test_plny_div").children().not(":empty")) {
            console.log("test_div funguje");
        }
    });

    //pridat zarazovani vysledku

    $('.favorite_button').click(function() {
        
        if($("#error_message").not(":contains(Nenalezeno)") || $(".results").children().not(":empty")) { //opravit na pokud div obsahuje jakekoliv charactery
            var d = new Date();
            var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            $(".vypis_okno").append(time);
            console.log(time);

            $(".vypis_okno").append("<span> Teplota v " + mesto + " je právě " + teplota + "°C </span><br>");
            $(".vypis_okno").append("<span> Vlhkost v " + mesto + " je právě " + vlhkost  + "</span><br>");
            $(".vypis_okno").append("<span> Min. teplota v " + mesto + " je právě " + min_temp + "°C </span><br>");
            $(".vypis_okno").append("<span> Max. teplota v " + mesto + " je právě " + max_temp + "°C </span><br>");
            $(".vypis_okno").append("<span> Tlak v " + mesto + " je právě " + tlak + "</span><br>");
            $(".vypis_okno").append("<span> Vitr v " + mesto + " je právě " + vitr + "</span><br>");
            $(".vypis_okno").append($( "</br>" ) );
            $(".vypis_bar").append(time);
        } else {
            return;
        }
    });

    //pridat mazani vysledku

    $('.vypis_zobrazit').click(function() {
        $(".vypis_okno").toggle("slow");
    });


    $('.nastaveni').click(function() {
        $(this).toggleClass("nastaveni_rotate nastaveni_transition");
        $(".nastaveni_panel").toggle( "1000" , "swing" );
    }); 

    function hide(){
        $(this).toggleClass("close_search");
        $(".overlay").toggleClass("displayed");
    };

    $('.search_button').click(function() {
        hide();
    }); 
});
