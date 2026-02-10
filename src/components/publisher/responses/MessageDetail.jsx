import React from 'react'
import { X, Mail } from 'lucide-react'

const MessageDetail = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md grid place-items-center p-4 animate-fadeIn">
            <div className="w-full max-w-3xl min-h-[60dvh] max-h-[85vh] bg-white rounded-2xl  flex flex-col overflow-hidden animate-scaleIn">

                {/* Header with Gradient */}
                <div
                    className="relative px-3 lg:px-8 min-h-[80px] flex items-center  w-full    overflow-hidden bg-secondary"
                >
                    <div className="relative w-full  z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                            >
                                <Mail size={24} style={{ color: 'var(--primary-foreground)' }} />
                            </div>
                            <div>
                                <h2
                                    className="text-xl font-bold tracking-tight"
                                    style={{ color: 'var(--primary-foreground)' }}
                                >
                                    Message Details
                                </h2>
                                <p
                                    className="text-sm opacity-90 mt-0.5"
                                    style={{ color: 'var(--primary-foreground)' }}
                                >
                                    Complete message content
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => onClose(false)}
                            className="group p-2.5 rounded-xl transition-all duration-300 hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/30"
                            style={{ color: 'var(--primary-foreground)' }}
                        >
                            <X size={22} className="transition-transform group-hover:rotate-90" />
                        </button>
                    </div>

                </div>

                {/* Content with Custom Scrollbar */}
                <div
                    className="flex-1 px-8 py-7 overflow-y-auto"
                    style={{
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)'
                    }}
                >
                    <div
                        className="prose prose-lg max-w-none leading-relaxed"
                        style={{ color: 'var(--foreground)' }}
                    >
                     {message}
                    </div>
                </div>

                {/* Footer with Gradient Border */}
                <div
                    className="px-3 lg:px-8 py-5 relative"
                    style={{
                        backgroundColor: 'var(--muted)',
                        borderTop: '2px solid var(--border)'
                    }}
                >
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => onClose(false)}
                            className="group relative px-6 py-3 rounded-lg font-semibold bg-secondary text-text-secondary cursor-pointer overflow-hidden "
                        >
                            <span className="relative z-10">Close</span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

            
          
            `}</style>
        </div>
    )
}

export default MessageDetail
