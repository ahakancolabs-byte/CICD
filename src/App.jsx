import React, { useState } from 'react';
import packageJson from '../package.json';
const products = [
  { id: 1, name: 'Kablosuz Kulaklık', price: 1250, category: 'Elektronik', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
  { id: 2, name: 'Akıllı Saat', price: 2400, category: 'Elektronik', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
  { id: 3, name: 'Minimalist Sırt Çantası', price: 850, category: 'Aksesuar', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60' },
  { id: 4, name: 'Termos Matara', price: 450, category: 'Yaşam', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60' },
  { id: 5, name: 'Uzaktan Kumandalı Araba', price: 899, category: 'Elektronik', image: 'https://images.unsplash.com/photo-1789062390906-4854abee9992?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const filteredProducts = selectedCategory === 'Tümü' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => setCurrentPage('home')}>
            ARA BUL AL
          </h1>
          <nav className="flex space-x-6 items-center">
            <button onClick={() => setCurrentPage('home')} className={`font-medium ${currentPage === 'home' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
              Anasayfa
            </button>
            <button onClick={() => setCurrentPage('products')} className={`font-medium ${currentPage === 'products' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
              Ürünler
            </button>
            <button onClick={() => setCurrentPage('cart')} className="relative bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition flex items-center gap-2">
              <span>🛒 Sepet</span>
              {totalCartCount > 0 && (
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        {currentPage === 'home' && (
          <div>
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl p-10 mb-10 shadow-lg flex flex-col items-start gap-4">
              <h2 className="text-4xl font-extrabold">Yeni Sezon Ürünlerini Keşfedin</h2>
              <p className="text-indigo-100 max-w-xl text-lg">En şık ve kaliteli ürünler kapınıza kadar gelsin. Hemen alışverişe başlayın!</p>
              <button onClick={() => setCurrentPage('products')} className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-indigo-50 transition">
                Alışverişe Başla
              </button>
            </div>
            
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Popüler Ürünler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow overflow-hidden flex flex-col border border-gray-100 hover:shadow-md transition">
                  <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-xs font-semibold text-indigo-500 uppercase">{product.category}</span>
                      <h4 className="font-bold text-gray-800 mt-1">{product.name}</h4>
                      <p className="text-indigo-600 font-extrabold mt-2">₺{product.price}</p>
                    </div>
                    <button onClick={() => addToCart(product)} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Tüm Ürünler</h2>
              <div className="flex gap-2">
                {['Tümü', 'Elektronik', 'Aksesuar', 'Yaşam'].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)} 
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow overflow-hidden flex flex-col border border-gray-100 hover:shadow-md transition">
                  <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-xs font-semibold text-indigo-500 uppercase">{product.category}</span>
                      <h4 className="font-bold text-gray-800 mt-1">{product.name}</h4>
                      <p className="text-indigo-600 font-extrabold mt-2">₺{product.price}</p>
                    </div>
                    <button onClick={() => addToCart(product)} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                      Sepete Ekleee
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'cart' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Alışveriş Sepetim</h2>
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow border border-gray-100">
                <p className="text-gray-500 text-lg mb-4">Sepetinizde henüz ürün bulunmuyor.</p>
                <button onClick={() => setCurrentPage('products')} className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-xl hover:bg-indigo-700 transition">
                  Ürünlere Göz At
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow flex items-center justify-between border border-gray-100">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <p className="text-gray-500 text-sm">Adet: {item.qty}</p>
                          <p className="text-indigo-600 font-bold mt-1">₺{item.price * item.qty}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold p-2">
                        Kaldır
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-6 rounded-xl shadow h-fit border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Sipariş Özeti</h3>
                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Ara Toplam</span>
                    <span>₺{totalPrice}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-gray-600">
                    <span>Kargo</span>
                    <span className="text-green-600 font-semibold">Ücretsiz</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-800 mb-6">
                    <span>Toplam</span>
                    <span>₺{totalPrice}</span>
                  </div>
                  <button onClick={() => alert('Siparişiniz başarıyla alındı!')} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                    Siparişi Tamamla
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6 text-center text-gray-500 text-sm">
        &copy; 2026 Ara-Bul-Al. Tüm hakları saklıdır. v{packageJson.version}
      </footer>
    </div>
  );
}