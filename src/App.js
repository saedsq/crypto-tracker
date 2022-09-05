import {Routes, Route,Navigate} from 'react-router-dom'
import Home from './components/Home/Home';
import CryptoCoins from './components/CryptoCoins/CryptoCoins';
import CryptoDetails from './components/CryptoCoins/CryptoDetails';
import Exchanges from './components/Exchanges/Exchanges';
import NavigationItems from './components/Navigation/NavigationItems';


import  './App.css';


function App() {
  return (
    <div className='app'>  

     <NavigationItems />
      <div >
                    <Routes>
                        <Route exact='true' path='/' element={<Home/>}/>
                        <Route path='/cryptocoins' element={<CryptoCoins/>}/>
                        <Route path='/cryptocoins/:coinId' element={<CryptoDetails />}/>
                        <Route path='/exchanges'  element={<Exchanges/>}/>
                        <Route path='*' element={<Navigate to='/'/>}/> 
                    </Routes>

                </div>
    </div>
  );
}

export default App;
