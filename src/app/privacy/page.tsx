'use client';

import React from 'react';
import { Typography, Card, Divider } from 'antd';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';
import { Breadcrumb } from '@/components/ui/navigation';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="responsive-container mx-auto px-4 py-4">
          <Breadcrumb
            separator=">"
            className="text-sm"
            items={[
              {
                title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
              },
              {
                title: <span className="text-gray-900">Chính sách bảo mật</span>,
              },
            ]}
          />
        </div>
      </div>

      <div className="responsive-container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <Title level={1} className="text-3xl font-bold text-gray-900 mb-4">
                Chính sách bảo mật
              </Title>
              <Text className="text-gray-600 text-sm">
                Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </div>

            <Divider />

            {/* Introduction */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                1. Giới thiệu
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                ProSai.vn (&quot;chúng tôi&quot;, &quot;của chúng tôi&quot; hoặc &quot;nền tảng&quot;) cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng. 
                Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi sử dụng dịch vụ của chúng tôi.
              </Paragraph>
              <Paragraph className="text-gray-700 leading-relaxed">
                Bằng việc sử dụng nền tảng ProSai.vn, bạn đồng ý với các điều khoản được nêu trong chính sách bảo mật này. 
                Nếu bạn không đồng ý, vui lòng không sử dụng dịch vụ của chúng tôi.
              </Paragraph>
            </section>

            {/* Information Collection */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                2. Thông tin chúng tôi thu thập
              </Title>
              <Title level={3} className="text-lg font-medium mb-3">
                2.1. Thông tin cá nhân
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chúng tôi có thể thu thập các thông tin sau khi bạn đăng ký tài khoản hoặc sử dụng dịch vụ:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Họ và tên</li>
                <li>Địa chỉ email</li>
                <li>Số điện thoại</li>
                <li>Địa chỉ</li>
                <li>Thông tin thanh toán (khi thực hiện giao dịch)</li>
                <li>Ảnh đại diện và thông tin hồ sơ khác</li>
              </ul>

              <Title level={3} className="text-lg font-medium mb-3 mt-6">
                2.2. Thông tin tự động thu thập
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Khi bạn truy cập nền tảng, chúng tôi tự động thu thập một số thông tin:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Địa chỉ IP</li>
                <li>Loại trình duyệt và phiên bản</li>
                <li>Hệ điều hành</li>
                <li>Thời gian và ngày truy cập</li>
                <li>Trang web bạn đã truy cập trước đó</li>
                <li>Thông tin thiết bị (model, nhà sản xuất)</li>
              </ul>

              <Title level={3} className="text-lg font-medium mb-3 mt-6">
                2.3. Cookies và công nghệ theo dõi
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chúng tôi sử dụng cookies và các công nghệ tương tự để cải thiện trải nghiệm người dùng, 
                phân tích lưu lượng truy cập và cá nhân hóa nội dung. Bạn có thể quản lý cài đặt cookies trong trình duyệt của mình.
              </Paragraph>
            </section>

            {/* Information Usage */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                3. Cách chúng tôi sử dụng thông tin
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi</li>
                <li>Xử lý giao dịch và gửi thông báo liên quan</li>
                <li>Gửi email marketing và thông báo (bạn có thể từ chối bất cứ lúc nào)</li>
                <li>Phân tích và nghiên cứu để cải thiện trải nghiệm người dùng</li>
                <li>Ngăn chặn gian lận và đảm bảo an ninh</li>
                <li>Tuân thủ các nghĩa vụ pháp lý</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                4. Chia sẻ thông tin
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chúng tôi không bán thông tin cá nhân của bạn. Chúng tôi có thể chia sẻ thông tin trong các trường hợp sau:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Nhà cung cấp dịch vụ:</strong> Với các bên thứ ba hỗ trợ hoạt động của chúng tôi (lưu trữ, thanh toán, phân tích)</li>
                <li><strong>Yêu cầu pháp lý:</strong> Khi được yêu cầu bởi cơ quan pháp luật hoặc để bảo vệ quyền lợi của chúng tôi</li>
                <li><strong>Với sự đồng ý của bạn:</strong> Trong các trường hợp khác khi bạn đã đồng ý</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                5. Bảo mật dữ liệu
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin của bạn khỏi truy cập trái phép, 
                mất mát, thay đổi hoặc tiết lộ. Tuy nhiên, không có phương thức truyền tải qua Internet hoặc lưu trữ điện tử nào là 100% an toàn.
              </Paragraph>
            </section>

            {/* User Rights */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                6. Quyền của người dùng
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Bạn có các quyền sau đối với thông tin cá nhân của mình:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Truy cập và xem thông tin cá nhân</li>
                <li>Yêu cầu chỉnh sửa hoặc cập nhật thông tin</li>
                <li>Yêu cầu xóa thông tin cá nhân</li>
                <li>Rút lại sự đồng ý xử lý dữ liệu</li>
                <li>Khiếu nại với cơ quan quản lý nếu bạn cho rằng quyền của mình bị vi phạm</li>
              </ul>
            </section>

            {/* Third-party Links */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                7. Liên kết đến trang web bên thứ ba
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Nền tảng của chúng tôi có thể chứa liên kết đến các trang web bên thứ ba. 
                Chúng tôi không chịu trách nhiệm về chính sách bảo mật hoặc nội dung của các trang web đó. 
                Chúng tôi khuyến khích bạn đọc chính sách bảo mật của các trang web bạn truy cập.
              </Paragraph>
            </section>

            {/* Children Privacy */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                8. Quyền riêng tư của trẻ em
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Dịch vụ của chúng tôi không dành cho trẻ em dưới 18 tuổi. 
                Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em. 
                Nếu bạn là phụ huynh hoặc người giám hộ và biết rằng con bạn đã cung cấp thông tin cá nhân cho chúng tôi, 
                vui lòng liên hệ với chúng tôi.
              </Paragraph>
            </section>

            {/* Policy Changes */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                9. Thay đổi chính sách
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. 
                Chúng tôi sẽ thông báo về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang này và cập nhật ngày &quot;Cập nhật lần cuối&quot;. 
                Chúng tôi khuyến khích bạn xem lại chính sách này định kỳ.
              </Paragraph>
            </section>

            {/* Contact */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                10. Liên hệ
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ với chúng tôi:
              </Paragraph>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <Paragraph className="text-gray-700 mb-2">
                  <strong>Email:</strong> <a href="mailto:support@prosai.vn" className="text-blue-600 hover:underline">support@prosai.vn</a>
                </Paragraph>
                <Paragraph className="text-gray-700 mb-2">
                  <strong>Hotline:</strong> <a href="tel:1900888888" className="text-blue-600 hover:underline">1900 888 888</a>
                </Paragraph>
                <Paragraph className="text-gray-700">
                  <strong>Địa chỉ:</strong> Tòa nhà Việt Á, Số 9 Duy Tân, Cầu Giấy, Hà Nội
                </Paragraph>
              </div>
            </section>

            <Divider />

            <div className="text-center text-gray-500 text-sm">
              <Text>
                Bằng việc sử dụng dịch vụ của chúng tôi, bạn đã đọc và đồng ý với Chính sách bảo mật này.
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

