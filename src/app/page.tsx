import React from 'react'
import { ShoppingCart, Star, ArrowRight, Calendar, Truck } from 'lucide-react'
import Layout from '../components/Layout'
import { flashSaleProducts, trendingProducts, popularProducts } from '../data/landing-page'
import { FlashSaleProduct, TrendingProduct, PopularProduct } from '@/lib/types'

function LandingPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="flex items-end">
        <div className="w-[547px] h-[312px] bg-gradient-to-br from-green-200 via-green-300 to-pink-200 flex items-center justify-center">
          <span className="text-6xl">🌺</span>
        </div>
        <div className="bg-pink-500 flex-1 h-[312px] flex flex-col justify-center items-center gap-8 text-white relative">
          <h1 className="text-3xl font-bold uppercase text-center">SPRING BOUQUET COLLECTION</h1>
          <p className="text-2xl font-medium text-center">Fresh seasonal arrangements From $24.99</p>
          <button className="bg-pink-600 text-white px-8 py-4 rounded flex items-center gap-2 font-medium uppercase hover:bg-pink-700">
            <ShoppingCart className="w-6 h-6" />
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Flash Sales Section */}
      <section className="px-20 pt-20 pb-0">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-medium text-black">Fresh Daily Specials</h2>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600">View all</span>
            <ArrowRight className="w-4 h-4 text-gray-700" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {flashSaleProducts.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Deal Header */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-bold">Fresh Today</span>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-600 font-bold text-lg">8</span>
                      <div className="w-0.5 h-3 bg-gray-400"></div>
                      <span className="text-gray-600 font-bold text-lg">32</span>
                      <div className="w-0.5 h-3 bg-gray-400"></div>
                      <span className="text-gray-600 font-bold text-lg">45</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>hour</span>
                  <span>min</span>
                  <span>sec</span>
                </div>
              </div>

              {/* Product Image */}
              <div className="h-40 bg-gradient-to-br from-green-100 via-pink-100 to-yellow-100 flex items-center justify-center">
                <span className="text-6xl">{item.emoji}</span>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-bold text-gray-600 mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{item.type}</p>
                
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">(94)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-bold">${item.price}</span>
                  <span className="text-gray-500 text-sm line-through">${item.originalPrice}</span>
                  <div className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                    - 30%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Collections Section */}
      <section className="px-20 py-12">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-medium text-black">Trending Collections</h2>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600">View all</span>
            <ArrowRight className="w-4 h-4 text-gray-700" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {trendingProducts.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-green-200 via-pink-200 to-yellow-200 relative flex items-center justify-center">
                <span className="text-8xl">{item.emoji}</span>
                {item.newTag && (
                  <div className="absolute top-2.5 left-2.5">
                    <div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                      <span>🌟</span>
                      <span>New Collection</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-green-600 p-5 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <p className="text-gray-200 text-sm opacity-85">{item.subtitle}</p>
                </div>
                <div className="border border-gray-300 rounded-lg px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{item.price}</span>
                    <span className="text-white font-bold text-sm">Shop Now</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Flowers Section */}
      <section className="px-20 pb-12">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-medium text-black">Popular Flowers</h2>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600">View all</span>
            <ArrowRight className="w-4 h-4 text-gray-700" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {popularProducts.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-green-100 to-pink-100 flex items-center justify-center">
                <span className="text-6xl">{item.emoji}</span>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-xs text-gray-600">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className={`w-6 h-6 ${star <= item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({item.reviews})</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-red-500 font-bold">${item.price}</span>
                  <span className="text-gray-400 text-sm">${item.originalPrice}</span>
                  <span className="text-red-500 text-xs">-{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="px-20 pb-12">
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="flex rounded-lg overflow-hidden">
            <div className="bg-purple-600 text-white p-16 flex flex-col gap-8 flex-1">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-4xl font-bold text-center">Wedding Season Collection</h3>
                <p className="text-3xl text-center">Bridal bouquets & ceremony flowers</p>
              </div>
              <span className="text-xl">Explore all arrangements</span>
            </div>
            <div className="w-1/2 bg-gradient-to-br from-purple-200 to-pink-300 flex items-center justify-center">
              <span className="text-8xl">💐</span>
            </div>
          </div>

          <div className="flex rounded-lg overflow-hidden">
            <div className="bg-orange-600 text-white p-16 flex flex-col gap-8 flex-1">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-4xl font-bold text-center">Garden Plants & Herbs</h3>
                <p className="text-3xl text-center">Indoor & outdoor plants</p>
              </div>
              <span className="text-xl">Explore all plants</span>
            </div>
            <div className="w-1/2 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
              <span className="text-8xl">🪴</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-green-100 px-20 py-12">
        <div className="flex items-center gap-16">
          <button className="w-8 h-8 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 6L8 9.5 4.5 6 8 2.5 11.5 6z"/>
            </svg>
          </button>

          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-green-600 text-2xl font-bold tracking-wider uppercase">Same Day Delivery</h2>
            <p className="text-gray-600 text-xl font-medium">Order before 2 PM for same-day delivery. Fresh flowers guaranteed.</p>
          </div>

          <div className="w-80 h-56 bg-gradient-to-br from-green-200 to-yellow-200 rounded flex items-center justify-center">
            <Truck className="w-24 h-24 text-green-600" />
          </div>

          <button className="w-8 h-8 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </section>

      {/* Additional Category Cards */}
      <section className="px-20 py-12">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex rounded-lg overflow-hidden">
            <div className="bg-pink-400 text-white p-16 flex flex-col gap-8 flex-1">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-4xl font-bold text-center">Mother's Day Special</h3>
                <p className="text-3xl text-center">Show your love with flowers</p>
              </div>
              <span className="text-xl">Explore gift sets</span>
            </div>
            <div className="w-1/2 bg-gradient-to-br from-pink-200 to-red-300 flex items-center justify-center">
              <span className="text-8xl">🌹</span>
            </div>
          </div>

          <div className="flex rounded-lg overflow-hidden">
            <div className="bg-teal-500 text-white p-16 flex flex-col gap-8 flex-1">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-4xl font-bold text-center">Seasonal Favorites</h3>
                <p className="text-3xl text-center">Fresh spring blooms</p>
              </div>
              <span className="text-xl">Explore seasonal collection</span>
            </div>
            <div className="w-1/2 bg-gradient-to-br from-teal-200 to-blue-300 flex items-center justify-center">
              <span className="text-8xl">🌺</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default LandingPage