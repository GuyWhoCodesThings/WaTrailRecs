type NavBarProps = {
  changePage: (s: boolean) => void
}

const NavBar = (props: NavBarProps) => {
    return (
      <div className="fixed top-0 z-50 left-0 right-0 bg-emerald-600 text-white">
        <ul className="w-full flex justify-between p-2 pl-4 pr-4">
          <li className="flex items-center">
           
            <button
            onClick={() => props.changePage(true)}
           
            className="text-white hover:text-white border-none focus:underline p-1 m-0">
              Home
            </button>
          </li>
          
        <li>
          <button 
          onClick={() => props.changePage(false)}
          className="text-white hover:text-white border-none focus:underline p-1 m-0">
            Contact
          </button>
        </li>
         
        </ul>
      </div>
    );
  };
  
  export default NavBar;
  