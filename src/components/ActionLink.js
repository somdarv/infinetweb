import React from 'react'

const ActionLink = ({
    href = "#",
    children,
    className = "",
    variant = "default",     //  (default, accent, custom)
    icon = true,
    target = "_self",
    onClick,
    underline = false
}) => {
    // Style variants
    const variants = {
        default: "text-primary hover:text-primary/80",
        accent: "text-accent hover:text-accent/80",
        custom: className
    }

    // Base classes that will always be applied
    const baseClasses = "inline-flex items-center font-medium transition-colors"

    // Underline classes if enabled
    const underlineClasses = underline ? "underline underline-offset-4" : ""

    // Combine all classes
    const finalClasses = `${baseClasses} ${variants[variant]} ${underlineClasses}`

    return (

        <a href={href}
            target={target}
            onClick={onClick}
            className={finalClasses}
            rel={target === "_blank" ? "noopener noreferrer" : ""}
        >
            {children}
            {icon && (
                <svg
                    className="ml-1 w-4 h-4"
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
            )}
        </a>
    )
}

export default ActionLink