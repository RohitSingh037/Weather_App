const months = {
    0: "January",
    1: 'Fabruary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}


function OnClickFatch() {
    var city = document.getElementById("submit").value;
    fatchData(city)
}

document.getElementById("submit").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                OnClickFatch(); // Call the search function when Enter is pressed
            }
        });

var JSON_value;


const date = new Date()
let hour = date.getHours()
hour = (hour + 20) % 24

function fatchData(city = 'aurangabad') {
    fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=oiruNqplI2YvWjOk39bln2rLS1OtsXSx`)
        .then(res => res.json())
        .then(data => {
            JSON_value = data;
            document.querySelector(".location").innerHTML = (data.location.name)
            document.querySelector(".temperature").innerHTML = (data.timelines.hourly[hour].values.temperature) + '°C'
            document.querySelector('.min').innerHTML = JSON_value.timelines.daily[0].values.temperatureMin + '°C'
            document.querySelector('.max').innerHTML = JSON_value.timelines.daily[0].values.temperatureMax + '°C'
            document.querySelector("#humidity").innerHTML = (data.timelines.hourly[hour].values.humidity)
            document.querySelector('#wind-speed').innerHTML = (data.timelines.hourly[hour].values.windSpeed)
            document.querySelector('#day1').firstElementChild.innerHTML = data.timelines.daily[0].values.temperatureMin + "°C"
            document.querySelector('#day1').lastElementChild.innerHTML = data.timelines.daily[0].values.temperatureMax + "°C"
            document.querySelector('#day2').firstElementChild.innerHTML = data.timelines.daily[1].values.temperatureMin + "°C"
            document.querySelector('#day2').lastElementChild.innerHTML = data.timelines.daily[1].values.temperatureMax + "°C"
            document.querySelector('#day3').firstElementChild.innerHTML = data.timelines.daily[2].values.temperatureMin + "°C"
            document.querySelector('#day3').lastElementChild.innerHTML = data.timelines.daily[2].values.temperatureMax + "°C"
            document.querySelector('#day4').firstElementChild.innerHTML = data.timelines.daily[3].values.temperatureMin + "°C"
            document.querySelector('#day4').lastElementChild.innerHTML = data.timelines.daily[3].values.temperatureMax + "°C"
            document.querySelector('#day5').firstElementChild.innerHTML = data.timelines.daily[4].values.temperatureMin + "°C"
            document.querySelector('#day5').lastElementChild.innerHTML = data.timelines.daily[4].values.temperatureMax + "°C"
            const day3 = new Date(data.timelines.daily[2].time)
            document.querySelector('#day3').getElementsByTagName('b')[0].innerHTML = day3.getUTCDate() + '/' + months[day3.getUTCMonth()]
            const day4 = new Date(data.timelines.daily[3].time)
            document.querySelector('#day4').getElementsByTagName('b')[0].innerHTML = day4.getUTCDate() + '/' + months[day4.getUTCMonth()]
            const day5 = new Date(data.timelines.daily[4].time)
            document.querySelector('#day5').getElementsByTagName('b')[0].innerHTML = day5.getUTCDate() + '/' + months[day5.getUTCMonth()]
        })
        .catch(error => alert(error))
}

fatchData()

const days = {
    day1: 0,
    day2: 1,
    day3: 2,
    day4: 3,
    day5: 4,
}

function ondays(day) {
    const text = document.getElementById(day).getElementsByTagName('b')[0].innerText
    document.querySelector('.min').innerHTML = JSON_value.timelines.daily[days[day]].values.temperatureMin + '°C'
    document.querySelector('.max').innerHTML = JSON_value.timelines.daily[days[day]].values.temperatureMax + '°C'
    if (day == 'day1') {
        document.querySelector(".day").innerHTML = 'Now'
        document.querySelector('.temperature').innerHTML = JSON_value.timelines.hourly[hour].values.temperature + '°C'
        document.querySelector('#humidity').innerHTML = JSON_value.timelines.hourly[hour].values.humidity
        document.querySelector('#wind-speed').innerHTML = (JSON_value.timelines.hourly[hour].values.windSpeed)
    }
    else {
        document.querySelector('.temperature').innerHTML = ""
        document.querySelector('#humidity').innerHTML = JSON_value.timelines.daily[days[day]].values.humidityMin + ' - ' + JSON_value.timelines.daily[days[day]].values.humidityMax
        document.querySelector('#wind-speed').innerHTML = JSON_value.timelines.daily[days[day]].values.windSpeedMin + ' - ' + JSON_value.timelines.daily[days[day]].values.windSpeedMax
        document.querySelector(".day").innerHTML = text

    }
}
