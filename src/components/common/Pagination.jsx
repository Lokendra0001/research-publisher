import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const delta = 1; // Number of pages to show on each side of the current page

        if (totalPages <= 7) {
            // If few pages, show them all
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first page
            pages.push(1);

            if (currentPage > delta + 2) {
                pages.push('...');
            }

            // Show pages around the current page
            const start = Math.max(2, currentPage - delta);
            const end = Math.min(totalPages - 1, currentPage + delta);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - (delta + 1)) {
                pages.push('...');
            }

            // Always show the last page
            pages.push(totalPages);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-10 select-none">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-border rounded-md bg-primary-foreground text-text-primary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer flex items-center justify-center min-w-[100px]"
            >
                Previous
            </button>

            <div className="flex gap-1">
                {getPageNumbers().map((page, i) => (
                    <React.Fragment key={i}>
                        {page === '...' ? (
                            <span className="w-10 h-10 flex items-center justify-center text-text-primary/40 font-bold">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`w-10 h-10 border rounded-md transition-all font-bold cursor-pointer flex items-center justify-center ${currentPage === page
                                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                                        : "bg-primary-foreground text-text-primary border-border hover:bg-gray-50"
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-border rounded-md bg-primary-foreground text-text-primary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer flex items-center justify-center min-w-[100px]"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
