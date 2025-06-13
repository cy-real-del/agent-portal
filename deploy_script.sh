#!/bin/bash

# Скрипт для развертывания модульной структуры Agent Portal на GitHub
echo "🚀 Развертывание Agent Portal на GitHub..."

# Проверяем, что мы в git репозитории
if [ ! -d ".git" ]; then
    echo "❌ Ошибка: Запустите скрипт в корне git репозитория"
    echo "Сначала выполните: git clone https://github.com/cy-real-del/agent-portal.git"
    exit 1
fi

# Создаем структуру папок
echo "📁 Создание структуры папок..."
mkdir -p frontend/src/{components/{layout,filters,map,properties,complexes,selection,stats},pages,hooks,services,utils,types,assets}
mkdir -p backend/src/{controllers,models,routes,middleware,services,utils}
mkdir -p database/{migrations,seeds}
mkdir -p shared/{types,constants}
mkdir -p docs

echo "📄 Создание файлов конфигурации..."

# Frontend package.json
cat > frontend/package.json << 'EOF'
{
  "name": "agent-portal-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@tanstack/react-query": "^5.8.0",
    "axios": "^1.6.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@types/leaflet": "^1.9.8",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.1.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "typescript": "^5.2.2",
    "vite": "^4.5.0"
  }
}
EOF

# Vite config
cat > frontend/vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
EOF

# Tailwind config
cat > frontend/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyprus: {
          50: '#fdf9f3',
          100: '#f5f1eb',
          200: '#e8ddd0',
          300: '#d9c6a8',
          400: '#c5a880',
          500: '#b8956b',
          600: '#a87f59',
          700: '#8b6749',
          800: '#70533e',
          900: '#5a4334',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
EOF

# PostCSS config
cat > frontend/postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# TypeScript config для frontend
cat > frontend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Index.html для frontend
cat > frontend/index.html << 'EOF'
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Agent Portal - CyprusProperties Pro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Main.tsx
cat > frontend/src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# Index.css
cat > frontend/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', ui-sans-serif, system-ui;
  }
}

@layer components {
  .btn-primary {
    @apply bg-cyprus-400 text-white px-4 py-2 rounded-lg hover:bg-cyprus-500 transition-colors;
  }
  
  .btn-secondary {
    @apply bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-4;
  }
}

/* Leaflet custom styles */
.leaflet-container {
  height: 100%;
  width: 100%;
  border-radius: 8px;
}

.custom-div-icon {
  background: none;
  border: none;
}

.complex-marker {
  background: #C5A880;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
}

.property-marker {
  background: #10B981;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.property-marker.reserved {
  background: #F59E0B;
}

.property-marker.sold {
  background: #EF4444;
}
EOF

# Обновляем корневой package.json
cat > package.json << 'EOF'
{
  "name": "agent-portal",
  "version": "1.0.0",
  "description": "Web portal for AI agents management and interaction",
  "scripts": {
    "dev": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "preview": "cd frontend && npm run preview",
    "install:frontend": "cd frontend && npm install",
    "install:backend": "cd backend && npm install",
    "install:all": "npm run install:frontend && npm run install:backend"
  },
  "keywords": ["ai", "agents", "chatbot", "react", "nodejs", "typescript"],
  "author": "cy-real-del",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/cy-real-del/agent-portal.git"
  }
}
EOF

# Обновляем .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage
coverage/

# Database
*.sqlite
*.sqlite3
*.db

# Temporary folders
tmp/
temp/

# Build artifacts
*.tsbuildinfo
EOF

# Создаем placeholder файлы для будущих компонентов
echo "📦 Создание placeholder файлов..."

# Types
cat > frontend/src/types/index.ts << 'EOF'
// Placeholder - будет заменен полными типами
export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'villa' | 'studio' | 'house';
  status: 'available' | 'reserved' | 'sold';
  price: number;
  // ... остальные поля будут добавлены
}

export interface Complex {
  id: string;
  name: string;
  // ... остальные поля будут добавлены
}

export type ViewMode = 'properties' | 'complexes';
EOF

# Basic App component
cat > frontend/src/App.tsx << 'EOF'
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
EOF

# README update
cat > README.md << 'EOF'
# Agent Portal 🤖

Веб-портал для создания, управления и взаимодействия с AI агентами.

## 🎯 Статус проекта

- ✅ **Демо готово**: [CyprusProperties Demo](https://cy-real-del.github.io/agent-portal/cyprus-properties-demo.html)
- 🚧 **Модульная версия**: В разработке

## 🚀 Возможности

- **Управление агентами**: Создание и настройка AI агентов
- **Real-time чат**: Общение с агентами
- **Интерактивные карты**: Для портала недвижимости
- **Аналитика**: Мониторинг и статистика

## 🛠 Технологический стек

### Frontend
- React 18 + TypeScript
- Vite + Tailwind CSS
- Leaflet для карт
- React Query

### Backend (планируется)
- Node.js + Express + TypeScript
- PostgreSQL + Prisma
- Socket.io для real-time

## 🏗 Структура проекта

```
agent-portal/
├── cyprus-properties-demo.html  # Рабочее демо
├── frontend/                    # Модульная React версия
│   ├── src/
│   │   ├── components/         # React компоненты
│   │   ├── hooks/              # Custom hooks
│   │   ├── types/              # TypeScript типы
│   │   └── ...
├── backend/                     # API сервер (планируется)
└── docs/                       # Документация
```

## 🚦 Быстрый старт

### Запуск демо
Откройте: https://cy-real-del.github.io/agent-portal/cyprus-properties-demo.html

### Разработка модульной версии
```bash
# Клонирование
git clone https://github.com/cy-real-del/agent-portal.git
cd agent-portal

# Установка зависимостей
npm run install:frontend

# Запуск разработки
npm run dev
```

## 📋 Планы развития

- [x] Демо портала недвижимости
- [x] Базовая структура модульного React приложения
- [ ] Компоненты управления недвижимостью
- [ ] Интеграция карт в модульную версию
- [ ] Backend API
- [ ] AI агенты для недвижимости
- [ ] Система аутентификации
- [ ] Панель администратора

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку: `git checkout -b feature/new-feature`
3. Зафиксируйте: `git commit -m 'Add new feature'`
4. Отправьте: `git push origin feature/new-feature`
5. Создайте Pull Request

---

⭐ Поставьте звезду, если проект полезен!
EOF

echo "✅ Файлы созданы!"
echo ""
echo "🚀 Теперь выполните команды:"
echo "git add ."
echo "git status  # проверьте что добавилось"
echo "git commit -m 'Add modular React structure with TypeScript'"
echo "git push origin main"
echo ""
echo "📱 После push ваш сайт будет доступен:"
echo "- Демо: https://cy-real-del.github.io/agent-portal/cyprus-properties-demo.html"
echo "- Новая версия: https://cy-real-del.github.io/agent-portal/frontend/dist/"
echo ""
echo "🎉 Готово! Проект готов к разработке!"
EOF