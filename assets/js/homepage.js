const local_temp_weather =  [
    {location: "TP.Hồ Chí Minh", temperature: "30 C / 24-36C", weather: "fa-solid fa-cloud"}
]

const hot_news_left = [
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_1.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_2.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_3.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_4.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_1.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_2.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_3.png", category: "Đời sống", time: "5:34pm 16-03-23"}
]

const hot_news_right = [
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_1.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_2.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_3.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_4.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_1.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_2.png", category: "Đời sống", time: "5:34pm 16-03-23"},
    {title: "Dân tái định cư sân bay Long Thành mở quán xá rồi ngồi 'nhìn nhau'", image: "assets/images/news/news_search/new_3.png", category: "Đời sống", time: "5:34pm 16-03-23"}
]


function updateLocalTempWeather() {
    html = '';
    const content = local_temp_weather.map((item, index) => {
        html += '<p class="location">' + item.location + '</p>';
        html += '<p class="temperature">' + item.temperature + '</p>';
        html += '<i class="' + item.weather + '"></i>';
        return html;
    })

    document.getElementById('local__temp__weather').innerHTML = html;
}

updateLocalTempWeather();

function updateLocalHotNews() {
    html = '';
    const content_left = hot_news_left.map((item, index) => {
        html += '<div class="card card__news__right--extend">';
        html += '<img src="' + item.image + '" class="card-img-top" alt="...">';
        html += '<div class="card-body">';
        html += '<h5 class="card-title">' + item.title + '</h5>';
        html += '<div class="category-time">';
        html += '<p class="card-text"><small class="text-muted">'+ item.category + '</small></p>';
        html += '<p class="card-text"><small class="text-muted">'+ item.time + '</small></p>';
        html += '</div>';      
        html += '</div>';      
        html += '</div>';     
        return html;
    })
    document.getElementById('content__news__right').innerHTML = html;

    html = '';
    const content_right = hot_news_right.map((item, index) => {
        html += '<div class="card card__news__left--extend">';
        html += '<img src="' + item.image + '" class="card-img-top" alt="...">';
        html += '<div class="card-body">';
        html += '<h5 class="card-title">' + item.title + '</h5>';
        html += '<div class="category-time">';
        html += '<p class="card-text"><small class="text-muted">'+ item.category + '</small></p>';
        html += '<p class="card-text"><small class="text-muted">'+ item.time + '</small></p>';
        html += '</div>';      
        html += '</div>';      
        html += '</div>';     
        return html;
    })

    document.getElementById('content__news__left').innerHTML = html;
}

updateLocalHotNews();