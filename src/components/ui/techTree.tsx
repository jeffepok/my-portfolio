// TechTree.tsx
import React from 'react';

interface TechTreeItem {
    name: string;
    level: number; // proficiency level
}

interface TechTreeProps {
    items: TechTreeItem[];
}

const TechTree: React.FC<TechTreeProps> = ({ items }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">Tech Stack
            </h2>
            <p className="text-lg text-green-500">I'm specialized in web development</p>
            <div className="mt-5 space-y-4 w-full">
                <table className="w-full border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 text-3xl">Tool</th>
                            <th className="border border-slate-300 text-3xl">Experience<span className="ml-2 text-sm">(scale 10.0)</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.sort((a, b) => a.level > b.level ? -1 : 1).map((item) => (
                            <tr key={item.name}>
                                <td className="border border-slate-300">{item.name}</td>
                                <td className="border border-slate-300">{item.level}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TechTree;
