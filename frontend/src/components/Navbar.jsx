import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {

    const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
    const {user,logout} = useAuthStore();

    const toggleMobileMenu = ()=>setIsMobileMenuOpen(!isMobileMenuOpen);

    const {setContentType} = useContentStore();
    //console.log(contentType);

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
            <Link to='/'>
                <img src="/netflix-logo.png" alt="Netflix logo" className="w-32 sm:w-40" />
            </Link>
            {/* desktop navnar items */}
            <div className="sm:flex hidden gap-2 items-center">
                <Link to='/' className="hover:underline text-gray-300 text-md" onClick={()=>setContentType("movie")}>
                    Movies
                </Link>
                <Link to='/' className="hover:underline text-gray-300 text-md" onClick={()=>setContentType("tv")}>
                    TV Shows
                </Link>
                <Link to='/history' className="hover:underline text-gray-300 text-md">
                    Search History
                </Link>
            </div>
        </div>
        <div className="flex gap-2 items-center z-50">
            <Link to={"/search"}>
                <Search className="size-6 cursor-pointer text-gray-300 text-md"/>
            </Link>
            <img src={user.image} alt="avatar" className="h-8 rounded cursor-pointer" />
            <LogOut className="size-6 cursor-pointer text-gray-300 text-md" onClick={logout}/>
            <div className="sm:hidden">
                <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu}/>
            </div>
        </div>
        {/* mobile navbar items */}
        {isMobileMenuOpen && (
            <div className="w-full sm:hidden mt-4 z-50 bg-black rounded border-gray-800">
                <Link to={"/"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
                    Movies
                </Link>
                <Link to={"/"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
                    Tv Shows
                </Link>
                <Link to={"/history"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
                    Search History
                </Link>
            </div>
        )}

    </header>
  )
}

export default Navbar;