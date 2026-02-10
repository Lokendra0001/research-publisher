
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';


const DashboardSection = ({ title, items }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4 border-b pb-2 border-border">
            {title}
        </h2>
        <ul className="space-y-3 pl-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start group">
                    <span className="text-secondary mr-3 mt-1.5 transform group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={16} />
                    </span>
                    <div>
                        <Link
                            href={item.link}
                            className="text-lg font-medium text-text-primary/70 hover:text-secondary transition-colors flex items-center gap-2"
                        >
                            {item.label}
                        </Link>
                        {item.description && (
                            <p className="text-sm text-text-primary/60   mt-0.5 ml-0">
                                <span className="text-secondary font-mono mr-2">-{'>'}</span>
                                {item.description}
                            </p>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default DashboardSection;