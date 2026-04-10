'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { API_URL } from '../../utils/api';

export default function SignupPage() {
    const router = useRouter();
    // Start in signup mode by default
    const [isLogin, setIsLogin] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({ name: '', email: '', password: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;
        const payload = isLogin 
            ? { email: formData.email, password: formData.password }
            : { name: formData.name, email: formData.email, password: formData.password };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors && data.errors.length > 0) {
                    throw new Error(data.errors[0].msg);
                }
                throw new Error(data.message || 'Something went wrong');
            }

            // Success: save token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to activities/focus
            router.push('/focus');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100/50 via-purple-50/30 to-orange-100/50 flex items-center justify-center p-4">
            
            {/* Vibrant Abstract Globs behind */}
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#a29bfe]/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#fdcb6e]/40 rounded-full blur-[90px] -z-10 pointer-events-none"></div>
            <div className="absolute -bottom-20 left-1/3 w-[300px] h-[300px] bg-[#e17055]/30 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

            <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-white/60 w-full max-w-md animate-fadeIn z-10">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#2d3436] mb-2 drop-shadow-sm">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-[#636e72] text-sm">
                        {isLogin ? 'Continue your wellness journey' : 'Start your wellness journey today'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 text-sm rounded-2xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-[#a29bfe]" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required={!isLogin}
                                placeholder="Full Name"
                                className="w-full pl-11 pr-4 py-3 bg-white/70 border border-white/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#a29bfe]/50 text-[#2d3436] placeholder-[#636e72]/60 transition-all shadow-sm"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-[#a29bfe]" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email Address"
                            className="w-full pl-11 pr-4 py-3 bg-white/70 border border-white/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#a29bfe]/50 text-[#2d3436] placeholder-[#636e72]/60 transition-all shadow-sm"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-[#a29bfe]" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Password"
                            className="w-full pl-11 pr-4 py-3 bg-white/70 border border-white/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#a29bfe]/50 text-[#2d3436] placeholder-[#636e72]/60 transition-all shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-[#a29bfe] to-[#fdcb6e] hover:from-[#8c7ae6] hover:to-[#e17055] text-white rounded-2xl font-semibold shadow-xl shadow-purple-200/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={toggleMode}
                        type="button"
                        className="text-sm text-[#2d3436] hover:text-[#a29bfe] font-medium transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                    </button>
                </div>
            </div>
        </div>
    );
}
