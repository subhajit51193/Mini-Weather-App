let city=JSON.parse(localStorage.getItem("city"));
let lat=JSON.parse(localStorage.getItem("lat"));
let lon=JSON.parse(localStorage.getItem("lon"));
console.log(city);
console.log(lat)
console.log(lon)

// let url2=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=88194844c524e0487b7e6424bc9b186b&units=metric`
// let url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=88194844c524e0487b7e6424bc9b186b`;
let url1=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=88194844c524e0487b7e6424bc9b186b&units=metric`;


async function getForecast(){
    try{
        let res=await fetch(url1);
        let data=await res.json();
        console.log(data);
        appendData(data)
    }
    catch(err){
        console.log(err);
    }
    
}   
getForecast();

let container=document.querySelector("#forecast");
container.innerHTML="";

function appendData(data){
    console.log(data.daily.length)
    console.log(data.daily[0].dt)
    console.log(data.daily[0].temp.max)
    console.log(data.daily[0].weather[0].id)
    for (let i=0;i<data.daily.length-1;i++){
        let div=document.createElement("div");

        let date=document.createElement("p");
        date.innerText=data.daily[i].dt;

        let image=document.createElement("img");
        if(data.daily[i].weather[0].id>=200 && data.daily[i].weather[0].id<=232){
            image.src="http://openweathermap.org/img/wn/11n@2x.png";

        }
        if(data.daily[i].weather[0].id>=300 && data.daily[i].weather[0].id<=321){
            image.src="http://openweathermap.org/img/wn/09n@2x.png";

        }
        if(data.daily[i].weather[0].id>700 && data.daily[i].weather[0].id<=781){
            image.src="http://openweathermap.org/img/wn/50d@2x.png";

        }
        if(data.daily[i].weather[0].id>=500 && data.daily[i].weather[0].id<=531){
            image.src="http://openweathermap.org/img/wn/10d@2x.png";

        }
        if(data.daily[i].weather[0].id==800){
            image.src="http://openweathermap.org/img/wn/01d@2x.png";

        }
        if(data.daily[i].weather[0].id>800 && data.daily[i].weather[0].id<=804){
            image.src="http://openweathermap.org/img/wn/02d@2x.png";

        }
        if(data.daily[i].weather[0].id>=600 && data.daily[i].weather[0].id<=622){
            image.src="http://openweathermap.org/img/wn/13d@2x.png";

        }

        let max=document.createElement("p");
        max.innerText=`Max: ${data.daily[i].temp.max}°C`;

        let min=document.createElement("p");
        min.innerText=`Min: ${data.daily[i].temp.min}°C`;

        div.append(date,image,max,min);
        container.append(div);
    }
}