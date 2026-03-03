import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('adminLoggedIn') === 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('adminLoggedIn', 'true');
            navigate('/admin');
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="min-h-screen bg-bgLight flex items-center justify-center p-6 bg-[url('/hero_modern.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-main/80 backdrop-blur-md" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md bg-white rounded-[2rem] p-10 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-heading font-bold text-main">Aruna <span className="text-primary">Admin</span></h1>
                    <p className="text-slate-500 mt-2">Secure Dashboard Access</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-4 pl-12 outline-none focus:border-primary transition-all"
                                placeholder="admin"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 text-main rounded-xl p-4 pl-12 outline-none focus:border-primary transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-main text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg transition-colors mt-4">
                        Login to Dashboard
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-400">
                    Demo Credentials: admin / admin123
                </div>
            </motion.div>
        </div>
    );
}
