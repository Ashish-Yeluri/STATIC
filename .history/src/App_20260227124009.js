import { Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
// import HomeMain from './Slide/Home';
// import Categories from './Categories/Categories';
import HomeMain from './Home/HomeMain';
import About from './Pages/About/About';
import Catalogue from './Pages/Catalogue/Catalogue';
import Contact from './Pages/Contact/Contact'
import OurProjects from './Pages/OurProjects/OurProjects';
import Promise from './Promise/Promise';
import Products from './Pages/Products/Products';
import ScrollToTop from './Components/ScrollToTop';
import FloatingContact from './Components/Floating/FloatingContact';
import Popup from './Components/'
function Home() {
  return (
    <>
      {/* <Slide /> */}
      {/* <Categories /> */}
      <HomeMain/>
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <ScrollToTop/>
      <FloatingContact/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/catalogue'element={<Catalogue/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/projects/:category"element={<OurProjects/>}/>
      </Routes>
      <Promise/>
      <Footer/>
    </>
  );
}

export default App;
