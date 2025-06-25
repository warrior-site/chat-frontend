// utils/personalization.js

export const gradients = [
    {
        id: 'sunset',
        label: 'Sunset',
        value: 'from-yellow-500 via-red-500 to-pink-500',
    },
    {
        id: 'night',
        label: 'Night Sky',
        value: 'from-indigo-700 via-purple-700 to-pink-700',
    },
    {
        id: 'aqua',
        label: 'Aqua Blue',
        value: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
        id: 'forest',
        label: 'Forest',
        value: 'from-green-700 via-lime-600 to-yellow-500',
    },
    { id: 'galaxy', label: 'Galaxy', value: 'from-indigo-900 via-purple-900 to-black' },
    { id: 'ocean', label: 'Ocean', value: 'from-cyan-400 via-blue-600 to-indigo-800' },
    { id: 'classic', label: 'Classic Dark', value: 'from-gray-900 via-gray-800 to-black' },
];

export const fonts = [
    { id: 'sans', label: 'Sans Serif', value: 'font-sans' },      // System UI
    { id: 'serif', label: 'Serif', value: 'font-serif' },         // Georgia
    { id: 'mono', label: 'Monospace', value: 'font-mono' },       // Menlo
    { id: 'poppins', label: 'Poppins', value: 'font-poppins' },   // Needs custom class or Tailwind plugin
    { id: 'inter', label: 'Inter', value: 'font-inter' },         // Popular UI font
    { id: 'raleway', label: 'Raleway', value: 'font-raleway' },   // Modern clean font
    { id: 'lato', label: 'Lato', value: 'font-lato' },             // Friendly feel
    { id: 'roboto', label: 'Roboto', value: 'font-roboto' },       // Material Design
];


export const textSizes = [
    { id: 'sm', label: 'Small', value: 'text-sm' },
    { id: 'base', label: 'Base', value: 'text-base' },
    { id: 'lg', label: 'Large', value: 'text-lg' },
];
export const bubbleStyles = [
  { name: 'Rounded', class: 'rounded-2xl' },
  { name: 'Sharp', class: 'rounded-sm' },
  { name: 'Pill', class: 'rounded-full' }
];

export const messageColors = [
  { name: 'Indigo', class: 'bg-indigo-600' },
  { name: 'Emerald', class: 'bg-emerald-600' },
  { name: 'Rose', class: 'bg-rose-600' },
  { name: 'Slate', class: 'bg-slate-700' }
];