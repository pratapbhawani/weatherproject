const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");

const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".data_hide");

const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const getInfo = async (event) => {
    event.preventDefault();
    // alert("Hi it's working");
    let cityVal = cityName.value;
    if (cityVal == "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=baf332c0dfc9564612e4ab2d7e252268
        `
            const response = await fetch(url);
            let data = await response.json();
            // console.log(data);
            const arrData = [data];

            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`
            let needval = arrData[0].main.temp;
            needval /= 10;
            needval = needval.toFixed(2);
            // console.log(needval.toFixed(2));
            temp_real_val.innerText = needval;
            // temp_status.innerText=arrData[0].weather[0].main;
            const temp_Mood = arrData[0].weather[0].main;
            if (temp_Mood == 'Rain') {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
            }
            else if (temp_Mood == 'Clear') {
                temp_status.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
            else if (temp_Mood == 'Clouds') {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
            }
            else {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud"></i>';
            }

            datahide.classList.remove('data_hide');

            // --------------------------date and day------------------------

            var weekday = new Array(7);
            weekday[0] = "Sun";
            weekday[1] = "Mon";
            weekday[2] = "Tue";
            weekday[3] = "Wed";
            weekday[4] = "Thu";
            weekday[5] = "Fri";
            weekday[6] = "Sat";

            let currentTime = new Date();
            let curr_day = weekday[currentTime.getDay()];
            console.log(curr_day);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            var month=months[currentTime.getMonth()]
            console.log(month);
            var curr_date=currentTime.getDate();
            console.log(curr_date)
            day.innerText=curr_day;
            today_date.innerText=`${curr_date} ${month}`

        }
        catch {
            city_name.innerText = `Plz write the city name properly`;
            datahide.classList.add('data_hide');
        }
    }
}
submitBtn.addEventListener('click', getInfo);