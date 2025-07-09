"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, ShoppingCart, User, Heart, Menu, Instagram, Facebook, MessageCircle } from 'lucide-react'

export default function Header() {
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false)

  const toggleCategoriesMenu = () => {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen)
  }

  return (
    <header className="bg-white">
      {/* Top Header */}
      <div className="h-20 flex justify-between items-center px-16 gap-16">
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <div className="w-20 h-20 rounded">
            <Image src="/flora.png" alt="Flora" width={500} height={500} />
          </div>
          <span className="text-black font-bold text-3xl">Flora</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded px-3 py-2 gap-3 flex-1 max-w-md">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-gray-500 text-sm">Search Flowers</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">All categories</span>
              <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 10 5">
                <path d="M0 0L5 5L10 0H0Z"/>
              </svg>
            </div>
          </div>
          <div className="w-px h-5 bg-gray-200"></div>
          <Search className="w-5 h-5 text-gray-600" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-10 justify-center">
          <span className="text-gray-600 text-sm">About us</span>
          <span className="text-gray-600 text-sm">Blog</span>
          <span className="text-gray-600 text-sm">Contact us</span>
          <span className="text-gray-600 text-sm">Care Guide</span>
        </nav>
      </div>

      {/* Secondary Header */}
      <div className="h-20 bg-green-600 flex justify-between items-center px-20 py-2 gap-7">
        {/* Categories */}
        <div className="flex items-center gap-2">
          <div 
            className="cursor-pointer hover:bg-green-700 p-3 rounded transition-colors"
            onClick={toggleCategoriesMenu}
          >
            <Menu className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-bold text-xl">Categories</span>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-white" />
            <span className="text-white text-sm">Sign in</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-white" />
            <span className="text-white text-sm">Favorites</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="text-white text-sm">Cart</span>
            </div>
            <div className="bg-orange-500 rounded-full px-2 py-0.5">
              <span className="text-white text-sm font-bold">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu Bar - Conditionally Rendered */}
      {isCategoriesMenuOpen && (
        <div className="flex justify-between items-center px-20 py-4 gap-16">
          <div className="bg-pink-500 text-white font-bold text-sm px-3 py-1 rounded">Bouquets</div>
          <span className="text-gray-600 text-sm font-bold">Plants</span>
          <span className="text-gray-600 text-sm font-bold">Wedding Flowers</span>
          <span className="text-gray-600 text-sm font-bold">Seasonal</span>
          <span className="text-gray-600 text-sm font-bold">Gifts</span>
          <span className="text-gray-600 text-sm font-bold">Arrangements</span>
          <span className="text-gray-600 text-sm font-bold">Occasions</span>
          <span className="text-gray-600 text-sm font-bold">Garden</span>
          <span className="text-gray-600 text-sm font-bold">Accessories</span>
          <span className="text-gray-600 text-sm font-bold">Best Sellers</span>
        </div>
      )}
    </header>
  )
} 