import { useState } from "react";
import { Mail, Lock, LogIn, ShieldCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    alert("Google login clicked");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual validation/authentication here
    alert(`Logging in with ${email}`);
    navigate("/dashboard");
  };

  
  return (
    <div className="flex items-center w-full justify-center min-h-[100vh] bg-gray-100 px-4 py-8">
      <div className="flex w-210 h-160 bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="src/images/img3.jpg"
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 space-y-6 bg-white">
          <div className="text-center space-y-2">
            <ShieldCheck className="mx-auto w-10 h-10 text-gray-800" />
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-500">Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-gray-300">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none text-sm text-gray-800"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-gray-300">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-sm text-gray-800"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full gap-3 py-2.5 text-sm font-semibold border rounded-lg shadow-sm bg-white hover:bg-gray-100 border-gray-300 text-gray-700 transition"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-gray-800 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
