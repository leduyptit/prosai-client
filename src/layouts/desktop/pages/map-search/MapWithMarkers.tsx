'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { GOOGLE_MAPS_CONFIG } from '@/utils/env';

type LatLng = { lat: number; lng: number };

interface MapWithMarkersProps {
  city?: string;
  items?: Array<{
    id: string;
    priceLabel: string;
    url?: string;
    isVip?: boolean;
    title?: string;
    imageUrl?: string;
    areaBadge?: string;
    bedrooms?: number;
    bathrooms?: number;
    lat?: number;
    lng?: number;
  }>;
}

// Tọa độ trung tâm của 63 tỉnh thành Việt Nam
const CITY_CENTERS: Record<string, LatLng> = {
  // Miền Bắc
  'Hà Nội': { lat: 21.0285, lng: 105.8542 },
  'Hanoi': { lat: 21.0285, lng: 105.8542 },
  'Hải Phòng': { lat: 20.8449, lng: 106.6881 },
  'Quảng Ninh': { lat: 21.0064, lng: 107.2925 },
  'Bắc Ninh': { lat: 21.1861, lng: 106.0763 },
  'Hải Dương': { lat: 20.9373, lng: 106.3146 },
  'Hưng Yên': { lat: 20.6564, lng: 106.0519 },
  'Thái Bình': { lat: 20.4465, lng: 106.3422 },
  'Hà Nam': { lat: 20.5431, lng: 105.9229 },
  'Nam Định': { lat: 20.4200, lng: 106.1683 },
  'Ninh Bình': { lat: 20.2506, lng: 105.9744 },
  'Vĩnh Phúc': { lat: 21.3081, lng: 105.6042 },
  'Bắc Giang': { lat: 21.2737, lng: 106.1946 },
  'Bắc Kạn': { lat: 22.1470, lng: 105.8348 },
  'Tuyên Quang': { lat: 21.8189, lng: 105.2186 },
  'Thái Nguyên': { lat: 21.5944, lng: 105.8481 },
  'Lạng Sơn': { lat: 21.8537, lng: 106.7613 },
  'Cao Bằng': { lat: 22.6650, lng: 106.2578 },
  'Lào Cai': { lat: 22.3381, lng: 104.1477 },
  'Yên Bái': { lat: 21.7226, lng: 104.9113 },
  'Điện Biên': { lat: 21.3860, lng: 103.0230 },
  'Sơn La': { lat: 21.3257, lng: 103.9180 },
  'Hòa Bình': { lat: 20.6861, lng: 105.3139 },
  'Phú Thọ': { lat: 21.3081, lng: 105.3139 },

  // Miền Trung
  'Thanh Hóa': { lat: 19.8077, lng: 105.7842 },
  'Nghệ An': { lat: 18.6792, lng: 105.6882 },
  'Hà Tĩnh': { lat: 18.3431, lng: 105.9058 },
  'Quảng Bình': { lat: 17.4681, lng: 106.6226 },
  'Quảng Trị': { lat: 16.7500, lng: 107.2000 },
  'Thừa Thiên Huế': { lat: 16.4637, lng: 107.5909 },
  'Đà Nẵng': { lat: 16.0544, lng: 108.2022 },
  'Quảng Nam': { lat: 15.8801, lng: 108.3383 },
  'Quảng Ngãi': { lat: 15.1214, lng: 108.8048 },
  'Bình Định': { lat: 13.7750, lng: 109.2236 },
  'Phú Yên': { lat: 13.0884, lng: 109.0929 },
  'Khánh Hòa': { lat: 12.2388, lng: 109.1967 },
  'Ninh Thuận': { lat: 11.5646, lng: 108.9886 },
  'Bình Thuận': { lat: 10.9289, lng: 108.1022 },

  // Miền Nam
  'TP. Hồ Chí Minh': { lat: 10.8231, lng: 106.6297 },
  'Hồ Chí Minh': { lat: 10.8231, lng: 106.6297 },
  'Bình Phước': { lat: 11.6471, lng: 106.6050 },
  'Tây Ninh': { lat: 11.3014, lng: 106.0975 },
  'Bình Dương': { lat: 11.3254, lng: 106.4774 },
  'Đồng Nai': { lat: 11.0686, lng: 107.1676 },
  'Bà Rịa - Vũng Tàu': { lat: 10.3460, lng: 107.0843 },
  'Long An': { lat: 10.6086, lng: 106.6714 },
  'Tiền Giang': { lat: 10.3600, lng: 106.3600 },
  'Bến Tre': { lat: 10.2333, lng: 106.3833 },
  'Trà Vinh': { lat: 9.9347, lng: 106.3453 },
  'Vĩnh Long': { lat: 10.2531, lng: 105.9756 },
  'Đồng Tháp': { lat: 10.5600, lng: 105.6300 },
  'An Giang': { lat: 10.5216, lng: 105.1259 },
  'Kiên Giang': { lat: 9.8244, lng: 105.1259 },
  'Cà Mau': { lat: 9.1767, lng: 105.1524 },
  'Bạc Liêu': { lat: 9.2945, lng: 105.7272 },
  'Sóc Trăng': { lat: 9.6000, lng: 105.9800 },
  'Hậu Giang': { lat: 9.7842, lng: 105.4706 },

  // Tây Nguyên
  'Kon Tum': { lat: 14.3545, lng: 108.0076 },
  'Gia Lai': { lat: 13.9838, lng: 108.0000 },
  'Đắk Lắk': { lat: 12.6667, lng: 108.0500 },
  'Đắk Nông': { lat: 12.0042, lng: 107.6872 },
  'Lâm Đồng': { lat: 11.9404, lng: 108.4583 },

  // Fallback
  'Vietnam': { lat: 16.0471, lng: 108.2068 },
};

