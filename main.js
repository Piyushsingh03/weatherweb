const key = "af5dbe3935837c4ae6c1868b2f291a8a"


async function search(ev) {
    const phrase = document.querySelector('input[type="text"]').value;
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${key}`);

    const data = await res.json();
    const ul = document.querySelector('form ul');
    ul.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const { name, lat, lon, country } = data[i];
        ul.innerHTML += `<li 
        data-lat="${lat}" 
        data-lon="${lon}"
        data-name="${name}" 
        >
        ${name} <span>${country}</span></li>`;
    }
}

const debouncedSearch = _.debounce(() => {
    search();
}, 600)


const showWeather = async (lat, lon, name) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
    const data = await res.json();
    const temp = Math.round(data.main.temp);
    const feelslike = Math.round(data.main.feels_like);
    const humidity = (data.main.humidity);
    const wind = Math.round(data.wind.speed);
    const icon = data.weather[0].icon;

    document.getElementById('city').innerHTML = name;
    document.getElementById('degrees').innerHTML = temp + ' <span>&#8451;</span>';
    document.getElementById('feelslikeValue').innerHTML = feelslike +
        ' <span>&#8451;</span>';
    document.getElementById('windValue').innerHTML = wind + " <span>Km/h</span>";
    document.getElementById('humidityValue').innerHTML = humidity + " <span>%</span>";

    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}@4x.png`

    document.querySelector("form").style.display = 'none';
    document.getElementById("weather").style.display = 'block';

}



document.querySelector('input[type="text"]').addEventListener('keyup', debouncedSearch);

document.addEventListener('click', (ev) => {
    const li = ev.target
    const { lat, lon, name } = li.dataset;
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);
    localStorage.setItem("name", name);
    if (!lat) { return; }


    showWeather(lat, lon, name);
})

document.getElementById("change").addEventListener("click", () => {
    document.getElementById("weather").style.display = 'none';
    document.getElementById("form").style.display = "block"
})

document.body.onload = () => {
    if (localStorage.getItem("lat")) {
        const lat = localStorage.getItem("lat");
        const lon = localStorage.getItem("lon");
        const name = localStorage.getItem("name");


    }
}