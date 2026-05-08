import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

interface LoginProps {
  onSwitch: () => void;
  onLoginSuccess: () => void;
}

const Login = ({ onSwitch, onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('https://yaseen-cloud-project.duckdns.org/api/auth/login', { 
        email, 
        password 
      });

      // 1. Save user session data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('username', res.data.username);
      
      // 2. TRIGGER SUCCESS HANDLER
      // This tells App.tsx to close this modal and open ApplyModal
      onLoginSuccess(); 

      // 🚩 REMOVED: window.location.reload();
      // Instead of reloading, App.tsx will now handle the UI update dynamically.
      
    } catch (err) {
      alert("Invalid credentials. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
      <div className="text-center">
        <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Welcome Back</h2>
        <p className="text-neutral-500 mt-2 text-sm">Sign in to access your cloud documents</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-600 transition-colors">
            <Mail size={18} />
          </div>
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white transition-all text-neutral-800 placeholder:text-gray-400"
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-600 transition-colors">
            <Lock size={18} />
          </div>
          <input 
            type="password" 
            placeholder="Password" 
            required 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white transition-all text-neutral-800 placeholder:text-gray-400"
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-2 bg-lime-600 text-white font-bold py-4 rounded-2xl hover:bg-lime-700 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg shadow-lime-600/20 border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>Sign In <ArrowRight size={18} /></>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-sm text-gray-500">
          Don't have an account? 
          <button 
            onClick={onSwitch} 
            className="ml-1.5 text-lime-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;