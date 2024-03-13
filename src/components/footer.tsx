
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div style={{ textAlign: 'center' }} className="mx-4 md:mx-8 lg:mx-16">
      <Link to="/about-us" className="text-black dark:text-white custom-link">Sobre nós</Link>  
      <span className="text-black dark:text-white" style={{ margin: '0 10px' }}>•</span>
      <Link to="mailto:vivaviajandorj@gmail.com" target="_blank" className="text-black dark:text-white custom-link">Fale conosco</Link>
    <br />
    <br />
  </div>
  );
}