declare global {
  interface Window { google: any }
}

function loadGoogleMaps(apiKey?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.google?.maps) {
      resolve(window.google);
      return;
    }
    const scriptId = 'google-maps-js';
    if (document.getElementById(scriptId)) {
      const check = () => {
        if ((window as any).google?.maps) resolve((window as any).google);
        else setTimeout(check, 100);
      };
      check();
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    const keyParam = apiKey ? `&key=${apiKey}` : '';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=marker${keyParam}`;
    console.log('Loading Google Maps JS from:', script.src);
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject as any;
    document.body.appendChild(script);
  });
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({ city, items = [] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();
  const [fallbackIframe, setFallbackIframe] = useState(false);

  useEffect(() => {
    let map: any = null;
    const markers: any[] = [];

    const init = async () => {
      try {
        const googleObj = await loadGoogleMaps(GOOGLE_MAPS_CONFIG.apiKey as any);
        if (!containerRef.current) return;
        // Decode city parameter from URL (e.g., "Hà+Nội" -> "Hà Nội")
        const decodedCity = city ? decodeURIComponent(city.replace(/\+/g, ' ')) : '';
        const center = CITY_CENTERS[decodedCity] || CITY_CENTERS[city || ''] || CITY_CENTERS.Vietnam;
        
        console.log('Map city:', city);
        console.log('Decoded city:', decodedCity);
        console.log('Map center:', center);
        
        // Set appropriate zoom level based on city
        const zoomLevel = decodedCity ? 12 : 8; // Zoom in more for specific cities
        
        const mapOptions: any = {
          center,
          zoom: zoomLevel,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        };
        if (GOOGLE_MAPS_CONFIG.mapId) {
          mapOptions.mapId = GOOGLE_MAPS_CONFIG.mapId as any;
        }
        map = new googleObj.maps.Map(containerRef.current as HTMLDivElement, mapOptions);

        // If URL has bounds & zoom, apply them
        const zParam = urlSearchParams.get('z');
        const neLat = urlSearchParams.get('nelat');
        const neLng = urlSearchParams.get('nelng');
        const swLat = urlSearchParams.get('swlat');
        const swLng = urlSearchParams.get('swlng');
        if (neLat && neLng && swLat && swLng) {
          const bounds = new googleObj.maps.LatLngBounds(
            { lat: parseFloat(swLat), lng: parseFloat(swLng) },
            { lat: parseFloat(neLat), lng: parseFloat(neLng) }
          );
          map.fitBounds(bounds);
          if (zParam) {
            const z = parseInt(zParam);
            if (!Number.isNaN(z)) map.setZoom(z);
          }
        }

      // Prepare demo data if items are empty
      const sourceItems = (items && items.length > 0)
        ? items
        : [];
      

      // Determine positions: use item lat/lng when available, otherwise distribute around center
      const radius = 0.01; // ~1km
      const num = Math.min(sourceItems.length || 8, 100);
      const positions: LatLng[] = (sourceItems as any[]).map((it, i) => {
        
        if (typeof (it as any).lat === 'number' && typeof (it as any).lng === 'number') {
          return { lat: (it as any).lat, lng: (it as any).lng };
        }
        const angle = (i / Math.max(1, num)) * Math.PI * 2;
        return { lat: center.lat + radius * Math.sin(angle), lng: center.lng + radius * Math.cos(angle) };
      });

      const infoWindow = new googleObj.maps.InfoWindow({ maxWidth: 440 });
      const normalEntries: Array<{ labelEl: HTMLElement; dotEl: HTMLElement; overlay: any; clickMarker: any; isVip: boolean }> = [];

      // Helper: HTML overlay for when AdvancedMarker isn't available
      const createHtmlOverlay = (pos: LatLng, el: HTMLElement) => {
        const Overlay = class extends googleObj.maps.OverlayView {
          position: any;
          element: HTMLElement;
          constructor(position: any, element: HTMLElement) {
            super();
            this.position = position;
            this.element = element;
          }
          onAdd() {
            const panes = this.getPanes();
            panes?.overlayMouseTarget.appendChild(this.element);
          }
          draw() {
            const proj = this.getProjection();
            if (!proj) return;
            const point = proj.fromLatLngToDivPixel(new googleObj.maps.LatLng(this.position));
            if (point && this.element) {
              this.element.style.position = 'absolute';
              this.element.style.transform = 'translate(-50%, -100%)';
              this.element.style.left = `${point.x}px`;
              this.element.style.top = `${point.y}px`;
            }
          }
          onRemove() {
            if (this.element && this.element.parentNode) {
              this.element.parentNode.removeChild(this.element);
            }
          }
        };
        const overlay = new Overlay(pos as any, el);
        overlay.setMap(map);
        return overlay;
      };

      positions.forEach((pos, idx) => {
        const item = sourceItems[idx % sourceItems.length];
        // Create label element (price badge)
        const label = document.createElement('div');
        label.style.cssText = 'display:inline-flex;align-items:center;gap:6px;padding:2px 6px;border-radius:6px;background:#1f2937;color:#fff;font-size:12px;font-weight:700;box-shadow:0 0 0 2px #ffffff, 0 1px 6px rgba(0,0,0,.35);position:relative;white-space:nowrap;cursor:pointer;';
        const priceSpan = document.createElement('span');
        priceSpan.textContent = item?.priceLabel || '—';
        label.appendChild(priceSpan);
        if (item?.isVip) {
          const vip = document.createElement('span');
          vip.textContent = 'VIP';
          vip.style.cssText = 'background:#15B8BE;color:#fff;border-radius:2px;padding:4px 8px;font-size:10px;font-weight:800;line-height:1;';
          label.appendChild(vip);
        }
        const arrowBorder = document.createElement('div');
        arrowBorder.style.cssText = 'position:absolute;left:50%;transform:translateX(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid #ffffff;top:100%';
        label.appendChild(arrowBorder);
        const arrow = document.createElement('div');
        arrow.style.cssText = 'position:absolute;left:50%;transform:translateX(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid #1f2937;top:100%';
        label.appendChild(arrow);
        // Create dot element for normal posts
        const dot = document.createElement('div');
        dot.style.cssText = 'width:12px;height:12px;border-radius:50%;background:#0b0b0b;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4);cursor:pointer;';

        // Always use HTML overlay to control visibility precisely
        const overlay = createHtmlOverlay(pos, item?.isVip ? label : dot);
        const clickMarker = new googleObj.maps.Marker({ position: pos, map, opacity: 0 });
        const anchorForInfo: any = clickMarker;

        // Unified open detail handler
        const openDetail = () => {
          // Build detail card
          const card = document.createElement('div');
          card.style.cssText = 'width:300px; max-width:300px; display:flex; gap:12px; font-family:inherit; overflow:hidden; box-sizing:border-box;';

          const thumbWrap = document.createElement('div');
          thumbWrap.style.cssText = 'position:relative; width:100px; height:100px; flex:0 0 auto; overflow:hidden; border-radius:6px;';
          const img = document.createElement('img');
          img.src = item?.imageUrl || '/images/imgdemo_new@2x.png';
          img.alt = item?.title || '';
          img.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block;';
          thumbWrap.appendChild(img);
          if (item?.isVip) {
            const vip = document.createElement('div');
            vip.textContent = 'VIP';
            vip.style.cssText = 'position:absolute; top:6px; left:6px; background:#25C3C8; color:#fff; font-size:10px; font-weight:700; padding:2px 4px; border-radius:4px;';
            thumbWrap.appendChild(vip);
          }

          const body = document.createElement('div');
          body.style.cssText = 'flex:1 1 auto; min-width:0; overflow:hidden; position:relative; padding-right:24px;';
          const header = document.createElement('div');
          header.style.cssText = 'display:flex; align-items:flex-start; gap:8px;';
          const title = document.createElement('div');
          title.textContent = item?.title || 'Tin bất động sản';
          title.style.cssText = 'font-size:14px; font-weight:600; color:#111827; line-height:1.3; max-height:36px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1 1 auto;';
          const price = document.createElement('div');
          price.innerHTML = `<span style="color:#ef4444;font-weight:700">${item?.priceLabel || ''}</span>`;
          const meta = document.createElement('div');
          meta.style.cssText = 'display:flex; gap:16px; color:#4b5563; font-size:12px; margin-top:6px;';
          const area = document.createElement('span');
          area.style.cssText = 'display:inline-flex; align-items:center; gap:6px;';
          area.innerHTML = `${item?.areaBadge || ''}`;
          const bed = document.createElement('span');
          bed.style.cssText = 'display:inline-flex; align-items:center; gap:6px;';
          bed.innerHTML = `<img src="/svgs/bedroom.svg" alt="bed" width="16" height="16" /> ${item?.bedrooms ?? '-'}`;
          const bath = document.createElement('span');
          bath.style.cssText = 'display:inline-flex; align-items:center; gap:6px;';
          bath.innerHTML = `<img src="/svgs/bathroom.svg" alt="bath" width="16" height="16" /> ${item?.bathrooms ?? '-'}`;
          meta.append(area, bed, bath);
          const close = document.createElement('a');
          close.textContent = '×';
          close.style.cssText = 'color:#9CA3AF; text-decoration:none; font-size:16px; z-index:2; background:#ffffff; border-radius:999px; width:20px; height:20px; display:flex; align-items:center; justify-content:center; box-shadow: none; right:0; top:-2px; position:absolute;';
          close.href = '#';
          close.onclick = (e) => { e.preventDefault(); infoWindow.close(); };
          header.appendChild(title);
          header.appendChild(close);
          body.appendChild(header);
          body.appendChild(price);
          body.appendChild(meta);
          card.appendChild(thumbWrap);
          card.appendChild(body);
          // Footer link
          const footer = document.createElement('div');
          footer.style.cssText = 'margin-top:8px; font-size:12px;';
          const a = document.createElement('a');
          a.href = item?.url || `/property/${item?.id}`;
          a.textContent = 'Xem chi tiết';
          a.style.cssText = 'color:#2563eb; text-decoration:underline;';
          footer.appendChild(a);
          body.appendChild(footer);

          infoWindow.setContent(card);
          infoWindow.open({ map, anchor: anchorForInfo as any });
          // Hide default InfoWindow close button (we already render a custom one)
          googleObj.maps.event.addListenerOnce(infoWindow, 'domready', () => {
            const selectors = ['button[aria-label="Close"]', '.gm-ui-hover-effect'];
            selectors.forEach((sel) => {
              document.querySelectorAll(sel).forEach((el) => {
                (el as HTMLElement).style.display = 'none';
              });
            });
          });
        };

        // Click -> open detail (on any element around the location)
        (anchorForInfo as any).addListener?.('click', openDetail);
        label.addEventListener('click', openDetail);
        dot.addEventListener('click', openDetail);
        markers.push(overlay);
        normalEntries.push({ labelEl: label, dotEl: dot, overlay, clickMarker, isVip: !!item?.isVip });
      });

      const updateVisibility = () => {
        const z = map.getZoom();
        const showLabelZoom = 16;
        normalEntries.forEach((entry) => {
          if (entry.isVip) {
            // VIP: always show label
            if (entry.overlay) (entry.overlay as any).element.replaceWith(entry.labelEl);
            (entry.overlay as any).element = entry.labelEl;
          } else {
            const shouldShowLabel = z >= showLabelZoom;
            const targetEl = shouldShowLabel ? entry.labelEl : entry.dotEl;
            if ((entry.overlay as any).element !== targetEl) {
              (entry.overlay as any).element.replaceWith(targetEl);
              (entry.overlay as any).element = targetEl;
            }
          }
        });
      };
      updateVisibility();
      map.addListener('zoom_changed', updateVisibility);

        // Update URL with bounds & zoom when map settles
        let updateTimer: any = null;
        let hasInteracted = false;
        // Mark as interacted on zoom or drag
        map.addListener('zoom_changed', () => { hasInteracted = true; });
        map.addListener('dragend', () => { hasInteracted = true; });
        const updateUrl = () => {
          if (!map || !hasInteracted) return;
          const b = map.getBounds();
          if (!b) return;
          const ne = b.getNorthEast();
          const sw = b.getSouthWest();
          const z = map.getZoom();
          const params = new URLSearchParams(urlSearchParams.toString());
          if (z) params.set('z', String(z));
          params.set('nelat', String(ne.lat()));
          params.set('nelng', String(ne.lng()));
          params.set('swlat', String(sw.lat()));
          params.set('swlng', String(sw.lng()));
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        };
        map.addListener('idle', () => {
          clearTimeout(updateTimer);
          updateTimer = setTimeout(updateUrl, 250);
        });
      } catch (err) {
        console.error('Google Maps failed to load:', err);
        setFallbackIframe(true);
      }
    };

    init();
    return () => {
      markers.forEach((m) => m.map = null as any);
      map = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, items]);

  if (fallbackIframe) {
    const query = city || 'Vietnam';
    return (
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
      />
    );
  }
  return <div ref={containerRef} className="w-full h-full" />;
};

export default MapWithMarkers;


