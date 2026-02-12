import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
} from 'react-icons/fa';

import hero from '../About/Main.avif';
import AboutBox from '../../Data/AboutBox.json'

export default function About() {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={{ ...styles.hero, backgroundImage: `url(${hero})` }}>
        <div style={styles.overlay}>
          <div style={styles.overMain}>
            <h4>FREE SHIPPING & INSTALLATION</h4>
          </div>
          <h1>About Us | Design Walls | Hyderabad</h1>
          <p>about design walls</p>

          <div style={styles.socials}>
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaYoutube />
            <FaPinterestP />
          </div>
        </div>
      </div>

      {/* Content Boxes */}
      <div style={styles.boxWrapper}>
        {AboutBox.map((item) => (
          <div key={item.id} style={styles.box}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



const styles = {
  page: {
    // marginTop: '80px', // header space
  },
  hero: {
    height: '450px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(206, 66, 66, 0.6)',
    color: '#fff',
    height: '330px',
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  // overMain: {
  //   marginTop: 10
  // },
  socials: {
    display: 'flex',
    gap: '16px',
    fontSize: '20px',
    marginTop: '20px',
    cursor: 'pointer',
  },
  boxWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
    padding: '60px',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  box: {
    width: '20%',
    backgroundColor: '#f7f7f7',
    padding: '30px',
    borderRadius: '8px',
  },


};
