const Admission = () => {
  const specialties = [
    {
      code: '08.02.01',
      name: 'Строительство и эксплуатация зданий и сооружений',
      fullTime: '3 г. 10 мес.',
      partTime: '3 г. 10 мес.',
      qualification: 'Техник',
      image: '/assets/specialties/08.02.jpg',
    },
    {
      code: '09.02.07',
      name: 'Информационные системы и программирование',
      fullTime: '3 г. 10 мес.',
      partTime: '-',
      qualification: 'Администратор баз данных',
      image: '/assets/specialties/09.02.jpg',
    },
    {
      code: '43.02.15',
      name: 'Поварское и кондитерское дело',
      fullTime: '3 г. 10 мес.',
      partTime: '3 г. 10 мес.',
      qualification: 'Специалист по поварскому и кондитерскому делу',
      image: '/assets/specialties/43.02.jpg',
    },
    {
      code: '08.02.14',
      name: 'Эксплуатация и обслуживание многоквартирного дома',
      fullTime: '2 г. 10 мес.',
      partTime: '-',
      qualification: 'Техник',
      image: '/assets/specialties/08.02.14.jpg',
    },
  ];

  const professions = [
    {
      code: '15.01.05',
      name: 'Сварщик ручной и частично механизированной сварки (наплавщик)',
      fullTime: '1 г. 10 мес.',
      qualification: 'Сварщик ручной дуговой сварки плавящимся покрытым электродом',
      image: '/assets/specialties/15.01.JPG',
    },
    {
      code: '08.01.27',
      name: 'Мастер общестроительных работ',
      fullTime: '1 г. 10 мес.',
      qualification: 'Мастер общестроительных работ',
      image: '/assets/specialties/08.01.jpg',
    },
  ];


  const documents = [
    { name: 'Заявление о приеме в техникум', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Вступительные испытания', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Положение о приемной комиссии ГБПОУ РО «ГСТ» 2025-2026 г', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Правила приема в ГБПОУ РО «ГСТ» 2025-2026 г', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Приказ об утверждении правил приема 2025-2026 г', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Положение о предоставлении платных образовательных услуг', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Приказ о создании приёмной комиссии на 2025-2026 гг', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Положение об апелляционной комиссии ГБПОУ РО «ГСТ»', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Вакантные места для приема перевода', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Контрольные цифры приема на 2024-2025 учебный год', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
    { name: 'Количество мест по договорам об оказании платных образовательных услуг 2023-2024', url: 'http://www.gst-gukovo.ru/priem-v-gst/' },
  ];

  return (
    <>
      <div className="p-8 text-white max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Прием в ГСТ</h1>

        <div className="mb-12">
          <div className="w-full flex items-center justify-center h-70 rounded-lg mb-4">
            <img
              src="/assets/specialties/gst.jpg"
              alt="Общая информация о приеме"
              className="w-full h-70 object-cover rounded-lg"
              onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Общая информация о приеме</h2>
          <p className="text-lg mb-4">
            Заявление на поступление в техникум можно подать как в дистанционной форме, так и очно.
          </p>
          <p className="text-lg">
            Прием для обучения по основным профессиональным программам подготовки специалистов среднего звена и квалифицированных рабочих, служащих проводится <strong>без вступительных испытаний</strong> (конкурс аттестатов) на 2025–2026 учебный год.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Специальности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialties.map((specialty) => (
              <div key={specialty.code} className="flex flex-col">
                <div className="w-full bg-gray-700 flex items-center justify-center h-48 rounded-lg mb-4">
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="w-full h-48 object-contain rounded-lg"
                    onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{specialty.name}</h3>
                <p className="text-sm text-gray-400">
                  <strong>Код:</strong> {specialty.code}<br />
                  <strong>Очная форма (9 классов):</strong> {specialty.fullTime}<br />
                  <strong>Заочная форма (11 классов):</strong> {specialty.partTime}<br />
                  <strong>Квалификация:</strong> {specialty.qualification}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Профессии</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professions.map((profession) => (
              <div key={profession.code} className="flex flex-col">
                <div className="w-full bg-gray-700 flex items-center justify-center h-48 rounded-lg mb-4">
                  <img
                    src={profession.image}
                    alt={profession.name}
                    className="w-full h-48 object-contain rounded-lg"
                    onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{profession.name}</h3>
                <p className="text-sm text-gray-400">
                  <strong>Код:</strong> {profession.code}<br />
                  <strong>Очная форма (9 классов):</strong> {profession.fullTime}<br />
                  <strong>Квалификация:</strong> {profession.qualification}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="w-full flex items-center justify-center h-70 rounded-lg mb-4">
            <img
              src="/assets/specialties/gst2.jpg"
              alt="Контакты и подача документов"
              className="w-full h-70 object-cover rounded-lg"
              onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Контакты и подача документов</h2>
          <p className="text-lg mb-4">
            <strong>Адрес:</strong> г. Гуково, ул. Карла Маркса, 54 (ост. Сокольники)<br />
            <strong>Телефон:</strong> (8-863-61)-5-64-42<br />
            <strong>E-mail:</strong>{' '}
            <a href="mailto:gstgukovo@yandex.ru" className="text-indigo-500 hover:text-indigo-400">
              gstgukovo@yandex.ru
            </a>
          </p>
          <p className="text-lg mb-4">
            Прием заявлений абитуриентов и копий документов возможен в электронной форме на электронную почту{' '}
            <a href="mailto:gstgukovo@yandex.ru" className="text-indigo-500 hover:text-indigo-400">
              gstgukovo@yandex.ru
            </a>{' '}
            (с пометкой “абитуриенту”).
          </p>
          <p className="text-lg">
            <strong>Важно:</strong> Зачисление в образовательное учреждение возможно только при предоставлении оригинала документа об образовании (аттестата).
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Документы</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            {documents.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} className="text-indigo-500 hover:text-indigo-400">
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            Примечание: Вы даете согласие на обработку персональных данных и соглашаетесь с{' '}
            <a href="/privacy-policy" target="_blank" className="privacy-link">
              политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Admission;