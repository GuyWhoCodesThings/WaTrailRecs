const NavBar = () => {
    return (
      <div className="fixed top-0 z-50 left-0 right-0 bg-emerald-600 text-white">
        <ul className="w-full flex justify-between p-2 pl-4 pr-4">
          <li className="flex items-center">
           
            <a href="/" className="text-white hover:text-white">
              Home
            </a>
          </li>
          
        <li>
          <a href="/" className="text-white hover:text-white">
            Contact
          </a>
        </li>
         
        </ul>
      </div>
    );
  };
  
  export default NavBar;
  