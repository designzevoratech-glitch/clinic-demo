import { motion } from 'framer-motion';
import { HeartPulse, Activity, Stethoscope, ArrowRight, Brain, Baby, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
    { id: 'cardio', title: 'Cardiology', icon: <HeartPulse size={48} strokeWidth={1} />, desc: 'Advanced diagnostics, interventional procedures, and rehabilitation for cardiovascular conditions.' },
    { id: 'neuro', title: 'Neurology', icon: <Brain size={48} strokeWidth={1} />, desc: 'Specialized treatment for brain, spine, and nervous system disorders.' },
    { id: 'ortho', title: 'Orthopedics', icon: <Stethoscope size={48} strokeWidth={1} />, desc: 'Complete musculoskeletal care including joint replacement and sports medicine.' },
    { id: 'pediatrics', title: 'Pediatrics', icon: <Baby size={48} strokeWidth={1} />, desc: 'Comprehensive medical care for infants, children, and adolescents.' },
    { id: 'eye', title: 'Ophthalmology', icon: <Eye size={48} strokeWidth={1} />, desc: 'Expert eye care, surgery, and management of complex ocular conditions.' },
    { id: 'general', title: 'General Surgery', icon: <Activity size={48} strokeWidth={1} />, desc: 'Minimally invasive surgical procedures provided by elite surgical staff.' }
];

export default function Services() {
    return (
        <div className="bg-bgLight min-h-screen pt-32 pb-20">

            {/* Header */}
            <section className="text-center max-w-4xl mx-auto px-6 mb-24">
                <motion.span
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block mb-4"
                >
                    Specialties
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-heading font-extrabold text-main mb-6"
                >
                    Centers of Excellence.
                </motion.h1>
            </section>

            {/* Grid */}
            <section className="max-w-[1550px] mx-auto px-6 md:px-16 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white rounded-[2rem] p-10 shadow-luxury border border-slate-100 group relative overflow-hidden"
                        >
                            {/* Background accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-12 translate-x-12 group-hover:bg-primary/10 transition-colors" />

                            <div className="text-primary mb-8 group-hover:scale-110 group-hover:text-secondary transition-all origin-left">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-main mb-4">{service.title}</h3>
                            <p className="text-slate-500 leading-relaxed mb-8">{service.desc}</p>

                            <Link to={`/book?dept=${service.id}`} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary font-bold group-hover:text-secondary transition-colors">
                                Book Department <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
