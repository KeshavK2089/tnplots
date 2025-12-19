import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-orange-green">
                                <MapPin className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">TNPlots</h2>
                                <p className="text-xs text-gray-400">Cheyyar, Tamil Nadu</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            Your trusted marketplace for verified land plots in Cheyyar and surrounding areas.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/plots" className="text-sm hover:text-orange-500 transition-colors">
                                    Browse Plots
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm hover:text-orange-500 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm hover:text-orange-500 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/login" className="text-sm hover:text-orange-500 transition-colors">
                                    Admin Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Property Types</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/plots?category=residential" className="text-sm hover:text-orange-500 transition-colors">
                                    Residential Plots
                                </Link>
                            </li>
                            <li>
                                <Link href="/plots?category=agricultural" className="text-sm hover:text-orange-500 transition-colors">
                                    Agricultural Land
                                </Link>
                            </li>
                            <li>
                                <Link href="/plots?category=commercial" className="text-sm hover:text-orange-500 transition-colors">
                                    Commercial Plots
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm">
                                <Phone size={16} className="text-orange-500" />
                                <a href="tel:+919876543210" className="hover:text-orange-500 transition-colors">
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Mail size={16} className="text-orange-500" />
                                <a href="mailto:info@tnplots.com" className="hover:text-orange-500 transition-colors">
                                    info@tnplots.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <MessageCircle size={16} className="text-green-500" />
                                <a href="https://wa.me/919876543210" className="hover:text-green-500 transition-colors">
                                    WhatsApp Us
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <MapPin size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                                <span>Cheyyar, Tiruvannamalai District<br />Tamil Nadu, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} TNPlots. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
