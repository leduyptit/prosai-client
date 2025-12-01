import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Không có phiên đăng nhập' }, { status: 401 });
    }

    // Here you can add any additional logout logic
    // For example, calling your backend API to invalidate tokens
    // const response = await fetch('https://api-v1.prosai.vn/auth/logout', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${session.accessToken}`,
    //     'Content-Type': 'application/json',
    //   },
    // });

    return NextResponse.json({ 
      message: 'Đăng xuất thành công',
      success: true 
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ 
      message: 'Có lỗi xảy ra khi đăng xuất',
      success: false 
    }, { status: 500 });
  }
}
