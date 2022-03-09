/* Global Variables */
const apiKey = '&appid=51fb8594421778a334e99d5d57e464bd';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const btn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Get function to get the data from the API
const getData = async (url, zip, key) => {
    const response = await fetch(url+zip+key+'&units=metric')

    try {
        let data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

// Post function to send the data to the server endpoint
const postData = async (url = '', info = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;

    } catch (error) {
        console.log(error);
    }
}

// Get function to receive the sent data back from the server endpoint
const getDataEndpoint = async (url) => {
    const response = await fetch(url);

    try {
        let finalData = await response.json();
        const date = document.getElementById('date');
        const temp = document.getElementById('temp');
        const content = document.getElementById('content');

        date.innerHTML = `The Date is: ${finalData.date}`;
        temp.innerHTML = `The Temperature is: ${finalData.temp}° C`;
        content.innerHTML = `You're Feeling ${finalData.content}`;

    } catch (error) {
        console.log(error);
    }
}


/* Callback function for the Event Listener */
const btnAction = () => {
    const newZip = document.getElementById('zip').value;
    const newFeelings = document.getElementById('feelings').value;

    getData(apiURL, newZip, apiKey)

    .then (data => {
        console.log(data);
        postData('/', {temp: data.main.temp, date: newDate, content: newFeelings});
    })

    .then(() => {
        getDataEndpoint('/send');
    });
}

// Event Listener for the submit button
btn.addEventListener('click', btnAction);