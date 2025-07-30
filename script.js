let cityName=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
let w_icon=document.querySelector(".weather_icon");
let w_temprature=document.querySelector(".weather_temperature");
let w_min=document.querySelector(".weather_min");
let w_max=document.querySelector(".weather_max");
let feelsLike=document.querySelector(".weather_feelsLike");
let humidity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let pressure=document.querySelector(".weather_pressure");
let w_search=document.querySelector(".weather_search");



//to get actual country
const getCountryName=(code)=>{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};
 

//to get date and time
const getDateTime=(dt)=>{
    const currDate=new Date(dt*1000);   //converts seconds into miliseconds

const options={
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
};
    const formatter=new Intl.DateTimeFormat("en-US",options);
    return formatter.format(currDate);
  
};


let city = "Pune"; 


//Fetch Weather Data

const getWeatherData = async () => {
  const APIkey = "a8a632bbd6e9074ffb28ffedf27d03a2"; // Or your new working key
  

  //search functionality

 
  const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

  try {
    const response= await fetch(weatherAPIurl);
    //console.log(response);
    const data= await response.json();
    console.log(data);

    const {main,name,weather,wind,sys,dt}=data;

    cityName.innerHTML=`${name},${getCountryName(sys.country)}`;    //setting city name dyanmically

    dateTime.innerHTML=getDateTime(dt);     //setting datetime dyanmically


     w_forecast.innerHTML=weather[0].main;
    w_icon.innerHTML=`<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`;


    w_temprature.innerHTML=`${main.temp.toFixed()}&#176`;
    w_min.innerHTML=`Min: ${main.temp_min}&#176`; 
    w_max.innerHTML=`Max: ${main.temp_max}&#176`;


    feelsLike.innerHTML=`${main.feels_like}&#176`;
    humidity.innerHTML=`${main.humidity}%`;
    w_wind.innerHTML=`${wind.speed}m/s`;
    pressure.innerHTML=`${main.pressure} hPa`;



  } catch (error) {
    console.log("Network Error");
  }
};


document.body.addEventListener("load",getWeatherData());
w_search.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    let new_city=document.querySelector(".city_name");
    console.log(new_city.value);
    city=new_city.value;
    city.innerHTML="";
    getWeatherData();
});
