import Link from 'next/link';
import Card from '@/components/ui/data-display/Card';

const demos = [
  {
    title: 'Login Demo',
    description: 'Demo đăng nhập với các provider khác nhau',
    path: '/demos/login-demo',
    category: 'Authentication',
    icon: '👤'
  },
  {
    title: 'Register Demo',
    description: 'Demo đăng ký tài khoản mới',
    path: '/demos/register-demo',
    category: 'Authentication',
    icon: '📝'
  },
  {
    title: 'Theme Demo',
    description: 'Demo các theme và màu sắc khác nhau',
    path: '/demos/theme-demo',
    category: 'UI/UX',
    icon: '🎨'
  },
  {
    title: 'Search Demo',
    description: 'Demo tính năng tìm kiếm',
    path: '/search',
    category: 'Features',
    icon: '🔍'
  },
  {
    title: 'Rating Demo',
    description: 'Demo hệ thống đánh giá',
    path: '/demos/rating-demo',
    category: 'Features',
    icon: '⭐'
  },
  {
    title: 'Header Test',
    description: 'Test header component',
    path: '/demos/header-test',
    category: 'Components',
    icon: '📱'
  },
  {
    title: 'Upgrade Demo',
    description: 'Demo nâng cấp membership',
    path: '/demos/upgrade-demo',
    category: 'Features',
    icon: '🚀'
  },
  {
    title: 'Borderless Select',
    description: 'Demo select component không có border',
    path: '/demos/borderless-select',
    category: 'UI/UX',
    icon: '📋'
  },
  {
    title: 'Select Variants',
    description: 'Demo các biến thể của select component',
    path: '/demos/select-variants',
    category: 'UI/UX',
    icon: '🔽'
  },
  {
    title: 'Empty Demo',
    description: 'Demo empty state components',
    path: '/demos/empty-demo',
    category: 'UI/UX',
    icon: '📭'
  },
  {
    title: 'Debug Auth',
    description: 'Debug authentication flow',
    path: '/demos/debug-auth',
    category: 'Development',
    icon: '🐛'
  },
  {
    title: 'Direct API Demo',
    description: 'Demo gọi API trực tiếp',
    path: '/demos/direct-api-demo',
    category: 'Development',
    icon: '🔌'
  },
];

const categories = ['All', 'Authentication', 'UI/UX', 'Features', 'Components', 'Development'];

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Demo Components
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá các components và features của dự án
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Demos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Link key={demo.path} href={demo.path}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{demo.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {demo.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {demo.description}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {demo.category}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Quick Links
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/auth/signin"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              🔐 Authentication
            </Link>
            <Link 
              href="/"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              🏠 Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
