import React from 'react';
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Settings, LogOut, ChevronRight, ShieldCheck, Bell, CreditCard, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  if (!user) return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h2 className="text-4xl font-black mb-6">Access Denied</h2>
      <p className="text-muted-foreground mb-10 font-medium">Please login to view your personal profile and order history.</p>
      <Button onClick={() => navigate('/login')} className="rounded-2xl h-14 px-10 font-black">Login Now</Button>
    </div>
  );

  const menuItems = [
    { label: 'My Orders', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50', count: '12' },
    { label: 'Favorite Restaurants', icon: Heart, color: 'text-red-500', bg: 'bg-red-50', count: '5' },
    { label: 'Saved Addresses', icon: MapPin, color: 'text-orange-500', bg: 'bg-orange-50', count: '2' },
    { label: 'Payment Methods', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50', count: '3' },
    { label: 'Notifications', icon: Bell, color: 'text-purple-500', bg: 'bg-purple-50', count: '0' },
    { label: 'Security & Privacy', icon: ShieldCheck, color: 'text-slate-600', bg: 'bg-slate-50' },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="bg-muted/10 min-h-screen pb-32">
      <div className="bg-primary h-64 md:h-80 relative overflow-hidden">
         <div className="absolute inset-0 bg-slate-950/20"></div>
         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
         
         <div className="container mx-auto px-4 h-full relative">
            <Button 
               variant="ghost" 
               className="mt-8 bg-white/10 text-white hover:bg-white/20 rounded-xl font-bold backdrop-blur-md border border-white/20"
               onClick={() => navigate('/')}
            >
               <ChevronLeft className="mr-2 h-4 w-4" /> Home
            </Button>
         </div>

         <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="relative">
               <Avatar className="h-40 w-40 md:h-52 md:w-52 border-8 border-background shadow-3xl bg-white">
                 <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256" />
                 <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary">{user.fullName.charAt(0)}</AvatarFallback>
               </Avatar>
               <Badge className="absolute bottom-4 right-4 bg-green-500 text-white border-4 border-white h-10 w-10 p-0 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
               </Badge>
            </div>
            <div className="md:mb-10 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{user.fullName}</h1>
              <p className="text-muted-foreground font-black uppercase tracking-widest text-sm mt-1">{user.role} Member</p>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 mt-40">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-8">
               <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                  <CardHeader className="p-10 pb-4">
                     <CardTitle className="text-xl font-black">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 pt-0 space-y-8">
                     <div className="flex items-center gap-6">
                       <div className="bg-muted/50 p-4 rounded-2xl">
                          <Mail className="h-6 w-6 text-muted-foreground" />
                       </div>
                       <div>
                         <p className="text-[10px] font-black uppercase text-muted-foreground">Email Address</p>
                         <p className="font-bold">{user.email}</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-6">
                       <div className="bg-muted/50 p-4 rounded-2xl">
                          <Phone className="h-6 w-6 text-muted-foreground" />
                       </div>
                       <div>
                         <p className="text-[10px] font-black uppercase text-muted-foreground">Phone Number</p>
                         <p className="font-bold">{user.phone}</p>
                       </div>
                     </div>
                     <Button variant="outline" className="w-full h-14 rounded-2xl font-black border-2">Edit Profile</Button>
                  </CardContent>
               </Card>

               <Button
                 variant="ghost"
                 className="w-full h-16 rounded-[2rem] text-destructive hover:bg-destructive/5 font-black text-xl gap-3"
                 onClick={handleLogout}
               >
                 <LogOut className="h-6 w-6" />
                 Sign Out
               </Button>
            </div>

            <div className="lg:col-span-2 space-y-6">
               <h2 className="text-3xl font-black tracking-tighter mb-8">Manage Your Account</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item, idx) => (
                    <Card key={idx} className="border-none shadow-xl rounded-[2.5rem] cursor-pointer hover:shadow-2xl transition-all group overflow-hidden">
                      <CardContent className="p-8 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className={`${item.bg} p-5 rounded-[1.5rem] shadow-inner`}>
                            <item.icon className={`h-7 w-7 ${item.color}`} />
                          </div>
                          <div>
                             <span className="font-black text-lg block">{item.label}</span>
                             {item.count && <span className="text-xs font-bold text-muted-foreground uppercase">{item.count} items recorded</span>}
                          </div>
                        </div>
                        <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </CardContent>
                    </Card>
                  ))}
               </div>

               <Card className="border-none shadow-2xl rounded-[3.5rem] overflow-hidden bg-slate-950 text-white mt-12">
                  <CardContent className="p-12">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                           <Badge className="bg-primary text-white font-black mb-4">SULULTA EATS GOLD</Badge>
                           <h3 className="text-3xl font-black mb-2">Upgrade to Premium</h3>
                           <p className="text-slate-400 font-medium">Get unlimited free delivery and exclusive restaurant deals.</p>
                        </div>
                        <Button className="h-16 px-10 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30">Unlock Now</Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;