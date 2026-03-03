import { motion } from 'framer-motion';
import { Award, Users, Shield, Clock } from 'lucide-react';

export default function About() {
    return (
        <div className="bg-bgLight min-h-screen pt-32 pb-20 overflow-hidden">

            {/* Hero Section */}
            <section className="max-w-[1550px] mx-auto px-6 md:px-16 mb-24 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block mb-4"
                >
                    Our Story
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-heading font-extrabold text-main mb-6"
                >
                    Redefining Modern <br /><span className="text-primary">Healthcare.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed"
                >
                    Founded in 2011, Aruna Care has grown into a leading medical institution. We blend cutting-edge medical technology with a deeply human, compassionate approach to patient care.
                </motion.p>
            </section>

            {/* Image Block */}
            <section className="max-w-[1550px] mx-auto px-6 md:px-16 mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    className="w-full h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl relative"
                >
                    <img src="/hero_modern.png" alt="Aruna Care Facility" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-main/60 to-transparent" />
                    <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 text-white max-w-lg">
                        <h3 className="text-3xl font-heading font-bold mb-2">State of the Art Facility</h3>
                        <p className="text-slate-200">Designed for absolute patient comfort and rapid recovery.</p>
                    </div>
                </motion.div>
            </section>

            {/* Core Values */}
            <section className="max-w-[1550px] mx-auto px-6 md:px-16 mb-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-main">Our Core Pillars</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Users size={32} />, title: 'Patient First', desc: 'Every decision we make centers around the well-being and comfort of our patients.' },
                        { icon: <Award size={32} />, title: 'Excellence', desc: 'We pursue the highest standards in medical procedures and technical expertise.' },
                        { icon: <Shield size={32} />, title: 'Integrity', desc: 'Transparent communication, ethical practices, and honest care.' },
                        { icon: <Clock size={32} />, title: 'Accessibility', desc: 'Prompt care delivery when you need it the most, without the wait.' }
                    ].map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[2rem] shadow-luxury border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 bg-primary/5 text-secondary rounded-full flex items-center justify-center mb-6">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-heading font-bold text-main mb-3">{val.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
