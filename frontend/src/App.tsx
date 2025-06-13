import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyprus-400 rounded"></div>
            <h1 className="text-xl font-bold text-gray-900">Agent Portal</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">🚀 Agent Portal</h2>
          <p className="text-gray-600 mb-4">
            Модульная версия портала в разработке...
          </p>
          <p className="text-sm text-gray-500">
            Компоненты будут добавлены в следующих коммитах.
          </p>
          
          <div className="mt-6">
            <a 
              href="/cyprus-properties-demo.html" 
              className="btn-primary inline-block"
            >
              Посмотреть демо CyprusProperties
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
