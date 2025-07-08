
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  Moon, 
  Sun, 
  User, 
  Home, 
  Building, 
  LayoutDashboard, 
  Book,
  MapPin,
  Search,
  HelpCircle,
  Heart
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            HomeMatch AI
          </Link>
        </div>

        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Building className="mr-2 h-4 w-4" />
                  Properties
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/properties"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Browse Properties
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our curated selection of properties with AI-powered matching
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          to="/properties"
                        >
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">All Properties</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            View our complete catalog of properties
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          to="/preferences"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Set Preferences</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Customize your property preferences for better matches
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          to="/dashboard"
                        >
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Saved Properties</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            View properties you've saved for later
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {user && (
                <NavigationMenuItem>
                  <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </NavigationMenuItem>
              )}

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Book className="mr-2 h-4 w-4" />
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          to="/about"
                        >
                          <div className="text-sm font-medium leading-none">About Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn about our mission and team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          to="/contact"
                        >
                          <div className="text-sm font-medium leading-none">Contact</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get in touch with our support team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          to="/faq"
                        >
                          <div className="text-sm font-medium leading-none">FAQ</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Frequently asked questions about our services
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          to="/terms"
                        >
                          <div className="text-sm font-medium leading-none">Terms & Privacy</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Review our terms of service and privacy policy
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {user?.role === 'admin' && (
                <NavigationMenuItem>
                  <Link to="/admin" className={navigationMenuTriggerStyle()}>
                    Admin
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-primary/10">
                  <User size={20} className="text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/preferences">Preferences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border mt-4 py-4">
          <div className="container mx-auto flex flex-col space-y-4">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link
              to="/properties"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Building className="mr-2 h-4 w-4" />
              Properties
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="text-foreground hover:text-primary transition-colors px-4 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Book className="mr-2 h-4 w-4" />
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-foreground hover:text-primary transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
