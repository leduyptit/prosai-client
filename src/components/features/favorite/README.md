# Favorite Components

Thư mục này chứa các component liên quan đến chức năng yêu thích (favorites) và bookmark.

## Components

### 1. FavoriteButton

Component nút yêu thích với khả năng check trạng thái từ API và hiển thị trái tim đỏ khi đã được yêu thích. Hỗ trợ thêm/xóa favorite với một click.

#### Props

```typescript
interface FavoriteButtonProps {
  propertyId: string;           // ID của bất động sản
  title: string;                // Tiêu đề bất động sản
  description: string;          // Mô tả bất động sản
  images: string[];             // Danh sách ảnh
  price: number;                // Giá bất động sản
  area: number;                 // Diện tích
  address: string;              // Địa chỉ
  city: string;                 // Thành phố
  district: string;             // Quận/huyện
  ward: string;                 // Phường/xã
  className?: string;           // CSS class tùy chỉnh
  size?: 'small' | 'middle' | 'large';  // Kích thước nút
  showText?: boolean;           // Hiển thị text
  onFavoriteChange?: (isFavorite: boolean) => void;  // Callback khi trạng thái thay đổi
}
```

#### Tính năng

- **Auto Check Status**: Tự động check trạng thái yêu thích khi component mount
- **Visual Feedback**: Hiển thị trái tim đỏ khi đã yêu thích, trái tim trống khi chưa yêu thích
- **Toggle Functionality**: Click một lần để thêm, click lần nữa để xóa khỏi favorites
- **Loading State**: Hiển thị loading khi đang xử lý
- **Error Handling**: Xử lý lỗi và hiển thị thông báo phù hợp
- **Authentication Check**: Kiểm tra đăng nhập trước khi thực hiện hành động
- **Status Code Handling**: Xử lý các HTTP status codes (201, 409) một cách thông minh

#### API Integration

- **Check Favorite**: `GET /favorites/check/{propertyId}` - Kiểm tra trạng thái yêu thích
  - **Response**: `{ "isFavorite": boolean }`
- **Add Favorite**: `POST /favorites` - Thêm vào danh sách yêu thích
- **Remove Favorite**: `DELETE /favorites/{propertyId}` - Xóa khỏi danh sách yêu thích

#### User Experience

1. **Chưa yêu thích**: Hiển thị trái tim trống, click để thêm vào favorites
2. **Đã yêu thích**: Hiển thị trái tim đỏ, click để xóa khỏi favorites
3. **Đang xử lý**: Hiển thị loading spinner
4. **Thành công**: Hiển thị message thành công
5. **Lỗi**: Hiển thị message lỗi cụ thể

#### Error Handling

- **401 Unauthorized**: "Vui lòng đăng nhập để thực hiện thao tác này"
- **404 Not Found**: "Không tìm thấy tin yêu thích này"
- **409 Conflict**: "Bất động sản này đã có trong danh sách yêu thích"
- **Network Errors**: "Có lỗi xảy ra, vui lòng thử lại"

#### Sử dụng

```tsx
import { FavoriteButton } from '@/components/features';

<FavoriteButton
  propertyId="h-rsR5cBA3hQ-A2y0JWb"
  title="Bán đất 62m2 mặt tiền 5,4m tại Phố Gia Lộc"
  description="CHÍNH CHỦ CẦN BÁN ĐẤT - PHỐ GIA LỘC"
  images={["string"]}
  price={990000000}
  area={62}
  address="Phố Gia Lộc, Phường Quảng Thịnh, TP. Thanh Hóa"
  city="Thanh Hóa"
  district="Thanh Hóa"
  ward="Quảng Thịnh"
  size="middle"
  showText={false}
  onFavoriteChange={(isFavorite) => console.log('Favorite status:', isFavorite)}
/>
```

### 2. FavoritesDropdown

Component dropdown hiển thị danh sách tin yêu thích và bộ lọc đã lưu với lazy loading.

#### Props

```typescript
interface FavoritesDropdownProps {
  visible: boolean;             // Hiển thị dropdown
  onClose: () => void;          // Callback đóng dropdown
  favoritesCount?: number;      // Số lượng tin yêu thích
  bookmarkCount?: number;       // Số lượng bộ lọc đã lưu
}
```

#### Tính năng

- **Dual Tab System**: 
  - Tab 1: Tin yêu thích (từ API `/favorites`)
  - Tab 2: Bộ lọc tìm kiếm đã lưu (từ API `/bookmarks`)
