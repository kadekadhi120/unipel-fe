import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="product-card bg-zinc-900 border border-zinc-800 rounded-xl p-3 cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-800">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-sm font-semibold truncate text-white">{product.name}</h4>
      <p className="text-red-500 font-bold text-xs mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
    </div>
  );
}