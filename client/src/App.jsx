import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Home/Home.jsx';
import ToDo from './ToDo/ToDo.jsx';
import ShoppingList from './ShoppingList/ShoppingList.jsx';



function App() {

  return (
  <HashRouter>
    <div className="appCont">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Todo" element={<ToDo />}/>
          <Route path="/ShoppingList" element={<ShoppingList />}/>
        </Routes>
    </div>
  </HashRouter>
  );
}

export default App