const baseURL = (window.location.hostname === "localhost") ?
          "http://localhost:4000" : "https://booklist-app-oezp.onrender.com";
const end = '/api/books';
export const fullURL = `${baseURL}${end}`;
