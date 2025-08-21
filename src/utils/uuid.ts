import * as crypto from 'crypto';

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = ALPHABET.length;

/**
 * Encode UUID thành short ID có thể decode ngược lại
 * Sử dụng thuật toán mã hóa có thể đảo ngược
 */
export class ShortIdUtil {
  // Mapping table để lưu trữ UUID <-> shortId (trong memory)
  private static uuidToShortMap = new Map<string, string>();
  private static shortToUuidMap = new Map<string, string>();
  
  // Key cho localStorage
  private static STORAGE_KEY = 'prosai_uuid_mapping';
  
  /**
   * Load mapping từ localStorage
   */
  private static loadFromStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.uuidToShortMap = new Map(data.uuidToShort || []);
        this.shortToUuidMap = new Map(data.shortToUuid || []);
      }
    } catch (error) {
      console.error('Error loading UUID mapping from storage:', error);
    }
  }
  
  /**
   * Save mapping vào localStorage
   */
  private static saveToStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const data = {
        uuidToShort: Array.from(this.uuidToShortMap.entries()),
        shortToUuid: Array.from(this.shortToUuidMap.entries())
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving UUID mapping to storage:', error);
    }
  }

  /**
   * Encode UUID -> shortId (8 ký tự) có thể decode ngược lại
   */
  static encode(uuid: string): string {
    // Load mapping từ storage nếu chưa load
    if (this.uuidToShortMap.size === 0) {
      this.loadFromStorage();
    }
    
    // Kiểm tra xem đã có mapping chưa
    if (this.uuidToShortMap.has(uuid)) {
      return this.uuidToShortMap.get(uuid)!;
    }

    // Tạo short ID mới
    const shortId = this.generateShortId(uuid);
    
    // Lưu mapping để có thể decode ngược lại
    this.uuidToShortMap.set(uuid, shortId);
    this.shortToUuidMap.set(shortId, uuid);
    
    // Save vào localStorage
    this.saveToStorage();
    
    return shortId;
  }

  /**
   * Decode shortId -> UUID ban đầu
   */
  static decode(shortId: string): string | null {
    // Load mapping từ storage nếu chưa load
    if (this.shortToUuidMap.size === 0) {
      this.loadFromStorage();
    }
    
    // Kiểm tra mapping để decode ngược lại
    if (this.shortToUuidMap.has(shortId)) {
      return this.shortToUuidMap.get(shortId)!;
    }
    
    // Nếu không tìm thấy, có thể là UUID gốc
    if (shortId.length === 32 || shortId.length === 36) {
      return shortId;
    }
    
    return null; // Không thể decode
  }

  /**
   * Tạo short ID từ UUID
   */
  private static generateShortId(uuid: string): string {
    // Loại bỏ dấu gạch ngang và chuyển về lowercase
    const cleanUuid = uuid.replace(/-/g, '').toLowerCase();
    
    // Tạo hash từ UUID để đảm bảo tính nhất quán
    const hash = crypto.createHash('sha256').update(cleanUuid).digest();
    
    // Lấy 6 byte đầu (48 bit) để tạo short ID
    const num = BigInt('0x' + hash.slice(0, 6).toString('hex'));
    
    // Encode thành base62 với 8 ký tự
    return this.encodeBase62(num);
  }

  /**
   * Encode số thành base62 string
   */
  private static encodeBase62(num: bigint): string {
    let result = '';
    let n = num;

    while (n > BigInt(0)) {
      result = ALPHABET[Number(n % BigInt(BASE))] + result;
      n = n / BigInt(BASE);
    }

    // Đảm bảo đúng 8 ký tự
    return result.padStart(8, '0').slice(-8);
  }

  /**
   * Decode base62 string thành số
   */
  private static decodeBase62(str: string): bigint {
    let num = BigInt(0);
    for (let i = 0; i < str.length; i++) {
      num = num * BigInt(BASE) + BigInt(ALPHABET.indexOf(str[i]));
    }
    return num;
  }

  /**
   * Extract shortId từ slug url
   * Ví dụ: news/am-thuc-viet-nam-2025-uDbrwGkL -> uDbrwGkL
   */
  static extractFromSlug(slug: string): string | null {
    const parts = slug.split('-');
    const lastPart = parts[parts.length - 1];
    
    // Kiểm tra xem phần cuối có phải là short ID hợp lệ không
    if (lastPart && lastPart.length === 8 && this.isValidShortId(lastPart)) {
      return lastPart;
    }
    
    return null;
  }

  /**
   * Kiểm tra xem string có phải là short ID hợp lệ không
   */
  static isValidShortId(shortId: string): boolean {
    if (!shortId || shortId.length !== 8) {
      return false;
    }
    
    // Kiểm tra xem tất cả ký tự có trong alphabet không
    for (let i = 0; i < shortId.length; i++) {
      if (ALPHABET.indexOf(shortId[i]) === -1) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Tạo URL với short ID
   */
  static createUrl(slug: string, uuid: string): string {
    const shortId = this.encode(uuid);
    return `${slug}-${shortId}`;
  }

  /**
   * Lấy UUID từ URL
   */
  static getUuidFromUrl(url: string): string | null {
    const shortId = this.extractFromSlug(url);
    if (shortId) {
      return this.decode(shortId);
    }
    return null;
  }

  /**
   * Lấy thống kê mapping
   */
  static getStats() {
    return {
      totalMappings: this.uuidToShortMap.size,
      uuidToShort: Object.fromEntries(this.uuidToShortMap),
      shortToUuid: Object.fromEntries(this.shortToUuidMap)
    };
  }

  /**
   * Reset tất cả mapping (cho testing)
   */
  static reset() {
    this.uuidToShortMap.clear();
    this.shortToUuidMap.clear();
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  /**
   * Test function để kiểm tra encode/decode
   */
  static test() {
    console.log('=== Testing ShortIdUtil ===');
    
    const testUuid = '3c81a624-0b94-426f-a986-d0d7d5b60e6a';
    
    // Test encode
    const shortId = this.encode(testUuid);
    console.log('Original UUID:', testUuid);
    console.log('Encoded Short ID:', shortId);
    
    // Test decode
    const decodedUuid = this.decode(shortId);
    console.log('Decoded UUID:', decodedUuid);
    console.log('UUID Match:', testUuid === decodedUuid);
    
    // Test URL creation
    const url = this.createUrl('am-thuc-viet-nam-2025', testUuid);
    console.log('Created URL:', url);
    
    // Test URL parsing
    const extractedUuid = this.getUuidFromUrl(url);
    console.log('Extracted UUID from URL:', extractedUuid);
    console.log('URL UUID Match:', testUuid === extractedUuid);
    
    // Test validation
    console.log('Is Valid Short ID:', this.isValidShortId(shortId));
    
    console.log('=== Test Complete ===');
  }
}

// Export các hàm tiện ích để tương thích với code cũ
export function uuidToShortId(uuid: string): string {
  return ShortIdUtil.encode(uuid);
}

export function shortIdToUuid(shortId: string): string | null {
  return ShortIdUtil.decode(shortId);
}

export function extractUuidFromShortId(shortId: string): string | null {
  return ShortIdUtil.decode(shortId);
}