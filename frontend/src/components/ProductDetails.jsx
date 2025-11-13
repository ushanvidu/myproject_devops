import React, { useState } from 'react';
import { Star, Heart, Truck, Shield } from 'lucide-react';

const ProductDetails = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [coupleNames, setCoupleNames] = useState('');
    const [specialDate, setSpecialDate] = useState('');

    const product = {
        name: "The Anniversary StoryBox",
        price: "$89.99",
        description: "A beautifully curated collection designed to celebrate love and create lasting memories. Each item in this box tells a part of your unique love story, from the first meeting to the dreams you share for the future.",
        features: [
            "Premium keepsake box with laser-engraved names",
            "Custom love story booklet",
            "Artisanal candles and bath salts",
            "Gourmet chocolates and wine pairing guide",
            "Personalized photo album",
            "Romantic date night ideas"
        ]
    };

    const images = [
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=600&fit=crop"
    ];

    const reviews = [
        { name: "Sarah M.", rating: 5, comment: "Absolutely perfect! My husband cried when he opened it." },
        { name: "James T.", rating: 5, comment: "The personalization made it so special. Will order again!" },
        { name: "Emily R.", rating: 5, comment: "Beautiful packaging and thoughtful items. Highly recommend!" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Same as homepage */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-pink-600">Unbox You</h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">Shop</a>
                            <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">About</a>
                            <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">Contact</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Product Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Image Gallery */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-lg mb-4"
                            />
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`border-2 rounded-lg overflow-hidden ${
                                            selectedImage === index ? 'border-pink-600' : 'border-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-20 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-600">(128 reviews)</span>
                                <button className="ml-4 text-gray-400 hover:text-pink-600">
                                    <Heart className="h-6 w-6" />
                                </button>
                            </div>
                            <p className="text-3xl font-bold text-pink-600 mb-6">{product.price}</p>
                        </div>

                        <div>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                {product.description}
                            </p>
                            <ul className="space-y-2 mb-6">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-600">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Personalization Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalize Your Gift</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Couple's Names
                                    </label>
                                    <input
                                        type="text"
                                        value={coupleNames}
                                        onChange={(e) => setCoupleNames(e.target.value)}
                                        placeholder="e.g., Sarah & James"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Special Date
                                    </label>
                                    <input
                                        type="date"
                                        value={specialDate}
                                        onChange={(e) => setSpecialDate(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="space-y-4">
                            <button className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 transition duration-300 shadow-lg">
                                Add to Cart - {product.price}
                            </button>

                            <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                                <div className="flex items-center justify-center space-x-2">
                                    <Truck className="h-5 w-5 text-pink-600" />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <Shield className="h-5 w-5 text-pink-600" />
                                    <span>Secure Checkout</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <Heart className="h-5 w-5 text-pink-600" />
                                    <span>100% Satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">"{review.comment}"</p>
                                <p className="font-semibold text-gray-900">{review.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;