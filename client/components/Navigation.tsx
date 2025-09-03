import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, ChevronUp, ExternalLink } from 'lucide-react';
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
  { name: 'Smart Walls', to: '/smart-walls', children: [
    { name: 'Smart Living Room Wall', to: '#' },
    { name: 'Smart Wall for Gamers', to: '/smart-gaming'},  
    { name: 'Smart Walls for Bedroom', to: '/smart-bedroom'},
    { name: 'Smart Walls for Kitchen', to: '#' },
    { name: 'Smart Walls for Bathroom', to: '#' },
    { name: 'Smart Walls for the Office', to: '#' },
    { name: 'Smart Walls for Restaurant', to: '#' },
    { name: 'Smart Walls for Events', to: '#' },
    { name: 'Smart Walls for Hotles', to: '#' },
    { name: 'All Smart Walls', to: '/smart-walls' },
      
  ] },
  { name: 'Smart Devices', to: '/smart-devices', children: [
      { name: 'Control Panels', to: '/smart-devices/orvibo/control-panels' },
      { name: 'Switches', to: '/smart-devices/orvibo/switches' },
      { name: 'Lighting', to: '/smart-devices/orvibo/lighting' },
      { name: 'Security & Sensors', to: '/smart-devices/orvibo/security-sensors' },
      { name: 'Shading', to: '/smart-devices/orvibo/shading' },
      { name: 'HVAC', to: '/smart-devices/orvibo/hvac' },
  ] },
  
  { name: 'Wall Panels', to: '/wall-panels', children: [
      { name: 'WPC', to: '/wall-panels/wpc' },
      { name: 'Anti-Collision', to: '/wall-panels/anti-collision' },
      { name: 'Wood Grain', to: '/wall-panels/wood-grain' },
      { name: 'Cloth Pattern', to: '/wall-panels/cloth-pattern' },
      { name: 'Splicing Boards', to: '/wall-panels/wpc-splicing' },
      { name: 'Hollow Locking', to: '/wall-panels/wpc-hollow' },
      { name: 'Fireproof', to: '/wall-panels/fireproof' },
      { name: 'Fluted', to: '/wall-panels/fluted' },
      { name: 'Fittings', to: '/wall-panels/aluminum-fittings' },
      { name: 'HD Printing', to: '/wall-panels/wpc-hd-printing' },
      { name: 'SPC Background', to: '/wall-panels/spc-background' },
      { name: 'UHD Continuous', to: '/wall-panels/uhd-continuous' },
      { name: 'Waterproof', to: '/wall-panels/spc-waterproof' },
  
  ]},
  { name: 'Carbon Rock', to: '/carbon-rock-boards' },
  
  { name: 'Warranty', to: '/warranty' },
  { name: 'Contact', to: '/contact', isHash: false },
];

export default function Navigation() {
  const isScrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedItems, setMobileExpandedItems] = useState<Set<string>>(new Set());
  const dropdownTimeout = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (name: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };
  
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const toggleMobileDropdown = (itemName: string) => {
    setMobileExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpandedItems(new Set());
  };

  const handleSmartWallBuilderClick = () => {
    window.open('https://builder.thewallshop.co.uk/', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => () => clearTimeout(dropdownTimeout.current), []);

  const linkBase = 'relative px-6 py-3 font-medium transition-all duration-200';
  const activeClass = 'text-[#b89773] font-semibold';
  const inactiveClass = isScrolled ? 'text-gray-800 hover:text-[#b89773]' : 'text-white hover:text-gray-200';

  const navBg = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-2'
    : 'bg-transparent py-4';

  // Desktop dropdown item (recursive)
  const DropdownItem = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const hasKids = item.children?.length > 0;
    return (
      <div className="relative group">
        <NavLink
          to={item.to || '#'}
          className={({ isActive }) =>
            `block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b89773] rounded-md transition-colors ${
              depth ? 'pl-6' : ''
            } ${isActive ? 'text-[#b89773] bg-gray-50' : ''}`
          }
          onClick={() => setOpenDropdown(null)}
        >
          <div className="flex justify-between items-center">
            {item.name}
            {hasKids && <ChevronRight size={14} className="text-gray-400" />}
          </div>
        </NavLink>
        {hasKids && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-full top-0 mt-0 min-w-[200px] bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden z-50"
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

  // Mobile menu item (recursive)
  const MobileMenuItem = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const hasKids = item.children?.length > 0;
    const isExpanded = mobileExpandedItems.has(item.name);
    const paddingLeft = depth * 16 + 16;

    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <div className="flex items-center justify-between">
          {hasKids ? (
            <button
              onClick={() => toggleMobileDropdown(item.name)}
              className={`flex-1 text-left py-4 px-4 text-gray-800 font-medium hover:bg-gray-50 transition-colors`}
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{item.name}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-gray-500" />
                </motion.div>
              </div>
            </button>
          ) : (
            <NavLink
              to={item.to || '#'}
              className={({ isActive }) =>
                `flex-1 block py-4 px-4 text-gray-800 font-medium hover:bg-gray-50 transition-colors ${
                  isActive ? 'text-[#b89773] bg-gray-50' : ''
                }`
              }
              style={{ paddingLeft: `${paddingLeft}px` }}
              onClick={closeMobileMenu}
            >
              <span className="text-base">{item.name}</span>
            </NavLink>
          )}
        </div>
        
        {hasKids && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden bg-gray-50"
              >
                {item.children!.map(child => (
                  <MobileMenuItem key={child.name} item={child} depth={depth + 1} />
                ))}
              </motion.div>
            )}
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
          <span className={`transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            The Wall Shop
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 items-center">
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
                    `${linkBase} rounded-lg ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{item.name}</span>
                    {hasKids && (
                      <motion.div
                        animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} className="opacity-70" />
                      </motion.div>
                    )}
                  </div>
                </NavLink>
                <AnimatePresence>
                  {openDropdown === item.name && hasKids && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 min-w-[260px] overflow-hidden z-50 py-2"
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
          
          {/* Smart Wall Builder Button - Desktop */}
          <Button
            onClick={handleSmartWallBuilderClick}
            className="bg-black hover:bg-[#a08666] text-white px-6 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 ml-4"
          >
            <span>Smart Wall Builder</span>
            <ExternalLink size={16} className="opacity-80" />
          </Button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className={`lg:hidden p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b89773] focus:ring-opacity-50 transition-all ${
            isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white shadow-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="max-h-[70vh] overflow-y-auto">
              {NAV_ITEMS.map(item => (
                <MobileMenuItem key={item.name} item={item} />
              ))}
              
              {/* Smart Wall Builder Button - Mobile */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <Button
                  onClick={() => {
                    handleSmartWallBuilderClick();
                    closeMobileMenu();
                  }}
                  className="w-full bg-black hover:bg-[#a08666] text-white py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-base">Smart Wall Builder</span>
                    <ExternalLink size={18} className="opacity-80" />
                  </div>
                </Button>
              </div>             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}