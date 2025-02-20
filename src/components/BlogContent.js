import React from 'react'
import ActionLink from './ActionLink'
import parse from 'html-react-parser'

export default function BlogContent({content}) {

    if (!content) return null;

    // Function to replace HTML tags with React components
    const modifiedHtml = content
    .replace(/<h1>(.*?)<\/h1>/g, '<h1 class="w-full font-bold text-gray-600 text-lg">$1</h1>')
    .replace(/<h2>(.*?)<\/h2>/g, '<h2 class="w-full font-bold text-gray-600 text-lg">$1</h2>')
    .replace(/<h3>(.*?)<\/h3>/g, '<h3 class="w-full font-bold text-gray-600 text-lg">$1</h3>')
    .replace(/<p>(.*?)<\/p>/g, '<p class="text-gray-600 my-8">$1</p>');

    return (
        <div className='w-full'>

            <div className="my-8">
                {parse(modifiedHtml, {
                    replace: (domNode) => {
                        if (domNode.name === 'a') {
                            return (
                                <ActionLink
                                    href={domNode.attribs.href}
                                    variant="accent"
                                    icon={false}
                                >
                                    {domNode.children[0]?.data}
                                </ActionLink>
                            );
                        }
                    }
                })}
            </div>

        </div>
    )
}
