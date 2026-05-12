import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, MapPin, Plus, Minus, ShoppingCart, Heart, Info, Search, ArrowLeft, ChevronRight, Share2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';
import { IMAGES } from '../constants/images';

const restaurantData = {
  id: '1',
  name: 'Addis Flavors',
  description: 'Authentic Ethiopian cuisine crafted with love and traditional recipes passed through generations.',
  image: IMAGES.restaurant_interior,
  rating: 4.8,
  reviews: 128,
  time: '20-30 min',
  deliveryFee: 0,
  categories: ['Traditional', 'Breakfast', 'Ethiopian', 'Juice'],
  menu: [
    { id: 'm1', name: 'Special Beyaynetu', price: 250, description: 'Traditional Ethiopian platter with various meat and veggie stews served on fresh injera.', image: IMAGES.beyaynetu, isPopular: true },
    { id: 'm2', name: 'Doro Wot', price: 350, description: 'Spicy chicken stew with organic eggs, slow-cooked for 12 hours.', image: IMAGES.doro_wot, isPopular: true },
    { id: 'm3', name: 'Beef Tibs', price: 280, description: 'Saut\u00e9ed tender beef with onions, green peppers, and rosemary.', image: IMAGES.beyaynetu },
    { id: 'm4', name: 'Veggie Platter', price: 180, description: 'Assortment of protein-rich lentil, chickpea, and garden vegetable stews.', image: IMAGES.beyaynetu },
    { id: 'm5', name: 'Gourmet Burger', price: 220, description: 'Freshly ground beef patty with local spices and caramelized onions.', image: IMAGES.burger },
    { id: 'm6', name: 'Sululta Special Pizza', price: 310, description: 'Hand-stretched dough topped with local cheese and organic garden toppings.', image: IMAGES.pizza },
  ]
};

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      restaurantId: restaurantData.id,
      categoryId: '1', 
      isAvailable: true,
      description: item.description
    });
    toast.success(`Added ${item.name} to cart`, {
       icon: <ShoppingCart className="h-4 w-4" />,
       className: "rounded-2xl font-bold shadow-xl border-2 border-primary/10"
    });
  };

  const cartTotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  return (
    <div className="min-h-screen bg-muted/5 pb-20">
      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[550px] overflow-hidden">
        <img src={restaurantData.image} className="w-full h-full object-cover" alt={restaurantData.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end pb-16">
          <div className="container mx-auto px-4 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
               <Button 
                 variant="ghost" 
                 className="mb-6 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md gap-2 border border-white/20"
                 onClick={() => navigate('/restaurants')}
               >
                 <ArrowLeft className="h-4 w-4" /> Back to Restaurants
               </Button>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">{restaurantData.name}</h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-black text-lg">{restaurantData.rating}</span>
                  <span className="text-sm opacity-80 font-bold">({restaurantData.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-bold">{restaurantData.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-bold">Main Road, Sululta</span>
                </div>
                <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 rounded-2xl h-12 w-12">
                   <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 rounded-2xl h-12 w-12">
                   <Heart className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Menu Content */}
          <div className="flex-grow space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                 {['All', 'Popular', 'Traditional', 'Western', 'Drinks'].map(cat => (
                    <Badge 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2 rounded-2xl cursor-pointer font-black text-sm transition-all border-2 ${activeCategory === cat ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-muted-foreground border-transparent hover:border-primary/20 hover:bg-muted'}`}
                    >
                       {cat}
                    </Badge>
                 ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  className="w-full pl-12 pr-4 h-14 rounded-2xl bg-white border-2 border-muted focus:outline-none focus:border-primary/40 transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {restaurantData.menu.map((item) => (
                <motion.div
                   key={item.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all group rounded-[2rem] bg-white">
                    <CardContent className="p-0 flex flex-col md:flex-row h-auto md:h-48">
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                             <h3 className="font-black text-xl">{item.name}</h3>
                             {item.isPopular && <Badge className="bg-orange-100 text-orange-600 border-none text-[10px] font-black uppercase tracking-tighter">Popular</Badge>}
                          </div>
                          <p className="text-muted-foreground text-sm font-medium line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                          <span className="text-2xl font-black text-primary">{item.price} <span className="text-sm uppercase">ETB</span></span>
                          <Button 
                             size="icon" 
                             className="rounded-2xl h-12 w-12 shadow-lg shadow-primary/20 hover:scale-110 transition-transform active:scale-90"
                             onClick={() => handleAddToCart(item)}
                          >
                            <Plus className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="w-full md:w-48 h-48 overflow-hidden">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar Cart */}
          <div className="w-full lg:w-[400px]">
             <div className="sticky top-28 space-y-6">
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                   <div className="bg-slate-950 p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      <h3 className="font-black text-2xl flex items-center gap-3 relative z-10">
                        <ShoppingCart className="h-7 w-7 text-primary" />
                        My Order
                      </h3>
                      <p className="text-gray-400 text-sm font-medium mt-1 relative z-10">From {restaurantData.name}</p>
                   </div>
                   <CardContent className="p-8">
                      <AnimatePresence mode="popLayout">
                        {cart.length === 0 ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                          >
                             <div className="bg-muted/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                             </div>
                             <p className="text-muted-foreground font-black">Your bag is empty</p>
                             <p className="text-xs text-muted-foreground/60 mt-1 uppercase font-bold tracking-widest">Start adding items</p>
                          </motion.div>
                        ) : (
                          <div className="space-y-6">
                            {cart.map((item) => (
                              <motion.div 
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex justify-between items-center gap-4"
                              >
                                <div className="flex-1">
                                  <h4 className="font-black text-sm">{item.name}</h4>
                                  <p className="text-xs text-muted-foreground font-bold">{item.price} ETB x {item.quantity}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-black text-primary">{item.price * item.quantity} ETB</span>
                                </div>
                              </motion.div>
                            ))}
                            
                            <div className="pt-8 mt-8 border-t space-y-4">
                               <div className="flex justify-between font-bold text-muted-foreground">
                                 <span>Subtotal</span>
                                 <span>{cartTotal} ETB</span>
                               </div>
                               <div className="flex justify-between font-bold">
                                 <span className="text-muted-foreground">Delivery Fee</span>
                                 <span className="text-green-600">FREE</span>
                               </div>
                               <div className="flex justify-between font-black text-3xl pt-4 border-t border-dashed">
                                 <span>Total</span>
                                 <span className="text-primary">{cartTotal} ETB</span>
                               </div>
                            </div>

                            <Link to="/checkout">
                               <Button className="w-full h-16 rounded-2xl mt-8 font-black text-xl shadow-xl shadow-primary/20 gap-3 group">
                                 Checkout Now
                                 <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                               </Button>
                            </Link>
                          </div>
                        )}
                      </AnimatePresence>
                   </CardContent>
                </Card>

                <div className="bg-primary/5 p-8 rounded-[2.5rem] border-2 border-primary/10">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary p-3 rounded-2xl">
                         <ShieldCheck className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-black">Safe Delivery</h4>
                   </div>
                   <p className="text-sm text-muted-foreground font-medium">
                      Our riders follow strict hygiene protocols to ensure your food is safe and fresh.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;