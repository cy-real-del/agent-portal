import React from 'react';
interface HeaderProps {
className?: string;
}
const Header: React.FC<HeaderProps> = ({ className = '' }) => {
return (
<header className={`bg-white shadow-sm border-b ${className}`}>
<div className="max-w-7xl mx-auto px-4 py-4">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<div 
className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
style={{ backgroundColor: '#C5A880' }}
>
🏠
</div>
<div>
<h1 className="text-xl font-bold text-gray-900">Agent Portal</h1>
<p className="text-sm text-gray-600">CyprusProperties Pro</p>
</div>
</div>

<div className="flex items-center gap-4">
<nav className="hidden md:flex items-center gap-6">
<a 
href="#properties" 
className="text-gray-600 hover:text-cyprus-600 transition-colors"
>
Недвижимость
</a>
<a 
href="#complexes" 
className="text-gray-600 hover:text-cyprus-600 transition-colors"
>
Комплексы
</a>
<a 
href="#analytics" 
className="text-gray-600 hover:text-cyprus-600 transition-colors"
>
Аналитика
</a>
</nav>

<div className="flex items-center gap-2">
<button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
Войти
</button>
<button 
className="text-white px-3 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium"
style={{ backgroundColor: '#C5A880' }}
>
Создать агента
</button>
</div>
</div>
</div>

{/* Mobile menu button */}
<div className="md:hidden mt-3">
<button className="w-full text-left text-gray-600 hover:text-cyprus-600 py-2">
Меню ☰
</button>
</div>
</div>
</header>
);
};
export default Header;
