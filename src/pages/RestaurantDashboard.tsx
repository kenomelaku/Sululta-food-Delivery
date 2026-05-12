import React from 'react';
import { Utensils, ShoppingBag, Clock, DollarSign, Plus, Edit2, Trash2, Check, X, Bell, Search, BarChart3, Settings, MoreVertical, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { IMAGES } from '../constants/images';

const RestaurantDashboard = () => {
  const stats = [
    { title: "Today's Orders", value: "24", trend: '+4', icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Today's Earnings", value: "4,200 ETB", trend: '+18%', icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { title: "Active Items", value: "18", trend: 'Stable', icon: Utensils, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Avg. Prep Time", value: "15 min", trend: '-2 min', icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const incomingOrders = [
    { id: 'ORD-5521', item: 'Special Beyaynetu x2', customer: 'Abebe G.', total: '500 ETB', status: 'PENDING', time: '5m ago' },
    { id: 'ORD-5522', item: 'Doro Wot x1', customer: 'Sara L.', total: '350 ETB', status: 'ACCEPTED', time: '12m ago' },
    { id: 'ORD-5523', item: 'Beef Tibs x3', customer: 'Mulugeta K.', total: '840 ETB', status: 'PREPARING', time: '18m ago' },
  ];

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8 lg:p-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <img src={IMAGES.logo} className="w-20 h-20 rounded-[2rem] shadow-xl" alt="Logo" />
           <div>
              <h1 className="text-4xl font-black tracking-tighter">Addis Flavors</h1>
              <p className="text-muted-foreground font-medium">Sululta Main Street \u2022 <span className="text-green-600 font-bold italic">Open for orders</span></p>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Find order..." className="pl-12 h-12 w-64 rounded-2xl bg-white border-none shadow-sm" />
           </div>
           <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl bg-white border-none shadow-sm">
              <Bell className="h-5 w-5" />
           </Button>
           <Button className="h-12 rounded-2xl px-6 font-black shadow-lg shadow-primary/20 gap-2">
             <Plus className="h-5 w-5" />
             New Dish
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-xl rounded-[2.5rem] bg-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                 <div className={`${stat.bg} p-4 rounded-2xl shadow-inner`}>
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                 </div>
                 <Badge variant="secondary" className="rounded-lg font-black text-[10px] px-2 py-0.5">{stat.trend}</Badge>
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.title}</p>
                 <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Incoming Orders */}
        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
          <CardHeader className="p-8 border-b bg-muted/5 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-black">Active Live Orders</CardTitle>
            <Button variant="ghost" className="text-primary font-black">View History</Button>
          </CardHeader>
          <CardContent className="p-0">
             <Table>
               <TableHeader className="bg-muted/30">
                 <TableRow className="hover:bg-transparent">
                   <TableHead className="pl-8 h-14 font-black text-xs uppercase tracking-widest">Order Details</TableHead>
                   <TableHead className="h-14 font-black text-xs uppercase tracking-widest">Customer</TableHead>
                   <TableHead className="h-14 font-black text-xs uppercase tracking-widest">Amount</TableHead>
                   <TableHead className="h-14 font-black text-xs uppercase tracking-widest">Status</TableHead>
                   <TableHead className="pr-8 h-14 text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {incomingOrders.map((order) => (
                   <TableRow key={order.id} className="h-24">
                     <TableCell className="pl-8 font-bold">
                       <div className="text-primary font-black">{order.id}</div>
                       <div className="text-xs text-muted-foreground">{order.item}</div>
                     </TableCell>
                     <TableCell>
                        <p className="font-bold">{order.customer}</p>
                        <p className="text-[10px] text-muted-foreground font-black">{order.time}</p>
                     </TableCell>
                     <TableCell className="font-black">{order.total}</TableCell>
                     <TableCell>
                        <Badge 
                          className={`rounded-xl px-4 py-1 font-black ${
                            order.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                          } border-none`}
                        >
                          {order.status}
                        </Badge>
                     </TableCell>
                     <TableCell className="pr-8 text-right">
                       <div className="flex justify-end gap-2">
                          <Button size="icon" className="h-12 w-12 bg-green-500 hover:bg-green-600 rounded-2xl shadow-lg shadow-green-200">
                            <Check className="h-5 w-5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-12 w-12 text-red-500 bg-red-50 hover:bg-red-100 rounded-2xl">
                            <X className="h-5 w-5" />
                          </Button>
                       </div>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
          </CardContent>
        </Card>

        {/* Menu & Performance */}
        <div className="space-y-12">
           <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <CardHeader className="p-8 pb-4">
                 <CardTitle className="text-xl font-black">Popular Items</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                 {[
                   { name: 'Special Beyaynetu', price: '250 ETB', stock: '95%', img: IMAGES.beyaynetu },
                   { name: 'Doro Wot', price: '350 ETB', stock: '40%', img: IMAGES.doro_wot },
                   { name: 'Beef Tibs', price: '280 ETB', stock: 'Out', img: IMAGES.beyaynetu },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-[2rem] border-2 border-transparent hover:border-primary/10 transition-all">
                     <div className="flex items-center gap-4">
                        <img src={item.img} className="w-14 h-14 rounded-2xl object-cover" alt="Item" />
                        <div>
                           <p className="font-black">{item.name}</p>
                           <p className="text-xs text-muted-foreground font-bold">{item.price}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Stock</p>
                        <Badge variant="outline" className="rounded-lg border-2 font-black">{item.stock}</Badge>
                     </div>
                   </div>
                 ))}
                 <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black group">
                    View All Menu <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </CardContent>
           </Card>

           <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-slate-900 text-white">
              <CardContent className="p-8 flex items-center justify-between">
                 <div>
                    <h3 className="text-2xl font-black mb-1">Performance</h3>
                    <p className="text-slate-400 font-medium">Top 5% in Sululta</p>
                 </div>
                 <div className="bg-primary p-4 rounded-[2rem] shadow-2xl shadow-primary/20">
                    <BarChart3 className="h-8 w-8" />
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;