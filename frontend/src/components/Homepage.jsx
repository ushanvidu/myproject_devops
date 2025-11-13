import React from 'react';
import { ShoppingBag, Heart, Truck, Star } from 'lucide-react';

const Homepage = () => {
    const featuredProducts = [
        {
            id: 1,
            name: "The Anniversary StoryBox",
            description: "A curated collection of love and memories for that special couple",
            price: "$89.99",
            image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop"
        },
        {
            id: 2,
            name: "Birthday Celebration Box",
            description: "Make their birthday unforgettable with our premium gift collection",
            price: "$69.99",
            image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop"
        },
        {
            id: 3,
            name: "Friendship Treasure Chest",
            description: "Celebrate the bond of friendship with this thoughtful collection",
            price: "$59.99",
            image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop"
        }
    ];

    const steps = [
        {
            icon: ShoppingBag,
            title: "Choose Your Box",
            description: "Browse our curated collection of themed gift boxes"
        },
        {
            icon: Heart,
            title: "Personalize Your Gift",
            description: "Add personal touches and custom messages"
        },
        {
            icon: Truck,
            title: "We Deliver Joy",
            description: "Free shipping with beautiful packaging"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-pink-600">Unbox You</h1>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <a href="#shop" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition duration-300">
                                Shop
                            </a>
                            <a href="#about" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition duration-300">
                                About
                            </a>
                            <a href="#contact" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition duration-300">
                                Contact
                            </a>
                        </nav>

                        {/* Cart Icon */}
                        <div className="flex items-center">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition duration-300">
                                <ShoppingBag className="h-6 w-6 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Give a Story,
                            <br />
                            <span className="text-pink-600">Not Just a Gift</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Curated gift boxes designed to create unforgettable moments and lasting memories for every occasion.
                        </p>
                        <button className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-700 transform hover:scale-105 transition duration-300 shadow-lg">
                            Shop All Boxes
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="shop" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Most-Loved Boxes
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Carefully curated collections that tell a story and create lasting memories
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover transition duration-300 hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Popular
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {product.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-pink-600">
                      {product.price}
                    </span>
                                        <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-gray-600">
                            Three simple steps to create the perfect gift
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <step.icon className="h-10 w-10 text-pink-600" />
                                </div>
                                <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-semibold">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-pink-400 mb-4">Unbox You</h3>
                            <p className="text-gray-400">
                                Creating memorable gift experiences that tell beautiful stories.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Shop</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition duration-300">All Boxes</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Anniversary</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Birthday</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Friendship</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition duration-300">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Shipping Info</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Returns</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                    <span className="sr-only">Facebook</span>
                                    📘
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                    <span className="sr-only">Instagram</span>
                                    📷
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                    <span className="sr-only">Twitter</span>
                                    🐦
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                    <span className="sr-only">Pinterest</span>
                                    📌
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Unbox You. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;