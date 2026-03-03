import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, CalendarCheck, Clock, CheckCircle, Trash2, UserPlus, LogOut } from 'lucide-react';

const DEPARTMENTS = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'];
const DOCTORS = ['Dr. Arul Karthik', 'Dr. Meenakshi Iyer', 'Dr. Vignesh Kumar', 'Dr. Sarah Thomas', 'Dr. John Mathew', 'Dr. Anita Desai'];
const TIME_SLOTS = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "11:30 AM", "02:00 PM", "03:00 PM", "04:30 PM"];

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('list'); // 'list' or 'add'

    // Manual Add State
    const [newBooking, setNewBooking] = useState({
        name: '', phone: '', specialty: DEPARTMENTS[0], doctor: DOCTORS[0], date: new Date().toISOString().split('T')[0], time: TIME_SLOTS[0], status: 'Confirmed'
    });

    useEffect(() => {
        if (localStorage.getItem('adminLoggedIn') !== 'true') {
            navigate('/admin/login');
        } else {
            loadBookings();
        }
    }, [navigate]);

    const loadBookings = () => {
        const data = JSON.parse(localStorage.getItem('clinic_bookings') || '[]');
        setBookings(data.reverse()); // Show newest first
    };

    const updateStatus = (id, newStatus) => {
        const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
        localStorage.setItem('clinic_bookings', JSON.stringify(updated));
        setBookings(updated);
    };

    const deleteBooking = (id) => {
        if (window.confirm("Are you sure you want to permanently delete this booking?")) {
            const filtered = bookings.filter(b => b.id !== id);
            localStorage.setItem('clinic_bookings', JSON.stringify(filtered));
            setBookings(filtered);
        }
    };

    const handleManualAdd = (e) => {
        e.preventDefault();
        if (!newBooking.name || !newBooking.phone) {
            alert("Name and phone are required.");
            return;
        }

        // Double Booking Check (Admin Override optional, but let's enforce it)
        const isDoubleBooked = bookings.some(b =>
            b.date === newBooking.date &&
            b.time === newBooking.time &&
            b.doctor === newBooking.doctor &&
            b.status !== 'Canceled'
        );

        if (isDoubleBooked) {
            if (!window.confirm("WARNING: This slot is already booked for this doctor. Add anyway (Double-book)?")) return;
        }

        const bookingToSave = {
            id: Date.now(),
            name: newBooking.name,
            phone: newBooking.phone,
            dept: newBooking.specialty,
            doctor: newBooking.doctor,
            date: newBooking.date,
            time: newBooking.time,
            status: newBooking.status
        };

        const currentBookings = JSON.parse(localStorage.getItem('clinic_bookings') || '[]');
        currentBookings.push(bookingToSave);
        localStorage.setItem('clinic_bookings', JSON.stringify(currentBookings));

        alert("Manual Booking Added Successfully.");
        setNewBooking({ ...newBooking, name: '', phone: '' }); // Reset partial
        loadBookings();
        setActiveTab('list');
    };

    const logout = () => {
        localStorage.removeItem('adminLoggedIn');
        navigate('/admin/login');
    };

    const clearAll = () => {
        if (window.confirm("DANGER: WIPE ALL DATABASE RESERVATIONS?")) {
            localStorage.setItem('clinic_bookings', JSON.stringify([]));
            loadBookings();
        }
    };

    // Stats calculate
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-[85px]">

            {/* Header Bar */}
            <div className="bg-main text-white px-8 py-5 flex justify-between items-center shadow-lg relative z-10">
                <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                    <Users className="text-secondary" /> Aruna Management <span className="text-secondary text-sm ml-2 bg-secondary/20 px-2 rounded-full">Pro</span>
                </h2>
                <div className="flex gap-4">
                    <button onClick={() => setActiveTab('list')} className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'list' ? 'bg-secondary text-white' : 'text-slate-400 hover:text-white'}`}>Bookings</button>
                    <button onClick={() => setActiveTab('add')} className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-1 ${activeTab === 'add' ? 'bg-secondary text-white' : 'text-slate-400 hover:text-white'}`}><UserPlus size={16} /> Override Add</button>
                    <div className="w-px h-6 bg-slate-700 my-auto mx-2" />
                    <button onClick={logout} className="text-red-400 hover:text-red-300 font-bold text-sm tracking-widest uppercase flex items-center gap-1"><LogOut size={16} /> Exit</button>
                </div>
            </div>

            <div className="flex-1 max-w-[1600px] w-full mx-auto p-8 relative">

                {/* Analytics row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-5">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0"><CalendarCheck size={28} /></div>
                        <div><h4 className="text-3xl font-heading font-bold">{total}</h4><p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Appointments</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-5">
                        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0"><Clock size={28} /></div>
                        <div><h4 className="text-3xl font-heading font-bold">{pending}</h4><p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Pending Review</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-5">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0"><CheckCircle size={28} /></div>
                        <div><h4 className="text-3xl font-heading font-bold">{confirmed}</h4><p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Confirmed Slots</p></div>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'list' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] shadow-luxury border border-slate-100 p-8 overflow-hidden">
                        <div className="flex justify-between items-center mb-8 pr-4">
                            <h3 className="text-2xl font-heading font-bold text-main">Appointment Master Register</h3>
                            <button onClick={clearAll} className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1 border border-red-200">
                                <Trash2 size={14} /> Wipe Database
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500 font-bold">
                                        <th className="p-5 rounded-tl-xl w-[20%]">Patient</th>
                                        <th className="p-5 w-[15%]">Date / Time</th>
                                        <th className="p-5 w-[15%]">Department</th>
                                        <th className="p-5 w-[20%]">Doctor</th>
                                        <th className="p-5 w-[15%]">Status</th>
                                        <th className="p-5 rounded-tr-xl w-[15%] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.length === 0 ? (
                                        <tr><td colSpan="6" className="p-10 text-center text-slate-400 italic">No bookings found in system.</td></tr>
                                    ) : (
                                        bookings.map(b => (
                                            <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                                                <td className="p-5">
                                                    <div className="font-bold text-main">{b.name}</div>
                                                    <div className="text-xs text-slate-400 mt-1">{b.phone}</div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="font-semibold text-main">{b.date}</div>
                                                    <div className="text-xs uppercase tracking-widest text-primary font-bold mt-1 bg-primary/10 inline-block px-2 py-0.5 rounded-full">{b.time}</div>
                                                </td>
                                                <td className="p-5 text-sm text-slate-600 font-medium">{b.dept}</td>
                                                <td className="p-5 text-sm text-slate-600 font-medium">{b.doctor}</td>
                                                <td className="p-5">
                                                    <select
                                                        value={b.status}
                                                        onChange={(e) => updateStatus(b.id, e.target.value)}
                                                        className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full outline-none appearance-none cursor-pointer border-2 transition-colors ${b.status === 'Confirmed' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' :
                                                                b.status === 'Canceled' ? 'border-red-200 text-red-700 bg-red-50' :
                                                                    'border-amber-200 text-amber-700 bg-amber-50'
                                                            }`}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Confirmed">Confirmed</option>
                                                        <option value="Canceled">Canceled</option>
                                                    </select>
                                                </td>
                                                <td className="p-5 text-right">
                                                    <button onClick={() => deleteBooking(b.id)} className="text-slate-300 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Manual Add Form Tab */}
                {activeTab === 'add' && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-10 overflow-hidden relative">
                        <h3 className="text-3xl font-heading font-bold text-main mb-2">Override Booking</h3>
                        <p className="text-slate-500 text-sm mb-10">Use this panel to manually inject a booking into the database, ignoring frontend constraints.</p>

                        <form onSubmit={handleManualAdd} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Patient Name</label>
                                    <input required type="text" value={newBooking.name} onChange={e => setNewBooking({ ...newBooking, name: e.target.value })} className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-primary" placeholder="Enter name..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Phone</label>
                                    <input required type="text" value={newBooking.phone} onChange={e => setNewBooking({ ...newBooking, phone: e.target.value })} className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-primary" placeholder="Phone number" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Doctor</label>
                                    <select value={newBooking.doctor} onChange={e => setNewBooking({ ...newBooking, doctor: e.target.value })} className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-primary">
                                        {DOCTORS.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Department</label>
                                    <select value={newBooking.specialty} onChange={e => setNewBooking({ ...newBooking, specialty: e.target.value })} className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-primary">
                                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Date</label>
                                    <input required type="date" value={newBooking.date} onChange={e => setNewBooking({ ...newBooking, date: e.target.value })} className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-primary" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Time Slot</label>
                                    <select value={newBooking.time} onChange={e => setNewBooking({ ...newBooking, time: e.target.value })} className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-primary">
                                        {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Status Initialization</label>
                                    <select value={newBooking.status} onChange={e => setNewBooking({ ...newBooking, status: e.target.value })} className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-primary font-bold text-primary">
                                        <option>Confirmed</option>
                                        <option>Pending</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="w-full mt-8 bg-main text-white py-5 rounded-full font-bold uppercase tracking-widest shadow-xl flex justify-center items-center gap-2 hover:bg-slate-800 transition-all">
                                <UserPlus size={18} /> Force Booking Creation
                            </button>
                        </form>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
