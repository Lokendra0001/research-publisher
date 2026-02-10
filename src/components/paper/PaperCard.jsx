import { FileText } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'


const PaperCard = ({ paper, path = "current" }) => {
    const [showAbstract, setShowAbstract] = useState(false);

    return (
        <div className="border border-border bg-gray-50 rounded-md overflow-hidden shadow-sm transition-all duration-300">
            {/* Header - Title */}
            <div className="p-4 border-b border-border">
                <h3 className="text-blue-600 font-bold ">
                    {paper.title}
                </h3>
            </div>

            {/* Body - Details */}
            <div className="p-4 space-y-2 text-sm text-text-primary">
                <div>
                    <span className="font-bold">Author(s) : </span>
                    <span className='font-semibold text-text-primary'>{paper.author?.name}{paper.coAuthors && Array.isArray(paper.coAuthors) && paper.coAuthors.length > 0 ? `, ${paper.coAuthors.map(c => c.name).join(', ')}` : ''}</span>
                </div>
                <div>
                    <span className="font-semibold text-text-primary/90">{paper.researchType || 'Research Paper'}</span>
                </div>
                <div>
                    <span>Online Published on : {new Date(paper.publishedAt || paper.createdAt).toLocaleDateString('en-GB')}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-2">
                    <button
                        onClick={() => setShowAbstract(!showAbstract)}
                        className="flex items-center gap-1 bg-primary-blue/90 text-text-secondary px-4 py-2 rounded text-xs hover:bg-primary-blue transition-colors font-semibold"
                    >
                        Abstract {showAbstract ? '-' : '+'}
                    </button>
                    <Link
                        href={`${path}/${paper.id}`}
                        className="flex items-center gap-1 bg-primary/95 text-text-secondary px-3 py-1.5 rounded text-xs hover:bg-primary transition-colors font-semibold">
                        <FileText className="w-3 h-3" />
                        Full HTML
                    </Link>
                </div>

                {/* Dropdown Abstract */}
                {showAbstract && (
                    <div className="mt-4 p-4 bg-primary-foreground border border-border rounded-md text-justify text-text-primary animate-in fade-in slide-in-from-top-2 duration-300 line-clamp-6">
                        <h4 className="font-bold text-text-primary mb-1">Abstract:</h4>
                        {paper.abstract || "No abstract available."}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PaperCard