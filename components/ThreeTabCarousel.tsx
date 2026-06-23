"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const TAB_PRODUCTS = {
  new: [
    {
      id: "tab-new-1",
      name: "Sovereign Bouclé Sofa",
      price: 185000,
      originalPrice: 220000,
      category: "Living",
      image: "/SOFA.jpg"
    },
    {
      id: "tab-new-2",
      name: "Nicholas Lounge Chair",
      price: 89000,
      originalPrice: 112000,
      category: "Furniture",
      image: "/prod_nicholas_lounge_chair_1777655201291.png"
    },
    {
      id: "tab-new-3",
      name: "Tapered Candle Set",
      price: 5400,
      originalPrice: 7714,
      category: "Décor",
      image: "/prod_tapered_candles_set_1777655300210.png"
    }
  ],
  ready: [
    {
      id: "tab-ready-1",
      name: "Miller Cane Three Seater",
      price: 168000,
      originalPrice: 210000,
      category: "Living",
      image: "/prod_miller_cane_sofa_1777655124777.png"
    },
    {
      id: "tab-ready-2",
      name: "Arona Rattan Chair",
      price: 28000,
      originalPrice: 45000,
      category: "Furniture",
      image: "/prod_arona_rattan_chair_1777655346032.png"
    },
    {
      id: "tab-ready-3",
      name: "Atelier Side Table",
      price: 32000,
      originalPrice: 40000,
      category: "Furniture",
      image: "/side_table_2.jpg"
    }
  ],
  trending: [
    {
      id: "tab-trend-1",
      name: "Puffer Sectional Sofa",
      price: 274400,
      originalPrice: 390000,
      category: "Living",
      image: "/prod_puffer_sectional_sofa_1777655249000.png"
    },
    {
      id: "tab-trend-2",
      name: "Organic Tea Poy Coffee Table",
      price: 45000,
      originalPrice: 58000,
      category: "Furniture",
      image: "/tea_poy_1.jpg"
    },
    {
      id: "tab-trend-3",
      name: "Orb Candle Holder",
      price: 3400,
      originalPrice: 4857,
      category: "Décor",
      image: "/prod_orb_candle_holder_1777655159473.png"
    }
  ]
};

function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function ThreeTabCarousel() {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<"new" | "ready" | "trending">("new");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWish = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentProducts = TAB_PRODUCTS[activeTab];

  return (
    <section className="bg-[#FAF8F5] py-24 lg:py-28 border-t border-sand/35 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 xl:px-24">
        
        {/* Editorial Header with Integrated Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <p className="font-sans text-[11px] tracking-widest uppercase text-[#C49A5D] font-semibold mb-3">
              Discover
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-wide">
              Shop the Edit
            </h2>
          </div>

          {/* Premium Tab Buttons */}
          <div className="flex items-center gap-6 sm:gap-8 border-b border-sand/30 pb-1 shrink-0">
            {(["new", "ready", "trending"] as const).map((tab) => {
              const labelMap = {
                new: "New Arrivals",
                ready: "Ready to Ship",
                trending: "Trending"
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[10px] tracking-[0.25em] uppercase transition-all duration-300 relative pb-2 cursor-pointer font-sans ${
                    activeTab === tab ? "text-ink font-medium" : "text-stone-400 hover:text-ink"
                  }`}
                >
                  {labelMap[tab]}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C49A5D]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Scroll on Mobile, 3-Column Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-3 gap-5 overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 -mx-4 px-4 sm:-mx-12 sm:px-12 scrollbar-none snap-x snap-mandatory scroll-pl-4 scroll-pr-8">
          {currentProducts.map((item, idx) => {
            const isWished = !!wishlist[item.id];
            const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
            const productHandle = item.name.toLowerCase().replace(/\s+/g, "-");

            return (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-[290px] sm:w-auto snap-start group flex flex-col h-full"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[3/4] overflow-hidden bg-sand/10 border border-sand/20 mb-4 sm:mb-6 group/img">
                  <a href={`/products/${productHandle}`} className="absolute inset-0 block">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 290px, (max-width: 1024px) 33vw, 25vw"
                    />
                  </a>

                  {/* Discount Badge */}
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-terracotta text-white font-sans text-[8px] tracking-wider uppercase px-1.5 py-0.5 sm:px-2 sm:py-1 font-semibold z-10 border border-white/10">
                    -{discount}%
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWish(item.id)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all duration-300 z-10 cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={11}
                      className={isWished ? "fill-terracotta text-terracotta" : "text-ink/60"}
                      strokeWidth={1.5}
                    />
                  </button>

                  {/* Quick Add Overlay Button on Hover (Desktop only) */}
                  <div className="absolute inset-x-4 bottom-4 hidden lg:flex justify-center z-10">
                    <button
                      onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })}
                      className="w-full py-3 bg-white/90 backdrop-blur-md border border-sand/30 text-ink font-sans text-[10px] tracking-[0.25em] uppercase font-bold translate-y-4 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-500 ease-out flex items-center justify-center gap-2 hover:bg-ink hover:text-white cursor-pointer"
                    >
                      Add to Bag <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Product Metadata */}
                <div className="flex-1 flex flex-col justify-between space-y-1.5 px-1">
                  <div>
                    <a 
                      href={`/categories/${item.category.toLowerCase()}`} 
                      className="font-sans text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-stone-500 mb-0.5 sm:mb-1 block hover:text-terracotta transition-colors"
                    >
                      {item.category}
                    </a>
                    <h3 className="font-display text-sm sm:text-lg font-light text-ink tracking-wide group-hover:text-[#C49A5D] transition-colors duration-300 leading-tight">
                      <a href={`/products/${productHandle}`}>
                        {item.name}
                      </a>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1 font-sans">
                    <span className="text-sm sm:text-base font-semibold text-ink">{fmt(item.price)}</span>
                    <span className="text-[10px] sm:text-xs text-stone-400 line-through font-light">
                      {fmt(item.originalPrice)}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
