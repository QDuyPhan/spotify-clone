import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="bg-black p-8 rounded-2xl shadow-2xl w-96">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            className="w-12 h-12"
          />
        </div>
        <h1 className="text-white text-3xl font-bold text-center mb-6 leading-tight">
          Đăng ký để <br /> bắt đầu nghe
        </h1>

        <form className="space-y-4 mb-6">
          <div>
            <label className="text-white text-sm mb-1 block">
              Địa chỉ email
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded-full font-bold hover:bg-green-600"
          >
            Tiếp theo
          </button>
        </form>

        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="text-gray-400 px-3 text-sm">hoặc</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white py-2 rounded-full hover:bg-gray-800">
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google"
            />
            Đăng ký bằng Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white py-2 rounded-full hover:bg-gray-800">
            <img
              src="https://img.icons8.com/color/24/000000/facebook.png"
              alt="Facebook"
            />
            Đăng ký bằng Facebook
          </button>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white py-2 rounded-full hover:bg-gray-800">
            <img
              src="https://img.icons8.com/ios-filled/24/ffffff/mac-os.png"
              alt="Apple"
            />
            Đăng ký bằng Apple
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <span>Bạn đã có tài khoản? </span>
          <Link to="/" className="text-white font-semibold hover:underline">
            Đăng nhập tại đây.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
