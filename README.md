# Shift Start - نقطة تحول

موقع ويب احترافي لفريق Shift Start للتطوير والتصميم، مبني باستخدام React و TailwindCSS مع دعم ثنائي اللغة والوضع الليلي.

![Shift Start](https://img.shields.io/badge/Shift%20Start-نقطة%20تحول-FF3C6E)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.1.8-38B2AC)
![Vite](https://img.shields.io/badge/Vite-3.0.7-646CFF)

##  المميزات

###  التصميم والواجهة
- **تصميم حديث وجذاب** مستوحى من ألوان الشعار
- **دعم كامل للوضع الليلي والنهاري** مع التبديل التلقائي
- **تصميم متجاوب 100%** يعمل على جميع الأجهزة
- **تأثيرات بصرية متقدمة** مع Glassmorphism و Gradient effects
- **رسوم متحركة سلسة** باستخدام Framer Motion

###  الدعم اللغوي
- **دعم ثنائي اللغة** (العربية والإنجليزية)
- **دعم كامل لـ RTL** مع تخطيط صحيح للنصوص العربية
- **خطوط محسنة** لكلا اللغتين (Noto Sans Arabic + Inter)
- **ترجمة ديناميكية** لجميع عناصر الموقع

###  الأداء والتقنيات
- **React 18** مع أحدث الميزات
- **Vite** لتطوير وبناء سريع
- **TailwindCSS** للتصميم السريع والمرن
- **Lazy Loading** للصفحات لتحسين الأداء
- **تحسين محركات البحث (SEO)** مع React Helmet
- **Progressive Web App** جاهز

###  الصفحات والمكونات
- **الصفحة الرئيسية** - عرض تقديمي جذاب للفريق
- **من نحن** - معلومات الفريق والرؤية والرسالة
- **الخدمات** - عرض شامل للخدمات المقدمة
- **فريق العمل** - بطاقات تفاعلية لأعضاء الفريق
- **المشاريع** - معرض للأعمال مع فلترة ديناميكية
- **تواصل معنا** - نموذج تواصل متكامل مع الخريطة
- **صفحة 404** - صفحة خطأ إبداعية

##  البدء السريع

### المتطلبات
- Node.js 16+ 
- npm أو yarn

### التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/your-username/shift-start.git
cd shift-start

# تثبيت التبعيات
npm install

# تشغيل الخادم المحلي
npm run dev

# فتح المتصفح على
http://localhost:3000
```

### البناء للإنتاج

```bash
# بناء المشروع
npm run build

# معاينة البناء
npm run preview
```

##  نظام الألوان

النظام اللوني مستوحى من شعار Shift Start:

```css
:root {
  --brand-red: #FF3C6E;      /* اللون الأحمر الرئيسي */
  --brand-pink: #D22E9C;     /* البنفسجي الوردي */
  --brand-purple: #8C1CCB;   /* البنفسجي الغامق */
  --brand-orange: #FF6A3D;   /* البرتقالي الوردي */
  --brand-dark: #1C1C1E;     /* الرمادي الداكن */
}
```

##  هيكل المشروع

```
src/
├── components/          # المكونات القابلة لإعادة الاستخدام
│   ├── Layout/         # مكونات التخطيط (Header, Footer)
│   └── UI/             # مكونات واجهة المستخدم
├── contexts/           # السياقات (Context)
├── i18n/              # ملفات الترجمة
│   └── locales/       # ملفات اللغات
├── pages/             # صفحات الموقع
├── styles/            # ملفات CSS
└── utils/             # الأدوات المساعدة
```

##  التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة JavaScript للواجهات
- **React Router** - التنقل بين الصفحات
- **TailwindCSS** - إطار عمل CSS
- **Framer Motion** - مكتبة الرسوم المتحركة
- **React Helmet** - إدارة meta tags
- **React i18next** - نظام الترجمة
- **React Hot Toast** - إشعارات أنيقة

### Development Tools
- **Vite** - أداة البناء والتطوير
- **ESLint** - فحص جودة الكود
- **PostCSS** - معالج CSS
- **Autoprefixer** - إضافة prefixes تلقائية

##  الميزات المتقدمة

### نظام الثيمات
```javascript
// التبديل بين الأوضاع
const { darkMode, setDarkMode } = useApp();

// تفعيل الوضع الليلي
setDarkMode(true);
```

### نظام الترجمة
```javascript
// استخدام الترجمة
const { t, i18n } = useTranslation();

// تغيير اللغة
i18n.changeLanguage('ar');
```

### الرسوم المتحركة
```javascript
// رسوم متحركة عند الظهور
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  محتوى متحرك
</motion.div>
```

## تحسين الأداء

- **Code Splitting** - تقسيم الكود للتحميل عند الطلب
- **Lazy Loading** - تحميل الصفحات عند الحاجة
- **Image Optimization** - ضغط وتحسين الصور
- **CSS Purging** - إزالة CSS غير المستخدم
- **Bundle Analysis** - تحليل حجم الملفات

##  التخصيص

### إضافة صفحة جديدة
1. إنشاء ملف في مجلد `src/pages`
2. إضافة المسار في `App.jsx`
3. تحديث ملفات الترجمة
4. إضافة رابط في التنقل

### تخصيص الألوان
قم بتعديل ملف `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        red: '#YOUR_COLOR',
        // الألوان الأخرى
      }
    }
  }
}
```

##  الترجمة

لإضافة لغة جديدة:
1. إنشاء ملف في `src/i18n/locales/`
2. تحديث `src/i18n/index.js`
3. إضافة خيار اللغة في Header

##  دعم PWA

الموقع جاهز ليصبح Progressive Web App:
- Service Worker للعمل بدون إنترنت
- Web App Manifest للتثبيت
- استجابة سريعة ومتجاوبة

##  الأمان

- تنظيف المدخلات لمنع XSS
- استخدام HTTPS في الإنتاج
- Headers الأمان المناسبة
- فحص التبعيات بانتظام

##  التطوير المستقبلي

### ميزات مخططة
- [ ] لوحة تحكم إدارية
- [ ] نظام إدارة المحتوى
- [ ] API متكامل
- [ ] قاعدة بيانات
- [ ] نظام المصادقة
- [ ] رفع الصور
- [ ] نظام التعليقات
- [ ] تحليلات الزوار



##  التواصل

- **الموقع**: [shiftstart.sy](https://shiftstart.sy)
- **البريد**: info@shiftstart.sy
- **الهاتف**:  0994109259 

