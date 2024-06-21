// src/components/CodeRenderer.tsx
'use client'
import React from 'react';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeRendererProps {
    content: any;
    language: string;
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ content, language }) => {
    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.type === 'tag') {
                if (domNode.name === 'code') {
                    const { children, attribs } = domNode;
                    const code = (domToReact(children) as string).trim();
                    const language = attribs?.class?.replace('language-', '') || 'text';
                    return <SyntaxHighlighter language={language} style={dark}>
                        {code}
                    </SyntaxHighlighter>;
                }
            }
        },
    };
    return (
        <div>
            {parse(content.data.content, options)}
        </div>
    );
};

export default CodeRenderer;
