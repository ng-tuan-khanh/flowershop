'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2, Lock, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'
import Layout from '../../../components/Layout'
import { cartItems as initialCartItems, recommendedProducts } from '../../../data/cart'
import { CartItem, RecommendedProduct } from '@/lib/types'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [giftBoxSelected, setGiftBoxSelected] = useState(true)
  const [couponCode, setCouponCode] = useState('')

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0
  const tax = 0
  const giftBoxFee = giftBoxSelected ? 12.99 : 0
  const total = subtotal + shipping + tax + giftBoxFee

  return (
    <Layout>
      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-12 items-start">
          {/* Cart Section */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
                <span className="text-lg text-gray-600">({cartItems.length} items)</span>
              </div>

              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 py-6 border-b border-gray-200 last:border-b-0">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 via-pink-100 to-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🌹</span>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Color:</span>
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.colorHex }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.color}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-lg font-medium text-gray-800">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-2 font-medium text-gray-800 min-w-[60px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-lg font-bold text-green-600 min-w-[80px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-96">
            <div className="bg-green-50 rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800 text-center">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                {/* Discount Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Discount Code</span>
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-xs text-orange-600">Sign in to apply discount codes</p>
                </div>

                {/* Gift Box */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={giftBoxSelected}
                      onChange={(e) => setGiftBoxSelected(e.target.checked)}
                      className="w-4 h-4 text-green-600 rounded border-gray-300"
                    />
                    <span className="text-gray-700">Gift Box & Care Instructions</span>
                  </div>
                  <span className="font-medium">${giftBoxFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
                <Lock className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
            </div>

            {/* Coupon Section */}
            <div className="mt-6">
              <div className="flex">
                <input 
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border border-gray-300 border-r-0 rounded-l px-3 py-2 text-sm"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-r text-sm font-medium hover:bg-green-700">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">You might also like</h2>
            <div className="flex items-center border border-gray-300 rounded">
              <button className="p-2 hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-8 bg-gray-300"></div>
              <button className="p-2 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-100 via-pink-100 to-yellow-100 flex items-center justify-center">
                  <span className="text-6xl">💐</span>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">${product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          {product.discount && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                              -{product.discount}%
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}