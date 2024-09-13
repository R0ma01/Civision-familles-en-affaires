import React, { useState, useRef, useEffect } from 'react';
import { TableauxTraductionsMainDataFields } from '@/services/translations';
import { value_constants } from '@/constants/constants';

interface DropdownProps {
    inputValue?: any;
    options: any;
    onChange?: (value: any) => void;
    displayValue?: (value: any) => string; // Function to display the value
    className?: string;
}

const Dropdown = ({
    inputValue,
    options,
    onChange = () => {},
    displayValue = (value: any) => {
        if (TableauxTraductionsMainDataFields.get(value as string)) {
            return TableauxTraductionsMainDataFields.get(value as string)?.label
                .FR as string;
        }
        return value as string;
    },
    className = '',
}: DropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<any | undefined>(
        inputValue,
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelectedValue(inputValue);
    }, [inputValue]);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDropdownOpen((prev) => !prev);
    };

    const handleSelection = (value: any) => {
        setSelectedValue(value);
        onChange(value);
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className={`flex items-center justify-between w-48 px-2 py-1 bg-gray-100 border max-h-8 h-8 
                border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-opacity-50 text-xs dark:bg-gray-700 dark:text-white dark:hover:bg-black ${className}`}
            >
                <span className="overflow-hidden w-40 max-h-8">
                    {displayValue(
                        selectedValue ??
                            value_constants.all_values_string_filter,
                    )}
                </span>
                <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {dropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-52"
                >
                    <ul className="py-1 max-h-64 overflow-y-auto dark:bg-gray-700">
                        {options.map((option: any) => {
                            return (
                                <li
                                    key={option as unknown as string}
                                    className="w-48 pl-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors text-wrap text-xs dark:text-white dark:hover:bg-black"
                                    onClick={() => handleSelection(option)}
                                >
                                    {displayValue(option)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
