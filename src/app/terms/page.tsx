'use client';

import React from 'react';
import { Typography, Card, Divider } from 'antd';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';
import { Breadcrumb } from '@/components/ui/navigation';

const { Title, Paragraph, Text } = Typography;

const TermsOfServicePage: React.FC = () => {
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
                title: <span className="text-gray-900">Điều khoản dịch vụ</span>,
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
                Điều khoản dịch vụ
              </Title>
              <Text className="text-gray-600 text-sm">
                Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </div>

            <Divider />

            {/* Introduction */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                1. Chấp nhận điều khoản
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chào mừng bạn đến với ProSai.vn ("nền tảng", "dịch vụ", "chúng tôi"). 
                Bằng việc truy cập và sử dụng nền tảng này, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản Dịch vụ này. 
                Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, bạn không được phép sử dụng dịch vụ.
              </Paragraph>
            </section>

            {/* Service Description */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                2. Mô tả dịch vụ
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                ProSai.vn là nền tảng tìm kiếm bất động sản ứng dụng AI, cung cấp các dịch vụ bao gồm:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Tìm kiếm và xem thông tin bất động sản</li>
                <li>Đăng tin rao bán/cho thuê bất động sản</li>
                <li>Tìm kiếm dự án bất động sản</li>
                <li>Chat AI để hỗ trợ tìm kiếm</li>
                <li>Các dịch vụ liên quan khác</li>
              </ul>
            </section>

            {/* User Account */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                3. Tài khoản người dùng
              </Title>
              <Title level={3} className="text-lg font-medium mb-3">
                3.1. Đăng ký tài khoản
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Để sử dụng một số tính năng của dịch vụ, bạn cần đăng ký tài khoản. 
                Bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký.
              </Paragraph>

              <Title level={3} className="text-lg font-medium mb-3 mt-6">
                3.2. Bảo mật tài khoản
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Bạn chịu trách nhiệm bảo mật mật khẩu và tài khoản của mình. 
                Bạn đồng ý thông báo ngay cho chúng tôi về bất kỳ hoạt động trái phép nào trên tài khoản của bạn.
              </Paragraph>

              <Title level={3} className="text-lg font-medium mb-3 mt-6">
                3.3. Độ tuổi
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Bạn phải từ 18 tuổi trở lên để sử dụng dịch vụ. 
                Nếu bạn dưới 18 tuổi, bạn cần có sự đồng ý của phụ huynh hoặc người giám hộ.
              </Paragraph>
            </section>

            {/* User Conduct */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                4. Quy tắc sử dụng
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed mb-4">
                Bạn đồng ý không sử dụng dịch vụ để:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Vi phạm bất kỳ luật pháp hoặc quy định nào</li>
                <li>Đăng thông tin sai sự thật, lừa đảo hoặc gây hiểu lầm</li>
                <li>Xâm phạm quyền sở hữu trí tuệ của người khác</li>
                <li>Gửi spam, thư rác hoặc nội dung không mong muốn</li>
                <li>Thu thập thông tin người dùng khác mà không được phép</li>
                <li>Can thiệp hoặc làm gián đoạn hoạt động của dịch vụ</li>
                <li>Tạo tài khoản giả mạo hoặc đại diện cho người khác mà không được phép</li>
              </ul>
            </section>

            {/* Content and Intellectual Property */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                5. Nội dung và quyền sở hữu trí tuệ
              </Title>
              <Title level={3} className="text-lg font-medium mb-3">
                5.1. Quyền của bạn
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Bạn giữ quyền sở hữu đối với nội dung bạn đăng lên nền tảng. 
                Tuy nhiên, bằng việc đăng nội dung, bạn cấp cho chúng tôi giấy phép sử dụng, 
                hiển thị và phân phối nội dung đó trên nền tảng.
              </Paragraph>

              <Title level={3} className="text-lg font-medium mb-3 mt-6">
                5.2. Quyền của ProSai
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Tất cả nội dung trên nền tảng, bao gồm logo, thiết kế, văn bản, hình ảnh và phần mềm, 
                là tài sản của ProSai hoặc được cấp phép cho ProSai. Bạn không được sao chép, 
                sửa đổi hoặc phân phối nội dung này mà không có sự cho phép bằng văn bản.
              </Paragraph>
            </section>

            {/* Property Listings */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                6. Đăng tin bất động sản
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed mb-4">
                Khi đăng tin bất động sản, bạn cam kết:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Cung cấp thông tin chính xác và đầy đủ về bất động sản</li>
                <li>Sở hữu quyền hợp pháp để rao bán/cho thuê bất động sản</li>
                <li>Tuân thủ tất cả các quy định pháp luật liên quan</li>
                <li>Không đăng tin trùng lặp hoặc spam</li>
                <li>Chịu trách nhiệm về tính chính xác của thông tin đăng tải</li>
              </ul>
              <Paragraph className="text-gray-700 leading-relaxed mt-4">
                Chúng tôi có quyền xóa hoặc từ chối bất kỳ tin đăng nào vi phạm các điều khoản này mà không cần thông báo trước.
              </Paragraph>
            </section>

            {/* Payments and Fees */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                7. Thanh toán và phí dịch vụ
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Một số tính năng của dịch vụ có thể yêu cầu thanh toán. 
                Bạn đồng ý thanh toán tất cả các khoản phí được nêu rõ khi sử dụng dịch vụ. 
                Tất cả các khoản thanh toán đều không hoàn lại trừ khi có quy định khác.
              </Paragraph>
            </section>

            {/* Disclaimers */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                8. Từ chối trách nhiệm
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Dịch vụ được cung cấp "nguyên trạng" và "theo khả năng có sẵn". 
                Chúng tôi không đảm bảo rằng dịch vụ sẽ không bị gián đoạn, an toàn hoặc không có lỗi. 
                Chúng tôi không chịu trách nhiệm về:
              </Paragraph>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Độ chính xác của thông tin bất động sản do người dùng đăng tải</li>
                <li>Kết quả giao dịch giữa người mua và người bán</li>
                <li>Thiệt hại phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ</li>
                <li>Mất mát dữ liệu hoặc thông tin</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                9. Giới hạn trách nhiệm
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Trong phạm vi tối đa được pháp luật cho phép, ProSai và các đối tác của chúng tôi 
                sẽ không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào 
                phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.
              </Paragraph>
            </section>

            {/* Termination */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                10. Chấm dứt dịch vụ
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chúng tôi có quyền chấm dứt hoặc tạm ngưng quyền truy cập của bạn vào dịch vụ 
                mà không cần thông báo trước nếu bạn vi phạm các Điều khoản Dịch vụ này. 
                Bạn cũng có thể chấm dứt tài khoản của mình bất cứ lúc nào.
              </Paragraph>
            </section>

            {/* Changes to Terms */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                11. Thay đổi điều khoản
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Chúng tôi có quyền sửa đổi các Điều khoản Dịch vụ này bất cứ lúc nào. 
                Các thay đổi sẽ có hiệu lực ngay sau khi được đăng tải trên trang này. 
                Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi được coi là bạn đã chấp nhận các điều khoản mới.
              </Paragraph>
            </section>

            {/* Governing Law */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                12. Luật áp dụng
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Các Điều khoản Dịch vụ này được điều chỉnh bởi pháp luật Việt Nam. 
                Mọi tranh chấp phát sinh sẽ được giải quyết tại tòa án có thẩm quyền tại Hà Nội, Việt Nam.
              </Paragraph>
            </section>

            {/* Contact */}
            <section>
              <Title level={2} className="text-xl font-semibold mb-4">
                13. Liên hệ
              </Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                Nếu bạn có câu hỏi về các Điều khoản Dịch vụ này, vui lòng liên hệ với chúng tôi:
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
                Bằng việc sử dụng dịch vụ của chúng tôi, bạn đã đọc, hiểu và đồng ý với các Điều khoản Dịch vụ này.
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

