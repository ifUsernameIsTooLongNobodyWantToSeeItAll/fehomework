fetch("http://localhost:3000/api/register/anonimous")
    .then((response) => response.json())
    .then((response) => console.log(response))