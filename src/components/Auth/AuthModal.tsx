import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, onLoginSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors border-0 bg-transparent text-2xl"
        >
          &times;
        </button>

        <div className="p-8">
          {isLogin ? (
            <Login 
              onSwitch={() => setIsLogin(false)} 
              onLoginSuccess={onLoginSuccess} 
            />
          ) : (
            <Register 
              onSwitch={() => setIsLogin(true)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;