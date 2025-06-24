import React from 'react';

interface ProgramWithQualification {
  name: string;
  hours: number;
  qualification: string;
  cost: number;
}

interface ProgramWithoutQualification {
  name: string;
  hours: number;
  cost: number;
}

type Program = ProgramWithQualification | ProgramWithoutQualification;

interface Section {
  title: string;
  programs: Program[];
}

const Dopop: React.FC = () => {
  const sections: Section[] = [
    {
      title: 'Сварочные работы',
      programs: [
        {
          name: 'Сварщик ручной дуговой сварки плавящимся покрытым электродом',
          hours: 432,
          qualification: '2 уровень квалификации',
          cost: 16000
        },
        {
          name: 'Сварщик газовой сварки',
          hours: 180,
          qualification: '2 уровень квалификации',
          cost: 7500
        },
        {
          name: 'Электрогазосварщик',
          hours: 432,
          qualification: '2 уровень квалификации',
          cost: 16000
        }
      ]
    },
    {
      title: 'Общестроительные работы',
      programs: [
        {
          name: 'Каменщик',
          hours: 252,
          qualification: '3 разряд',
          cost: 16000
        },
        {
          name: 'Штукатур',
          hours: 288,
          qualification: '3-4 разряд',
          cost: 10500
        },
        {
          name: 'Маляр строительный',
          hours: 432,
          qualification: '3-4 разряд',
          cost: 16000
        },
        {
          name: 'Столяр строительный',
          hours: 288,
          qualification: '3 разряд',
          cost: 10000
        },
        {
          name: 'Плотник',
          hours: 288,
          qualification: '3-4 разряд',
          cost: 10500
        }
      ]
    },
    {
      title: 'Производство мебели',
      programs: [
        {
          name: 'Сборщик изделий из древесины',
          hours: 288,
          qualification: '3 разряд',
          cost: 10500
        }
      ]
    },
    {
      title: 'Общественное питание',
      programs: [
        {
          name: 'Бармен',
          hours: 189,
          qualification: '4 разряд',
          cost: 6500
        },
        {
          name: 'Повар',
          hours: 432,
          qualification: '4 разряд',
          cost: 15000
        }
      ]
    },
    {
      title: 'Деятельность по обработке данных',
      programs: [
        {
          name: 'Оператор электронно-вычислительных и вычислительных машин',
          hours: 320,
          qualification: '3 разряд',
          cost: 10500
        }
      ]
    },
    {
      title: 'Дополнительное образование детей и взрослых',
      programs: [
        {
          name: 'AutoCAD (программа для проектирования и цифрового черчения трёхмерных моделей)',
          hours: 36,
          cost: 5000
        },
        {
          name: 'Карвинг',
          hours: 36,
          cost: 3000
        },
        {
          name: 'Основы веб-дизайна',
          hours: 36,
          cost: 3000
        }
      ]
    }
  ];

  const isProgramWithQualification = (program: Program): program is ProgramWithQualification => {
    return 'qualification' in program;
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-12 text-center">
          Программы обучения
        </h1>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">{section.title}</h2>
            <div className="overflow-x-auto">
              {section.title === 'Дополнительное образование детей и взрослых' ? (
                <table className="min-w-full text-left text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-2">№</th>
                      <th className="px-4 py-2">Наименование программы</th>
                      <th className="px-4 py-2">Количество часов</th>
                      <th className="px-4 py-2">Стоимость, руб.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.programs.map((program, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{program.name}</td>
                        <td className="px-4 py-2">{program.hours}</td>
                        <td className="px-4 py-2">{program.cost.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="min-w-full text-left text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-2">№</th>
                      <th className="px-4 py-2">Наименование программы</th>
                      <th className="px-4 py-2">Количество часов</th>
                      <th className="px-4 py-2">Присваиваемый разряд</th>
                      <th className="px-4 py-2">Стоимость, руб.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.programs.map((program, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{program.name}</td>
                        <td className="px-4 py-2">{program.hours}</td>
                        <td className="px-4 py-2">
                          {isProgramWithQualification(program) ? program.qualification : '-'}
                        </td>
                        <td className="px-4 py-2">{program.cost.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Контактная информация</h2>
          <p className="text-gray-300 mb-2">Адрес: 347871, Ростовская область, г. Гуково, ул. Карла Маркса 54</p>
          <p className="text-gray-300 mb-2">Руководитель МФЦПК: Лобанова Наталья Ивановна</p>
          <p className="text-gray-300 mb-2">Телефон: 8 (863) 61-5-64-42</p>
          <p className="text-gray-300">Email: <a href="mailto:gstgukovo@yandex.ru" className="text-indigo-400 hover:underline">gstgukovo@yandex.ru</a></p>
          <p className="text-gray-300 mt-4 text-sm">* Стоимость обучения указана при комплектации группы не менее 10 человек.</p>
        </div>
      </div>
    </div>
  );
};

export default Dopop;