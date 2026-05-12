import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Phone, User, ArrowRight, ShieldCheck, Fingerprint } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const { setUser } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'CUSTOMER' | 'RESTAURANT' | 'DRIVER'>('CUSTOMER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!showOtp) {
      // Step 1: Request OTP
      setTimeout(() => {
        setLoading(false);
        setShowOtp(true);
        toast.success('Verification code sent to your phone!');
      }, 1000);
    } else {
      // Step 2: Verify OTP
      setTimeout(() => {
        setUser({
          id: '1',
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '+251 911 22 33 44',
          role: role,
          isVerified: true,
        });
        toast.success(isLogin ? 'Successfully logged in!' : 'Account created successfully!');
        
        if (role === 'CUSTOMER') navigate('/');
        else if (role === 'RESTAURANT') navigate('/restaurant-dashboard');
        else if (role === 'DRIVER') navigate('/driver-dashboard');
        
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-background rounded-[2.5rem] shadow-2xl border overflow-hidden"
      >
        <div className="p-10">
          <div className="text-center mb-10">
            <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
               <Fingerprint className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-black mb-3">
              {showOtp ? 'Verify Account' : (isLogin ? 'Welcome Back' : 'Join the Scene')}
            </h1>
            <p className="text-muted-foreground">
              {showOtp 
                ? 'Enter the 4-digit code sent to your device' 
                : (isLogin ? 'Order your favorites in seconds' : 'Create an account to get started')}
            </p>
          </div>

          {!showOtp && (
            <div className="flex p-1 bg-muted rounded-2xl mb-8">
              {(['CUSTOMER', 'RESTAURANT', 'DRIVER'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === r ? 'bg-primary text-white shadow-lg' : 'hover:bg-muted-foreground/10'}`}
                >
                  {r.charAt(0) + r.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!showOtp ? (
                <motion.div
                  key="auth-fields"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {!isLogin && (
                    <div className="relative">
                      <User className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="Full Name" className="pl-12 h-14 rounded-2xl bg-muted/30 border-none" required />
                    </div>
                  )}
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                    <Input type="tel" placeholder="Phone Number (+251...)" className="pl-12 h-14 rounded-2xl bg-muted/30 border-none" required />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                    <Input type="password" placeholder="Password" className="pl-12 h-14 rounded-2xl bg-muted/30 border-none" required />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-fields"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Input
                        key={i}
                        className="h-16 w-full text-center text-2xl font-black rounded-2xl bg-muted/50 border-2 border-transparent focus:border-primary"
                        maxLength={1}
                        required
                      />
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full text-primary font-bold" type="button">
                    Resend Code
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <Button className="w-full h-16 rounded-2xl text-xl font-bold mt-6 shadow-xl shadow-primary/20 gap-3" disabled={loading}>
              {loading ? (
                <div className="h-6 w-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {showOtp ? 'Verify' : (isLogin ? 'Sign In' : 'Create Account')}
                  <ArrowRight className="h-6 w-6" />
                </>
              )}
            </Button>
          </form>

          {!showOtp && (
            <>
              <div className="mt-10 relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted-foreground/20"></div>
                </div>
                <span className="relative px-4 bg-background text-sm text-muted-foreground font-bold">
                  OR
                </span>
              </div>

              <div className="mt-8 flex gap-4">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl gap-3 border-2 font-bold">
                   <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                   Google
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-2xl gap-3 border-2 font-bold">
                   <ShieldCheck className="h-5 w-5 text-blue-600" />
                   Apple
                </Button>
              </div>

              <p className="text-center mt-10 text-muted-foreground font-medium">
                {isLogin ? "New to Sululta Eats?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-black hover:underline"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </button>
              </p>
            </>
          )}

          {showOtp && (
            <button 
              onClick={() => setShowOtp(false)}
              className="w-full mt-6 text-muted-foreground font-bold hover:text-primary transition-colors text-sm"
            >
              Go back
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;