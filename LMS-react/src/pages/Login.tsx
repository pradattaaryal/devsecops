// src/components/Login.tsx
import type React from "react";
import hsm from "../assets/hsm.svg";
import hsm2 from "../assets/hsm2.svg";
import { useLogin } from "../hooks/useLogin";
import RegisterModal from "../pages/register-modal";

const Login: React.FC = () => {
  const {
    formData,
    loading,
    error,
    isRegisterModalOpen,
    handleChange,
    handleSubmit,
    openRegisterModal,
    closeRegisterModal,
  } = useLogin();

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <div className="flex w-full min-h-screen bg-red-500 shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-1/2 bg-white p-8 flex justify-center flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <img 
              className="w-[150px] h-[150px]"
              src={hsm}
              alt="hsm"
            />
          </div>
          <h1 className="text-xl font-semibold text-center mb-1">HSMSS Library Management</h1>
          <h2 className="text-sm text-gray-600 mb-8">Please enter your credentials</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            <div className="mb-4">
              <input
                type="text"
                name="user_name"
                placeholder="Username"
                value={formData.user_name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-6">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-1/2 bg-[#1B4965] text-white py-2 rounded-md hover:bg-[#1B4965]/90 transition-colors disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>

        {/* Right Side - Register CTA */}
        <div className="w-1/2 bg-[#1B4965] p-8 flex flex-col items-center justify-center text-white">
          <img 
            className="w-[70px] h-[70px]"
            src={hsm2}
            alt="hsm"
          />
          <h2 className="text-3xl font-bold mb-2">HSMSS Library</h2>
          <p className="text-lg mb-8">New to our platform?</p>
          <button
            className="px-8 py-2 bg-gray-300 text-[#1B4965] rounded-md font-medium hover:bg-white transition-colors"
            onClick={openRegisterModal}
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <RegisterModal onClose={closeRegisterModal} isOpen={false} />
      )}
    </div>
  );
};

export default Login;