'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Minus, Plus, ChevronLeft, ChevronRight, Calendar, Truck, AlertCircle, CheckCircle, Package, Gift } from 'lucide-react'
import Layout from '../../../../components/Layout'
import { bouquetSizes, flowerTypes, deliveryZones, relatedProducts } from '../../../../data/product-details'
import { BouquetSize, FlowerType, DeliveryZone, RelatedProduct } from '@/lib/types'

export default function ProductDetailsPage() {
  const [selectedSize, setSelectedSize] = useState('Medium')
  const [selectedType, setSelectedType] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [carePackage, setCarePackage] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const [isSeasonalAvailable, setIsSeasonalAvailable] = useState(true)
  const [deliveryZone, setDeliveryZone] = useState('local')

  // Using imported data instead of inline definitions
  const sizes = bouquetSizes
  const flowerTypesData = flowerTypes
  const deliveryZonesData = deliveryZones

  // Set default delivery date to tomorrow
  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setDeliveryDate(tomorrow.toISOString().split('T')[0])
  }, [])

  // Calculate base price based on selected size
  const getBasePrice = () => {
    const sizeData = sizes.find(s => s.name === selectedSize)
    return sizeData ? sizeData.basePrice : 65.99
  }

  // Calculate total price with all options
  const getTotalPrice = () => {
    let total = getBasePrice() * quantity
    
    // Add seasonal upcharge
    const selectedFlower = flowerTypesData[selectedType]
    if (selectedFlower.seasonalUpcharge > 0) {
      total += selectedFlower.seasonalUpcharge * quantity
    }
    
    // Add care package
    if (carePackage) total += 12
    
    // Add gift wrap
    if (giftWrap) total += 8
    
    // Add delivery fee
    const zone = deliveryZonesData.find(z => z.value === deliveryZone)
    if (zone) total += zone.fee
    
    return total
  }

  // Check if same-day delivery is available
  const isSameDayAvailable = () => {
    const today = new Date().toISOString().split('T')[0]
    const currentTime = new Date().toTimeString().slice(0, 5)
    const zone = deliveryZonesData.find(z => z.value === deliveryZone)
    
    if (deliveryDate === today && zone) {
      return currentTime < zone.cutoffTime
    }
    return false
  }

  // Get delivery time estimate
  const getDeliveryEstimate = () => {
    const selectedDate = new Date(deliveryDate)
    const today = new Date()
    const diffTime = selectedDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0 && isSameDayAvailable()) {
      return "Same-day delivery (by 6 PM)"
    } else if (diffDays === 1) {
      return "Next-day delivery"
    } else {
      return `Delivery in ${diffDays} days`
    }
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const getSizeData = () => {
    return sizes.find(s => s.name === selectedSize)
  }

  const productImages = [
    '/images/bouquet-1.jpg',
    '/images/bouquet-2.jpg', 
    '/images/bouquet-3.jpg',
    '/images/bouquet-4.jpg',
    '/images/bouquet-5.jpg'
  ]

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Homepage</span>
            <ChevronRight className="w-4 h-4" />
            <span>Bouquets</span>
            <ChevronRight className="w-4 h-4" />
            <span>Rose Collection</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Premium Rose Bouquet</span>
          </div>
        </div>
      </nav>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnail Images */}
            <div className="flex flex-col gap-4">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`w-32 h-36 bg-gradient-to-br from-pink-200 to-red-300 rounded-lg cursor-pointer border-2 ${
                    selectedImageIndex === index ? 'border-gray-400' : 'border-transparent'
                  } flex items-center justify-center`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <span className="text-4xl">🌹</span>
                </div>
              ))}
            </div>

            {/* Main Product Image */}
            <div className="flex-1">
              <div className="w-full h-[600px] bg-gradient-to-br from-pink-200 to-red-400 rounded-lg flex items-center justify-center">
                <span className="text-8xl">💐</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">PREMIUM ROSE BOUQUET</h1>
                <p className="text-xl font-medium text-gray-900">${getBasePrice()}</p>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Truck className="w-4 h-4" />
                  <span>{getDeliveryEstimate()}</span>
                </div>
                {!isSeasonalAvailable && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Limited seasonal availability</span>
                  </div>
                )}
              </div>
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                <Heart className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Bouquet Size Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-900">Bouquet Size</h3>
                <button className="text-sm text-green-500 hover:text-green-600">Size guide</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`p-3 border rounded text-sm font-medium text-center ${
                      selectedSize === size.name
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-bold">{size.name}</div>
                    <div className="text-xs text-gray-500">{size.stems} stems</div>
                    <div className="text-xs font-medium">${size.basePrice}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flower Type Selector */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900">Flower Type</h3>
                          <div className="grid grid-cols-2 gap-3">
              {flowerTypesData.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedType(index)}
                    disabled={!type.available}
                    className={`px-4 py-3 border rounded text-sm font-medium flex items-center justify-between ${
                      selectedType === index ? 'border-gray-800 bg-gray-50' : 'border-gray-300'
                    } ${!type.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span>{type.name}</span>
                    {type.seasonalUpcharge > 0 && (
                      <span className="text-xs text-orange-600">+${type.seasonalUpcharge}</span>
                    )}
                    {!type.available && (
                      <span className="text-xs text-red-600">Seasonal</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900">Delivery Options</h3>
                          <div className="space-y-3">
              {deliveryZonesData.map((zone) => (
                  <label key={zone.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryZone"
                      value={zone.value}
                      checked={deliveryZone === zone.value}
                      onChange={(e) => setDeliveryZone(e.target.value)}
                      className="text-green-600"
                    />
                    <div className="flex-1 flex justify-between">
                      <span className="text-sm font-medium">{zone.name}</span>
                      <span className="text-sm text-gray-500">
                        {zone.fee === 0 ? 'Free' : `+$${zone.fee}`} 
                        {zone.cutoffTime && ` (Order by ${zone.cutoffTime})`}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Date */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900">Delivery Date</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="flex items-center gap-2">
                  {isSameDayAvailable() ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                  )}
                  <p className="text-sm text-gray-600">{getDeliveryEstimate()}</p>
                </div>
              </div>
            </div>

            {/* Add-on Options */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900">Add-ons</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={carePackage}
                    onChange={(e) => setCarePackage(e.target.checked)}
                    className="text-green-600"
                  />
                  <Package className="w-4 h-4 text-gray-400" />
                  <div className="flex-1 flex justify-between">
                    <span className="text-sm">Care Package (flower food, vase, instructions)</span>
                    <span className="text-sm font-medium">+$12</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="text-green-600"
                  />
                  <Gift className="w-4 h-4 text-gray-400" />
                  <div className="flex-1 flex justify-between">
                    <span className="text-sm">Premium Gift Wrapping</span>
                    <span className="text-sm font-medium">+$8</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Custom Message */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900">Gift Message (Optional)</h3>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Add a personal message..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-gray-500">{customMessage.length}/200 characters</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center gap-5">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="px-4 py-2 font-medium text-gray-900">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">Fresh flowers hand-picked daily</span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-green-50 rounded p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bouquet ({selectedSize})</span>
                  <span>${(getBasePrice() * quantity).toFixed(2)}</span>
                </div>
                {flowerTypesData[selectedType].seasonalUpcharge > 0 && (
                  <div className="flex justify-between text-sm text-orange-600">
                    <span>Seasonal upcharge</span>
                    <span>+${(flowerTypesData[selectedType].seasonalUpcharge * quantity).toFixed(2)}</span>
                  </div>
                )}
                {carePackage && (
                  <div className="flex justify-between text-sm">
                    <span>Care Package</span>
                    <span>+$12.00</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between text-sm">
                    <span>Gift Wrapping</span>
                    <span>+$8.00</span>
                  </div>
                )}
                {deliveryZonesData.find(z => z.value === deliveryZone)?.fee && deliveryZonesData.find(z => z.value === deliveryZone)!.fee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>+${deliveryZonesData.find(z => z.value === deliveryZone)!.fee.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-600">
                Includes freshness guarantee and free message card
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-5">
              <button className="flex-1 bg-green-600 text-white py-4 px-8 rounded font-medium hover:bg-green-700 transition-colors">
                ORDER NOW
              </button>
              <button className="flex-1 border border-gray-400 text-gray-900 py-4 px-8 rounded font-medium hover:bg-gray-50 transition-colors">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* Product Information Tabs - keeping the existing content but with updated tab names */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-16">
              <button className="pb-4 text-sm font-bold text-gray-900 border-b-2 border-gray-900 uppercase tracking-wider">
                Flower details
              </button>
              <button className="pb-4 text-sm font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider">
                Reviews (28)
              </button>
              <button className="pb-4 text-sm font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider">
                Delivery & Care
              </button>
            </div>
          </div>

          {/* Product Details Content - keeping existing content */}
          <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Bouquet Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our premium rose bouquet features hand-selected, long-stemmed roses arranged with delicate 
                  baby's breath and fresh greenery. Each bouquet is carefully crafted by our expert florists 
                  using only the freshest flowers sourced from local growers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Bouquet Features</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    Size | {getSizeData()?.stems || '12-15'} stems ({selectedSize})
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    Style | Classic elegance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    Occasion | Perfect for any celebration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    Freshness | 7-10 days with proper care
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    Wrapping | Premium tissue paper & ribbon
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    Delivery | {getDeliveryEstimate()}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    Message card | Included with every order
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    Guarantee | 100% freshness guaranteed
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Flower Source & Quality</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our roses are sourced from certified sustainable farms and undergo strict quality control. 
                  We work with local growers to ensure the freshest flowers while supporting our community. 
                  Each bouquet is arranged fresh daily by our skilled florists.
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>FLOWER VARIETIES</strong><br />
                  Premium long-stem roses, baby's breath, seasonal greenery
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Care Instructions</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">💧</span>
                    </div>
                    Place in fresh, clean water immediately upon arrival
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">✂️</span>
                    </div>
                    Trim stems at 45-degree angle under running water
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">🌡️</span>
                    </div>
                    Keep in cool location away from direct sunlight
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">🔄</span>
                    </div>
                    Change water every 2-3 days
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">✨</span>
                    </div>
                    Use included flower food for extended freshness
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">🌸</span>
                    </div>
                    Remove wilted petals and leaves as needed
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Show Less Button */}
          <div className="text-center py-8 border-t border-gray-200">
            <button className="flex items-center gap-2 mx-auto text-gray-900 font-medium hover:text-gray-600">
              <span>Show less</span>
              <ChevronLeft className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </div>

        {/* You Might Also Like - keeping existing content */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">You might also like</h2>
            <div className="flex border border-gray-200 rounded">
              <button className="p-2 hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px bg-gray-200"></div>
              <button className="p-2 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Related Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="w-full h-40 bg-gradient-to-br from-green-100 via-pink-100 to-yellow-100 rounded mb-4 flex items-center justify-center">
                    <span className="text-6xl">{item.emoji}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.type}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-green-600">${item.price}</span>
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </span>
                      </div>
                    </div>
                    <button className="w-full border border-gray-300 py-2 px-4 rounded text-sm font-bold text-gray-900 hover:bg-gray-50">
                      <span className="text-gray-500">${item.price}</span> Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}