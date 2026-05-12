import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, Truck, CheckCircle2, ChevronRight, Phone, ArrowLeft, ShieldCheck, Wallet, Landmark } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/ui/badge';

const Checkout = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('telebirr');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Order placed successfully!', {
         className: 'rounded-2xl font-black shadow-2xl border-2 border-primary/10'
      });
      clearCart();
      navigate('/order-tracking/ORD-' + Math.floor(Math.random() * 100000).toString(16).toUpperCase());
    }, 2500);
  };

  return (
    <div className="bg-muted/10 min-h-screen pb-32">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center gap-6 mb-12">
           <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl bg-white shadow-sm border-none" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-6 w-6" />
           </Button>
           <h1 className="text-4xl font-black tracking-tighter">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Delivery Address */}
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
               <div className="bg-primary p-8 text-white">
                 <h2 className="text-2xl font-black flex items-center gap-4">
                   <MapPin className="h-7 w-7" />
                   Delivery Details
                 </h2>
               </div>
               <CardContent className="p-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <Label className="font-black uppercase text-xs tracking-widest text-muted-foreground">First Name</Label>
                     <Input placeholder="e.g. Abebe" className="h-14 rounded-2xl bg-muted/30 border-none text-lg font-medium px-6" />
                   </div>
                   <div className="space-y-3">
                     <Label className="font-black uppercase text-xs tracking-widest text-muted-foreground">Last Name</Label>
                     <Input placeholder="e.g. Bikila" className="h-14 rounded-2xl bg-muted/30 border-none text-lg font-medium px-6" />
                   </div>
                   <div className="md:col-span-2 space-y-3">
                     <Label className="font-black uppercase text-xs tracking-widest text-muted-foreground">Street Address / Building</Label>
                     <Input placeholder="Main Road, Kebele 02, Sululta" className="h-14 rounded-2xl bg-muted/30 border-none text-lg font-medium px-6" />
                   </div>
                   <div className="md:col-span-2 space-y-3">
                     <Label className="font-black uppercase text-xs tracking-widest text-muted-foreground">Phone Number</Label>
                     <div className="relative">
                        <span className="absolute left-6 top-4 font-black text-lg text-primary">+251</span>
                        <Input placeholder="911 22 33 44" className="h-14 pl-20 rounded-2xl bg-muted/30 border-none text-lg font-medium" />
                     </div>
                   </div>
                 </div>
               </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
               <div className="bg-slate-950 p-8 text-white">
                 <h2 className="text-2xl font-black flex items-center gap-4">
                   <Wallet className="h-7 w-7 text-primary" />
                   Payment Method
                 </h2>
               </div>
               <CardContent className="p-10">
                 <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className={`relative border-4 rounded-[2.5rem] p-8 cursor-pointer transition-all ${paymentMethod === 'telebirr' ? 'border-primary bg-primary/5 shadow-xl' : 'border-muted hover:border-primary/20 hover:bg-muted/50'}`}>
                     <RadioGroupItem value="telebirr" id="telebirr" className="sr-only" />
                     <Label htmlFor="telebirr" className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg">
                           <span className="font-black text-sm tracking-tighter">TELE</span>
                        </div>
                        <div className="text-center">
                           <p className="font-black text-xl">Telebirr</p>
                           <p className="text-xs text-muted-foreground font-bold">Digital Wallet</p>
                        </div>
                        {paymentMethod === 'telebirr' && <CheckCircle2 className="absolute top-4 right-4 h-6 w-6 text-primary" />}
                     </Label>
                   </div>

                   <div className={`relative border-4 rounded-[2.5rem] p-8 cursor-pointer transition-all ${paymentMethod === 'cbe' ? 'border-primary bg-primary/5 shadow-xl' : 'border-muted hover:border-primary/20 hover:bg-muted/50'}`}>
                     <RadioGroupItem value="cbe" id="cbe" className="sr-only" />
                     <Label htmlFor="cbe" className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-purple-800 rounded-3xl flex items-center justify-center text-white shadow-lg">
                           <Landmark className="h-8 w-8" />
                        </div>
                        <div className="text-center">
                           <p className="font-black text-xl">CBE Birr</p>
                           <p className="text-xs text-muted-foreground font-bold">Bank Transfer</p>
                        </div>
                        {paymentMethod === 'cbe' && <CheckCircle2 className="absolute top-4 right-4 h-6 w-6 text-primary" />}
                     </Label>
                   </div>

                   <div className={`relative border-4 rounded-[2.5rem] p-8 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-xl' : 'border-muted hover:border-primary/20 hover:bg-muted/50'}`}>
                     <RadioGroupItem value="cod" id="cod" className="sr-only" />
                     <Label htmlFor="cod" className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-3xl flex items-center justify-center text-slate-700 shadow-lg">
                           <Truck className="h-8 w-8" />
                        </div>
                        <div className="text-center">
                           <p className="font-black text-xl">Cash</p>
                           <p className="text-xs text-muted-foreground font-bold">On Delivery</p>
                        </div>
                        {paymentMethod === 'cod' && <CheckCircle2 className="absolute top-4 right-4 h-6 w-6 text-primary" />}
                     </Label>
                   </div>
                 </RadioGroup>
               </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
             <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                <div className="bg-primary p-8 text-white">
                  <h3 className="text-2xl font-black">Final Review</h3>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-4 mb-8">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <Badge variant="secondary" className="h-6 min-w-[1.5rem] flex items-center justify-center font-black">{item.quantity}</Badge>
                           <span className="font-bold text-muted-foreground truncate max-w-[140px]">{item.name}</span>
                        </div>
                        <span className="font-black text-primary">{item.price * item.quantity} ETB</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-8 border-t space-y-4">
                    <div className="flex justify-between text-lg font-bold text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground">{subtotal} ETB</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-muted-foreground">
                      <span>Delivery</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between items-end pt-8 mt-4 border-t-2 border-dashed">
                      <span className="font-black text-xl">Total Pay</span>
                      <span className="text-4xl font-black text-primary">{total}<span className="text-xs ml-1 uppercase">ETB</span></span>
                    </div>
                  </div>

                  <Button
                    className="w-full h-20 rounded-[2rem] mt-10 font-black text-2xl shadow-2xl shadow-primary/30 group active:scale-95 transition-all"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
                       <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                       <span className="flex items-center gap-3">
                          Place Order
                          <ChevronRight className="h-7 w-7 group-hover:translate-x-1 transition-transform" />
                       </span>
                    )}
                  </Button>
                  
                  <div className="mt-8 p-6 bg-muted/50 rounded-2xl flex items-center gap-4">
                     <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                     <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                        By placing your order, you agree to Sululta Eats' terms of service and privacy policy.
                     </p>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;