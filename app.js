window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature-section');
  const temperatureSpan = document.querySelector('.temperature-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;


      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/00180a8e7760a7db82abb44c8a592dc6/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements From API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //formula to celsius
          let celsius = (temperature - 32) * (5/ 9)

          //Set icon
          setIcons(icon, document.querySelector('.icon'));

          //Change temp to celsius or Fahrenreit

          temperatureSection.addEventListener('click', () => {
              if(temperatureSpan.textContent === 'F'){
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = Math.floor(celsius);
              }
              else {
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = temperature;
              }
          });
        });
    });
  } else {
    h1.textContent = "Ei, seu navegador nao me permite te buscar .";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);

  }

});
