# ProSai Client - Modern Project Management Application

A modern project management application built with Next.js 15, Ant Design, and Tailwind CSS, featuring a comprehensive set of mixins and optimized architecture with responsive design for desktop and mobile.

## 🚀 Features

- **Modern Architecture**: Built with Next.js 15 App Router
- **UI Framework**: Ant Design with custom components
- **Styling**: Tailwind CSS with custom mixins
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Separate layouts for desktop and mobile
- **Component Library**: Reusable UI components
- **Custom Hooks**: Utility hooks for common functionality
- **Optimized Performance**: Next.js optimizations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: npm
- **Icons**: Ant Design Icons

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── demos/             # Demo pages
│   │   ├── borderless-select/ # Select variants demo
│   │   ├── login-demo/    # Login modal demo
│   │   ├── theme-demo/    # Theme showcase
│   │   └── ...            # Other demos
│   ├── account-overview/  # Account management pages
│   ├── property/          # Property pages
│   ├── news/              # News pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── layouts/               # Layout components
│   ├── shared/           # Shared layouts
│   │   └── MainLayout.tsx # Main application layout
│   ├── desktop/          # Desktop layouts
│   │   ├── Header.tsx    # Desktop header
│   │   ├── Footer.tsx    # Desktop footer
│   │   ├── Dashboard.tsx # Desktop dashboard
│   │   └── pages/        # Desktop-specific pages
│   ├── mobile/           # Mobile layouts
│   │   ├── Header.tsx    # Mobile header
│   │   ├── Footer.tsx    # Mobile footer
│   │   ├── Dashboard.tsx # Mobile dashboard
│   │   ├── BottomNav.tsx # Mobile bottom navigation
│   │   └── pages/        # Mobile-specific pages
│   ├── ResponsiveDashboard.tsx # Main responsive dashboard
│   └── index.ts          # Layout exports
├── components/            # React components
│   ├── ui/               # UI components (Design System)
│   │   ├── buttons/      # Button components
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Layout components
│   │   ├── feedback/     # Feedback components
│   │   ├── data-display/ # Data display components
│   │   ├── navigation/   # Navigation components
│   │   └── overlay/      # Overlay components
│   ├── features/         # Feature components (Business Logic)
│   │   ├── auth/         # Authentication components
│   │   ├── property/     # Property-related components
│   │   ├── account/      # Account management components
│   │   └── news/         # News components
│   └── shared/           # Shared utility components
│       ├── empty-states/ # Empty state components
│       ├── loading/      # Loading components
│       └── upgrade/      # Upgrade components
├── hooks/                # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useDevice.ts      # Device detection hook
├── utils/                # Utility functions
│   └── format.ts
├── types/                # TypeScript types
│   └── index.ts
├── constants/            # Application constants
│   └── index.ts
├── services/             # API services
├── styles/               # Custom styles
│   └── mixins.css        # Tailwind CSS mixins
└── lib/                  # Third-party libraries
```

## 📱 Responsive Design System

### Desktop Layout
- **Header**: Full navigation with search, notifications, and user menu
- **Sidebar**: Comprehensive navigation with nested menus and quick stats
- **Content**: Multi-column layout with detailed information
- **Features**: 
  - Horizontal navigation menu
  - Sidebar with user profile and stats
  - Detailed project cards with budgets
  - Full-width statistics grid
  - Comprehensive task lists

### Mobile Layout
- **Header**: Compact header with hamburger menu and essential actions
- **Bottom Navigation**: Tab-based navigation for quick access
- **Content**: Single-column layout optimized for touch
- **Features**:
  - Drawer navigation menu
  - Bottom tab navigation
  - Compact statistics cards
  - Touch-friendly buttons and cards
  - Simplified project and task views

### Device Detection
The application uses a custom `useDevice` hook to detect screen size and automatically switch between layouts:

```typescript
const { isDesktop, isMobile, isTablet, screenWidth, screenHeight } = useDevice();
```

**Breakpoints:**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Mixins System

The project includes a comprehensive mixins system built with Tailwind CSS:

### Flexbox Mixins
- `.flex-center` - Center items both horizontally and vertically
- `.flex-between` - Space items between
- `.flex-start` - Align items to start
- `.flex-end` - Align items to end
- `.flex-col-center` - Center items in column layout
- `.flex-col-between` - Space items between in column layout

### Spacing Mixins
- `.section-padding` - Responsive section padding
- `.container-padding` - Responsive container padding
- `.card-padding` - Responsive card padding

### Typography Mixins
- `.heading-1` - Large heading styles
- `.heading-2` - Medium heading styles
- `.heading-3` - Small heading styles
- `.body-text` - Body text styles
- `.caption-text` - Caption text styles

### Button Mixins
- `.btn-primary` - Primary button styles
- `.btn-secondary` - Secondary button styles
- `.btn-outline` - Outline button styles

### Card Mixins
- `.card` - Basic card styles
- `.card-elevated` - Elevated card styles

### Form Mixins
- `.input-field` - Input field styles
- `.input-error` - Error input styles

### Animation Mixins
- `.fade-in` - Fade in animation
- `.slide-up` - Slide up animation
- `.scale-in` - Scale in animation

### Responsive Mixins
- `.responsive-grid` - Responsive grid layout
- `.responsive-container` - Responsive container

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prosai-client
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Key Features

### 1. Responsive Architecture
- **Device Detection**: Automatic layout switching based on screen size
- **Desktop Layout**: Full-featured layout with sidebar navigation
- **Mobile Layout**: Touch-optimized layout with bottom navigation
- **Tablet Support**: Optimized for medium screen sizes

### 2. Component Organization
- **Responsive Components**: Separate components for desktop and mobile
- **Shared Logic**: Common business logic across device types
- **Consistent Design**: Unified design system with device-specific optimizations

### 3. UI/UX Design
- **Desktop**: Rich interface with detailed information and multi-column layouts
- **Mobile**: Simplified interface with touch-friendly controls and single-column layout
- **Consistent Branding**: Unified visual identity across all device types

### 4. Development Experience
- **Hot Reloading**: Fast development with automatic refresh
- **TypeScript**: Full type safety across all components
- **Modular Structure**: Easy to maintain and extend

## 🎨 Customization

### Adding New Responsive Components

1. Create device-specific components in appropriate directories:
```
src/components/responsive/
├── desktop/
│   └── DesktopComponent.tsx
├── mobile/
│   └── MobileComponent.tsx
└── ResponsiveComponent.tsx
```

2. Use the `useDevice` hook to switch between components:
```typescript
const ResponsiveComponent = () => {
  const { isDesktop } = useDevice();
  return isDesktop ? <DesktopComponent /> : <MobileComponent />;
};
```

### Creating New Mixins

To add new mixins, edit `src/styles/mixins.css`:

```css
@layer utilities {
  .your-mixin {
    @apply your-tailwind-classes;
  }
}
```

### Theme Customization

The theme can be customized in `src/app/layout.tsx`:

```tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#your-color',
      borderRadius: 8,
    },
  }}
>
```

## 📱 Responsive Testing

### Desktop Testing
- Test on screens larger than 1024px
- Verify sidebar navigation functionality
- Check multi-column layouts
- Test detailed information displays

### Mobile Testing
- Test on screens smaller than 768px
- Verify touch interactions
- Check bottom navigation
- Test simplified layouts

### Tablet Testing
- Test on screens between 768px and 1024px
- Verify responsive behavior
- Check layout adaptations

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple device sizes
5. Add tests if applicable
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions, please open an issue in the repository.
