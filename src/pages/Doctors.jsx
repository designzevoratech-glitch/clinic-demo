import { motion } from 'framer-motion';
import { Star, MapPin, CalendarDays, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const DOCTORS = [
    { img: '/doc_1.png', name: 'Dr. Arul Karthik', role: 'Head of Cardiology', desc: 'Over 20 years pioneering non-invasive cardiac procedures.', featured: true },
    { img: '/doc_2.png', name: 'Dr. Meenakshi Iyer', role: 'Chief Neurologist', desc: 'Internationally recognized for advancements in neuro-rehabilitation.', featured: true },
    { img: '/doc_3.png', name: 'Dr. Vignesh Kumar', role: 'Director of Orthopedics', desc: 'Specializing in minimally invasive joint replacement surgeries.', featured: false },
    // Adding placeholder doctors to fill grid
    { img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80', name: 'Dr. Sarah Thomas', role: 'Pediatric Specialist', desc: 'Expert in adolescent health and developmental care.', featured: false },
    { img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80', name: 'Dr. John Mathew', role: 'General Surgeon', desc: 'Award-winning surgeon specializing in abdominal procedures.', featured: false },
    { img: 'https://images.unsplash.com/photo-1594824436951-7f12620464d4?w=800&q=80', name: 'Dr. Anita Desai', role: 'Ophthalmology', desc: 'Pioneer in laser vision correction and cataract surgery.', featured: false }
];

export default function Doctors() {
    return (
        <div className="bg-bgLight min-h-screen pt-32 pb-20">

            {/* Header */}
            <section className="text-center max-w-4xl mx-auto px-6 mb-24">
                <motion.span
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block mb-4"
                >
                    Medical Faculty
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-heading font-extrabold text-main mb-6"
                >
                    Our Experts.
                </motion.h1>
            </section>

            {/* Grid */}
            <section className="max-w-[1550px] mx-auto px-6 md:px-16 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {DOCTORS.map((doc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="bg-white rounded-[2rem] overflow-hidden group shadow-luxury hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative w-full aspect-[4/5] bg-slate-200 overflow-hidden">
                                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 filter brightness-95 group-hover:brightness-100 transition-all duration-700 ease-out" />

                                {doc.featured && (
                                    <div className="absolute top-6 left-6 glass px-4 py-1.5 rounded-full z-20 shadow-lg border-white/40">
                                        <span className="text-xs uppercase font-bold text-secondary flex items-center gap-1"><Star size={12} className="fill-secondary" /> Department Head</span>
                                    </div>
                                )}

                                {/* Overlay actions */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-main to-transparent p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-end">
                                    <Link to={`/book?doctor=${encodeURIComponent(doc.name)}`} className="bg-secondary text-white hover:bg-white hover:text-primary px-6 py-3 rounded-full font-bold uppercase text-[0.75rem] tracking-widest flex items-center gap-2 shadow-lg transition-colors">
                                        <CalendarDays size={16} /> Book
                                    </Link>
                                </div>
                            </div>

                            <div className="p-8">
                                <p className="text-secondary uppercase tracking-widest font-bold text-[0.75rem] mb-2">{doc.role}</p>
                                <h3 className="text-2xl font-heading font-bold text-main mb-3 group-hover:text-primary transition-colors">{doc.name}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {doc.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
