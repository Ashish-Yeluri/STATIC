import { Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Slide from './Slide/Slide';
import Categories from './Categories/Categories';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact'

function Home() {
  return (
    <>
      <Slide />
      <Categories />
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/>
      </Routes>
    </>
  );
}

export default App;
