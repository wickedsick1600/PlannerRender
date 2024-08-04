import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Home/Home.jsx';
import ToDo from './ToDo/ToDo.jsx';
import ShoppingList from './ShoppingList/ShoppingList.jsx';



function App() {

  return (
  <BrowserRouter>
    <div className="appCont">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Todo" element={<ToDo />}/>
          <Route path="/ShoppingList" element={<ShoppingList />}/>
        </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App