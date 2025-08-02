const baseURL = (window.location.hostname === "localhost") ?
          "http://localhost:4000" : "https://library-room.onrender.com";
const end = '/api/books';
export const fullURL = `${baseURL}${end}`;
