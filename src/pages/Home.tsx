import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Clock, ChevronRight, Utensils, Coffee, Pizza, Bike, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants/images';

const categories = [
  { name: 'Traditional', icon: Utensils, image: IMAGES.beyaynetu },
  { name: 'Coffee', icon: Coffee, image: IMAGES.coffee },
  { name: 'Pizza', icon: Pizza, image: IMAGES.pizza },
  { name: 'Burgers', icon: Utensils, image: IMAGES.burger },
];

const featuredRestaurants = [
  {
    id: '1',
    name: 'Addis Flavors',
    rating: 4.8,
    time: '20-30 min',
    image: IMAGES.restaurant_interior,
    categories: ['Traditional', 'Breakfast'],
    deliveryFee: 'Free'
  },
  {
    id: '2',
    name: 'Sululta Pizza Hub',
    rating: 4.5,
    time: '30-45 min',
    image: IMAGES.pizza,
    categories: ['Pizza', 'Italian'],
    deliveryFee: '25 ETB'
  },
  {
    id: '3',
    name: 'Green Garden Healthy',
    rating: 4.9,
    time: '15-25 min',
    image: IMAGES.beyaynetu,
    categories: ['Salads', 'Healthy'],
    deliveryFee: 'Free'
  }
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            className="w-full h-full object-cover brightness-[0.4] scale-105"
            alt="Hero Background"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block"
          >
            <Badge className="bg-primary/20 backdrop-blur-md text-primary-foreground border-primary/30 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              #1 Food Delivery in Sululta
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            Sululta's Best Food <br />
            <span className="text-primary">Delivered Fast</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200"
          >
            Savor the authentic taste of Ethiopia. From traditional Beyaynetu to modern pizzas, we bring Sululta's finest restaurants to your door.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-3 rounded-3xl border border-white/20 shadow-2xl"
          >
            <div className="flex-1 flex items-center px-6 gap-3 text-white group">
              <MapPin className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <Input
                placeholder="Set your delivery location in Sululta..."
                className="bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg h-12"
              />
            </div>
            <Button className="rounded-2xl px-10 py-7 text-xl font-bold h-auto shadow-lg shadow-primary/30 hover:scale-105 transition-all">
              Find Food
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black">What's on your mind?</h2>
              <p className="text-muted-foreground">Explore Sululta's favorite cuisines</p>
            </div>
            <Button variant="link" className="gap-2 text-primary font-bold">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-56 rounded-[2rem] overflow-hidden cursor-pointer shadow-xl"
              >
                <img src={cat.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" alt={cat.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl">
                      <cat.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white font-black text-xl">{cat.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-black">Top Rated in Sululta</h2>
              <p className="text-muted-foreground">Hand-picked restaurants with exceptional service</p>
            </div>
            <Link to="/restaurants" className="hidden md:block">
              <Button variant="outline" className="rounded-full px-8 font-bold border-2 hover:bg-primary hover:text-white transition-colors">
                Browse All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredRestaurants.map((res, i) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/restaurant/${res.id}`}>
                  <Card className="overflow-hidden border-none shadow-2xl hover:shadow-primary/10 transition-all group rounded-[2.5rem]">
                    <div className="relative h-56 overflow-hidden">
                      <img src={res.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={res.name} />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <Badge className="bg-white/95 text-black border-none backdrop-blur-md gap-1 font-bold px-3 py-1 shadow-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {res.rating}
                        </Badge>
                      </div>
                      <div className="absolute bottom-6 left-6">
                         <div className="flex gap-2">
                            {res.categories.map(c => <Badge key={c} variant="secondary" className="bg-black/50 text-white border-none backdrop-blur-md">{c}</Badge>)}
                         </div>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{res.name}</h3>
                        <div className="flex items-center gap-1 text-primary font-black">
                           <Clock className="h-4 w-4" />
                           <span className="text-sm">{res.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                         <span className="text-muted-foreground font-medium">Delivery Fee</span>
                         <span className="font-black text-green-600">{res.deliveryFee}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
             <Link to="/restaurants">
                <Button className="w-full rounded-2xl h-14 font-bold">Browse All Restaurants</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Driver CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-slate-950 rounded-[3.5rem] p-10 md:p-20 flex flex-col md:flex-row items-center gap-16 text-white overflow-hidden relative shadow-3xl">
            <div className="flex-1 z-10 space-y-8">
              <Badge className="bg-primary text-primary-foreground font-bold">WORK WITH US</Badge>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Ride with Sululta Eats</h2>
              <p className="text-gray-400 text-xl max-w-lg">
                Become a key part of Sululta's food scene. Flexible hours, great earnings, and a community of riders waiting for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-2xl px-10 py-7 text-lg font-black h-auto">Apply to Drive</Button>
                <Button variant="outline" size="lg" className="rounded-2xl px-10 py-7 text-lg font-black h-auto bg-transparent text-white border-white/20 hover:bg-white/10">How it works</Button>
              </div>
            </div>
            <div className="flex-1 relative z-10">
              <div className="relative">
                <div className="absolute -inset-10 bg-primary/20 rounded-full blur-3xl"></div>
                <img
                  src={IMAGES.rider}
                  className="w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-20 border-8 border-white/5"
                  alt="Delivery Rider"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 pt-20 pb-10">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              <div className="col-span-1 md:col-span-2 space-y-6">
                 <Link to="/" className="flex items-center gap-3">
                    <img src={IMAGES.logo} alt="Sululta Eats" className="h-12 w-12 rounded-2xl shadow-lg" />
                    <span className="text-3xl font-black tracking-tighter">Sululta <span className="text-primary">Eats</span></span>
                 </Link>
                 <p className="text-muted-foreground max-w-md">
                   Bringing the best flavors of Sululta directly to your door. We support local businesses and provide the fastest delivery service in the city.
                 </p>
              </div>
              <div>
                 <h4 className="font-black text-lg mb-6">Quick Links</h4>
                 <ul className="space-y-4 text-muted-foreground font-medium">
                    <li><Link to="/restaurants" className="hover:text-primary transition-colors">Restaurants</Link></li>
                    <li><Link to="/login" className="hover:text-primary transition-colors">Partner with us</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Contact Support</Link></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-black text-lg mb-6">Language</h4>
                 <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-start rounded-xl font-bold">English</Button>
                    <Button variant="ghost" className="justify-start rounded-xl font-bold opacity-60">Amharic (\u12a0\u121b\u122d\u129b)</Button>
                    <Button variant="ghost" className="justify-start rounded-xl font-bold opacity-60">Afaan Oromo</Button>
                 </div>
              </div>
           </div>
           <div className="pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
              <p>\u00a9 2024 Sululta Eats. All rights reserved. Built for Sululta city.</p>
              <div className="flex gap-8">
                 <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                 <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;