import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Zap, EyeOff, Users, Download } from "lucide-react";
import TransferSection from "./TransferSection";
import ReceiveSection from "./ReceiveSection";

export default function Hero() {
    const [showTransfer, setShowTransfer] = useState(false);
    const [showReceive, setShowReceive] = useState(false);

    return (
        <section className="bg-gradient-to-r from-slate-900 to-slate-950  text-white py-16 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
                            Secure and Fast Data Transfer
                        </h1>
                        <p className="text-lg mb-8 text-blue-100">
                            Transfer your files with confidence using state-of-the-art encryption and
                            lightning-fast servers.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center transition-all shadow-lg hover:shadow-blue-500/25"
                                onClick={() => setShowTransfer(true)}
                            >
                                Upload File <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                            <button
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center transition-all shadow-lg hover:shadow-blue-500/25"
                                onClick={() => setShowReceive(true)}
                            >
                                Download File <Download className="ml-2 h-4 w-4" />
                            </button>
                            <button className="bg-blue-900/20 border border-blue-400/30 text-blue-100 font-semibold px-6 py-3 rounded-lg hover:bg-blue-800/30 hover:border-blue-300/50 transition-all">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="bg-gradient-to-b from-blue-900/40 to-slate-900/40 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-blue-700/30 w-full">
                        <div className="space-y-8">
                            <Feature icon={<ShieldCheck className="text-emerald-400 w-6 h-6" />} title="Secure Transfers">
                                All your data are encrypted in-flight and at-rest (256-bit AES and SSL/TLS encryption).
                            </Feature>
                            <Feature icon={<Zap className="text-blue-400 w-6 h-6" />} title="Lightning Fast">
                                Transfer large files in seconds with our optimized network.
                            </Feature>
                            <Feature icon={<EyeOff className="text-violet-400 w-6 h-6" />} title="Privacy Focused">
                                We don't store your files. Your data belongs to you.
                            </Feature>
                            <Feature icon={<Users className="text-amber-300 w-6 h-6" />} title="Team Collaboration">
                                Easily share files with your team members and clients.
                            </Feature>
                        </div>
                    </div>
                </div>

                {/* Transfer Section - appears below when button is clicked */}
                {showTransfer && (
                    <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                        <TransferSection onClose={() => setShowTransfer(false)} />
                    </div>
                )}
                {showReceive && (
                    <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                        <ReceiveSection onClose={() => setShowReceive(false)} />
                    </div>
                )}
            </div>
        </section>
    );
}

// Feature Component
const Feature = ({ icon, title, children }) => (
    <div>
        <div className="flex items-center mb-3">
            {icon}
            <h3 className="text-lg font-semibold text-white ml-3">{title}</h3>
        </div>
        <p className="text-blue-100/80 pl-9">{children}</p>
    </div>
);

