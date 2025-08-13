import { SearchItem } from './ResultItem';

export const mockItems: SearchItem[] = Array.from({ length: 22 }).map((_, i) => ({
  id: `item-${i + 1}`,
  title: `Bán căn hộ ${45 + (i % 5) * 5}m² - 3 phòng ngủ - gần khu công nghiệp, bệnh viện, trường ĐH lớn thu ${10 + (i % 4)}tr/tháng`,
  priceLabel: `${(2 + (i % 4) * 0.3).toFixed(1)} tỷ`.replace('.0', ''),
  areaBadge: `${45 + (i % 4) * 5} m²`,
  pricePerM2: `${(44.44 + (i % 3) * 2).toFixed(2)} tr/m²`,
  bedrooms: 3,
  bathrooms: 2,
  address: `Đường ${3 + (i % 7)}/2, Quận ${1 + (i % 7)}, TPHCM`,
  imageUrl: '/images/imgdemo_new@2x.png',
  imagesCount: 5,
  postedBy: 'Nguyễn Văn A',
  postedAt: 'Đăng 2 ngày trước',
  rating: 4,
  phone: '0982560123',
  isFavorite: i % 2 === 0,
}));
