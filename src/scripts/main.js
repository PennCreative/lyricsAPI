// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
// Rendering to Dom
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};
// API Call
const getLyrics = (artist, song) => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
// Rendering the Lyrics on the page
const renderLyrics = (artist, song) => {
  getLyrics(artist, song)
    .then((response) => {
      renderToDom('#app', response.lyrics);
    });
};
// Creating the form for the page
const renderForm = () => {
  const domString = `
  <h1 style="text-align: center;">Search Lyrics</h1>
  <form>
  <div id="userInput" class="input-group" >
  <input type="text" id="artistInput" aria-label="Artist Name" placeholder="Artist Name"class="form-control" required>
  <input type="text" id="songInput" aria-label="Song name" placeholder="Song Name" class="form-control" required>
  <button class="btn btn-outline-primary" type="submit" id="button-addon2">Search</button>
</div>
</div>
</form>
  `;
  renderToDom('#login-form-container', domString);
};
// Adding Event Listeners
const eventListeners = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    const artistName = document.querySelector('#artistInput').value;
    const songName = document.querySelector('#songInput').value;
    e.preventDefault();
    renderLyrics(artistName, songName);
    form.reset();
  });
};

const init = () => {
  renderForm();
  eventListeners();
  // USE WITH FIREBASE AUTH
  // checkLoginStatus();
};

init();
