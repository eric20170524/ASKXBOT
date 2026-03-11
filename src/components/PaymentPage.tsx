import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const amount = parseInt(searchParams.get('amount') || '1000', 10);
  
  const [currency, setCurrency] = useState<'CNY' | 'USD'>('CNY');
  
  // Calculate prices based on amount
  // 1000 credits = $10
  // 5000 credits = $45
  // 15000 credits = $120
  let usdPrice = 10;
  let packName = 'Credit Pack - Small';
  
  if (amount === 5000) {
    usdPrice = 45;
    packName = 'Credit Pack - Medium';
  } else if (amount === 15000) {
    usdPrice = 120;
    packName = 'Credit Pack - Large';
  }
  
  const exchangeRate = 7.191;
  const cnyPrice = (usdPrice * exchangeRate).toFixed(2);
  
  const displayPrice = currency === 'CNY' ? `¥${cnyPrice}` : `$${usdPrice.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Order Summary */}
      <div className="w-1/2 p-12 border-r border-gray-100 flex flex-col items-end">
        <div className="w-full max-w-md">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-bold text-xl tracking-tight">rebyte</span>
          </button>

          <div className="mb-8">
            <h2 className="text-gray-600 mb-3">选择货币：</h2>
            <div className="flex gap-3">
              <button 
                onClick={() => setCurrency('CNY')}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${currency === 'CNY' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <span className="text-lg">🇨🇳</span>
                <span className="font-medium">¥{cnyPrice}</span>
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${currency === 'USD' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <span className="text-lg">🇺🇸</span>
                <span className="font-medium">US${usdPrice.toFixed(2)}</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">1 USD = {exchangeRate.toFixed(4)} CNY</p>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{packName}</h3>
              <p className="text-sm text-gray-500 mt-1">{amount.toLocaleString()} credits for Rebyte Code AI models</p>
            </div>
            <div className="font-medium text-gray-900">{displayPrice}</div>
          </div>
        </div>
      </div>

      {/* Right Column - Payment Form */}
      <div className="w-1/2 p-12 bg-white flex flex-col items-start">
        <div className="w-full max-w-md">
          <button className="w-full bg-[#00D66F] hover:bg-[#00C060] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-6 transition-colors">
            用 <span className="font-bold tracking-tighter">link</span> 支付
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">或</div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">联系信息</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input 
                  type="email" 
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">支付方式</h3>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                  <CreditCard size={18} className="text-gray-600" />
                  <span className="font-medium text-gray-900">银行卡</span>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">银行卡信息</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="1234 1234 1234 1234"
                        className="w-full px-3 py-2 border border-gray-300 rounded-t-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 z-10 relative"
                      />
                      <div className="flex">
                        <input 
                          type="text" 
                          placeholder="月份/年份"
                          className="w-1/2 px-3 py-2 border border-gray-300 border-t-0 rounded-bl-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 z-10 relative"
                        />
                        <input 
                          type="text" 
                          placeholder="CVC"
                          className="w-1/2 px-3 py-2 border border-gray-300 border-t-0 border-l-0 rounded-br-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 z-10 relative"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">持卡人姓名</label>
                    <input 
                      type="text" 
                      placeholder="全名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">国家或地区</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white">
                      <option>日本</option>
                      <option>中国</option>
                      <option>美国</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div>
                <label className="text-sm font-medium text-gray-700">保存我的信息，以便快捷结账</label>
                <p className="text-xs text-gray-500">在rebyte和任何接受Link的地方安全支付。</p>
              </div>
            </div>

            <button 
              onClick={() => {
                alert('This is a mock payment page.');
                navigate(-1);
              }}
              className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              支付
            </button>

            <div className="flex items-start gap-2 text-xs text-gray-500 mt-4">
              <span className="text-green-500">🍃</span>
              <p>rebyte将捐出您的购买额的 0.5%，用于去除大气中的CO₂。</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-8">
              <span>Powered by stripe</span>
              <span>|</span>
              <a href="#" className="hover:text-gray-600">条款</a>
              <a href="#" className="hover:text-gray-600">隐私</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
