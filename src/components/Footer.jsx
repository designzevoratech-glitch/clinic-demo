import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer-gradient bg-main text-white pt-24 pb-10 relative z-10 border-t border-slate-800">
            <div className="max-w-[1550px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">

                {/* Brand Col */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-heading font-bold flex gap-2">
                        ARUNA <span className="text-secondary">CARE</span>
                    </h2>
                    <p className="text-slate-300 opacity-80 leading-relaxed max-w-sm text-[0.95rem]">
                        Dedicated to providing accessible, high-quality medical care in a comfortable and reassuring environment. Your health is our priority.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-secondary tracking-widest uppercase font-semibold text-[0.9rem] mb-6">
                        Quick Links
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/services" className="hover:text-white transition-colors">Specialties</Link></li>
                        <li><Link to="/doctors" className="hover:text-white transition-colors">Our Doctors</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-secondary tracking-widest uppercase font-semibold text-[0.9rem] mb-6">
                        Get in Touch
                    </h4>
                    <ul className="space-y-4 text-slate-300 leading-relaxed text-[0.95rem]">
                        <li className="flex gap-4 items-start">
                            <MapPin className="text-zinc-400 mt-1" size={20} />
                            <span>123 Healthcare Ave,<br />Chennai, TN 600001</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Mail className="text-zinc-400" size={20} />
                            <a href="mailto:hello@arunacare.com" className="hover:text-white transition-colors">hello@arunacare.com</a>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Phone className="text-zinc-400" size={20} />
                            <a href="tel:+914423456789" className="hover:text-white transition-colors">+91 44 2345 6789</a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="max-w-[1550px] mx-auto px-6 md:px-16 mt-16 pt-8 border-t border-white/10 text-center text-slate-400 text-[0.85rem]">
                © {new Date().getFullYear()} Aruna Care Clinic. All Rights Reserved.
            </div>
        </footer>
    );
}
