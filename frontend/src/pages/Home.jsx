import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get user info passed from login/signup
    const user = location.state?.user;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome {user ? user.fullname : "Guest"} 🎉
                </h1>
                <p className="text-gray-600 mb-6">
                    You are successfully logged in / signed up!
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}