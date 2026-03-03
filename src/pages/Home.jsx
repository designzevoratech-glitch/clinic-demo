import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
    HeartPulse, Activity, Stethoscope, ArrowRight, Star,
    Clock, ShieldCheck, Microscope, CalendarDays, Phone
} from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function Home() {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="bg-bgLight overflow-hidden">

            {/* --- 1. IMMERSIVE HERO WITH PARALLAX --- */}
            <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: yHero, opacity: opacityHero }}
                    className="absolute inset-0 z-[0] w-full h-[120%]"
                >
                    <img
                        src="/hero_modern.png"
                        alt="Aruna Clinic State of the Art Facility"
                        className="w-full h-full object-cover filter brightness-[0.7] saturate-[1.2]"
                    />
                    {/* Deep premium gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bgLight via-primary/60 to-primary/80" />
                </motion.div>

                <div className="relative z-10 max-w-[1550px] mx-auto px-6 md:px-16 w-full text-center mt-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto text-white flex flex-col items-center"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/30 text-white shadow-xl mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#A7F3D0] animate-pulse" />
                            <span className="text-sm uppercase tracking-[0.2em] font-bold">A New Era of Healthcare</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold mb-8 leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-2xl"
                        >
                            Healing <br /> <span className="text-secondary italic font-light">&</span> Hope.
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-3xl text-slate-200 mb-14 max-w-3xl font-light leading-relaxed drop-shadow-md"
                        >
                            Your personal health journey crafted with world-class expertise, breakthrough technology, and uncompromising compassion.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                            <Link to="/book" className="group relative overflow-hidden bg-white text-primary px-12 py-5 rounded-full font-bold uppercase text-[0.85rem] tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 z-10">
                                <span className="relative z-10 flex items-center gap-2">Begin Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70"
                >
                    <span className="text-[0.65rem] uppercase tracking-[0.3em]">Discover</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
            </section>

            {/* --- 2. THE STORY / PHILOSOPHY --- */}
            <section className="py-32 relative z-10 bg-bgLight">
                <div className="max-w-[1550px] mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* Story Image Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative w-full aspect-square"
                        >
                            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white">
                                <img src="/hero_modern.png" alt="Clinic Interior" className="w-full h-full object-cover filter brightness-110" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white">
                                <img src="/doc_1.png" alt="Doctor Consultation" className="w-full h-full object-cover object-top" />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 glass w-40 h-40 rounded-full flex flex-col items-center justify-center text-center shadow-luxury animate-[floatAnimation_6s_ease-in-out_infinite]">
                                <span className="text-4xl font-heading font-extrabold text-primary">15+</span>
                                <span className="text-xs uppercase font-bold text-secondary tracking-widest mt-1">Years of<br />Trust</span>
                            </div>
                        </motion.div>

                        {/* Story Text */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-10%' }}
                            variants={staggerContainer}
                            className="pl-0 lg:pl-10"
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                                <div className="h-px w-12 bg-secondary" />
                                <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm">Our Philosophy</span>
                            </motion.div>

                            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-heading font-bold text-main mb-8 leading-tight">
                                Healthcare designed around <span className="text-primary italic font-light">You.</span>
                            </motion.h2>

                            <motion.p variants={fadeInUp} className="text-lg text-muted mb-8 leading-relaxed font-light">
                                At Aruna Care, we believe that true healing begins with listening. Our clinic was founded on the principle that world-class medical expertise should be delivered in an environment that reduces anxiety and promotes holistic well-being.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                                {[
                                    { icon: <ShieldCheck className="text-secondary mb-4" size={32} />, title: "Uncompromising Quality", desc: "Rigorous standards for every procedure." },
                                    { icon: <Microscope className="text-secondary mb-4" size={32} />, title: "Modern Technology", desc: "Equipped with next-generation diagnostics." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                                        {item.icon}
                                        <h4 className="text-xl font-bold font-heading text-main mb-2">{item.title}</h4>
                                        <p className="text-sm text-muted">{item.desc}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 3. THE EXPERTISE DRIVEN APPROACH (SERVICES) --- */}
            <section className="py-32 bg-main text-white relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-[1550px] mx-auto px-6 md:px-16 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-10%' }}
                        variants={staggerContainer}
                        className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10"
                    >
                        <div className="max-w-2xl">
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                                <div className="h-px w-12 bg-secondary" />
                                <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm">Centers of Excellence</span>
                            </motion.div>
                            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-heading font-bold leading-tight">
                                Specialized Care <br /><span className="text-slate-400 font-light italic">for complex needs.</span>
                            </motion.h2>
                        </div>
                        <motion.div variants={fadeInUp}>
                            <Link to="/services" className="inline-flex items-center gap-3 text-secondary hover:text-white font-bold uppercase tracking-widest transition-colors border-b-2 border-secondary pb-1 hover:border-white">
                                Explore All Departments <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { id: 'cardio', title: 'Cardiology', icon: <HeartPulse size={48} strokeWidth={1} />, desc: 'Advanced heart care, diagnostics, and intervention by pioneering professionals.' },
                            { id: 'neuro', title: 'Neurology', icon: <Activity size={48} strokeWidth={1} />, desc: 'Comprehensive treatment for neurological disorders and brain health.' },
                            { id: 'ortho', title: 'Orthopedics', icon: <Stethoscope size={48} strokeWidth={1} />, desc: 'Rebuilding strength and mobility with cutting-edge surgical and therapy plans.' }
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                className="group relative h-[400px] rounded-[2rem] overflow-hidden bg-slate-800/50 border border-slate-700/50 p-10 flex flex-col justify-end hover:-translate-y-3 transition-transform duration-500"
                            >
                                <div className="absolute top-10 right-10 text-secondary/20 group-hover:text-secondary group-hover:scale-110 transition-all duration-500 origin-center">
                                    {service.icon}
                                </div>
                                <div className="relative z-10 w-full mb-4">
                                    <div className="w-12 h-1 bg-secondary mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    <h3 className="text-3xl font-heading font-bold mb-3">{service.title}</h3>
                                    <p className="text-slate-400 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 mb-6">
                                        {service.desc}
                                    </p>
                                    <Link to={`/service-detail.html?id=${service.id}`} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#A7F3D0] hover:text-white transition-colors">
                                        Learn More <ArrowRight size={16} />
                                    </Link>
                                </div>
                                {/* Hover gradient sweep */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. THE EXPERTS (Premium Floating Cards) --- */}
            <section className="py-32 relative bg-bgLight">
                <div className="max-w-[1550px] mx-auto px-6 md:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-4xl mx-auto mb-20"
                    >
                        <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block mb-4">Medical Faculty</span>
                        <h2 className="text-5xl md:text-6xl font-heading font-bold text-main">Brilliance in Medical Science</h2>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-center items-center lg:items-end">
                        {[
                            { img: '/doc_1.png', name: 'Dr. Arul Karthik', role: 'Head of Cardiology', desc: 'Over 20 years pioneering non-invasive cardiac procedures.', height: 'lg:h-[500px]' },
                            { img: '/doc_2.png', name: 'Dr. Meenakshi Iyer', role: 'Chief Neurologist', desc: 'Internationally recognized for advancements in neuro-rehabilitation.', height: 'lg:h-[580px]', featured: true },
                            { img: '/doc_3.png', name: 'Dr. Vignesh Kumar', role: 'Director of Orthopedics', desc: 'Specializing in minimally invasive joint replacement surgeries.', height: 'lg:h-[500px]' }
                        ].map((doc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                className={`relative w-full max-w-sm lg:w-1/3 rounded-[2rem] overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 ${doc.height}`}
                            >
                                <div className="absolute inset-0 bg-slate-200">
                                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover filter brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out" />
                                </div>

                                {doc.featured && (
                                    <div className="absolute top-6 right-6 glass px-4 py-1.5 rounded-full z-20 shadow-lg">
                                        <span className="text-xs uppercase font-bold text-secondary flex items-center gap-1"><Star size={12} className="fill-secondary" /> Chief Medical Officer</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-main/90 md:from-main/80 via-main/20 to-transparent flex flex-col justify-end p-8">
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-[#A7F3D0] uppercase tracking-widest font-bold text-[0.75rem] mb-2">{doc.role}</p>
                                        <h3 className="text-3xl font-heading font-bold text-white mb-3">{doc.name}</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {doc.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 5. IMMERSIVE STATS / TESTIMONIAL HYBRID --- */}
            <section className="relative overflow-hidden">
                {/* Parallax Background */}
                <div className="absolute inset-0 z-0 bg-primary attachment-fixed">
                    <img src="/hero_modern.png" alt="Background" className="w-full h-full object-cover opacity-20 filter grayscale" />
                </div>

                <div className="relative z-10 py-32 glass-dark bg-main/80 backdrop-blur-2xl border-none border-y border-white/10 text-white">
                    <div className="max-w-[1550px] mx-auto px-6 md:px-16">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            {/* Testimonial Story */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                            >
                                <div className="mb-8">
                                    <Star className="text-secondary fill-secondary inline-block" size={24} />
                                    <Star className="text-secondary fill-secondary inline-block" size={24} />
                                    <Star className="text-secondary fill-secondary inline-block" size={24} />
                                    <Star className="text-secondary fill-secondary inline-block" size={24} />
                                    <Star className="text-secondary fill-secondary inline-block" size={24} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-heading font-light leading-tight mb-10 italic">
                                    "The precision, the warmth, and the environment at Aruna Care completely reformed my view of hospitals. They didn't just treat my condition; they treated <span className="text-secondary font-bold">me</span>."
                                </h3>
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150" alt="Patient" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl tracking-wide">Arjun Mehta</h4>
                                        <p className="text-sm text-slate-400 uppercase tracking-widest mt-1">Cardiac Patient</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Patient Outcomes */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                                className="grid grid-cols-2 gap-6"
                            >
                                {[
                                    { metric: "99.8%", label: "Procedure Success Rate" },
                                    { metric: "24/7", label: "Emergency Readiness" },
                                    { metric: "<15m", label: "Average Wait Time" },
                                    { metric: "5 Star", label: "Patient Satisfaction" }
                                ].map((stat, i) => (
                                    <motion.div key={i} variants={fadeInUp} className="glass bg-white/5 border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/10 transition-colors">
                                        <h4 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">{stat.metric}</h4>
                                        <p className="text-secondary text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 6. UNIFIED BOOKING CTA --- */}
            <section className="py-0 relative overflow-hidden bg-bgLight">
                <div className="max-w-[1550px] mx-auto px-6 md:px-16 -mt-10 mb-32 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-primary rounded-[3rem] p-10 md:p-20 shadow-[0_30px_60px_-15px_rgba(21,94,117,0.4)] overflow-hidden relative border border-white/10"
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10 background-pattern" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                            <div className="max-w-2xl text-white">
                                <span className="text-[#A7F3D0] font-bold uppercase tracking-widest block mb-4">Take the First Step</span>
                                <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">Begin Healing.</h2>
                                <p className="text-xl text-slate-200 font-light leading-relaxed">
                                    Our specialists are ready to provide the personal attention you deserve. Schedule your consultation instantly through our intelligent booking portal.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 shrink-0">
                                <Link to="/book" className="group relative overflow-hidden bg-white text-primary px-12 py-6 rounded-full font-bold uppercase text-[0.9rem] tracking-[0.2em] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                                    <span className="relative z-10 flex items-center gap-2"><CalendarDays size={20} /> Schedule Online</span>
                                    <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                                </Link>

                                <a href="tel:+914423456789" className="group border-2 border-white/30 hover:border-white text-white px-10 py-6 rounded-full font-bold uppercase text-[0.9rem] tracking-[0.2em] transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                                    <Phone size={20} className="group-hover:animate-bounce" /> Call Desk
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
