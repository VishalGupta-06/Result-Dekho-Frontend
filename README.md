 <div className="md:w-1/2 p-10">
          <h2 className="text-5xl font-bold mb-3">Create Account</h2>

          <p className="text-gray-500 mb-8">
            Already have account?
            <span className="text-blue-600 ml-2 cursor-pointer">Login</span>
          </p>

          {/* Name */}

          <div className="border rounded-xl flex items-center px-4 py-4 mb-5">
            <FaUser className="text-gray-400" />

            <input
              placeholder="Full Name"
              className="outline-none ml-3 w-full"
            />
          </div>

          {/* Email */}

          <div className="border rounded-xl flex items-center px-4 py-4 mb-5">
            <FaEnvelope className="text-gray-400" />

            <input placeholder="Email" className="outline-none ml-3 w-full" />
          </div>

          {/* Password */}

          <div className="border rounded-xl flex items-center px-4 py-4 mb-5">
            <FaLock className="text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              className="outline-none ml-3 w-full"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold">
            Create Account
          </button>

          <div className="flex items-center my-8">
            <div className="flex-1 border"></div>

            <span className="mx-4 text-gray-400">OR</span>

            <div className="flex-1 border"></div>
          </div>

          {/* GOOGLE */}

          <button className="w-full border rounded-xl py-4 flex justify-center items-center gap-3 hover:bg-gray-100">
            <FcGoogle size={25} />
            Continue with Google
          </button>
        </div> 