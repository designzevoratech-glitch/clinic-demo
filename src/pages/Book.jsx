import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const DEPARTMENTS = [
    { id: 'cardio', name: 'Cardiology' },
    { id: 'neuro', name: 'Neurology' },
    { id: 'ortho', name: 'Orthopedics' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'general', name: 'General Medicine' }
];

const DOCTORS = [
    { id: 'arul', name: 'Dr. Arul Karthik' },
    { id: 'meenakshi', name: 'Dr. Meenakshi Iyer' },
    { id: 'vignesh', name: 'Dr. Vignesh Kumar' },
    { id: 'any', name: 'Any Available Doctor' }
];

const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM",
    "11:30 AM", "02:00 PM", "03:00 PM", "04:30 PM"
];

export default function Book() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        specialty: '',
        doctor: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        name: '',
        phone: '',
        notes: ''
    });
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    // Load available slots dynamically based on date & doctor from LocalStorage
    useEffect(() => {
        if (formData.date && formData.doctor) {
            const bookings = JSON.parse(localStorage.getItem('clinic_bookings') || '[]');
            let bookedTimes = [];

            if (formData.doctor === 'any') {
                // If "any", a slot is ONLY unavailable if ALL specific doctors are booked for that slot.
                const specificDocNames = DOCTORS.filter(d => d.id !== 'any').map(d => d.name);
                const docBookings = bookings.filter(b => b.date === formData.date && b.status !== 'Canceled' && specificDocNames.includes(b.doctor));

                // Count bookings per slot
                const slotCounts = {};
                docBookings.forEach(b => {
                    slotCounts[b.time] = (slotCounts[b.time] || 0) + 1;
                });

                // If a slot has bookings equal to the number of specific doctors, it's fully booked.
                bookedTimes = Object.keys(slotCounts).filter(time => slotCounts[time] >= specificDocNames.length);
            } else {
                const docName = DOCTORS.find(d => d.id === formData.doctor)?.name || formData.doctor;
                bookedTimes = bookings
                    .filter(b => b.date === formData.date && b.doctor === docName && b.status !== 'Canceled')
                    .map(b => b.time);
            }

            const slots = TIME_SLOTS.map(time => ({
                time,
                available: !bookedTimes.includes(time)
            }));
            setAvailableSlots(slots);

            // Reset selected time if it became unavailable
            if (bookedTimes.includes(formData.time)) {
                setFormData(prev => ({ ...prev, time: '' }));
            }
        }
    }, [formData.date, formData.doctor]);

    const handleNext = () => {
        if (step === 1 && (!formData.specialty || !formData.doctor)) {
            alert("Please select a department and doctor.");
            return;
        }
        if (step === 2 && (!formData.date || !formData.time)) {
            alert("Please select a date and time slot.");
            return;
        }
        setStep(prev => prev + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            alert("Please enter patient details.");
            return;
        }

        const bookings = JSON.parse(localStorage.getItem('clinic_bookings') || '[]');
        let finalDocName = DOCTORS.find(d => d.id === formData.doctor)?.name || formData.doctor;

        // Handle "Any Available Doctor" allocation dynamically
        if (formData.doctor === 'any') {
            const specificDocNames = DOCTORS.filter(d => d.id !== 'any').map(d => d.name);
            const slotBookings = bookings.filter(b => b.date === formData.date && b.time === formData.time && b.status !== 'Canceled');
            const bookedDocsThisSlot = slotBookings.map(b => b.doctor);

            // Find a doctor who is NOT booked for this slot
            finalDocName = specificDocNames.find(name => !bookedDocsThisSlot.includes(name)) || specificDocNames[0];
        }

        // Final Double Booking Check at the exact moment of submission
        const isDoubleBooked = bookings.some(b =>
            b.date === formData.date &&
            b.time === formData.time &&
            b.doctor === finalDocName &&
            b.status !== 'Canceled'
        );

        if (isDoubleBooked) {
            alert("Sorry, this exact slot was just taken by another patient. Please select a different time.");
            setStep(2);
            return;
        }

        const deptName = DEPARTMENTS.find(d => d.id === formData.specialty)?.name || formData.specialty;

        const newBooking = {
            id: Date.now(),
            name: formData.name,
            phone: formData.phone,
            dept: deptName,
            doctor: finalDocName,
            date: formData.date,
            time: formData.time,
            status: 'Pending'
        };
        bookings.push(newBooking);
        localStorage.setItem('clinic_bookings', JSON.stringify(bookings));

        setShowSuccess(true);
    };

    const animations = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <div className="min-h-screen bg-bgLight pt-32 pb-20">

            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block mb-4">Patient Portal</span>
                    <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-main">Schedule Visit</h1>
                </div>

                <div className="glass rounded-[2rem] p-8 md:p-14 shadow-2xl border border-white relative overflow-hidden">

                    {/* Progress Indicator */}
                    <div className="flex justify-between items-center mb-12 relative z-10 max-w-lg mx-auto">
                        <div className={`h-1 absolute top-1/2 -translate-y-1/2 left-0 bg-slate-200 -z-10 transition-all duration-500`} style={{ width: '100%' }} />
                        <div className={`h-1 absolute top-1/2 -translate-y-1/2 left-0 bg-secondary -z-10 transition-all duration-500`} style={{ width: `${(step - 1) * 50}%` }} />

                        {[1, 2, 3].map(num => (
                            <div key={num} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 transition-colors duration-300 ${step >= num ? 'bg-secondary text-white border-white' : 'bg-white text-slate-400 border-slate-100'}`}>
                                {step > num ? <CheckCircle size={20} /> : num}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {/* STEP 1 */}
                            {step === 1 && (
                                <motion.div key="step1" {...animations} transition={{ duration: 0.4 }} className="space-y-8">
                                    <h2 className="text-3xl font-heading font-bold text-main mb-6">Choose Specialist</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Department</label>
                                            <select
                                                value={formData.specialty}
                                                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-lg appearance-none"
                                            >
                                                <option value="" disabled>Select Department...</option>
                                                {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Doctor</label>
                                            <select
                                                value={formData.doctor}
                                                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-lg appearance-none"
                                            >
                                                <option value="" disabled>Select Doctor...</option>
                                                {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-12">
                                        <button type="button" onClick={handleNext} className="bg-primary hover:bg-secondary text-white px-10 py-5 rounded-full font-bold uppercase text-sm tracking-widest shadow-xl flex items-center gap-3 transition-all hover:-translate-y-1">
                                            Continue <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <motion.div key="step2" {...animations} transition={{ duration: 0.4 }} className="space-y-8">
                                    <h2 className="text-3xl font-heading font-bold text-main mb-6">Date & Time</h2>

                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Select Date</label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-lg"
                                        />
                                    </div>

                                    {formData.date && formData.doctor ? (
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 mt-8">Available Slots</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {availableSlots.map(({ time, available }) => (
                                                    <button
                                                        key={time}
                                                        type="button"
                                                        disabled={!available}
                                                        onClick={() => setFormData({ ...formData, time })}
                                                        className={`py-4 rounded-xl font-bold transition-all border-2 
                              ${!available ? 'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed line-through' :
                                                                formData.time === time ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/30 scale-105' :
                                                                    'bg-white text-primary border-slate-200 hover:border-secondary hover:text-secondary'}`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-8 bg-blue-50 text-blue-700 rounded-xl text-center border border-blue-100">
                                            Please ensure you have selected a Doctor to view available times.
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                                        <button type="button" onClick={() => setStep(1)} className="text-slate-500 hover:text-primary font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                                            <ArrowLeft size={18} /> Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="bg-primary hover:bg-secondary text-white px-10 py-5 rounded-full font-bold uppercase text-sm tracking-widest shadow-xl flex items-center gap-3 transition-all hover:-translate-y-1">
                                            Continue <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <motion.div key="step3" {...animations} transition={{ duration: 0.4 }} className="space-y-8">
                                    <h2 className="text-3xl font-heading font-bold text-main mb-6">Patient Profile</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 pl-14 outline-none focus:border-secondary transition-all text-lg"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                                className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary transition-all text-lg"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Medical Notes (Optional)</label>
                                            <textarea
                                                value={formData.notes}
                                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                placeholder="Reason for visit..."
                                                className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-5 outline-none focus:border-secondary transition-all text-lg min-h-[120px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                                        <button type="button" onClick={() => setStep(2)} className="text-slate-500 hover:text-primary font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                                            <ArrowLeft size={18} /> Back
                                        </button>
                                        <button type="submit" className="bg-secondary hover:bg-[#3d8c78] text-white px-10 py-5 rounded-full font-bold uppercase text-sm tracking-widest shadow-[0_10px_40px_-10px_rgba(75,163,141,0.6)] flex items-center gap-3 transition-all hover:scale-105 active:scale-95">
                                            Confirm Appointment
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                </div>
            </div>

            {/* Success Modal OVERLAY */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
                            className="bg-white rounded-[2rem] p-12 max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-secondary" />
                            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 text-secondary">
                                <CheckCircle size={50} />
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-main mb-4">Confirmed!</h2>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                                Thank you, <span className="font-bold text-primary">{formData.name}</span>. Your appointment mapping has been secured. We will text you shortly with instructions.
                            </p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full bg-primary hover:bg-secondary text-white py-5 rounded-xl font-bold uppercase tracking-widest transition-colors"
                            >
                                Return Home
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
