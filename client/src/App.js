import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import "./App.css";

import ShowBookList from "./components/ShowBookList";
import CreateBook from "./components/CreateBook";
import UpdateBookInfo from "./components/UpdateBookInfo";
import ShowBookDetails from "./components/ShowBookDetails";

const App = ()=> {
    return (
      <div>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<ShowBookList />} />
              <Route path="/create-book" element={<CreateBook />} />
              <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
              <Route path="/show-book/:id" element={<ShowBookDetails />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }

export default App;
