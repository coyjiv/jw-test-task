# Next.js Showcase - Тестовое задание

Production-ready приложение для отображения контента с поддержкой SSR, SSG и SPA режимов рендеринга.

## 🏗️ Архитектура

Проект построен на основе **Feature-Sliced Design (FSD)** архитектуры для логики и компонентов, а страницы используют **Next.js App Router**:

```
app/                       # Next.js App Router (маршруты)
├── page.tsx              # Главная страница (/)
├── ssr-test/page.tsx     # SSR тест (/ssr-test)
├── ssg-test/page.tsx     # SSG тест (/ssg-test)
├── spa-test/page.tsx     # SPA тест (/spa-test)
├── rendering-modes/page.tsx
└── api/proxy/[...path]/route.ts

src/
├── features/              # Features layer (функциональность)
│   ├── content-card/      # Карточка контента
│   └── showcase/          # Витрина контента
├── widgets/               # Widgets layer (композитные блоки)
│   ├── header/            # Шапка сайта
│   └── layout/            # Общий layout
├── entities/              # Entities layer (бизнес-сущности)
│   └── content/           # Контент и схемы данных
└── shared/                # Shared layer (переиспользуемое)
    ├── api/               # API клиенты
    ├── config/            # Конфигурация
    ├── lib/               # Утилиты
    └── ui/                # UI компоненты
```

## 🚀 Технологии

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Radix UI** - UI компоненты
- **TanStack Query** - управление состоянием
- **Zod** - валидация схем
- **FSD** - архитектурная методология

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

Все настройки API централизованы в `src/shared/config/api.ts`:

```typescript
export const API_CONFIG = {
  CMS_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
}
```

## 📊 Производительность

- **LCP оптимизация** - приоритетная загрузка первых 4 изображений
- **Кэширование** - React Query кэш на 5 минут
- **ISR** - автоматическая перевалидация статических страниц
- **Оптимизация изображений** - Next.js Image с автоматическим сжатием

## 🏛️ FSD Архитектура

Проект следует принципам Feature-Sliced Design:

- **Features** - бизнес-функциональность (Showcase, ContentCard)
- **Widgets** - композитные блоки (Header, Layout)
- **Entities** - бизнес-сущности (Content, Schemas)
- **Shared** - переиспользуемый код (UI, API, Utils)

**Страницы** находятся в корневой папке `app/` согласно Next.js App Router.