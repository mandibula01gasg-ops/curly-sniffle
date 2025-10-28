import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Flame, Zap, TrendingUp } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  hasPromo?: boolean;
  promoText?: string;
}

export function ProductCard({ product, onAddToCart, hasPromo = false, promoText = "APENAS HOJE 60%" }: ProductCardProps) {
  const originalPrice = parseFloat(product.price);
  const discountedPrice = hasPromo ? originalPrice * 0.6 : originalPrice;
  const discountPercent = hasPromo ? 40 : 0;
  const rating = 4.8;
  
  return (
    <Card className={`group overflow-hidden rounded-3xl border-4 ${hasPromo ? 'border-gradient-animated' : 'border-purple-200'} hover:border-purple-400 transition-all hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/30 shadow-xl relative ${hasPromo ? 'animate-float' : ''}`} data-testid={`card-product-${product.id}`}>
      {/* Brilho animado de fundo */}
      {hasPromo && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 via-orange-200/30 to-red-200/30 animate-gradient-shift opacity-70 rounded-3xl" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-shimmer" />
        </>
      )}
      
      <CardContent className="p-0 relative z-10">
        {/* Badge de promoção super chamativo */}
        {hasPromo && (
          <div className="absolute top-3 left-3 z-20">
            <Badge className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white px-5 py-2 text-sm font-black rounded-full animate-pulse-glow shadow-2xl flex items-center gap-2 border-3 border-yellow-300 animate-bounce-smooth">
              <Flame className="h-5 w-5 animate-flame" />
              <span className="animate-text-glow">{promoText}</span>
              <Zap className="h-5 w-5 animate-zap" />
            </Badge>
          </div>
        )}

        {/* Badge de desconto no canto superior direito */}
        {hasPromo && (
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white px-4 py-3 rounded-2xl font-black text-xl shadow-2xl animate-rotate-pulse border-4 border-white">
              <div className="text-center">
                <div className="text-2xl leading-none">-{discountPercent}%</div>
                <div className="text-xs">OFF</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-100 to-white relative rounded-t-3xl">
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-700 ${hasPromo ? 'group-hover:scale-125 animate-subtle-zoom' : 'group-hover:scale-110'}`}
          />
          {hasPromo && (
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-500/20 animate-gradient-shift" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-black text-gray-900 leading-tight" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400 animate-twinkle' : 'fill-gray-200 text-gray-200'}`} style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
            <span className="text-sm text-gray-700 ml-2 font-bold">{rating}</span>
          </div>
          
          <div className="pt-2 space-y-3">
            {hasPromo && (
              <div className="flex items-center gap-2 animate-slide-right">
                <span className="text-lg text-gray-500 line-through font-semibold">
                  R$ {originalPrice.toFixed(2).replace('.', ',')}
                </span>
                <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-black px-3 py-1 rounded-full animate-bounce-smooth shadow-lg">
                  -{discountPercent}% OFF
                </Badge>
              </div>
            )}
            
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-600 font-medium">por apenas</span>
            </div>
            
            <div className={`rounded-2xl p-4 border-3 ${hasPromo ? 'bg-gradient-to-br from-green-400 via-emerald-400 to-green-500 animate-gradient-shift border-yellow-300 animate-pulse-border' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'}`}>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-black ${hasPromo ? 'text-white drop-shadow-lg animate-price-pop' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600'}`} data-testid={`text-price-${product.id}`}>
                  R$ {discountedPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
            
            {hasPromo && (
              <div className="flex items-center justify-center gap-2 text-base bg-gradient-to-r from-orange-100 via-yellow-100 to-orange-100 rounded-2xl py-3 px-4 border-2 border-orange-300 animate-gradient-shift shadow-lg">
                <TrendingUp className="h-5 w-5 text-orange-600 animate-bounce-smooth" />
                <span className="text-orange-700 font-black animate-text-pulse">
                  🔥 OFERTA RELÂMPAGO!
                </span>
                <Flame className="h-5 w-5 text-orange-600 animate-flame" />
              </div>
            )}
            
            <Button
              size="lg"
              onClick={() => onAddToCart(product)}
              className={`w-full font-black rounded-2xl py-7 mt-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg ${
                hasPromo 
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-600 hover:via-red-600 hover:to-orange-600 text-white animate-gradient-shift animate-button-pulse' 
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
              }`}
              data-testid={`button-add-${product.id}`}
            >
              {hasPromo ? '⚡ APROVEITAR OFERTA!' : '🛒 Adicionar ao Carrinho'}
            </Button>
          </div>
        </div>
      </CardContent>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 100, 0, 0.6), 0 0 40px rgba(255, 100, 0, 0.4);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(255, 150, 0, 0.8), 0 0 60px rgba(255, 150, 0, 0.6);
            transform: scale(1.05);
          }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.03); }
        }
        @keyframes flame {
          0%, 100% { transform: rotate(-5deg) scale(1); }
          25% { transform: rotate(5deg) scale(1.1); }
          50% { transform: rotate(-5deg) scale(1); }
          75% { transform: rotate(5deg) scale(0.95); }
        }
        @keyframes zap {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 1; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 0.7; }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 1); }
        }
        @keyframes rotate-pulse {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-5deg) scale(1.05); }
          75% { transform: rotate(5deg) scale(1.05); }
        }
        @keyframes subtle-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes slide-right {
          0% { transform: translateX(-10px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgb(253 224 71); }
          50% { border-color: rgb(251 191 36); }
        }
        @keyframes price-pop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes text-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes button-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-bounce-smooth {
          animation: bounce-smooth 2s ease-in-out infinite;
        }
        .animate-flame {
          animation: flame 1s ease-in-out infinite;
        }
        .animate-zap {
          animation: zap 2s ease-in-out infinite;
        }
        .animate-text-glow {
          animation: text-glow 1.5s ease-in-out infinite;
        }
        .animate-rotate-pulse {
          animation: rotate-pulse 3s ease-in-out infinite;
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 4s ease-in-out infinite;
        }
        .animate-slide-right {
          animation: slide-right 0.5s ease-out;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        .animate-price-pop {
          animation: price-pop 1.5s ease-in-out infinite;
        }
        .animate-text-pulse {
          animation: text-pulse 1.5s ease-in-out infinite;
        }
        .animate-button-pulse {
          animation: button-pulse 2s ease-in-out infinite;
        }
        .border-gradient-animated {
          border-image: linear-gradient(45deg, #fbbf24, #f59e0b, #ef4444, #f59e0b, #fbbf24) 1;
        }
      `}</style>
    </Card>
  );
}
