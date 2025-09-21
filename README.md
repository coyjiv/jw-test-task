# Next.js Showcase - Тестовое задание

Production-ready приложение для отображения контента с поддержкой SSR, SSG и SPA режимов рендеринга.

## 🏗️ Структура проекта

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Главная страница (/)
│   ├── layout.tsx         # Корневой layout
│   ├── providers.tsx      # React Query провайдер
│   ├── globals.css        # Глобальные стили
│   ├── ssr-test/page.tsx  # SSR тест (/ssr-test)
│   ├── ssg-test/page.tsx  # SSG тест (/ssg-test)
│   ├── spa-test/page.tsx  # SPA тест (/spa-test)
│   ├── rendering-modes/page.tsx
│   └── api/proxy/         # API прокси для CMS
├── components/            # React компоненты
│   ├── ui/               # Базовые UI компоненты
│   ├── content-card.tsx  # Карточка контента
│   ├── showcase-grid.tsx # Сетка витрины
│   ├── header.tsx        # Шапка сайта
│   └── layout.tsx        # Layout компонент
├── lib/                  # Утилиты и конфигурация
│   ├── api/              # API клиенты
│   ├── config/           # Конфигурация
│   ├── schemas.ts        # Zod схемы
│   ├── reference-resolver.ts
│   └── utils.ts          # Утилиты
├── hooks/                # React хуки
└── public/               # Статические файлы
```

## 🚀 Технологии

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Radix UI** - UI компоненты
- **TanStack Query** - управление состоянием
- **Zod** - валидация схем

## 📋 Функциональность

### ✅ Реализованные требования:

1. **Технический стек**
   - ✅ Next.js вместо Nuxt3
   - ✅ TypeScript для типизации
   - ✅ Современный UI с Tailwind CSS

2. **API интеграция**
   - ✅ Подключение к CMS API (`https://cms.test.ksfr.tech/api/v1`)
   - ✅ Проксирование запросов через Next.js API routes
   - ✅ Обработка CORS

3. **Автоматическое разрешение ссылок**
   - ✅ Поддержка всех типов ссылок: `genre`, `label`, `country`, `studio`, `reward`, `job`, `kind`, `asset`, `contentbanner`
   - ✅ Автоматическая замена ссылок на полные объекты
   - ✅ Кэширование разрешенных ссылок

4. **Отображение информации**
   - ✅ Название контента
   - ✅ Постеры с оптимизацией изображений
   - ✅ Жанры с ограничением (макс 3)
   - ✅ Возрастные ограничения
   - ✅ Описание (синопсис)
   - ✅ Лейблы с градиентными цветами

5. **Визуальный дизайн**
   - ✅ Адаптивная сетка (1-5 колонок)
   - ✅ Hover эффекты и анимации
   - ✅ Современный дизайн карточек
   - ✅ Responsive дизайн

6. **Production-ready аспекты**
   - ✅ Централизованная конфигурация API
   - ✅ Обработка ошибок с fallback
   - ✅ Оптимизация изображений (LCP)
   - ✅ Кэширование и переиспользование
   - ✅ Environment переменные
   - ✅ TypeScript строгая типизация

7. **Режимы рендеринга**
   - ✅ **SSR** - Server-Side Rendering (данные на каждый запрос)
   - ✅ **SSG** - Static Site Generation с ISR (кэш на 1 час)
   - ✅ **SPA** - Single Page Application (клиентский рендеринг)

## 🛠️ Установка и запуск

```bash
# Установка зависимостей
pnpm install

# Настройка переменных окружения
cp env.example .env.local

# Запуск в режиме разработки
pnpm run dev

# Сборка для продакшена
pnpm run build

# Запуск продакшен версии
pnpm run start
```

## 🌐 Доступные страницы

- **`/`** - Главная страница (ISR, перевалидация каждые 5 минут)
- **`/ssr-test`** - Тест SSR режима
- **`/ssg-test`** - Тест SSG режима с ISR (кэш 1 час)
- **`/spa-test`** - Тест SPA режима
- **`/rendering-modes`** - Описание и сравнение режимов

## 🔧 Конфигурация

Все настройки API централизованы в `lib/config/api.ts`:

```typescript
export const API_CONFIG = {
  CMS_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
  // ... остальные настройки
}
```

## 📊 Производительность

- **LCP оптимизация** - приоритетная загрузка первых 4 изображений
- **Кэширование** - React Query кэш на 5 минут
- **ISR** - автоматическая перевалидация статических страниц
- **Оптимизация изображений** - Next.js Image с автоматическим сжатием

## 🎯 Production Features

- ✅ Centralized API configuration
- ✅ Environment variables
- ✅ Type safety
- ✅ Error handling
- ✅ Performance optimization
- ✅ Responsive design

## 📝 Лицензия

Тестовое задание для JW.