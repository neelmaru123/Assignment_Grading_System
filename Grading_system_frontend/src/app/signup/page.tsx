// pages/signup.tsx (or signup.js if you're using JavaScript)
import { ReactElement } from 'react';
import RootLayout from '../layout'; // Make sure the path is correct

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-[#514DEC]">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#514DEC] font-lufga">Create Your Account</h1>
                <form>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        required 
                        className="w-full p-3 mb-4 border border-[#514DEC] rounded focus:outline-none focus:ring-2 focus:ring-[#514DEC] transition duration-200"
                    />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        className="w-full p-3 mb-4 border border-[#514DEC] rounded focus:outline-none focus:ring-2 focus:ring-[#514DEC] transition duration-200"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        className="w-full p-3 mb-4 border border-[#514DEC] rounded focus:outline-none focus:ring-2 focus:ring-[#514DEC] transition duration-200"
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        required 
                        className="w-full p-3 mb-4 border border-[#514DEC] rounded focus:outline-none focus:ring-2 focus:ring-[#514DEC] transition duration-200"
                    />
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-[#514DEC] text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Or sign up with:</p>
                    <div className="flex justify-center mt-2">
                        <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">Google</button>
                        <button className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-800 transition duration-200">LinkedIn</button>
                    </div>
                </div>
                <label className="block mt-4 text-center text-gray-600">
                    <input type="checkbox" required /> I agree to the Terms and Conditions
                </label>
            </div>
        </div>
    );
}

// Layout function to remove sidebar on SignUpPage
SignUpPage.getLayout = function getLayout(page: ReactElement) {
    return <RootLayout showSidebar={false}>{page}</RootLayout>;
};
