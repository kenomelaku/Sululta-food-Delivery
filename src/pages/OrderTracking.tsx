import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, CheckCircle2, MapPin, Phone, Clock, MessageSquare, Navigation, MoreVertical, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { IMAGES } from '../constants/images';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState<'PREPARING' | 'ON_THE_WAY' | 'DELIVERED'>('PREPARING');
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('ON_THE_WAY');
      setProgress(75);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { label: 'Confirmed', status: 'COMPLETED', time: '12:15 PM' },
    { label: 'Preparing', status: status === 'PREPARING' ? 'CURRENT' : 'COMPLETED', time: '12:20 PM' },
    { label: 'Out for delivery', status: status === 'ON_THE_WAY' ? 'CURRENT' : status === 'DELIVERED' ? 'COMPLETED' : 'PENDING', time: status === 'ON_THE_WAY' ? '12:45 PM' : '--:--' },
    { label: 'Delivered', status: status === 'DELIVERED' ? 'COMPLETED' : 'PENDING', time: '--:--' },
  ];

  return (
    <div className="bg-muted/10 min-h-screen pb-20">
      <div className="bg-primary py-12 text-white">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
               <Badge className="bg-white/20 text-white border-none backdrop-blur-md mb-2">Order in Progress</Badge>
               <h1 className="text-3xl md:text-5xl font-black">Tracking ID: {orderId?.toUpperCase()}</h1>
               <p className="opacity-80 font-medium">Estimated delivery time: <span className="font-black">12:55 PM</span></p>
            </div>
            <div className="flex gap-3">
               <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-2xl h-14 px-8 font-black">
                 Cancel Order
               </Button>
               <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl h-14 px-8 font-black shadow-xl">
                 Help Center
               </Button>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 pb-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
               <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
                  <CardContent className="p-10">
                     <div className="flex items-center gap-6 mb-12">
                        <div className="bg-primary/10 w-24 h-24 rounded-[2rem] flex items-center justify-center shrink-0">
                           <Bike className="h-12 w-12 text-primary animate-bounce" />
                        </div>
                        <div>
                           <h2 className="text-3xl font-black mb-2">
                              {status === 'PREPARING' ? 'Preparing your meal' : 'Rider is on the way!'}
                           </h2>
                           <p className="text-muted-foreground font-medium">Chef is adding the final touches to your delicious order.</p>
                        </div>
                     </div>

                     <div className="mb-16 px-4 relative">
                        <Progress value={progress} className="h-4 rounded-full" />
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-0">
                           {[0, 33, 66, 100].map(p => (
                              <div key={p} className={`w-6 h-6 rounded-full border-4 border-background transition-colors ${progress >= p ? 'bg-primary' : 'bg-muted'}`} />
                           ))}
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                           <div key={idx} className="text-center space-y-3">
                              <div className={`mx-auto h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${ 
                                 step.status === 'COMPLETED' ? 'bg-primary text-white scale-110' : 
                                 step.status === 'CURRENT' ? 'bg-primary/20 text-primary border-2 border-primary animate-pulse' :
                                 'bg-muted text-muted-foreground'
                              }`}>
                                 {step.status === 'COMPLETED' ? <CheckCircle2 className="h-6 w-6" /> : <div className="h-2 w-2 rounded-full bg-current" />}
                              </div>
                              <div>
                                 <p className={`font-black uppercase text-[10px] tracking-widest ${step.status === 'PENDING' ? 'text-muted-foreground' : 'text-primary'}`}>{step.label}</p>
                                 <p className="text-sm font-bold">{step.time}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden h-[500px] relative group">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse">
                     <img src={IMAGES.hero} className="w-full h-full object-cover opacity-20 grayscale" alt="Map" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                     <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl text-center max-w-sm border border-white">
                        <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                           <Navigation className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-black mb-2">Live Map Integration</h3>
                        <p className="text-muted-foreground font-medium mb-6">
                           Integrating Google Maps for real-time rider tracking across Sululta streets.
                        </p>
                        <Button className="rounded-2xl h-14 w-full font-black text-lg">Enable GPS</Button>
                     </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-4 border-dashed border-primary/20 rounded-full opacity-50"></div>
                  <div className="absolute top-1/4 left-1/4 bg-primary p-3 rounded-full shadow-2xl z-20">
                     <MapPin className="h-6 w-6 text-white" />
                  </div>
               </Card>
            </div>

            <div className="space-y-8">
               <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-primary/5 border-2 border-primary/10">
                  <CardContent className="p-8">
                     <div className="flex items-center gap-6 mb-8">
                        <div className="relative">
                           <img src={IMAGES.rider} className="w-24 h-24 rounded-[2rem] object-cover shadow-xl" alt="Rider" />
                           <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white border-4 border-white h-8 w-8 p-0 flex items-center justify-center">
                              <Star className="h-4 w-4 fill-white" />
                           </Badge>
                        </div>
                        <div>
                           <p className="text-xs font-black text-primary uppercase tracking-widest">Your Rider</p>
                           <h3 className="text-2xl font-black">Abebe Bikila</h3>
                           <p className="text-sm font-bold text-muted-foreground">Blue Scooter \u2022 AA-2-A123</p>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary/5">
                           <p className="text-[10px] font-black text-muted-foreground uppercase">Rating</p>
                           <p className="text-xl font-black text-primary">4.9/5</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary/5">
                           <p className="text-[10px] font-black text-muted-foreground uppercase">Trips</p>
                           <p className="text-xl font-black text-primary">1,240+</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <Button size="icon" className="flex-1 h-14 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                           <Phone className="h-6 w-6" />
                        </Button>
                        <Button size="icon" variant="outline" className="flex-1 h-14 rounded-2xl border-2 hover:bg-muted font-black">
                           <MessageSquare className="h-6 w-6" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-14 w-14 rounded-2xl bg-muted">
                           <MoreVertical className="h-6 w-6" />
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden">
                  <div className="bg-muted/30 p-6 border-b flex items-center justify-between">
                     <h3 className="font-black">Order Summary</h3>
                     <Badge variant="outline">Paid</Badge>
                  </div>
                  <CardContent className="p-8 space-y-4">
                     <div className="flex justify-between font-bold">
                        <span className="text-muted-foreground">2x Special Beyaynetu</span>
                        <span>500 ETB</span>
                     </div>
                     <div className="flex justify-between font-bold">
                        <span className="text-muted-foreground">1x Avocado Juice</span>
                        <span>80 ETB</span>
                     </div>
                     <hr className="border-dashed my-4" />
                     <div className="flex justify-between font-black text-2xl text-primary">
                        <span>Total</span>
                        <span>580 ETB</span>
                     </div>
                     <p className="text-[10px] text-center font-bold text-muted-foreground uppercase pt-4">Payment via Telebirr</p>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OrderTracking;