(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock);
        
        function updateClock() {
            
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var ampm = hours >= 12 ? 'pm' : 'am';

            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            seconds = seconds < 10 ? '0'+seconds : seconds;

            c.innerHTML = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
            
        }
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        var linn = document.getElementById("linn");
        var lisa1 = document.getElementById("v1");
        var lisa2 = document.getElementById("v2");
        var enimi = document.getElementById("fname");
        var pnimi = document.getElementById("lname");
        var tom = document.getElementById("tom");
        var mahla = document.getElementById("mahla");
        var muu = document.getElementById("muu");
        var sum = 0;

        if(!tom.checked && !mahla.checked && !muu.checked){
            alert("Palun valige lemmikjäätis");
            return;
        }

        if(lisa1.checked){
            sum += 5
        }

        if(lisa2.checked){
            sum += 1
        }

        if(enimi.value === "" || pnimi.value === ""){
            alert("Palun sisestage korrektne nimi");
            return;
        }
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            if(linn.value === "tln"){
                sum += 0;
                e.innerHTML = sum + " &euro;";
            }

            if(linn.value === "trt" || linn.value === "nrv"){
                sum += 2.5;
                e.innerHTML = sum + " &euro;";
            }

            if(linn.value === "prn"){
                sum += 3;
                e.innerHTML = sum + " &euro;";
            }
            
        }        
        
        console.log("Tarne hind on arvutatud");

    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map,infobox;

function GetMap() {



    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    var puhja = new Microsoft.Maps.Location(
        58.3383,
        26.3119
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    
    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    var pushpin2 = new Microsoft.Maps.Pushpin(puhja, {
        title: 'Puhja',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });

    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Hea koht'
    };

    pushpin2.metadata = {
        title: 'Puhja',
        description: 'Sõber elab seal'
    };

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

}

function pushpinClicked(e) {
    console.log(e);
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

