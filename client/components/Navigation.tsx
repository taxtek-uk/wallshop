import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import useScrollPosition from '@/hooks/useScrollPosition';

interface NavItem {
  name: string;
  to?: string;
  isHash?: boolean;
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', to: '/' },
  { name: 'Smart Walls', to: '/smart-walls' },
  { name: 'Wall Panels', to: '/wall-panels', children: [
      { name: 'WPC', to: '/wall-panels/wpc' },
      { name: 'Anti-Collision', to: '/wall-panels/anti-collision' },
      { name: 'Splicing Boards', to: '/wall-panels/wpc-splicing' },
      { name: 'Hollow Locking', to: '/wall-panels/wpc-hollow' },
      { name: 'Fireproof', to: '/wall-panels/fireproof' },
      { name: 'Fluted', to: '/wall-panels/fluted' },
      { name: 'Fittings', to: '/wall-panels/aluminum-fittings' },
      { name: 'HD Printing', to: '/wall-panels/wpc-hd-printing' },
      { name: 'SPC Background', to: '/wall-panels/spc-background' },
      { name: 'UHD Continuous', to: '/wall-panels/uhd-continuous', children: [
          { name: 'Gilding', to: '/wall-panels/uhd-continuous/gilding' },
          { name: 'White', to: '/wall-panels/uhd-continuous/white' },
          { name: 'Grey', to: '/wall-panels/uhd-continuous/grey' },
          { name: 'Black', to: '/wall-panels/uhd-continuous/black' },
        ]
      },
      { name: 'Waterproof', to: '/wall-panels/spc-waterproof' },
      { name: 'Stone Crystal', to: '/wall-panels/spc-stone-crystal' },
      { name: 'Plastic Wood', to: '/wall-panels/plastic-wood' },
  ]},
  { name: 'Carbon Rock', to: '/carbon-rock-boards' },
  { name: 'Smart Devices', to: '/smart-devices' },
  { name: 'Warranty', to: '/warranty' },
  { name: 'Contact', to: '/contact', isHash: false },
];

export default function Navigation() {
  const isScrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (name: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => () => clearTimeout(dropdownTimeout.current), []);

  const linkBase = 'relative px-6 py-3 font-medium transition';
  const activeClass = 'text-[#b89773] font-semibold';
  const inactiveClass = isScrolled ? 'text-gray-800 hover:text-[#b89773]' : 'text-white hover:text-gray-200';

  const navBg = isScrolled
    ? 'bg-white/80 backdrop-blur-md shadow-sm py-2'
    : 'bg-transparent py-4';

  // Dropdown item (recursive)
  const DropdownItem = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const hasKids = item.children?.length > 0;
    return (
      <div className="relative group">
        <NavLink
          to={item.to || '#'}
          className={({ isActive }) =>
            `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded ${depth ? 'pl-6' : ''}`
          }
          onClick={() => setOpenDropdown(null)}
        >
          <div className="flex justify-between items-center">
            {item.name}
            {hasKids && <ChevronRight size={12} />}
          </div>
        </NavLink>
        {hasKids && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-full top-0 mt-0 min-w-[200px] bg-white shadow-lg rounded border border-gray-200"
            >
              {item.children!.map(child => (
                <DropdownItem key={child.name} item={child} depth={depth + 1} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>  
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold">
          <span className={isScrolled ? 'text-gray-800' : 'text-white'}>The Wall Shop</span>
        </NavLink>

        {/* Desktop */}
        <div className="hidden lg:flex space-x-6 items-center">
          {NAV_ITEMS.map(item => {
            const hasKids = item.children?.length > 0;
            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => hasKids && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  to={item.to || '#'}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{item.name}</span>
                    {hasKids && (
                      <ChevronDown
                        size={14}
                        className={`transform transition-transform ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>
                </NavLink>
                <AnimatePresence>
                  {openDropdown === item.name && hasKids && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[240px] overflow-hidden z-50"
                    >
                      {item.children!.map(child => (
                        <DropdownItem key={child.name} item={child} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className={`lg:hidden p-2 focus:outline-none ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-6 py-4 space-y-2">
              {NAV_ITEMS.map(item => (
                <div key={item.name} className="">
                  <div className="flex justify-between items-center">
                    <NavLink
                      to={item.to || '#'}
                      className="block py-3 text-gray-800 font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                    {item.children && (
                      <ChevronDown size={18} className="text-gray-600" />
                    )}
                  </div>
                  {item.children && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="pl-4"
                    >
                      {item.children.map(child => (
                        <NavLink
                          key={child.name}
                          to={child.to!}
                          className="block py-2 text-gray-700 pl-2 hover:text-[#b89773]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="mt-4">
                <Button
                  variant="luxury"
                  className="w-full bg-[#b89773] hover:bg-[#a08666] text-white py-3"
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    setMobileOpen(false);
                  }}
                >
                  Free Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
