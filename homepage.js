const local_temp_weather =  [
    {location: "TP.Hồ Chí Minh", temperature: "30 C / 24-36C", weather: "fa-solid fa-cloud"}
]

function updateLocalTempWeather() {
    html = '';
    const content = local_temp_weather.map((item, index) => {
        html += '<p class="location">' + item.location + '</p>';
        html += '<p class="temperature">' + item.temperature + '</p>';
        html += '<i class="' + item.weather + '"></i>';
        console.log(html);
        return html;
    })

    document.getElementById('local__temp__weather').innerHTML = html;
}

updateLocalTempWeather();