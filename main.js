const adviceInput = document.querySelector('#advice-input');
const adviceButton = document.querySelector('#advice-button');
const adviceContainer = document.querySelector('#advice-container');

adviceButton.addEventListener('click', () => {
    const keyword = adviceInput.value.trim();

    if (!keyword) return;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.adviceslip.com/advice/search/${encodeURIComponent(keyword)}`);

    xhr.onload = function () {
        adviceContainer.innerHTML = '';

        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            if (data.slips) {
                data.slips.forEach(slip => {
                    const p = document.createElement('p');
                    p.textContent = slip.advice;
                    adviceContainer.appendChild(p);
                });
            } else {
                adviceContainer.textContent = 'No advice found';
            }
        } else {
            adviceContainer.textContent = 'Error loading advice';
        }
    };

    xhr.onerror = function () {
        adviceContainer.textContent = 'Request failed';
    };

    xhr.send();
});


const breedsButton = document.querySelector('#breeds-button');
const breedList = document.querySelector('#breed-list');

breedsButton.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            breedList.innerHTML = '';

            Object.entries(data.message).forEach(([breed, subBreeds]) => {
                const li = document.createElement('li');

                li.textContent = subBreeds.length
                    ? `${breed}: ${subBreeds.join(', ')}`
                    : breed;

                breedList.appendChild(li);
            });
        } else {
            breedList.textContent = 'Error loading dog breeds';
        }
    };

    xhr.onerror = function () {
        breedList.textContent = 'Request failed';
    };

    xhr.send();
});


const quoteButton = document.querySelector('#quote-button');
const quoteContainer = document.querySelector('#quote-container');

quoteButton.addEventListener('click', async () => {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': 'YTEj53g13mmSJSkrV3EcnyYYXKuXuNI54j2awtmc'
            }
        });

        if (!response.ok) {
            throw new Error('Error loading quote');
        }

        const data = await response.json();

        quoteContainer.textContent = `"${data[0].quote}" - ${data[0].author}`;

    } catch (error) {
        quoteContainer.textContent = error.message;
    }
});



const countryInput = document.querySelector('#country-input');
const countryButton = document.querySelector('#country-button');
const countryInfo = document.querySelector('#country-info');

countryButton.addEventListener('click', async () => {
    const countryName = countryInput.value.trim();

    if (!countryName) return;

    try {
        const response = await fetch(
            `https://countries.dev/name/${encodeURIComponent(countryName)}`
        );

        if (!response.ok) {
            throw new Error('Country not found');
        }

        const data = await response.json();
        const country = Array.isArray(data) ? data[0] : data;

        if (!country) {
            throw new Error('Country not found');
        }

        countryInfo.innerHTML = `
            <h3>${country.name}</h3>
            <p>Capital: ${country.capital || 'Unknown'}</p>
            <p>Region: ${country.region || 'Unknown'}</p>
            <p>Population: ${country.population?.toLocaleString() || 'Unknown'}</p>
            <p>Flag: ${country.flag || ''}</p>
        `;

    } catch (error) {
        countryInfo.textContent = error.message;
    }
});
