import React, { useState } from 'react';
import { Bike, MapPin, DollarSign, History, Shield, Power, Navigation, Phone, CheckCircle, Bell, ChevronRight, MessageSquare, Star, ArrowUpRight, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { IMAGES } from '../constants/images';

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);

  const stats = [
    { title: "Today's Earnings", value: "450 ETB", trend: '+12%', icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { title: "Deliveries Done", value: "12", trend: 'New High', icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Travel Distance", value: "45 km", trend: '2.5h active', icon: Navigation, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Avg. Rating", value: "4.9", trend: 'Top 1%', icon: Star, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const handleStatusChange = (checked: boolean) => {
    setIsOnline(checked);
    if (checked) {
      toast.success("You are now online!", {
         description: "Stay alert for incoming delivery requests in Sululta.",
         className: "rounded-2xl font-black shadow-2xl"
      });
    } else {
      toast.info("You are now offline.");
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-32">
      <div className="bg-slate-950 py-16 text-white">
         <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
               <div className="flex items-center gap-8">
                  <div className="relative">
                     <img src={IMAGES.rider} className="w-24 h-24 rounded-[2.5rem] object-cover border-4 border-primary shadow-2xl" alt="Driver" />
                     <div className="absolute -top-2 -right-2 bg-primary p-2 rounded-xl shadow-lg">
                        <Award className="h-5 w-5 text-white" />
                     </div>
                  </div>
                  <div>
                     <h1 className="text-4xl font-black tracking-tighter">Abebe Bikila</h1>
                     <div className="flex flex-wrap gap-4 mt-2">
                        <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-md px-3 font-bold">PRO RIDER</Badge>
                        <span className="text-slate-400 font-bold text-sm flex items-center gap-2">
                           <Bike className="h-4 w-4" /> Scooter \u2022 AA-123-ET
                        </span>
                     </div>
                  </div>
               </div>

               <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 flex items-center gap-8 backdrop-blur-xl">
                  <div className="text-right">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Status</p>
                     <h3 className={`text-2xl font-black ${isOnline ? 'text-green-500' : 'text-slate-500'}`}>
                        {isOnline ? 'ONLINE' : 'OFFLINE'}
                     </h3>
                  </div>
                  <Switch 
                    checked={isOnline} 
                    onCheckedChange={handleStatusChange} 
                    className="scale-150 data-[state=checked]:bg-green-500"
                  />
               </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
               <Card key={idx} className="border-none shadow-2xl rounded-[2.5rem] bg-white group hover:scale-105 transition-transform">
                  <CardContent className="p-8 text-center sm:text-left">
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className={`${stat.bg} p-4 rounded-2xl shadow-inner inline-block`}>
                           <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <Badge variant="secondary" className="text-[10px] font-black uppercase">{stat.trend}</Badge>
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.title}</p>
                     <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
                  </CardContent>
               </Card>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-2 space-y-10">
               <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black tracking-tighter">Incoming Requests</h2>
                  <Badge className="bg-primary/10 text-primary border-none font-bold px-4 h-8">Live</Badge>
               </div>

               {isOnline ? (
                  <Card className="border-4 border-primary/20 shadow-3xl rounded-[3.5rem] overflow-hidden bg-primary/5 relative">
                     <div className="absolute top-0 right-0 p-10">
                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl text-center">
                           <p className="text-[10px] font-black uppercase text-muted-foreground">Reward</p>
                           <p className="text-2xl font-black text-green-600">+45 ETB</p>
                        </div>
                     </div>
                     <CardContent className="p-12">
                        <Badge className="bg-primary text-white font-black mb-6">NEW REQUEST AVAILABLE</Badge>
                        <h3 className="text-4xl font-black mb-4">Addis Flavors</h3>
                        <p className="text-primary font-black text-xl mb-12 flex items-center gap-2">
                           <Navigation className="h-6 w-6" /> 1.2 km from your location
                        </p>

                        <div className="space-y-8 mb-16">
                           <div className="flex items-start gap-6">
                              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border-2 border-orange-200">
                                 <div className="h-3 w-3 rounded-full bg-orange-600 animate-ping"></div>
                              </div>
                              <div>
                                 <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Pickup</p>
                                 <p className="text-xl font-bold">Sululta Main Road, Addis Flavors</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-6">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 border-2 border-green-200">
                                 <MapPin className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                 <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Drop-off</p>
                                 <p className="text-xl font-bold">Kebele 02, Area 5, Resident Block B</p>
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                           <Button className="flex-1 h-20 rounded-[2rem] text-2xl font-black shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                              Accept Request
                           </Button>
                           <Button variant="outline" className="h-20 px-10 rounded-[2rem] text-xl font-bold text-red-600 border-2 border-red-100 hover:bg-red-50">
                              Decline
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               ) : (
                  <Card className="border-none shadow-xl rounded-[3rem] p-20 text-center bg-white">
                     <div className="bg-muted/50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <Power className="h-12 w-12 text-muted-foreground" />
                     </div>
                     <h3 className="text-3xl font-black mb-4">You are offline</h3>
                     <p className="text-muted-foreground font-medium text-lg max-w-sm mx-auto">
                        Switch to online status to start receiving orders and earning birr today!
                     </p>
                  </Card>
               )}
            </div>

            <div className="space-y-10">
               <h2 className="text-3xl font-black tracking-tighter">Earnings History</h2>
               <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                     <Card key={i} className="border-none shadow-sm rounded-3xl bg-white hover:shadow-md transition-all">
                        <CardContent className="p-6 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="bg-green-50 p-3 rounded-2xl">
                                 <ArrowUpRight className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                 <p className="font-bold">Order #122{i}</p>
                                 <p className="text-[10px] font-black uppercase text-muted-foreground">Delivered \u2022 2h ago</p>
                              </div>
                           </div>
                           <p className="text-xl font-black text-green-600">+35.00 <span className="text-[10px]">ETB</span></p>
                        </CardContent>
                     </Card>
                  ))}
                  <Button variant="ghost" className="w-full h-14 rounded-2xl font-black text-primary">View All Activity</Button>
               </div>

               <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-primary p-8 text-white relative group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-xl font-black mb-2">Rider Support</h4>
                  <p className="opacity-80 font-medium mb-6">Having trouble with a delivery? Our 24/7 support is here to help you.</p>
                  <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl font-black h-12">Contact Dispatch</Button>
               </Card>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DriverDashboard;