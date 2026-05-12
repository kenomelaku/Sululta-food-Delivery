import React, { useState } from 'react';
import { LayoutDashboard, Users, UtensilsCrossed, Bike, ShoppingBag, TrendingUp, DollarSign, Settings, Bell, Search, Download, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '45,231 ETB', trend: '+12.5%', isUp: true, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Total Orders', value: '1,284', trend: '+8.2%', isUp: true, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Active Restaurants', value: '42', trend: '+2', isUp: true, icon: UtensilsCrossed, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Active Drivers', value: '18', trend: '-5%', isUp: false, icon: Bike, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const recentOrders = [
    { id: 'ORD-1234', customer: 'John Doe', restaurant: 'Addis Flavors', amount: '450 ETB', status: 'DELIVERED', date: 'Oct 24, 2023' },
    { id: 'ORD-1235', customer: 'Sara T.', restaurant: 'Sululta Pizza', amount: '280 ETB', status: 'PENDING', date: 'Oct 24, 2023' },
    { id: 'ORD-1236', customer: 'Mekonnen A.', restaurant: 'Habesha Kitchen', amount: '620 ETB', status: 'ON_THE_WAY', date: 'Oct 23, 2023' },
    { id: 'ORD-1237', customer: 'Fatuma K.', restaurant: 'Burger Queen', amount: '315 ETB', status: 'DELIVERED', date: 'Oct 23, 2023' },
    { id: 'ORD-1238', customer: 'Abebe G.', restaurant: 'Green Garden', amount: '540 ETB', status: 'CANCELLED', date: 'Oct 22, 2023' },
  ];

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8 lg:p-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black tracking-tighter flex items-center gap-4">
             <div className="bg-primary p-2 rounded-2xl shadow-lg">
               <LayoutDashboard className="h-8 w-8 text-white" />
             </div>
             Sululta Central
           </h1>
           <p className="text-muted-foreground font-medium mt-1">Platform management & analytics dashboard</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search anything..." className="pl-10 rounded-xl bg-white w-64 border-none shadow-sm h-11" />
           </div>
           <Button variant="outline" className="h-11 w-11 p-0 rounded-xl bg-white shadow-sm border-none">
              <Bell className="h-5 w-5" />
           </Button>
           <Button className="h-11 rounded-xl px-6 font-bold shadow-lg shadow-primary/20 gap-2">
              <Activity className="h-4 w-4" />
              System Status
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`${stat.bg} p-4 rounded-[1.25rem] shadow-inner`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <Badge className={`${stat.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} border-none font-black rounded-lg gap-1`}>
                   {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                   {stat.trend}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-black uppercase tracking-widest mb-1">{stat.title}</p>
                <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="orders" className="space-y-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border-none h-14 w-full md:w-auto">
               <TabsTrigger value="orders" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Orders</TabsTrigger>
               <TabsTrigger value="restaurants" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Restaurants</TabsTrigger>
               <TabsTrigger value="drivers" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Drivers</TabsTrigger>
               <TabsTrigger value="users" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Users</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
               <Button variant="outline" className="rounded-xl h-12 font-bold bg-white border-none shadow-sm gap-2">
                 <Filter className="h-4 w-4" /> Filter
               </Button>
               <Button variant="outline" className="rounded-xl h-12 font-bold bg-white border-none shadow-sm gap-2">
                 <Download className="h-4 w-4" /> Export
               </Button>
            </div>
         </div>

         <TabsContent value="orders" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Main Table Card */}
               <Card className="lg:col-span-2 border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="p-8 border-b bg-muted/10">
                    <CardTitle className="text-2xl font-black">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                     <Table>
                        <TableHeader className="bg-muted/30">
                           <TableRow className="hover:bg-transparent">
                              <TableHead className="pl-8 h-14 font-black text-xs uppercase tracking-widest text-muted-foreground">Order ID</TableHead>
                              <TableHead className="h-14 font-black text-xs uppercase tracking-widest text-muted-foreground">Customer</TableHead>
                              <TableHead className="h-14 font-black text-xs uppercase tracking-widest text-muted-foreground">Restaurant</TableHead>
                              <TableHead className="h-14 font-black text-xs uppercase tracking-widest text-muted-foreground">Amount</TableHead>
                              <TableHead className="h-14 font-black text-xs uppercase tracking-widest text-muted-foreground">Status</TableHead>
                              <TableHead className="pr-8 h-14 font-black text-xs uppercase tracking-widest text-muted-foreground text-right">Action</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {recentOrders.map((order) => (
                              <TableRow key={order.id} className="hover:bg-muted/20 transition-colors border-b last:border-none">
                                 <TableCell className="pl-8 h-20 font-black text-primary">{order.id}</TableCell>
                                 <TableCell>
                                    <div className="flex items-center gap-3">
                                       <Avatar className="h-10 w-10 border-2">
                                          <AvatarFallback className="font-bold">{order.customer[0]}</AvatarFallback>
                                       </Avatar>
                                       <div>
                                          <p className="font-bold">{order.customer}</p>
                                          <p className="text-[10px] text-muted-foreground font-bold">{order.date}</p>
                                       </div>
                                    </div>
                                 </TableCell>
                                 <TableCell className="font-bold">{order.restaurant}</TableCell>
                                 <TableCell className="font-black">{order.amount}</TableCell>
                                 <TableCell>
                                    <Badge 
                                       className={`rounded-xl px-4 py-1.5 font-black border-none ${
                                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                                          order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 
                                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                          'bg-blue-100 text-blue-700'
                                       }`}
                                    >
                                       {order.status}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className="pr-8 text-right">
                                    <DropdownMenu>
                                       <DropdownMenuTrigger asChild>
                                          <Button size="icon" variant="ghost" className="rounded-xl">
                                             <MoreHorizontal className="h-5 w-5" />
                                          </Button>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent align="end" className="rounded-2xl">
                                          <DropdownMenuItem className="font-bold">View Details</DropdownMenuItem>
                                          <DropdownMenuItem className="font-bold">Update Status</DropdownMenuItem>
                                          <DropdownMenuItem className="font-bold text-destructive">Cancel Order</DropdownMenuItem>
                                       </DropdownMenuContent>
                                    </DropdownMenu>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </CardContent>
               </Card>

               {/* Side Panel */}
               <div className="space-y-8">
                  <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                     <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-xl font-black">Growth Analytics</CardTitle>
                     </CardHeader>
                     <CardContent className="p-8 pt-0">
                        <div className="space-y-8">
                           {[
                              { label: 'Weekly Revenue', val: '78%', color: 'bg-primary' },
                              { label: 'New Customers', val: '45%', color: 'bg-blue-500' },
                              { label: 'Driver Efficiency', val: '92%', color: 'bg-green-500' },
                           ].map(g => (
                              <div key={g.label} className="space-y-3">
                                 <div className="flex justify-between font-black text-sm uppercase tracking-widest text-muted-foreground">
                                    <span>{g.label}</span>
                                    <span className="text-foreground">{g.val}</span>
                                 </div>
                                 <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                    <div className={`h-full ${g.color} rounded-full`} style={{ width: g.val }}></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <Button className="w-full mt-10 h-14 rounded-2xl font-black">Full Report</Button>
                     </CardContent>
                  </Card>

                  <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-slate-900 text-white">
                     <CardContent className="p-8 text-center space-y-6">
                        <div className="bg-primary/20 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl">
                           <Users className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black">Support Queue</h3>
                           <p className="text-slate-400 font-medium">3 tickets waiting for review</p>
                        </div>
                        <Button variant="outline" className="w-full h-14 rounded-2xl font-black bg-white/5 border-white/10 hover:bg-white/10">Open Support Hub</Button>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;