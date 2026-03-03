import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Doctors', path: '/doctors' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'h-[85px] glass shadow-md py-0' : 'h-[110px] bg-transparent py-4'}`}>
            <div className="max-w-[1550px] mx-auto px-6 md:px-16 h-full flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-2xl md:text-3xl font-heading font-extrabold text-primary flex items-center gap-2 tracking-tight">
                    ARUNA <span className="text-secondary">CARE</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden lg:flex gap-12">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className={`text-[0.95rem] font-bold uppercase tracking-wider relative pb-1 transition-all ${location.pathname === link.path ? 'text-primary' : 'text-main hover:text-primary'}`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-secondary rounded-full" />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link to="/book" className="hidden md:inline-flex bg-primary hover:bg-secondary text-white px-8 py-3.5 rounded-full font-bold uppercase text-[0.8rem] tracking-widest shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                        Book Appointment
                    </Link>

                    <button
                        className="lg:hidden text-primary p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full glass-dark text-white border-t border-slate-800 flex flex-col items-center py-6 gap-6 shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-lg font-medium uppercase tracking-widest hover:text-secondary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/book" className="bg-secondary text-white px-10 py-3 rounded-full font-bold uppercase text-sm tracking-widest shadow-lg mt-4">
                        Book Now
                    </Link>
                </div>
            )}
        </nav>
    );
}
