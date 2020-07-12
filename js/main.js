'use strict';
$(document).ready(() => {
  $('#rechercheForm').on('submit', (e) => {
    let rechercheText = $('#rechercheText').val();

    getFilms(rechercheText);
    e.preventDefault();
  });
});

function getFilms(rechercheText) {
  axios
    .get(
       'http://www.omdbapi.com/?apikey=6c782683&s=' + rechercheText
      
    
    )
    .then((response) => {
      console.log(response);
      let films = response.data.Search;
      let output = '';
      $.each(films, (index, film) => {
        output += `
          <div class="col-md-3">
          <div class="well text-center">
          <img src="${film.Poster}">
           <h5>${film.Title}<h5>
           <a a onClick="filmSelected('${film.imdbID}')" class="btn btn-primary" href="#">Details Film</a>
          </div>
          </div>
          `;
      });

      $('#films').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function filmSelected(id) {
  sessionStorage.setItem('filmId', id);
  window.location = ' movie.html';
  return false;
}

function getFilm() {
  let filmId = sessionStorage.getItem('filmId');

  axios
    .get(
         'http://www.omdbapi.com/?apikey=6c782683&i=' + filmId
         
    )
    .then((response) => {
      console.log(response);
      let film = response.data;
      let output = `
      <div class="row">
      <div class="col-md-4">
      <img src="${film.Poster}" class="thumbnail">
    </div>
    <div class="col-md-8">
      <h2>Titre : ${film.Title}</h2>
        <ul class="list-group">
        <li class="list-group-item"><strong>Genre  :</strong> ${film.Genre}</li>
        <li class="list-group-item"><strong> Date de Sortie  : </strong> ${film.Released}</li>
        <li class="list-group-item"><strong> Classement  : </strong> ${film.Rated}</li>
        <li class="list-group-item"><strong> Classement IMDB  : </strong> ${film.imdbRating}</li>
        <li class="list-group-item"><strong> Réalisateur  : </strong> ${film.Director}</li>
        <li class="list-group-item"><strong> Scénariste  :   </strong> ${film.Writer}</li>
        <li class="list-group-item"><strong> Acteurs  : </strong> ${film.Actors}</li>
        <li class="list-group-item"><strong> Awards  : </strong> ${film.Awards}</li>
      <li class="list-group-item"><strong> DVD  : </strong> ${film.DVD}</li>
        <li class="list-group-item"><strong> Langue  : </strong> ${film.Language}</li>
       <li class="list-group-item"><strong> Année  : </strong> ${film.Year}</li>
       </ul>
       </div>
       </div>
        </div>
        <div class="row">
        <div class ="well">
         <h3>Plot</h3>
         ${film.Plot}
         <hr>
         <a href="http://imdb.com/title/${film.imdbID}" target="__blank" class="btn btn-primary">Voir le IMDB</a>
         <a href="index.html" class="btn btn-default">Revenir à la recherche</a>
       
        </div>
       </div>
        `;
      $('#film').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
