export interface CategoryContent {
  title: string;
  description: string;
  images: string[];
}

export const categoryContents: Record<string, CategoryContent> = {
  'сварка': {
    title: 'Сварочные работы',
    description: 'Мы предоставляем профессиональные сварочные услуги с использованием современного оборудования. Наши специалисты выполняют все виды сварочных работ с высоким качеством и соблюдением всех технических стандартов.',
    images: [
      '/src/assets/Сварочные/DSC_1074.JPG',
      '/src/assets/Сварочные/IMG_0820.jpg',
      '/src/assets/Сварочные/IMG_20201125_110747.jpg',
      '/src/assets/Сварочные/IMG_20201125_110956.jpg',
      '/src/assets/Сварочные/IMG_20210119_144859.jpg',
      '/src/assets/Сварочные/IMG_20210129_133111.jpg',
      '/src/assets/Сварочные/IMG_20210129_133123.jpg'
    ]
  },
  'поварское дело': {
      title: 'Поварское дело',
      description: 'Поварское дело — это искусство создания кулинарных шедевров. В наших мастерских студенты учатся готовить разнообразные блюда, осваивают современные технологии приготовления пищи и работают с профессиональным оборудованием. Мы развиваем креативность, внимание к деталям и любовь к гастрономии.',
      images: [
        '/src/assets/Повар/GDYXh2MQN6U.jpg',
        '/src/assets/Повар/BIyUoc3JWHI.jpg',
        '/src/assets/Повар/D8RvOhcLuPQ.jpg',
        '/src/assets/Повар/Son6czdvwqg.jpg',
        '/src/assets/Повар/fZmbHPQlWhM.jpg',
        '/src/assets/Повар/h5ruQrV65hU.jpg',
        '/src/assets/Повар/nSmve6NBnMQ.jpg',
        '/src/assets/Повар/rVuQgfnlwUg.jpg',
        '/src/assets/Повар/uXPY3NiLM0k.jpg',
        '/src/assets/Повар/vfGigCqO4oQ.jpg'
      ]
    }
};


  