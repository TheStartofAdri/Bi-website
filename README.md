# Спутник веры — сайт sputnikvery.com

Статический маркетинговый сайт и центр поддержки iOS-приложения **«Спутник веры»** (Sputnik Very / Faith Companion).

- Чистые HTML5 / CSS3 / Vanilla JS — без сборки, без сервера, без базы данных
- Без внешних шрифтов, CDN, cookies и аналитики
- Готов к публикации на GitHub Pages с доменом `sputnikvery.com`

## Структура

```
/
├── index.html              Главная страница
├── 404.html                Страница «не найдено»
├── CNAME                   Домен для GitHub Pages (sputnikvery.com)
├── .nojekyll               Отключает обработку Jekyll на GitHub Pages
├── robots.txt              Правила для поисковых роботов
├── sitemap.xml             Карта сайта (6 страниц)
├── assets/
│   ├── css/styles.css      Все стили (CSS-переменные с палитрой — в начале файла)
│   ├── js/main.js          Вся логика + SITE_CONFIG (конфигурация)
│   ├── icons/              favicon.svg, logo.svg, apple-touch-icon.png
│   ├── images/             app-preview.svg (декор), og-image.jpg (карточка для соцсетей)
│   └── screenshots/        Скриншоты приложения (см. ниже)
├── support/index.html      Поддержка (Support URL для App Store Connect)
├── help/index.html         Центр помощи с поиском
├── contact/index.html      Контакты (mailto-темы)
├── privacy/index.html      Политика конфиденциальности
└── terms/index.html        Условия использования
```

## 1. Локальный просмотр

Из корня проекта:

```bash
python3 -m http.server 8000
```

Откройте http://localhost:8000. Сайт использует корневые ссылки (`/support/` и т.п.),
поэтому просматривать нужно именно через локальный сервер, а не открывая файлы двойным кликом.

## 2. Скриншоты

Сайт показывает 6 карточек скриншотов. Файлы лежат в `assets/screenshots/`:

| Файл | Экран | Статус |
|---|---|---|
| `today.jpg` | Сегодня | есть |
| `tradition.jpg` | Выбор традиции | есть |
| `bible.jpg` | Библия | добавить позже |
| `prayers.jpg` | Молитвы | добавить позже |
| `calendar.jpg` | Календарь | добавить позже |
| `more.jpg` | Ещё | добавить позже |

Если файла нет, вместо «битой картинки» автоматически показывается аккуратная
CSS-заглушка «Скриншот скоро появится» — ничего дополнительно делать не нужно.

Чтобы добавить скриншот: сохраните JPEG с точным именем из таблицы (рекомендуемая
ширина ~800 px, портретная ориентация) в `assets/screenshots/` — карточка подхватит его сама.

## 3. Ссылка на App Store

Все кнопки «Скачать в App Store» настраиваются **в одном месте** — в начале
`assets/js/main.js`:

```js
const SITE_CONFIG = {
  appStoreUrl: "APP_STORE_URL",   // ← замените на реальную ссылку
  ...
};
```

Пока стоит заглушка `APP_STORE_URL`, кнопки показывают «Скоро в App Store» и
некликабельны (доступно и для скринридеров). После замены на реальную ссылку
(`https://apps.apple.com/app/id…`) все кнопки автоматически станут активными
с текстом «Скачать в App Store».

## 4. Email поддержки

Адрес `support@sputnikvery.com` указан:

1. В `SITE_CONFIG.supportEmail` (`assets/js/main.js`) — JS подставляет его во все
   элементы с атрибутом `data-support-email`.
2. Непосредственно в `mailto:`-ссылках в HTML (чтобы всё работало и без JS).

Чтобы сменить адрес: поменяйте значение в `SITE_CONFIG` **и** выполните
поиск-замену `support@sputnikvery.com` по всем HTML-файлам.

## 5. Тексты о подписке

Формулировки о подписке находятся в:

- `index.html` — секция `#pricing` и FAQ (`#faq`);
- `support/index.html` — раздел «Управление подпиской»;
- `help/index.html` — категория «Подписка и пробный период»;
- `terms/index.html` — разделы 4–8.

Конкретные цены на сайте сознательно не указаны: цены задаёт App Store и они
зависят от региона. Если меняете условия (длительность пробного периода, планы) —
обновите все четыре места.

## 6. Публикация через GitHub Pages

1. Создайте на GitHub репозиторий `Bi-website` (публичный — GitHub Pages на
   бесплатном тарифе работает только с публичными репозиториями).
2. Запушьте содержимое в ветку `main`:
   ```bash
   git remote add origin https://github.com/TheStartofAdri/Bi-website.git
   git push -u origin main
   ```
3. В репозитории откройте **Settings → Pages**.
4. В разделе **Build and deployment**: Source — **Deploy from a branch**,
   Branch — **main**, папка — **/ (root)**. Нажмите Save.
5. В поле **Custom domain** введите `sputnikvery.com` и сохраните
   (файл `CNAME` уже лежит в репозитории — GitHub его подхватит).
6. После успешной проверки домена включите **Enforce HTTPS**.

## 7. Подключение домена sputnikvery.com (DNS)

Настройка выполняется в панели вашего регистратора домена; интерфейс зависит от
регистратора. Типовые записи для apex-домена GitHub Pages:

| Тип | Имя | Значение |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | thestartofadri.github.io |

> **Важно:** это распространённые значения на момент создания сайта. Перед
> настройкой сверьтесь с актуальной официальной документацией GitHub:
> https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

Обновление DNS может занять от нескольких минут до 24–48 часов.

## 8. HTTPS

После того как DNS указывает на GitHub Pages и домен прошёл проверку в
**Settings → Pages**, включите флажок **Enforce HTTPS**. GitHub автоматически
выпустит сертификат Let's Encrypt (иногда с задержкой до нескольких часов —
если флажок неактивен, подождите и обновите страницу).

## 9. Проверка перед отправкой в App Store Connect

В App Store Connect укажите:

- **Marketing URL:** `https://sputnikvery.com/`
- **Support URL:** `https://sputnikvery.com/support/`
- **Privacy Policy URL:** `https://sputnikvery.com/privacy/`

Чек-лист перед отправкой:

- [ ] Все 6 страниц открываются по HTTPS: `/`, `/support/`, `/help/`, `/contact/`, `/privacy/`, `/terms/`
- [ ] `/404.html` и любой несуществующий адрес показывают фирменную страницу 404
- [ ] Кнопки App Store ведут на реальную страницу приложения (после замены `appStoreUrl`)
- [ ] Все `mailto:`-ссылки открывают письмо на `support@sputnikvery.com`
- [ ] Мобильное меню, аккордеоны FAQ и поиск в `/help/` работают
- [ ] Сайт корректно выглядит на ширине 320 px (нет горизонтальной прокрутки)
- [ ] `sitemap.xml` и `robots.txt` доступны и содержат домен `sputnikvery.com`
- [ ] Тексты политики (`/privacy/`) и условий (`/terms/`) сверены с фактической
      реализацией приложения (см. HTML-комментарии для разработчика в этих файлах)

## Что нужно заменить перед/после публикации

| Что | Где |
|---|---|
| Ссылка App Store | `assets/js/main.js` → `SITE_CONFIG.appStoreUrl` |
| Недостающие скриншоты | `assets/screenshots/bible.jpg`, `prayers.jpg`, `calendar.jpg`, `more.jpg` |
| DNS-записи домена | панель регистратора |
| Юридическая проверка | `/privacy/`, `/terms/` |
