import { Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Slide from './Slide/Slide';
import Categories from './Categories/Categories';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact'
import Blog from './Pages/Blog/Blog'
import OurProjects from './Pages/OurProjects/OurProjects';

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
        <Route path='/catalogue'>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/projects/:category"element={<OurProjects/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
