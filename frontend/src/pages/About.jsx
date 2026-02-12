import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

export default function About() {
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Navbar user={user} />

            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Unbox You</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Crafting moments of joy, one box at a time.
                    </p>
                </div>

                <div className="prose prose-lg mx-auto text-gray-500">
                    <p>
                        Welcome to <strong>Unbox You</strong>, where gifting meets personalization. We believe that every gift tells a story, and we're here to help you tell yours.
                    </p>
                    <p>
                        Founded with a simple mission: to make gifting effortless, thoughtful, and memorable. our curated collections are designed to bring a smile to your loved ones' faces, whether for a birthday, anniversary, or just because.
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Promise</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Quality First:</strong> We source only the best items for our boxes.</li>
                        <li><strong>Personal Touch:</strong> Every box is packed with care and attention to detail.</li>
                        <li><strong>Swift Delivery:</strong> Because we know some surprises just can't wait.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h3>
                    <p>
                        Have questions or need help with a custom order? Reach out to our team at <a href="mailto:support@unboxyou.com" className="text-pink-600 hover:underline">support@unboxyou.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
