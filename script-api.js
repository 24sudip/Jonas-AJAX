'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     // const data = JSON.parse(this.responseText)[0];
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const htmlA = `
//         <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}M people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies.EUR.name
//             }</p>
//           </div>
//         </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', htmlA);
//     countriesContainer.style.opacity = 1;
//   });  
// };
// getCountryData('portugal');

const renderCountry = function (data, className = '') {
  const htmlA = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies.EUR.name
            }</p>
          </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', htmlA);
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};
// const getCountryAndNeighbour = function (country) {
//   // Ajax call 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     // const data = JSON.parse(this.responseText)[0];
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//     // Get neighbour country
//     const neighbour = data.borders?.[0];
//     if (!neighbour) return;
//     // Ajax call 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('portugal');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (response) {
//     console.log(response);
//     return response.json();
//   }).then(function (data) {
//     console.log(data);
//     renderCountry(data[0]);
//   });
// };
// getCountryData('portugal');

// const getCountryData = function (country) {
//   // Country-1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if(!response.ok) throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//    // const neighbour = 'dfghjkl';
//       if (!neighbour) return;
//       // Country-2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0],'neighbour'))
//     .catch(err => {
//       // alert(err);
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}`);
//     }).finally(() => {
//         countriesContainer.style.opacity = 1;
//     });
//   }
// btn.addEventListener('click', function() {
//   getCountryData('portugal');
// });
// // getCountryData('asdfghj');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
const getCountryData = function (country) {
  // Country-1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = 'dfghjkl';
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found');
      // Country-2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0],'neighbour'))
    .catch(err => {
      // alert(err);
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}`);
    }).finally(() => {
        countriesContainer.style.opacity = 1;
    });
  }
btn.addEventListener('click', function() {
  getCountryData('portugal');
});
// getCountryData('australia');

// console.log('Test Start');
// setTimeout(() => {
//   console.log('0 sec timer');
// }, 0);
// Promise.resolve('Resolve promise 1').then(res => console.log(res));
// Promise.resolve('Resolve promise 2').then(res => {
//   for (let index = 0; index < 100000000; index++) {}
//   console.log(res);
// });
// console.log('Test End');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// }
// wait(2).then(() => {
//   console.log('I waited for 2 seconds');
//   return wait(1);
// }).then(() => {
//   console.log('I waited for 1 second');
// });

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// wait(1)
//   .then(() => {
//     console.log('1 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 seconds passed'));
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Promise!')).catch(x => console.error(x));lat, lng

// const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//         // navigator.geolocation.getCurrentPosition(
//         //   position => resolve(position),
//         //   err => reject(err)
//         // );
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };
// getPosition().then(pos => console.log(pos));
// const whereAmI = function () {
//     getPosition().then(pos => {
//         // console.log(pos.coords);
//         const { latitude: lat, longitude: lng } = pos.coords;
//         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//       .then(res => {
//         if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.country}`);
//         return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error(`Country not found (${res.status})`);
//         return res.json();
//       })
//       .then(data => renderCountry(data[0]))
//       .catch(err => console.error(`${err.message} 💥`));
// };
// btn.addEventListener('click', whereAmI);

// const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };
//   // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
//   //   console.log(res)
//   // );
// const whereAmI = async function () {
//   // Geolocation
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;
//   // Reverse geocoding
//   const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const dataGeo = await resGeo.json();
//   // Country Data
//   const res = await fetch(
//     `https://restcountries.com/v3.1/name/${dataGeo.country}`
//   );
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// }
// whereAmI();

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if(!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    // Country Data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 😶`);
    renderError(`💥 ${err.message}`);
    // Reject promise returned from async function
    throw err;
  }
}
console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 😒`))
//   .finally(() => console.log('3: Finished getting location'));
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (error) {
    console.error(`2: ${err.message} 😒`);
  }
  console.log('3: Finished getting location');
})();

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(
//     //   `https://restcountries.com/v3.1/name/${c1}`
//     // );
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     // console.log([data1.capital, data2.capital, data3.capital]);
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3Countries('portugal', 'canada', 'tanzania');

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function (params) {
//       reject(new Error('Request took too long!'))
//     }, sec * 1000);
//   });
// };
// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(1)
// ]).then(res => console.log(res[0])).catch(err => console.error(err));

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
