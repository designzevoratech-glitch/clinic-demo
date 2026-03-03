import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formStatus, setFormStatus] = useState('');

    const handleForm = (e) => {
        e.preventDefault();
        setFormStatus('Message sent successfully. We will contact you soon.');
        e.target.reset();
    };

    return (
        <div className="bg-bgLight min-h-screen pt-32 pb-20">

            {/* Header */}
            <section className="text-center max-w-4xl mx-auto px-6 mb-24">
                <motion.span
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block mb-4"
                >
                    Get in Touch
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-heading font-extrabold text-main mb-6"
                >
                    We're Here <br /><span className="text-primary italic font-light">to Help.</span>
                </motion.h1>
            </section>

            {/* Main Content */}
            <section className="max-w-[1550px] mx-auto px-6 md:px-16 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="glass-dark rounded-[3rem] p-12 md:p-16 text-white overflow-hidden relative shadow-2xl"
                >
                    {/* subtle background pattern */}
                    <div className="absolute inset-0 bg-primary/20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px', opacity: 0.1 }} />

                    <h2 className="text-3xl font-heading font-bold mb-10 relative z-10">Clinic Information</h2>

                    <div className="space-y-8 relative z-10">
                        <div className="flex gap-6 items-start">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <MapPin className="text-[#A7F3D0]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1 uppercase tracking-widest text-[#A7F3D0] text-sm">Location</h4>
                                <p className="text-slate-300 leading-relaxed">123 Healthcare Ave, <br />Medical District, <br />Chennai, TN 600001</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <Phone className="text-[#A7F3D0]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1 uppercase tracking-widest text-[#A7F3D0] text-sm">Phone</h4>
                                <p className="text-slate-300 leading-relaxed">+91 44 2345 6789 <br /><span className="text-slate-500 text-sm">24/7 Emergency Support</span></p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <Mail className="text-[#A7F3D0]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1 uppercase tracking-widest text-[#A7F3D0] text-sm">Email</h4>
                                <p className="text-slate-300 leading-relaxed">hello@arunacare.com</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <Clock className="text-[#A7F3D0]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1 uppercase tracking-widest text-[#A7F3D0] text-sm">Hours</h4>
                                <p className="text-slate-300 leading-relaxed">Mon - Sat: 8:00 AM - 8:00 PM <br />Sunday: Emergency Only</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="bg-white rounded-[3rem] p-12 md:p-16 shadow-luxury border border-slate-100"
                >
                    <h2 className="text-3xl font-heading font-bold mb-2 text-main">Send a Message</h2>
                    <p className="text-slate-500 mb-10 leading-relaxed">Have a general inquiry? Fill out the form below and our front desk will get back to you within 24 hours.</p>

                    {formStatus && (
                        <div className="mb-8 p-6 bg-[#A7F3D0]/20 text-secondary border border-secondary/30 rounded-2xl font-bold flex items-center gap-3">
                            {formStatus}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleForm}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">First Name</label>
                                <input required type="text" className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary transition-all" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Last Name</label>
                                <input required type="text" className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary transition-all" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Email Address</label>
                            <input required type="email" className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary transition-all" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Message</label>
                            <textarea required className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary transition-all min-h-[150px]" placeholder="How can we help you?" />
                        </div>

                        <button type="submit" className="w-full bg-primary hover:bg-secondary text-white px-10 py-5 rounded-full font-bold uppercase text-sm tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 mt-8">
                            Send Message <ArrowRight size={18} />
                        </button>
                    </form>
                </motion.div>

            </section>
        </div>
    );
}
