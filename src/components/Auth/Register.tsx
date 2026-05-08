import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

interface RegisterProps {
  onSwitch: () => void;
}

const Register = ({ onSwitch }: RegisterProps) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Hits your custom backend registration API
      await axios.post('https://yaseen-cloud-project.duckdns.org/api/auth/register', formData);
      
      alert("Account created successfully! Now you can sign in.");
      onSwitch(); // Takes the user back to the Login form
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Registration failed. Try a different email.";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Create Account</h2>
        <p className="text-neutral-500 mt-2 text-sm">Join the internee.pk cloud community</p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        
        {/* Full Name Input */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-600 transition-colors">
            <User size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white transition-all text-neutral-800 placeholder:text-gray-400"
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
          />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-600 transition-colors">
            <Mail size={18} />
          </div>
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white transition-all text-neutral-800 placeholder:text-gray-400"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-600 transition-colors">
            <Lock size={18} />
          </div>
          <input 
            type="password" 
            placeholder="Create Password" 
            required 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white transition-all text-neutral-800 placeholder:text-gray-400"
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-2 bg-neutral-900 text-white font-bold py-4 rounded-2xl hover:bg-black active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg shadow-black/10 border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Start Journey <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Footer / Toggle */}
      <div className="text-center pt-2">
        <p className="text-sm text-gray-500">
          Already have an account? 
          <button 
            onClick={onSwitch} 
            className="ml-1.5 text-lime-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;