import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Check, Info, ArrowRight, Trash2, X, Plus, Minus } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ShopSectionProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateCartQty: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

export default function ShopSection({
  products,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQty,
  onClearCart
}: ShopSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'low-high' | 'high-low'>('default');
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Checkout Simulation State
  const [checkingOut, setCheckingOut] = useState(false);
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [simulatedReceiptId, setSimulatedReceiptId] = useState('');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'desktops', label: 'Desktop Computers' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'printers', label: 'Printers' },
    { id: 'cctv', label: 'CCTV Systems' },
    { id: 'networking', label: 'Networking Equipment' },
    { id: 'routers', label: 'Routers & Switches' },
    { id: 'storage', label: 'Storage Devices' },
    { id: 'accessories', label: 'Computer Accessories' },
    { id: 'office', label: 'Office ICT' }
  ];

  // Filters and Searching Logic
  const filteredProducts = products
    .filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'low-high') return a.price - b.price;
      if (sortOrder === 'high-low') return b.price - a.price;
      return 0; // Default: database order
    });

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const triggerCheckout = () => {
    setCheckoutStep('details');
    setCheckingOut(true);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryName || !deliveryEmail || !deliveryAddress || !deliveryPhone) {
      alert('Please fill out all required details.');
      return;
    }

    const itemsSummary = cart.map(item => `${item.product.name} (x${item.quantity})`).join(', ');
    const randomReceipt = 'VISTA-' + Math.floor(100000 + Math.random() * 900000);

    try {
      // Submit order as an inquiry
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: deliveryName,
          email: deliveryEmail,
          phone: deliveryPhone,
          message: `SIMULATED E-COMMERCE ORDER ${randomReceipt}. Total: $${cartTotal}. Items ordered: ${itemsSummary}. Deliver to: ${deliveryAddress}`
        })
      });

      if (response.ok) {
        setSimulatedReceiptId(randomReceipt);
        setCheckoutStep('success');
        onClearCart();
      } else {
        alert('Failed to place order.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div id="shop-section" className="space-y-12 pb-20 text-left">
      
      {/* Title Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(10,88,202,0.12),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">VISTA showroom catalog</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5 font-display">ICT Hardware & Electronics</h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3 font-sans">Source official commercial-grade computing, networking routing hardware, and UltraHD surveillance camera packs. All items carry extensive warranties.</p>
        </div>
      </section>

      {/* Grid containing shop and cart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Filters and Products */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search and Sort controls */}
            <div className="bg-white p-4 rounded-xl border border-slate-150 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search laptops, computers, switches..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>

              <div className="flex space-x-3 w-full md:w-auto shrink-0 justify-end">
                <div className="flex items-center space-x-1">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500 font-semibold">Sort:</span>
                </div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg text-slate-700 focus:outline-none focus:bg-white"
                >
                  <option value="default">Default Order</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Horizontal Categories Row */}
            <div className="flex flex-wrap gap-1.5 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-150 rounded-2xl p-12 text-center text-slate-450 max-w-sm mx-auto">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-800">No products found</p>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or typing another keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    id={`product-card-${product.id}`}
                    className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setViewingProduct(product)}>
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transform hover:scale-104 transition-all duration-300" />
                        <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 text-[8px] font-bold uppercase rounded tracking-wider shadow ${
                          product.stockStatus === 'In Stock' ? 'bg-emerald-500 text-white' :
                          product.stockStatus === 'Low Stock' ? 'bg-amber-500 text-white animate-pulse' :
                          'bg-red-500 text-white'
                        }`}>
                          {product.stockStatus}
                        </span>
                      </div>

                      {/* Content details */}
                      <div className="p-4 space-y-2.5 text-left">
                        <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider block">{product.category}</span>
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-1 cursor-pointer hover:text-blue-600" onClick={() => setViewingProduct(product)}>
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                        <p className="text-lg font-black text-slate-900">${product.price}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex gap-2">
                      <button
                        onClick={() => setViewingProduct(product)}
                        className="px-2 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors border border-slate-150 cursor-pointer"
                        title="View Specifications"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        disabled={product.stockStatus === 'Out of Stock'}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                          product.stockStatus === 'Out of Stock'
                            ? 'bg-slate-100 text-slate-400 border border-slate-150 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Shopping Cart Side Panel */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-slate-700" />
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">Shopping Bag</h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)} Items
              </span>
            </div>

            {/* Cart list */}
            {cart.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <ShoppingCart className="w-8 h-8 mx-auto text-slate-200 mb-2" />
                <p className="text-xs font-semibold">Your cart is empty</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Explore Laptops or PC accessories above and add items to begin checkout.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-start border-b border-slate-50 pb-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg border border-slate-100 shrink-0" />
                    
                    <div className="flex-1 text-left space-y-1">
                      <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{item.product.name}</h5>
                      <p className="text-xs font-black text-slate-600">${item.product.price} <span className="text-[10px] text-slate-400 font-normal">ea</span></p>
                      
                      {/* Quantity Selector controls */}
                      <div className="flex items-center space-x-2.5 pt-1">
                        <div className="flex items-center border border-slate-200 rounded">
                          <button
                            onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-50 text-slate-500 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-50 text-slate-500 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}

                {/* Clear Cart trigger */}
                <button
                  onClick={onClearCart}
                  className="text-slate-400 hover:text-red-500 text-[10px] font-bold tracking-wider uppercase block text-left"
                >
                  Clear all items
                </button>
              </div>
            )}

            {/* Total calculation panel */}
            {cart.length > 0 && (
              <div className="space-y-3.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frictionless Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-extrabold text-slate-950">
                  <span>Total Amount</span>
                  <span>${cartTotal}</span>
                </div>

                <button
                  onClick={triggerCheckout}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-1 shadow-md shadow-blue-600/10 cursor-pointer"
                >
                  <span>Prepare Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* PRODUCT SPECIFICATIONS MODAL */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-150 overflow-hidden shadow-2xl relative text-left flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setViewingProduct(null)}
              className="absolute top-3 right-3 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Product Image Panel */}
            <div className="md:w-1/2 relative bg-slate-50">
              <img src={viewingProduct.image} alt={viewingProduct.name} className="w-full h-full object-cover aspect-video md:aspect-square" />
              <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {viewingProduct.category}
              </span>
            </div>

            {/* Product Info Panel */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-950 leading-tight">{viewingProduct.name}</h3>
                  <p className="text-xl font-black text-blue-600 mt-1.5">${viewingProduct.price}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Description</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{viewingProduct.description}</p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Key Specifications</p>
                  <ul className="space-y-1">
                    {viewingProduct.specifications.map((spec, i) => (
                      <li key={i} className="flex items-center text-[11px] text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-500 mr-2" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  onAddToCart(viewingProduct);
                  setViewingProduct(null);
                }}
                disabled={viewingProduct.stockStatus === 'Out of Stock'}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold rounded-xl text-xs tracking-wider transition-all cursor-pointer"
              >
                {viewingProduct.stockStatus === 'Out of Stock' ? 'Item Out of Stock' : 'Add to Shopping Cart'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CHECKOUT SIMULATION DIALOG */}
      {checkingOut && (
        <div id="checkout-simulation-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-150 overflow-hidden shadow-2xl text-left flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-slate-950 p-6 text-white flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400">Frictionless Ordering</span>
                <h3 className="text-lg font-bold tracking-tight text-white mt-0.5">VISTA Instant Purchase</h3>
              </div>
              <button
                onClick={() => setCheckingOut(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps Rendering */}
            {checkoutStep === 'details' ? (
              <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                <div className="bg-blue-50/50 p-3.5 rounded-lg border border-blue-100 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Notice:</strong> This is a frictionless simulated checkout. No credit card details are collected. Placing this order submits a priority sales ticket to our admin dashboard. Our local Addis Ababa ICT technician will contact you to organize payment on delivery.
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={deliveryName}
                      onChange={(e) => setDeliveryName(e.target.value)}
                      placeholder="e.g. David Wright"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={deliveryEmail}
                        onChange={(e) => setDeliveryEmail(e.target.value)}
                        placeholder="david.w@gmail.com"
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={deliveryPhone}
                        onChange={(e) => setDeliveryPhone(e.target.value)}
                        placeholder="+251 911 234 567"
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Physical Delivery Address *</label>
                    <textarea
                      required
                      rows={3}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. Bole Subcity, Kebele 03, Addis Ababa, Ethiopia"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submitting Actions */}
                <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100 mt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="px-4 py-2.5 border border-slate-250 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Confirm & Place Order (${cartTotal})
                  </button>
                </div>
              </form>
            ) : (
              // SUCCESS SCREEN
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                  ✓
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-display">Receipt Generated!</h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Reference: {simulatedReceiptId}</p>
                </div>
                
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Success! Your priority purchase ticket has been generated and dispatched to the VISTA administration portal. David Kalu will contact you at <strong className="text-slate-950">{deliveryPhone}</strong> shortly to finalize physical dispatch.
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-left max-w-sm mx-auto space-y-1 text-xs">
                  <p className="font-bold text-slate-900">Delivery Details:</p>
                  <p className="text-slate-600">Client: {deliveryName}</p>
                  <p className="text-slate-600">Address: {deliveryAddress}</p>
                </div>

                <button
                  onClick={() => setCheckingOut(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold rounded-lg transition-all"
                >
                  Return to Showroom
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
