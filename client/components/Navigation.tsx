// src/components/Navigation.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useScrollPosition from '@/hooks/useScrollPosition';

const NAV_ITEMS = [
  { name: 'Home',            to: '/' },
  { name: 'Smart Walls',     to: '/smart-walls' },
  { name: 'Carbon Rock Boards',     to: '/carbon-rock-boards' },  
  { name: 'Acoustic Panels', to: '/acoustic-panels' },
  { name: 'Warranty',        to: '/warranty' },
  { name: 'Contact',         to: '/contact', isHash: false },
];

export default function Navigation() {
  const isScrolled = useScrollPosition(30);
  const [mobileOpen, setMobileOpen] = useState(false);

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `relative px-3 py-1 font-medium transition-colors ${
    isActive
      ? isScrolled
        ? 'text-[#b69777] font-semibold border-b-2 border-[#b69777]'
        : 'text-white font-semibold underline underline-offset-4'
      : isScrolled
      ? 'text-gray-800 hover:text-[#b69777]'
      : 'text-white hover:text-gray-200'
  }`;


  // Dynamic nav background, height, and border for Mac-like glossy effect
  const navClasses = `
    fixed inset-x-0 top-0 z-50 transition-all duration-300
    ${isScrolled
      ? 'bg-white/60 backdrop-blur-md  py-2'
      : 'bg-transparent py-4'}
  `;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto flex items-center justify-between h-12 lg:h-12 px-4 lg:px-8 transition-all duration-100">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold">
          <span className={isScrolled ? 'text-gray-800' : 'text-white'}>
            The Wall Shop
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          {NAV_ITEMS.map((item) =>
            item.isHash ? (
              <a
                key={item.name}
                href={item.to}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(item.to)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={linkClasses({ isActive: false })}
              >
                {item.name}
              </a>
            ) : (
              <NavLink key={item.name} to={item.to} className={linkClasses}>
                {item.name}
              </NavLink>
            )
          )}
        </div>

        {/* CTA */}
         

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className={`lg:hidden p-2 focus:outline-none ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-max-h duration-300 ${
          mobileOpen ? 'max-h-screen' : 'max-h-0'
        } bg-white`}
        role="menu"
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {NAV_ITEMS.map((item) =>
            item.isHash ? (
              <a
                key={item.name}
                href={item.to}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(item.to)
                    ?.scrollIntoView({ behavior: 'smooth' });
                  setMobileOpen(false);
                }}
                className="block w-full text-gray-800 py-2 font-medium hover:text-accent transition-colors"
                role="menuitem"
              >
                {item.name}
              </a>
            ) : (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-gray-800 py-2 font-medium hover:text-accent transition-colors"
                role="menuitem"
              >
                {item.name}
              </NavLink>
            )
          )}

          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={() => {
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
                setMobileOpen(false);
              }}
              variant="luxury"
              className="w-full py-3 text-lg font-semibold text-white bg-accent hover:bg-accent/90 transition-all duration-300"
            >
              Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
