import logo from '../images/logo/Vector.svg';

function Header() {
    return (
     
      <header className="header">
        <img className="header__logo" src={logo} alt="Место"/>
      </header>  

    );
  }
  
  export default Header;