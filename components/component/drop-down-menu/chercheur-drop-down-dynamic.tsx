// 'use client';
// import React, { useState } from 'react';
// import {
//     ChercheurDropdownItem,
//     ChercheurDropdownSection,
// } from '@/components/interface/chercheur-drop-down-content';
// import { MainDataFields } from '@/components/enums/data-types-enum';

// function generateDropdownStructure(): (
//     | ChercheurDropdownItem
//     | ChercheurDropdownSection
// )[] {
//     const structure: Record<string, ChercheurDropdownSection> = {};

//     Object.values(MainDataFields).forEach((value: MainDataFields) => {
//         const parts = value.split(/ /); // Split by underscore or space
//         const section = parts[0].toLowerCase();
//         const subSection = parts[1]?.toLowerCase();
//         const subSubSection = parts[2]?.toLowerCase();

//         // Ensure section exists
//         if (!structure[section]) {
//             structure[section] = { label: section, items: [] };
//         }

//         const sectionItems = structure[section]
//             .items as ChercheurDropdownSection[];

//         // If there's a subsection, handle it
//         if (subSection) {
//             let tempSubSection = sectionItems.find(
//                 (item) => 'items' in item && item.label === subSection,
//             ) as ChercheurDropdownSection;

//             if (!tempSubSection) {
//                 tempSubSection = { label: subSection, items: [] };
//                 sectionItems.push(tempSubSection);
//             }

//             // Handle subSubsection if it exists
//             if (subSubSection) {
//                 let tempSubSubSection = tempSubSection.items.find(
//                     (item) => 'items' in item && item.label === subSubSection,
//                 ) as ChercheurDropdownSection;

//                 if (!tempSubSubSection) {
//                     tempSubSubSection = { label: subSubSection, items: [] };
//                     tempSubSection.items.push(tempSubSubSection);
//                 }

//                 tempSubSubSection.items.push({ label: value, donnees: value });
//             } else {
//                 tempSubSection.items.push({ label: value, donnees: value });
//             }
//         } else {
//             structure[section].items.push({
//                 label: value,
//                 donnees: value,
//             });
//         }
//     });

//     return Object.values(structure);
// }

// interface ChercheurDropdownProps {
//     onClick: (value: MainDataFields) => void;
// }

// const ChercheurDropdown: React.FC<ChercheurDropdownProps> = ({ onClick }) => {
//     const [expandedSections, setExpandedSections] = useState<string[]>([]);

//     const toggleSection = (sectionLabel: string) => {
//         setExpandedSections((prev) =>
//             prev.includes(sectionLabel)
//                 ? prev.filter((label) => label !== sectionLabel)
//                 : [...prev, sectionLabel],
//         );
//     };

//     const renderItems = (
//         items: (ChercheurDropdownItem | ChercheurDropdownSection)[],
//         isRootLevel: boolean = true,
//     ) => {
//         return items.map((item, index) => {
//             if ('items' in item && item.items.length > 1) {
//                 return (
//                     <div key={index} className={`pl-4`}>
//                         <button
//                             onClick={() => toggleSection(item.label)}
//                             className="flex justify-between items-center w-full text-sm font-medium text-gray-800 hover:text-gray-600 focus:outline-none border-b-logo-turquoise border-b-2 p-2"
//                         >
//                             {item.label}
//                             <span className="text-gray-500">
//                                 {expandedSections.includes(item.label)
//                                     ? '▼'
//                                     : '▲'}
//                             </span>
//                         </button>
//                         {expandedSections.includes(item.label) && (
//                             <div className="ml-4 border-l border-gray-200 pl-4 mt-2">
//                                 {renderItems(item.items, false)}
//                             </div>
//                         )}
//                     </div>
//                 );
//             }

//             // Render root-level items directly as buttons
//             if (isRootLevel && !('items' in item)) {
//                 return (
//                     <button
//                         key={index}
//                         onClick={() => onClick(item.donnees)}
//                         className="w-full text-left py-2 text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-logo-turquoise hover:bg-opacity-50 rounded transition duration-150 ease-in-out"
//                     >
//                         {item.label}
//                     </button>
//                 );
//             }

//             // Render non-root-level items as normal items
//             return (
//                 <button
//                     key={index}
//                     onClick={() => onClick(item.value)}
//                     className="w-full text-left pl-4 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-logo-turquoise hover:bg-opacity-50 rounded transition duration-150 ease-in-out"
//                 >
//                     {item.label}
//                 </button>
//             );
//         });
//     };

//     const dropdownStructure = generateDropdownStructure(); // Dynamically generated structure

//     return (
//         <div className="w-[500px] h-[340px] flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-lg px-4">
//             <div className="w-[480px] h-80 overflow-y-auto px-4">
//                 {renderItems(dropdownStructure, true)}
//             </div>
//         </div>
//     );
// };

// export default ChercheurDropdown;
