import { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-800 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 8h16M4 16h16"
                            />
                        </svg>
                    )}
                </button>
                {/* Logo */}
                <a href="/" className="text-2xl font-semibold text-gray-800">
                BricksterBuilder
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8">
                    <a href="/" className="text-gray-600 hover:text-blue-600">
                        Home
                    </a>
                    <a href="/discover" className="text-gray-600 hover:text-blue-600">
                        Discover
                    </a>
                    <a href="/trending" className="text-gray-600 hover:text-blue-600">
                        Trending
                    </a>
                    <a href="/universe" className="text-gray-600 hover:text-blue-600">
                        Universe
                    </a>
                    <a href="/contact" className="text-gray-600 hover:text-blue-600">
                        Contact
                    </a>
                    <a href="/help" className="text-gray-600 hover:text-blue-600">
                        Help
                    </a>
                </nav>

                <button className='bg-black p-3 rounded-xl'>
                    <a href="/" className="block text-white hover:text-blue-600">
                        shop now!
                    </a>
                </button>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <nav className="md:hidden bg-white shadow-inner">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li>
                            <a href="/" className="block text-gray-600 hover:text-blue-600">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/discover" className="block text-gray-600 hover:text-blue-600">
                                Discover
                            </a>
                        </li>
                        <li>
                            <a href="/trending" className="block text-gray-600 hover:text-blue-600">
                                Trending
                            </a>
                        </li>
                        <li>
                            <a href="/universe" className="block text-gray-600 hover:text-blue-600">
                                Universe
                            </a>
                        </li>
                        <li>
                            <a href="/help" className="block text-gray-600 hover:text-blue-600">
                                Help
                            </a>
                        </li>

                    </ul>
                </nav>
            )}


        </header>
    );
}
