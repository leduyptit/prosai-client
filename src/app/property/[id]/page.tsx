'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/navigation';
import { ImageGallery } from '@/components/ui';
import { ContactSidebar, PropertyInfo, PropertyMap, PropertyDetails, ContactInfo, RelatedProperties } from '@/components/features/property';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPropertyById, propertyService } from '@/services/property';
import { formatPrice, formatArea, formatDateTime } from '@/utils/format';
import { Loading } from '@/components/ui/feedback';
import { APP_CONFIG } from '@/utils/env';

const PropertyDetailPage: React.FC = () => {
  const params = useParams();
  const propertyId = params?.id as string;
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<any[]>([]);
  const [relatedPropertiesLoading, setRelatedPropertiesLoading] = useState(false);
  const [recommendedProperties, setRecommendedProperties] = useState<any[]>([]);
  const [recommendedPropertiesLoading, setRecommendedPropertiesLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPropertyById(propertyId);
        setProperty(data);
      } catch (err: any) {
        console.error('Error fetching property:', err);
        setError(err.message || 'Không thể tải thông tin bất động sản');
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  // Load related properties when property data is available
  useEffect(() => {
    const fetchRelatedProperties = async () => {
      if (!property) return;
      
      try {
        setRelatedPropertiesLoading(true);
        
        // Get related properties by owner using user_id and user_id_social from property
        const relatedData = await propertyService.getRelatedPropertiesByOwner(
          property.user_id,
          property.user_id_social,
          10
        );
        
        setRelatedProperties(relatedData);
      } catch (error) {
        console.error('Error fetching related properties:', error);
        // Set empty array on error to prevent undefined errors
        setRelatedProperties([]);
      } finally {
        setRelatedPropertiesLoading(false);
      }
    };

    const fetchRecommendedProperties = async () => {
      if (!property) return;
      
      try {
        setRecommendedPropertiesLoading(true);
        
        // Extract property characteristics for recommendation
        const recommendationParams: any = {
          limit: 10
        };
        
        // Add property type if available (assuming property has property_type field)
        if (property.property_type) {
          recommendationParams.property_type = property.property_type;
        }
        
        // Add listing type if available (assuming property has listing_type field)
        if (property.listing_type) {
          recommendationParams.listing_type = property.listing_type;
        }
        
        // Add legal status if available (assuming property has legal_status field)
        if (property.legal_status) {
          recommendationParams.legal_status = property.legal_status;
        }
        
        // Add city if available
        if (property.city) {
          recommendationParams.city = property.city;
        } else if (property.address) {
          // Try to extract city from address
          const addressParts = property.address.split(',');
          if (addressParts.length > 0) {
            recommendationParams.city = addressParts[addressParts.length - 1].trim();
          }
        }
        
        // Get recommended properties based on property characteristics
        const recommendedData = await propertyService.getRecommendedProperties(recommendationParams);
        
        setRecommendedProperties(recommendedData);
      } catch (error) {
        console.error('Error fetching recommended properties:', error);
        // Set empty array on error to prevent undefined errors
        setRecommendedProperties([]);
      } finally {
        setRecommendedPropertiesLoading(false);
      }
    };

    fetchRelatedProperties();
    fetchRecommendedProperties();
  }, [property]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loading className="bg-white" size="large" text="Đang tải thông tin..." />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy thông tin</h2>
          <p className="text-gray-600 mb-4">{error || 'Bất động sản không tồn tại'}</p>
          <Link href="/search" className="text-blue-600 hover:text-blue-800">
            Quay lại tìm kiếm
          </Link>
        </div>
      </div>
    );
  }

  const mockImages = [
    '/images/imgdemo_new@2x.png',
    '/images/imgdemo_new@2x.png',
    '/images/imgdemo_new@2x.png',
    '/images/imgdemo_new@2x.png',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 p-3">
        <div className="responsive-container mx-auto px-4">
          <Breadcrumb
            separator=">"
            className="text-sm"
            items={[
              {
                title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
              },
              {
                title: <Link href="/search" className="text-gray-600 hover:text-blue-600">Tìm kiếm</Link>,
              },
              {
                title: <span className="text-gray-900">Chi tiết tin đăng</span>,
              },
            ]}
          />
        </div>
      </div>

      <div className="responsive-container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <h1 className="text-2xl md:text-3xl font-font-medium text-gray-900 mb-3 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 mb-3 text-[#8D8DA1]">
              <span className="font-medium">Ngày đăng: <span className="text-gray-500 font-normal">{formatDateTime(property.created_at)}</span></span>
              <span className="text-gray-500 ">|</span>
              <span className="font-medium">Cập nhật: <span className="text-gray-500 font-normal">{formatDateTime(property.updated_at)}</span></span> 
            </div>
            {/* Image Gallery */}
             <ImageGallery 
               images={property.images?.length > 0 ? property.images : mockImages}
               title={property.title}
               className="mb-4"
             />

             {/* Property Details */}
             <PropertyDetails
               propertyId={propertyId}
               isFavorite={property.is_favorite || false}
               title={property.title || ''}
               description={property.description || ''}
               images={property.images?.length > 0 ? property.images : mockImages}
               price={property.price_all ? parseFloat(property.price_all[0]) : 0}
               area={property.area ? parseFloat(property.area[0]) : 0}
               address={property.address || ''}
               city={property.city || ''}
               district={property.district || ''}
               ward={property.ward || ''}
               bedrooms={property.bedrooms || 0}
               bathrooms={property.bathrooms || 0}
               rating={property.ranking_score || 0}
               className="mb-4"
             />

             {/* Property Info */}
            <div className="bg-white py-6">
              <PropertyInfo property={{
                ...property,
                price: property.price ? formatPrice(property.price[0]) : 'Liên hệ',
                area: property.area ? formatArea(property.area[0]) : 'Liên hệ',
                description: property.description || '',
                attribuite_score: property.attribuite_score ? JSON.parse(property.attribuite_score) : {}
              }} />
            </div>

            {/* Map */}
            <PropertyMap mapData={{
              address: property.address || '',
              lat: 21.0285, // Default coordinates for Hanoi
              lng: 105.8542
            }}/>

            {/* Contact Info */}
            <div className="bg-white py-6">
              <ContactInfo 
                contactInfo={{
                  name: property.user_name_social || 'Người đăng',
                  phone: property.phone_user || property.phone_message?.[0] || '',
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6">
              <ContactSidebar 
                contactInfo={{
                  name: property.user_name_social || 'Người đăng',
                  phone: property.phone_user || property.phone_message?.[0] || '',
                  avatar: '',
                  isAgent: true
                }}
                propertyId={propertyId}
                className="mb-6"
              />
              
              {/* Recommended Properties */}
              <RelatedProperties 
                className="mb-6"
                title="BĐS gợi ý tương tự"
                properties={recommendedProperties}
                loading={recommendedPropertiesLoading}
              />

              {/* Related Properties - Same Owner */}
              <RelatedProperties 
                title="BĐS cùng chủ sở hữu"
                properties={relatedProperties.slice(0, 3)}
                loading={relatedPropertiesLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;