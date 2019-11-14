document.addEventListener("DOMContentLoaded", function() {
        
    const body = document.body;
    const buttonALLMovies = document.querySelector('.all-movies');
    let select = document.querySelector('select');
    const buttonClean = document.querySelector('.clean');  
    
    buttonALLMovies.addEventListener('click', showListAllMovie, {'once': 'true'});
    buttonALLMovies.addEventListener('click', toggleShowList);
    select.addEventListener('change', showListMoviesByGenre);
    buttonClean.addEventListener('click', hideListMoviesByGenre);
    
    
    const mainMovie = document.createElement('main');
    mainMovie.classList.add('mainMovie');
    body.appendChild(mainMovie);
    
    const mainMovieByGenre = document.createElement('main');
    mainMovieByGenre.classList.add('mainMovieByGenre');
    body.appendChild(mainMovieByGenre);

    const mainMovieByName = document.createElement('main');
    mainMovieByName.classList.add('mainMovieByName');
    body.appendChild(mainMovieByName);
    
    function showListAllMovie() {
        const allMovies = document.createElement('div');
        allMovies.classList.add('dropdownAllMovies');
        mainMovie.appendChild(allMovies);
        const requestListAllMovies = fetch('https://cinema-api-test.herokuapp.com/movies');
        requestListAllMovies.then(transformJson => transformJson.json()).then(listAllMovies => {
            for (let i = 0; i < listAllMovies.length; i++) {
                const displayMovie = document.createElement('div');
                displayMovie.classList.add('movies');
                allMovies.appendChild(displayMovie);
                displayMovie.innerHTML =
                `<span><b>${listAllMovies[i].name}</span></b></br>
                <img src="${listAllMovies[i].pictureLink}" alt="" /></br>
                <span class="story">${listAllMovies[i].description}</span>
                <button class="description">description</button>`
            }
        })
    }
    
    function showListMoviesByGenre() {
        const foundGenre = document.createElement('div');
        foundGenre.classList.add('dropdownMoviesByGenre');
        mainMovieByGenre.appendChild(foundGenre);
        let selectedGenre = Number(this.value);
        const requestListMoviesByGenre = 
        fetch(`https://cinema-api-test.herokuapp.com/movies/find?genres=${selectedGenre}`);
        requestListMoviesByGenre.then(transformJson => transformJson.json()).then(listAllMovies => {
          for (let i = 0; i < listAllMovies.length; i++) {
                const displayMovie = document.createElement('div');
                displayMovie.classList.add('movies');
                foundGenre.appendChild(displayMovie);
                displayMovie.innerHTML = 
                `<span>${listAllMovies[i].name}</span></br>
                <img src="${listAllMovies[i].pictureLink}" alt="" /></br>`
            }
        })
    }

    function toggleShowList() {
        const allMovies = document.querySelector('.mainMovie');
        allMovies.classList.toggle('none');
    }

    function hideListMoviesByGenre() {
        const allMovies = document.querySelector('.mainMovieByGenre');
        allMovies.innerHTML = '';
    }

    const buttonEnterMovie = document.querySelector('.resetButton');
	const inputMovie = document.querySelector('.text');

    buttonEnterMovie.addEventListener('click', showMovieByName);

    function showMovieByName() {
        const foundMovieByName = document.createElement('div');
        foundMovieByName.classList.add('movieByName');
        mainMovieByName.appendChild(foundMovieByName);
        const movieName = inputMovie.value.toLowerCase();
        const requestMovieByName = 
        fetch(`https://cinema-api-test.herokuapp.com/movies/find?name=${movieName}`);
        requestMovieByName.then(transformJson => transformJson.json())
        .then(movieByName => {
            foundMovieByName.innerHTML = 
            `<span>${movieByName[0].name}</span></br>
            <img src="${movieByName[0].pictureLink}" alt="" /></br>`
        }).catch(e => {
            inputMovie.setAttribute('placeholder', 'Not Found');
		});
        inputMovie.value = '';
    }

});
