"use client";

import { useState, useEffect } from "react";
import type { Products } from "@/lib/types";
import ProductCard from "./ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchProductsPaginated } from "@/lib/api";

export default function ProductFilter() {
  const [products, setProducts] = useState<Products[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset and fetch when search changes
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setPage(1);
        const { products: newProducts, hasMore: more } =
          await fetchProductsPaginated(1, 12, debouncedSearch);
        setProducts(newProducts);
        setHasMore(more);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [debouncedSearch]);

  // Fetch more products
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const { products: newProducts, hasMore: more } =
        await fetchProductsPaginated(nextPage, 12, debouncedSearch);

      setProducts((prev) => [...prev, ...newProducts]);
      setPage(nextPage);
      setHasMore(more);
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen pt-24 md:pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-24 md:pt-32 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Step Into The Void
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Handpicked favorites from our latest arrivals
          </p>

          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full px-6 py-3 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>
        </div>

        {products.length > 0 ? (
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            }
            endMessage={
              <p className="text-center text-gray-500 py-8">
                {products.length > 12 && "You've seen all products!"}
              </p>
            }
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: Products) => (
                <li key={product.id} className="flex justify-center">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              {searchTerm
                ? `No products found for "${searchTerm}"`
                : "No products available."}
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-8 text-sm text-gray-600">
            Showing {products.length} products
          </div>
        )}
      </div>
    </section>
  );
}

// "use client";

// import { useState, useMemo } from "react";
// import type { Products } from "@/lib/types";
// import ProductCard from "./ProductCard";
// import InfiniteScroll from "react-infinite-scroll-component";

// interface ProductFilterProps {
//   products: Products[];
// }

// export default function ProductFilter({ products }: ProductFilterProps) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [displayCount, setDisplayCount] = useState(12); // Show 12 products initially

//   // Filter products based on search
//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const term = searchTerm.trim().toLowerCase();
//       const nameCheck = product.name.toLowerCase().includes(term);
//       const descriptionCheck = product.description
//         ? product.description.trim().toLowerCase().includes(term)
//         : false;

//       return nameCheck || descriptionCheck;
//     });
//   }, [products, searchTerm]);

//   const displayedProducts = filteredProducts.slice(0, displayCount);
//   const hasMore = displayCount < filteredProducts.length;

//   const fetchMoreData = () => {
//     setTimeout(() => {
//       setDisplayCount((prev) => prev + 12);
//     }, 500);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setDisplayCount(12); // Reset to initial count
//   };

//   return (
//     <section className="min-h-screen pt-24 md:pt-32 pb-12 px-4 md:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12 md:mb-16">
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//             Step Into The Void
//           </h2>
//           <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
//             Handpicked favorites from our latest arrivals
//           </p>

//           {/* Search Input */}
//           <div className="max-w-md mx-auto">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search products..."
//               className="w-full px-6 py-3 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-900 transition-colors"
//             />
//           </div>
//         </div>

//         {filteredProducts.length > 0 ? (
//           <InfiniteScroll
//             dataLength={displayedProducts.length}
//             next={fetchMoreData}
//             hasMore={hasMore}
//             loader={
//               <div className="flex justify-center py-8">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//               </div>
//             }
//             endMessage={
//               <p className="text-center text-gray-500 py-8">
//                 {displayedProducts.length === filteredProducts.length &&
//                 displayedProducts.length > 12
//                   ? "You've seen all products!"
//                   : null}
//               </p>
//             }
//           >
//             <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {displayedProducts.map((product: Products) => (
//                 <li key={product.id} className="flex justify-center">
//                   <ProductCard product={product} />
//                 </li>
//               ))}
//             </ul>
//           </InfiniteScroll>
//         ) : (
//           <div className="text-center py-16">
//             <p className="text-xl text-gray-500">
//               {searchTerm
//                 ? `No products found for "${searchTerm}"`
//                 : "No products available."}
//             </p>
//           </div>
//         )}

//         {filteredProducts.length > 0 && (
//           <div className="text-center mt-8 text-sm text-gray-600">
//             Showing {displayedProducts.length} of {filteredProducts.length}{" "}
//             products
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
