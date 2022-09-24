function getData(){
    let city=document.querySelector("#searchCity").value;
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=88194844c524e0487b7e6424bc9b186b`;
let url2=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=88194844c524e0487b7e6424bc9b186b&units=metric`
    
    
    async function getWeatherData(){
        try{
            let res=await fetch(url);
            let data=await res.json();
            console.log(data);
            appendData(data)
            localStorage.setItem("city",JSON.stringify(data.name));
        }
        catch(err){
            console.log(err);
        }
    }   
getWeatherData();

}


// "https://maps.google.com/maps?q=Kolkata&t=&z=13&ie=UTF8&iwloc=&output=embed"


function appendData(data){
    let url=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    let container=document.querySelector("#container");
    container.innerHTML="";

    let name=document.createElement("h2");
    name.innerText=`Weather in ${data.name}`;

    let temp=document.createElement("h1");
    temp.innerText=`${Math.ceil(data.main.temp-273.15)}°C`;

    let min=document.createElement("p");
    min.innerText=`Min: ${Math.ceil(data.main.temp_min-273.15)}°C`;

    let max=document.createElement("p");
    max.innerText=`Max: ${Math.ceil(data.main.temp_max-273.15)}°C`;

    let humidity=document.createElement("p");
    humidity.innerText=`Humidity: ${data.main.humidity}%`;

    let wind=document.createElement("p");
    wind.innerText=`Wind Speed: ${data.wind.speed} km/h`;

    let pressure=document.createElement("p");
    pressure.innerText=`Air Pressure: ${data.main.pressure} mbar`;

    let clouds=document.createElement("p");
    clouds.innerText=`Clouds: ${data.cod}`;

    let sunrise=document.createElement("p");
    sunrise.innerText=`Sunrise: ${data.sys.sunrise}`;

    let sunset=document.createElement("p");
    sunset.innerText=`Sunset: ${data.sys.sunset}`;

    let latitude=document.createElement("p");
    latitude.innerText=`Latitude: ${data.coord.lat}`;

    let longitude=document.createElement("p");
    longitude.innerText=`Longitude: ${data.coord.lon}`;


    






    container.append(name,temp,min,max,humidity,wind,pressure,clouds,sunrise,sunset,latitude,longitude);

    let iframe=document.querySelector("#gmap_canvas");
    iframe.src=url;

}


function getLocation(){
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        const crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getWeatherOnLocation(crd.latitude, crd.longitude);
      }

}
getLocation();




function getWeatherOnLocation(lat,lon){
    console.log(lat)
    console.log(lon)
    localStorage.setItem("lat",JSON.stringify(lat));
    localStorage.setItem("lon",JSON.stringify(lon));
    let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88194844c524e0487b7e6424bc9b186b`;
    async function getWeatherData(){
        try{
            let res=await fetch(url);
            let data=await res.json();
            console.log(data);
            appendData(data)
            localStorage.setItem("city",JSON.stringify(data.name));
        }
        catch(err){
            console.log(err);
        }
    }   
    getWeatherData();
}
