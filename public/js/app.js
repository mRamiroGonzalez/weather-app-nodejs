
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

const errorMessage = document.getElementById('error');
const responseMessage = document.getElementById('response');
const locationMessage = document.getElementById('location');

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault(); // prevent to reload the page

    const location = searchInput.value;
    
    responseMessage.textContent = 'Searching...';
    errorMessage.textContent = '';
    locationMessage.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error) {
                        errorMessage.textContent = data.error;
                    }
                    responseMessage.textContent = data.forecast;
                    locationMessage.textContent = data.location;
                }).catch((error) => {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error);
        });
})