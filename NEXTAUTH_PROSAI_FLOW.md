# NextAuth + ProSai API Integration Flow

## Tóm tắt

NextAuth **VẪN GỌI TRỰC TIẾP** đến `https://api-v1.prosai.vn/auth/login` như curl command của bạn, chỉ khác là nó đi qua một layer middleware để xử lý session và security.

## Chi tiết Flow

### 1. NextAuth Login Flow (Recommended)

```
User Input → signIn() → NextJS API Route → authorize() → ProSai API → Session
```

**Các bước cụ thể:**

1. **Client**: User nhập email/password và gọi `signIn('credentials', {email, password})`
2. **NextJS Route**: Request được route đến `/api/auth/callback/credentials` 
3. **NextAuth Middleware**: NextAuth gọi function `authorize()` trong config
4. **API Call**: `authorize()` gọi trực tiếp đến `https://api-v1.prosai.vn/auth/login`
5. **Response**: ProSai API trả về user data + tokens
6. **Session**: NextAuth tạo secure session với tokens

### 2. Code Implementation

**File: `src/lib/auth.ts`**
```typescript
async authorize(credentials) {
  // Đây chính là nơi gọi trực tiếp đến ProSai API
  const response = await apiClient.post('/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });
  
  // apiClient có baseURL = 'https://api-v1.prosai.vn'
  // Nên thực tế gọi: https://api-v1.prosai.vn/auth/login
}
```

**File: `src/services/api.ts`**
```typescript
const API_BASE_URL = 'https://api-v1.prosai.vn';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,  // Trực tiếp đến ProSai API
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 3. Equivalent Curl Command

Khi NextAuth gọi `apiClient.post('/auth/login', data)`, nó tương đương với:

```bash
curl -X 'POST' \
  'https://api-v1.prosai.vn/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "user@example.com",
  "password": "password123"
}'
```

### 4. Tại sao dùng NextAuth thay vì gọi trực tiếp?

| Aspect | NextAuth | Direct API Call |
|--------|----------|-----------------|
| **API Call** | ✅ Vẫn gọi trực tiếp đến ProSai | ✅ Gọi trực tiếp đến ProSai |
| **Security** | ✅ CSRF protection, secure cookies | ❌ Phải tự implement |
| **Session Management** | ✅ Automatic | ❌ Phải tự quản lý |
| **Token Refresh** | ✅ Automatic | ❌ Phải tự implement |
| **OAuth Support** | ✅ Google, Facebook, etc. | ❌ Phải tự implement |
| **Server-side Auth** | ✅ Built-in | ❌ Phải tự implement |

### 5. Network Traffic Comparison

**NextAuth Flow:**
```
Browser → localhost:3000/api/auth/callback/credentials → https://api-v1.prosai.vn/auth/login
```

**Direct Flow:**
```
Browser → https://api-v1.prosai.vn/auth/login
```

### 6. Debugging & Monitoring

Để xem API calls thực tế, bạn có thể:

1. **Mở DevTools → Network tab**
2. **Login với NextAuth** → Sẽ thấy call đến `/api/auth/callback/credentials`
3. **Mở Server Console** → Sẽ thấy log gọi đến `https://api-v1.prosai.vn/auth/login`

### 7. Test Page

Truy cập `/demos/api-test` để test và so sánh 3 phương pháp:
- NextAuth (qua middleware)
- Direct API service
- Raw fetch (giống hệt curl)

## Kết luận

NextAuth **KHÔNG THAY THẾ** API call đến ProSai, mà chỉ **WRAP** nó trong một layer bảo mật và quản lý session. API call cuối cùng vẫn đi trực tiếp đến `https://api-v1.prosai.vn/auth/login` như curl command của bạn.
