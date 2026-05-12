import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, MapPin, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants/images';

const restaurants = [
  { id: '1', name: 'Addis Flavors', rating: 4.8, reviews: 124, time: '20-30 min', image: IMAGES.restaurant_interior, categories: ['Traditional', 'Breakfast'], fee: 0 },
  { id: '2', name: 'Sululta Pizza Hub', rating: 4.5, reviews: 89, time: '30-45 min', image: IMAGES.pizza, categories: ['Pizza', 'Italian'], fee: 25 },
  { id: '3', name: 'Burger Queen', rating: 4.2, reviews: 210, time: '25-40 min', image: IMAGES.burger, categories: ['Burgers', 'Fast Food'], fee: 15 },
  { id: '4', name: 'Green Garden Healthy', rating: 4.9, reviews: 56, time: '15-25 min', image: IMAGES.beyaynetu, categories: ['Salads', 'Healthy'], fee: 0 },
  { id: '5', name: 'Sweets & Treats', rating: 4.7, reviews: 142, time: '10-20 min', image: IMAGES.coffee, categories: ['Desserts', 'Coffee'], fee: 10 },
  { id: '6', name: 'Habesha Kitchen', rating: 4.6, reviews: 320, time: '35-50 min', image: IMAGES.doro_wot, categories: ['Traditional', 'Injera'], fee: 20 },
];

const Restaurants = () => {
  return (
    <div className="bg-muted/10 min-h-screen pb-20">
      <div className="bg-primary py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Find your flavor in <span className="underline decoration-yellow-400">Sululta</span></h1>
           <p className="text-primary-foreground/80 text-lg max-w-2xl font-medium">Discover local favorites, from street food gems to high-end dining experiences.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden p-3">
           <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                 <Search className="absolute left-4 top-4 h-6 w-6 text-muted-foreground" />
                 <Input 
                   placeholder="Search for restaurants, cuisines or dishes..."
                   className="h-14 pl-14 text-lg rounded-2xl border-none bg-muted/50 focus-visible:ring-primary/20"
                 />
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" className="h-14 rounded-2xl px-6 gap-2 border-2 font-bold">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                 </Button>
                 <Button variant="outline" className="h-14 rounded-2xl px-6 gap-2 border-2 font-bold">
                    <ArrowUpDown className="h-5 w-5" />
                    Sort
                 </Button>
              </div>
           </div>
        </Card>

        <div className="flex flex-wrap gap-2 mt-10 mb-8">
           {['All', 'Traditional', 'Fast Food', 'Pizza', 'Coffee', 'Desserts', 'Healthy', 'Breakfast'].map(cat => (
              <Badge 
                key={cat} 
                variant={cat === 'All' ? 'default' : 'secondary'} 
                className={`px-6 py-2 rounded-full cursor-pointer transition-all font-bold text-sm ${cat === 'All' ? 'shadow-lg shadow-primary/20' : 'hover:bg-muted'}`}
              >
                {cat}
              </Badge>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {restaurants.map((res, index) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/restaurant/${res.id}`}>
                <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all group rounded-[2.5rem]">
                  <div className="relative h-60">
                    <img src={res.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={res.name} />
                    <div className="absolute top-5 right-5">
                      <div className="bg-white/95 text-black px-3 py-1 rounded-2xl backdrop-blur-md flex items-center gap-1 font-black text-sm shadow-xl">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {res.rating}
                        <span className="text-xs text-muted-foreground font-bold">({res.reviews})</span>
                      </div>
                    </div>
                    <div className="absolute bottom-5 left-5">
                       <div className="flex gap-2">
                          {res.categories.map(c => <Badge key={c} variant="secondary" className="bg-black/40 text-white border-none backdrop-blur-md">{c}</Badge>)}
                       </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-black group-hover:text-primary transition-colors truncate">{res.name}</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-none font-bold">
                        {res.fee === 0 ? 'Free' : `${res.fee} ETB`}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground font-bold text-sm mb-6 pb-6 border-b">
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {res.time}</span>
                      <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 1.2 km</span>
                    </div>
                    <Button className="w-full h-14 rounded-2xl text-lg font-black bg-muted text-foreground hover:bg-primary hover:text-white border-none shadow-none group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                      View Menu
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;