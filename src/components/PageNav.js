import Link from 'next/link'
import React from 'react'


export default function PageNav({
    prevPage = null,
    nextPage = null,
    prevTitle = '',
    nextTitle = '',
    prevSubtitle = '',  // Optional 
    nextSubtitle = ''   // Optional 
}) {
    return (
        <div className="w-full border-t border-gray-200 mt-12">
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center">
                    {/* Previous Page */}
                    <div className="flex-1">
                        {prevPage ? (
                            <Link
                                href={prevPage}
                                className="group flex items-center text-gray-600 hover:text-accent transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                <div>
                                    <p className="text-sm text-gray-500">{prevSubtitle || 'Previous'}</p>
                                    <p className="font-medium">{prevTitle}</p>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>

                    {/* Next Page */}
                    <div className="flex-1 text-right">
                        {nextPage ? (
                            <Link
                                href={nextPage}
                                className="group flex items-center justify-end text-gray-600 hover:text-accent transition-colors"
                            >
                                <div>
                                    <p className="text-sm text-gray-500">{nextSubtitle || 'Next'}</p>
                                    <p className="font-medium">{nextTitle}</p>
                                </div>
                                <svg
                                    className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
