"use client"

import React, { useState } from 'react'
import { Star, Heart, Filter, Search, ChevronDown } from 'lucide-react'
import Layout from '../../../../components/Layout'
import { products, arrangementTypes, occasions, colorFilters, defaultSelectedFilters } from '../../../../data/product-listings'
import { Product, SelectedFilters } from '@/lib/types'

// Component prop types
interface ProductCardProps {
  product: Product
}

const ProductListingsPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(defaultSelectedFilters)

  // Using imported products data

  const Breadcrumb = () => (
    <div className="px-24 py-6 bg-white">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Homepage</span>
        <ChevronDown className="w-4 h-4 text-gray-800 rotate-[-90deg]" />
        <span className="text-gray-600">Flowers</span>
        <ChevronDown className="w-4 h-4 text-gray-800 rotate-[-90deg]" />
        <span className="text-gray-600">Bouquets</span>
      </div>
    </div>
  )

  const PageHeader = () => (
    <div className="bg-green-50 px-24 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-gray-800">Fresh Flowers</h1>
          <span className="text-gray-600">89 items</span>
        </div>
        <div className="flex items-center gap-2 border border-gray-400 rounded px-3 py-2">
          <span className="text-sm font-medium text-gray-700">Sort by popularity</span>
          <ChevronDown className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  )

  const FilterSidebar = () => (
    <div className="w-80 bg-white p-9 space-y-8">
      {/* All Categories */}
      <div className="bg-white rounded-lg p-4 border">
        <div className="flex items-center gap-4">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="font-bold text-gray-800">All Categories</span>
        </div>
      </div>

      {/* Flower Type */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm uppercase tracking-wider text-gray-800">FLOWER TYPE</span>
          <ChevronDown className="w-3 h-3 text-gray-600" />
        </div>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
          <input
            type="text"
            placeholder="Search flowers"
            className="flex-1 outline-none text-sm"
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Arrangement Style */}
      <div className="space-y-6">
        <div className="border-t border-gray-300"></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wider text-gray-800">ARRANGEMENT</span>
            <ChevronDown className="w-3 h-3 text-gray-600" />
          </div>
          <div className="space-y-5">
            {arrangementTypes.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-xs text-gray-400">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Occasion */}
      <div className="space-y-6">
        <div className="border-t border-gray-300"></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wider text-gray-800">OCCASION</span>
            <ChevronDown className="w-3 h-3 text-gray-600" />
          </div>
          <div className="space-y-4">
            {occasions.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {}}
                  className="w-4 h-4 text-green-600 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color */}
      <div className="space-y-6">
        <div className="border-t border-gray-300"></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wider text-gray-800">COLOR</span>
            <ChevronDown className="w-3 h-3 text-gray-600" />
          </div>
          <div className="grid grid-cols-7 gap-2">
            {colorFilters.map((item, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full cursor-pointer ${item.color} ${
                  item.selected ? 'ring-2 ring-gray-800' : ''
                }`}
                title={item.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="space-y-6">
        <div className="border-t border-gray-300"></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wider text-gray-800">SIZE</span>
            <ChevronDown className="w-3 h-3 text-gray-600" />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {['Mini', 'Small', 'Medium', 'Large'].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 text-sm font-bold border rounded ${
                    size === 'Medium' ? 'bg-green-100 border-green-300' : 'bg-white border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {['Premium', 'Deluxe', 'Giant'].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 text-sm font-bold border rounded ${
                    size === 'Premium' ? 'bg-green-100 border-green-300' : 'bg-white border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-6">
        <div className="border-t border-gray-300"></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wider text-gray-800">PRICE</span>
            <ChevronDown className="w-3 h-3 text-gray-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value="$ 25"
                className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
              />
              <div className="w-4 h-0.5 bg-gray-600"></div>
              <input
                type="text"
                value="$ 150"
                className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="w-full h-1 bg-gray-300 rounded">
                <div className="w-2/3 h-full bg-green-600 rounded"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Minimum $25</span>
                <span>Maximum $150</span>
              </div>
              <div className="text-sm text-gray-700">89 products found</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ProductCard = ({ product }: ProductCardProps) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <div className="w-full h-80 bg-gradient-to-br from-green-100 via-pink-100 to-yellow-100 flex items-center justify-center">
          <span className="text-8xl">{product.emoji}</span>
        </div>
        <button className="absolute top-4 right-4">
          <Heart
            className={`w-5 h-5 ${
              product.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-xs text-gray-800">{product.brand}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{product.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (product.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-green-600">${product.price}</span>
          <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          <span className="text-xs text-green-600">{product.discount}</span>
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <Breadcrumb />
      <PageHeader />
      
      <div className="flex">
        <FilterSidebar />
        <main className="flex-1 bg-white p-20">
          <div className="grid grid-cols-3 gap-5 max-w-6xl">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default ProductListingsPage