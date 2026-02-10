import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    placeholder,
    type = "text",
    error,
    className = "",
    ...props
}, ref) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="text-sm font-medium text-foreground ml-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={`flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${error ? 'border-danger focus-visible:ring-red-500/20' : 'hover:border-primary/50'} ${className}`}
                {...props}
            />
            {error && (
                <p className="text-xs text-danger font-medium ml-1 animate-in slide-in-from-top-1 fade-in-0 mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;