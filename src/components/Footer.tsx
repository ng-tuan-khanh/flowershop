import React from 'react'
import { Send, Instagram, Facebook, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-50">
      {/* Newsletter Subscription */}
      <div className="bg-green-500 rounded-lg w-[500px] mx-auto px-16 py-8 relative z-10">
        <div className="text-center mb-6">
          <h3 className="text-white text-3xl font-bold mb-6">Flora Newsletter</h3>
          <p className="text-white text-base">Subscribe for seasonal updates, care tips + Free delivery on orders over $50</p>
        </div>
        <div className="bg-white rounded px-3 py-2 flex items-center justify-between">
          <span className="text-gray-600 text-sm">Enter your email</span>
          <Send className="w-4 h-4 text-gray-700" />
        </div>
      </div>

      {/* Main Footer */}
      <div className="pt-12 px-60">
        <div className="flex justify-center gap-32 mb-6">
          <div className="w-32">
            <h4 className="text-gray-600 text-sm font-bold mb-6">Company</h4>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">About Us</p>
              <p className="text-gray-600 text-sm">Our Gardens</p>
              <p className="text-gray-600 text-sm">Contact us</p>
            </div>
          </div>

          <div className="w-32">
            <h4 className="text-gray-600 text-sm font-bold mb-6">Services</h4>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">Wedding Services</p>
              <p className="text-gray-600 text-sm">Event Planning</p>
              <p className="text-gray-600 text-sm">Custom Arrangements</p>
            </div>
          </div>

          <div className="w-32">
            <h4 className="text-gray-600 text-sm font-bold mb-6">Ordering</h4>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">Delivery Options</p>
              <p className="text-gray-600 text-sm">Same Day Delivery</p>
              <p className="text-gray-600 text-sm">Care Instructions</p>
              <p className="text-gray-600 text-sm">Freshness Guarantee</p>
            </div>
          </div>

          <div className="w-28">
            <h4 className="text-gray-600 text-sm font-bold mb-6">Help</h4>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">Contact Us</p>
              <p className="text-gray-600 text-sm">FAQ</p>
              <p className="text-gray-600 text-sm">Plant Care Guide</p>
            </div>
          </div>
        </div>
      </div>
      
        {/* Footer Bottom */}
        <div className="w-full bg-white px-60 py-12">
          <div className="flex justify-end items-center mb-3">
            <div className="flex items-center gap-1">
              <span className="text-gray-600 text-sm">English</span>
              <svg className="w-2.5 h-2.5 text-gray-700" fill="currentColor" viewBox="0 0 10 5">
                <path d="M0 0L5 5L10 0H0Z"/>
              </svg>
            </div>
          </div>

          <div className="w-full h-0.5 bg-gray-300 mb-3"></div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">227 Nguyen Van Cu, Ward 12, District 5, Ho Chi Minh City</p>
            <p className="text-gray-500 text-sm">©2025 Copyright reserved for Flora</p>
            <div className="flex items-center gap-6">
              <Instagram className="w-6 h-6 text-gray-700" />
              <Facebook className="w-6 h-6 text-gray-700" />
              <MessageCircle className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
    </footer>
  )
} 