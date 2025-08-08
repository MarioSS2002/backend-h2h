const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users'

axios.get(url).then(response => {
    console.log(response.data)
})


