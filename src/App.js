import './App.css';
import Navbar from './components/Navbar/Navbar.js'
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import CakeList from './components/Cake/CakeList.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Jumbotron />
    </div>
  );
}

export default App;