- **Lazy Loading**: Chỉ fetch data khi tab tương ứng được chọn
- **Smart Caching**: Cache data trong session để tránh gọi API liên tục
- **Rich Display**: Hiển thị đầy đủ thông tin với badges màu sắc
- **Loading States**: Loading, error, empty states cho mỗi tab
- **Responsive Design**: Giao diện thích ứng với nội dung

#### API Integration

- **Favorites List**: `GET /favorites` - Danh sách tin yêu thích
- **Bookmarks List**: `GET /bookmarks` - Danh sách bộ lọc đã lưu

#### Data Display

##### Favorites Tab
- Ảnh bất động sản
- Tiêu đề và mô tả
- Giá và diện tích
- Địa chỉ
- Thời gian lưu

##### Bookmarks Tab
- Icon filter
- Tên và mô tả bộ lọc
- Badges vị trí (thành phố, quận/huyện)
- Badge số phòng ngủ
- Khoảng giá và diện tích
- Thời gian lưu

#### Sử dụng

```tsx
import { FavoritesDropdown } from '@/components/features';

<FavoritesDropdown
  visible={isDropdownOpen}
  onClose={() => setIsDropdownOpen(false)}
  favoritesCount={5}
  bookmarkCount={3}
/>
```

## Cấu trúc thư mục

```
src/components/features/favorite/
├── FavoriteButton.tsx          # Component nút yêu thích
├── FavoritesDropdown.tsx       # Component dropdown favorites/bookmarks
├── index.ts                    # Export file
└── README.md                   # Tài liệu này
```

## Dependencies

- **Ant Design**: Button, message, icons
- **NextAuth**: useSession cho authentication
- **Custom Hooks**: useFavoritesList, useBookmarksList
- **Services**: favoriteService cho API calls

## Performance Optimizations

1. **Lazy Loading**: Chỉ fetch data khi cần thiết
2. **Smart Caching**: Cache data trong hook state
3. **One-time Fetching**: Mỗi tab chỉ gọi API một lần
4. **Conditional Rendering**: Render có điều kiện để tối ưu performance

## Error Handling

- **Network Errors**: Fallback data và retry buttons
- **Authentication Errors**: Redirect đến login
- **API Errors**: User-friendly error messages
- **Loading States**: Visual feedback cho user
- **Specific Error Codes**: Xử lý riêng cho từng loại lỗi (401, 404, 409)

## User Interaction Flow

### FavoriteButton
1. **Initial State**: Check trạng thái favorite khi mount
2. **Add Favorite**: Click trái tim trống → API POST → Hiển thị trái tim đỏ
3. **Remove Favorite**: Click trái tim đỏ → API DELETE → Hiển thị trái tim trống
4. **Error Handling**: Hiển thị message lỗi cụ thể cho từng trường hợp

### FavoritesDropdown
1. **Open Dropdown**: Click icon heart trên header
2. **Tab Selection**: Chọn tab favorites hoặc bookmarks
3. **Data Loading**: Lazy load data cho tab được chọn
4. **Content Display**: Hiển thị danh sách với loading/error states

## API Response Examples

### Check Favorite Status
```bash
GET /favorites/check/h-rsR5cBA3hQ-A2y0JWb
```

**Response:**
```json
{
  "isFavorite": false
}
```

### Add to Favorites
```bash
POST /favorites
```

**Request Body:**
```json
{
  "property_id": "h-rsR5cBA3hQ-A2y0JWb",
  "id_social": "user_id",
  "title": "Bán đất 62m2 mặt tiền 5,4m tại Phố Gia Lộc",
  "description": "CHÍNH CHỦ CẦN BÁN ĐẤT - PHỐ GIA LỘC",
  "images": ["string"],
  "price": 990000000,
  "area": 62,
  "address": "Phố Gia Lộc, Phường Quảng Thịnh, TP. Thanh Hóa",
  "city": "Thanh Hóa",
  "district": "Thanh Hóa",
  "ward": "Quảng Thịnh"
}
```

### Remove from Favorites
```bash
DELETE /favorites/h-rsR5cBA3hQ-A2y0JWb
```

## Future Enhancements

1. **Real-time Updates**: WebSocket cho cập nhật real-time
2. **Offline Support**: Cache data offline
3. **Bulk Actions**: Xóa nhiều favorites cùng lúc
4. **Filtering**: Tìm kiếm trong danh sách favorites
5. **Sorting**: Sắp xếp theo tiêu chí khác nhau
6. **Export**: Xuất danh sách favorites
7. **Sharing**: Chia sẻ danh sách favorites
8. **Undo Action**: Hoàn tác khi xóa nhầm favorite
9. **Favorite Categories**: Phân loại favorites theo nhóm
10. **Sync Across Devices**: Đồng bộ favorites giữa các thiết bị
