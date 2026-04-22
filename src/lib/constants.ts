// src/lib/constants.ts

export interface Product {
  id: string;
  name: string;
  price: string;
  thumb: string;
  description: string;
  details: string[];
  gallery: string[];
}

export const PRODUCTS: Product[] = [
  { 
    id: '01', 
    name: 'Vinorleague Collectible Box', 
    price: '₩42,000', 
    thumb: '/thumb1.jpg',
    description: '바이너리그의 정수를 담은 한정판 콜렉터블 박스입니다. 세심하게 디자인된 패키지와 함께 브랜드의 첫 번째 아카이브를 소장해보세요.',
    details: ['Size: 200x150x80mm', 'Material: Eco-friendly Cardboard', 'Includes 3 Random Items'],
    gallery: ['/scene1.jpg', '/thumb2.jpg', '/scene4.jpg']
  },
  { 
    id: '02', 
    name: 'Vinorleague Digital Clock', 
    price: '₩35,000', 
    thumb: '/thumb2.jpg',
    description: '기하학적인 폰트 스타일이 적용된 디지털 시계입니다. 당신의 데스크 위에서 시간마저 바이너리그의 감각으로 흐르게 합니다.',
    details: ['USB Powered', 'LED Display', 'Alarm Function Included'],
    gallery: ['/thumb1.jpg', '/scene2.jpg', '/thumb3.jpg']
  },
  { 
    id: '03', 
    name: 'Vinorleague Pattern Phone Case', 
    price: '₩18,000', 
    thumb: '/thumb3.jpg',
    description: '바이너리그만의 시그니처 패턴이 정교하게 각인된 폰 케이스입니다. 일상의 모든 통화와 메시지를 특별한 순간으로 만들어줍니다.',
    details: ['TPU Impact Resistance', 'Ultra Slim Fit', 'Wireless Charging Support'],
    gallery: ['/scene3.jpg', '/thumb4.jpg', '/thumb2.jpg']
  },
  { 
    id: '04', 
    name: 'Vinorleague Embroidered Pouch', 
    price: '₩12,000', 
    thumb: '/thumb4.jpg',
    description: '부드러운 소재 위에 바이너리그 로고가 자수로 새겨진 파우치입니다. 작은 소품들을 감각적으로 보관할 수 있는 최적의 아이템입니다.',
    details: ['Cotton Canvas', 'YKK Premium Zipper', 'Compact Size'],
    gallery: ['/thumb1.jpg', '/thumb3.jpg', '/scene1.jpg']
  },
  { 
    id: '05', 
    name: 'Vinorleague Family Duck Toy', 
    price: '₩24,000', 
    thumb: '/thumb5.png',
    description: '바이너리그 패밀리의 가장 엉뚱한 친구, 덕 토이입니다. 비비드한 컬러와 친근한 디자인으로 당신의 공간에 활력을 불어넣습니다.',
    details: ['Silicone Material', 'Hand-painted Details', 'Waterproof'],
    gallery: ['/thumb6.jpg', '/thumb7.jpg', '/thumb8.png']
  },
  { 
    id: '06', 
    name: 'Travel with Vinorleague (Map)', 
    price: '₩48,000', 
    thumb: '/thumb6.jpg',
    description: '바이너리그의 세계관이 펼쳐진 대형 포스터 맵입니다. 벽면 한가운데 새로운 탐험의 이야기를 걸어보세요.',
    details: ['A1 Size (594x841mm)', 'Premium Archive Paper', 'Matte Finish'],
    gallery: ['/scene4.jpg', '/scene1.jpg', '/hero.png']
  },
  { 
    id: '07', 
    name: 'Good Sports Talk (Car)', 
    price: '₩39,000', 
    thumb: '/thumb7.jpg',
    description: '브랜드의 에너제틱한 감성을 담은 다이캐스트 자동차 모델입니다. 직선과 곡선의 조화로운 미학을 경험해 보세요.',
    details: ['1:24 Scale Model', 'Moving Parts', 'Collector\'s Edition'],
    gallery: ['/scene2.jpg', '/thumb4.jpg', '/thumb1.jpg']
  },
  { 
    id: '08', 
    name: 'Vinus: The Forest Spirit', 
    price: '₩55,000', 
    thumb: '/thumb8.png',
    description: '바이너리그 전설 속 숲의 정령, 비너스를 형상화한 아트 토이입니다. 신비롭고 몽환적인 분위기를 자아내는 프리미엄 피규어입니다.',
    details: ['Resin Casted', 'Glow-in-the-dark Eyes', 'Numbered Edition (Limited)'],
    gallery: ['/scene3.jpg', '/thumb5.png', '/scene1.jpg']
  },
];
