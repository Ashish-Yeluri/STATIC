import wallpapers from '../Categories/1.avif';
import curtains from '../Categories/2.avif';
import blinds from '../Categories/3.avif';
import wooden from '../Categories/4.avif';
import carpet from '../Categories/5.avif';
import vinyl from '../Categories/6.avif';
import frames from '../Categories/7.avif';
import upholstery from '../Categories/8.avif';

export default function Categories() {
  const items = [
    { title: 'Wallpapers', img: wallpapers },
    { title: 'Curtains', img: curtains },
    { title: 'Blinds', img: blinds },
    { title: 'Wooden\nFlooring', img: wooden },
    { title: 'Carpet\nFlooring', img: carpet },
    { title: 'Vinyl\nFlooring', img: vinyl },
    { title: 'Frames', img: frames },
    { title: 'Upholstery', img: upholstery },
  ];

  return (
    <div style={styles.wrapper}>
      {items.map((item, index) => (
        <div key={index} style={styles.item}>
          <div style={styles.circle}>
            <img src={item.img} alt={item.title} style={styles.image} />
          </div>

          <p style={styles.text}>
            {item.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#c60000',
    padding: '40px 20px',
    flexWrap: 'wrap',
  },
  item: {
    textAlign: 'center',
    color: '#fff',
    minWidth: '120px',
  },
  circle: {
    width: '90px',
    height: '90px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
  },
  image: {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
  },
  text: {
    fontSize: '15px',
    fontWeight: '500',
    lineHeight: '1.3',
  },
};
