import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';
import { getSession } from 'next-auth/react';

// Upload response type based on the API response
export interface UploadResponse {
  url_expired: string;
  url: string;
  fileName: string;
  fileOriginalName: string;
  size: number;
  contentType: string;
  filePath: string;
  uploadedAt: string;
}

// Upload request parameters
export interface UploadRequest {
  file: File;
  fileName?: string;
  fileType?: string;
  folderPath?: string;
  contentType?: string;
}

class UploadService {
  /**
   * Upload a single file to MinIO
   */
  async uploadFile(uploadRequest: UploadRequest): Promise<UploadResponse> {
    const session = await getSession();
    
    if (!session?.accessToken) {
      throw new Error('No access token found. Please log in again.');
    }

    const formData = new FormData();
    formData.append('file', uploadRequest.file);
    formData.append('fileName', uploadRequest.fileName || uploadRequest.file.name.split('.')[0]);
    formData.append('fileType', uploadRequest.fileType || 'image');
    formData.append('folderPath', uploadRequest.folderPath || '');
    formData.append('contentType', uploadRequest.contentType || uploadRequest.file.type);

    try {
      const response = await apiClient.post(API_ENDPOINTS.MINIO.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${session.accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Failed to upload file. Please try again.');
    }
  }

  /**
   * Upload multiple files to MinIO
   */
  async uploadMultipleFiles(files: File[]): Promise<UploadResponse[]> {
    const uploadPromises = files.map(file => 
      this.uploadFile({ 
        file, 
        fileName: file.name.split('.')[0],
        fileType: 'image',
        folderPath: 'images'
      })
    );

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Multiple upload error:', error);
      throw new Error('Failed to upload some files. Please try again.');
    }
  }

  /**
   * Delete a file from MinIO by its filePath
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.MINIO.FILE, {
        data: { filePath },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Delete file error:', error);
      throw new Error('Failed to delete file. Please try again.');
    }
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { isValid: false, error: 'File size must be less than 10MB' };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Only JPG, PNG, GIF, and WebP files are allowed' };
    }

    return { isValid: true };
  }
}

export const uploadService = new UploadService();
