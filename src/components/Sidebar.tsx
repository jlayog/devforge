import React, { useState } from 'react';
import {
    HomeIcon,
    UserIcon,
    CogIcon,
    DocumentTextIcon,
    FolderIcon,
    CodeBracketIcon,
    WrenchScrewdriverIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BeakerIcon,
    BookOpenIcon,
    CommandLineIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
    isCollapsed?: boolean;
    onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isCollapsed: externalCollapsed, 
    onToggle 
}) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const { isDarkMode } = useTheme();
    
    // Use external collapsed state if provided, otherwise use internal state
    const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

    const handleToggle = () => {
        const newCollapsed = !isCollapsed;
        if (onToggle) {
            onToggle(newCollapsed);
        } else {
            setInternalCollapsed(newCollapsed);
        }
    };

    const menuItems = [
        { 
            icon: HomeIcon, 
            label: 'Dashboard', 
            href: '#dashboard',
            active: true 
        },
        { 
            icon: CodeBracketIcon, 
            label: 'Projects', 
            href: '#projects' 
        },
        { 
            icon: FolderIcon, 
            label: 'Files', 
            href: '#files' 
        },
        { 
            icon: DocumentTextIcon, 
            label: 'Documentation', 
            href: '#docs' 
        },
        { 
            icon: WrenchScrewdriverIcon, 
            label: 'Tools', 
            href: '#tools' 
        },
        { 
            icon: BeakerIcon, 
            label: 'Experiments', 
            href: '#experiments' 
        },
        { 
            icon: CommandLineIcon, 
            label: 'Terminal', 
            href: '#terminal' 
        },
        { 
            icon: BookOpenIcon, 
            label: 'Learning', 
            href: '#learning' 
        },
    ];

    const bottomMenuItems = [
        { 
            icon: UserIcon, 
            label: 'Profile', 
            href: '#profile' 
        },
        { 
            icon: CogIcon, 
            label: 'Settings', 
            href: '#settings' 
        },
    ];

    return (
        <div className={`
            ${isCollapsed ? 'w-16' : 'w-64'} 
            bg-white dark:bg-gray-900 
            border-r border-gray-200 dark:border-gray-700 
            transition-all duration-300 ease-in-out 
            flex flex-col 
            h-screen 
            shadow-lg
        `}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <CodeBracketIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                DevForge
                            </span>
                        </div>
                    )}
                    <button
                        onClick={handleToggle}
                        className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? (
                            <ChevronRightIcon className="w-5 h-5" />
                        ) : (
                            <ChevronLeftIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`
                                flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                ${item.active 
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <IconComponent className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="truncate">{item.label}</span>
                            )}
                        </a>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
                {bottomMenuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`
                                flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <IconComponent className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="truncate">{item.label}</span>
                            )}
                        </a>
                    );
                })}
            </div>

            {/* Version indicator (only show when expanded) */}
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>v1.0.0</span>
                        <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-purple-400' : 'bg-green-400'}`} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
