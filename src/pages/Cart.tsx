import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '../components/ui/badge';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-primary/10 w-32 h-32 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
            <ShoppingCart className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-4xl font-black mb-4">Your bag is empty</h2>
          <p className="text-muted-foreground font-medium mb-12 text-lg">
            Looks like you haven't discovered your flavor yet. Browse our top-rated restaurants in Sululta!
          </p>
          <Link to="/restaurants">
            <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
               Start Browsing
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-muted/10 min-h-screen pb-32">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
             <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl bg-white shadow-sm border-none" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-6 w-6" />
             </Button>
             <h1 className="text-4xl font-black tracking-tighter">Your Order <span className="text-primary text-2xl ml-2">({cart.length})</span></h1>
          </div>
          <Button variant="ghost" className="text-destructive font-black h-12 rounded-xl" onClick={() => useStore.getState().clearCart()}>
             Clear All Items
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
             <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card className="overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white group transition-all hover:shadow-2xl">
                      <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative w-full sm:w-32 h-32 shrink-0">
                           <img src={item.image} className="w-full h-full rounded-[2rem] object-cover shadow-lg group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <h3 className="font-black text-2xl mb-1">{item.name}</h3>
                          <p className="text-muted-foreground text-sm font-medium line-clamp-1">From Sululta Favorite</p>
                          <p className="text-primary font-black text-xl mt-2">{item.price} <span className="text-xs">ETB</span></p>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-muted/50 rounded-2xl p-1.5 border border-muted-foreground/10">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-xl bg-white shadow-sm hover:bg-primary hover:text-white transition-all"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-black text-xl w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-xl bg-white shadow-sm hover:bg-primary hover:text-white transition-all"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl h-12 w-12 transition-colors"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
             </AnimatePresence>
             
             <div className="bg-primary/5 p-10 rounded-[3rem] border-2 border-dashed border-primary/20 text-center space-y-4">
                <p className="text-lg font-black">Missing something?</p>
                <Link to="/restaurants">
                   <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-bold">Add more items</Button>
                </Link>
             </div>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden sticky top-28">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-8 tracking-tight">Summary</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between font-bold text-muted-foreground text-lg">
                    <span>Subtotal</span>
                    <span className="text-foreground">{subtotal} ETB</span>
                  </div>
                  <div className="flex justify-between font-bold text-muted-foreground text-lg">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-muted-foreground text-lg">
                    <span>Platform Fee</span>
                    <span className="text-foreground">0 ETB</span>
                  </div>
                  <div className="border-t-4 border-dashed pt-8 mt-8 flex justify-between items-end">
                     <span className="font-black text-xl">Total Pay</span>
                     <span className="text-5xl font-black text-primary">{total}<span className="text-sm uppercase ml-1">ETB</span></span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full h-20 rounded-[2rem] text-2xl font-black shadow-2xl shadow-primary/30 gap-4 hover:scale-[1.02] active:scale-95 transition-all">
                    Go to Checkout
                    <ArrowRight className="h-8 w-8" />
                  </Button>
                </Link>

                <div className="flex items-center gap-3 justify-center mt-10 text-muted-foreground font-black uppercase text-[10px] tracking-widest">
                   <ShieldCheck className="h-5 w-5 text-green-600" />
                   Secure Payment Guaranteed
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;