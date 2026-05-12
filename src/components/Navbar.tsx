import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut, LayoutDashboard, Globe, Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { IMAGES } from '../constants/images';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const Navbar = () => {
  const { user, setUser, cart, theme, toggleTheme, language, setLanguage } = useStore();
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Ride', path: '#' },
    { name: 'Partner', path: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-1.5 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
              <img src={IMAGES.logo} alt="Sululta Eats" className="h-10 w-10 rounded-lg object-cover" />
            </div>
            <span className="text-2xl font-black tracking-tighter hidden sm:block">
              Sululta <span className="text-primary">Eats</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-2xl">
               <DropdownMenuItem onClick={() => setLanguage('en')} className="font-bold">English</DropdownMenuItem>
               <DropdownMenuItem onClick={() => setLanguage('am')} className="font-bold">Amharic</DropdownMenuItem>
               <DropdownMenuItem onClick={() => setLanguage('or')} className="font-bold">Afaan Oromo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
             {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 bg-muted/50 hover:bg-primary hover:text-white transition-all">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-[10px] font-black border-4 border-background" variant="destructive">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full px-4 gap-2 h-12 border-2 hover:border-primary transition-all">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="font-bold hidden sm:inline">{user.fullName.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 p-2 rounded-[1.5rem] shadow-2xl border-2">
                <div className="px-4 py-3 border-b mb-2">
                   <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Logged in as</p>
                   <p className="font-bold truncate">{user.fullName}</p>
                </div>
                <Link to="/profile">
                  <DropdownMenuItem className="rounded-xl font-bold py-3 px-4">
                     <User className="h-4 w-4 mr-3" /> Profile
                  </DropdownMenuItem>
                </Link>
                {user.role !== 'CUSTOMER' && (
                  <Link to={`/${user.role.toLowerCase()}-dashboard`}>
                    <DropdownMenuItem className="rounded-xl font-bold py-3 px-4">
                       <LayoutDashboard className="h-4 w-4 mr-3" /> Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem onClick={handleLogout} className="rounded-xl font-bold py-3 px-4 text-destructive">
                   <LogOut className="h-4 w-4 mr-3" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden sm:block">
              <Button className="rounded-full px-8 h-12 font-black shadow-lg shadow-primary/20">Login</Button>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] rounded-l-[3rem]">
              <div className="flex flex-col gap-8 mt-12 px-6">
                <Link to="/" className="flex items-center gap-3">
                   <img src={IMAGES.logo} className="h-12 w-12 rounded-2xl shadow-lg" alt="Logo" />
                   <span className="text-3xl font-black">Sululta <span className="text-primary">Eats</span></span>
                </Link>
                <div className="grid gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-2xl font-black hover:text-primary transition-all"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <hr className="opacity-50" />
                {user ? (
                   <div className="grid gap-4">
                      <Link to="/profile" className="text-xl font-bold flex items-center gap-4">
                         <User className="h-6 w-6 text-primary" /> Profile
                      </Link>
                      {user.role !== 'CUSTOMER' && (
                        <Link to={`/${user.role.toLowerCase()}-dashboard`} className="text-xl font-bold flex items-center gap-4">
                           <LayoutDashboard className="h-6 w-6 text-primary" /> Dashboard
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        className="mt-10 h-14 rounded-2xl text-destructive border-destructive font-black"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                   </div>
                ) : (
                  <Link to="/login" className="mt-10">
                    <Button className="w-full h-14 rounded-2xl text-xl font-black">Sign In</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;