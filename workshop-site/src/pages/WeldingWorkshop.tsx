import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface Master {
    id: number;
    name: string;
    photo: string;
}

interface Equipment {
    name: string;
    description: string;
    photo: string;
}

const WeldingWorkshop: React.FC = () => {
    const equipment: Equipment[] = [
        {
            name: 'Сварочный аппарат «Кентавр»',
            description: 'Профессиональный сварочный аппарат для для выполнения различного рода бытовых и мелких производственных задач по сварке металла',
            photo: '/src/assets/Мастерские/Сварка/верстак.jpg'
        },
        {
            name: 'Сварочный инвертор Ресанта',
            description: 'Аппарат для сварки металлических конструкций',
            photo: '/src/assets/Мастерские/Сварка/верстак 2.jpg'
        },
    ];

    const additionalEquipment = {
        post1: [
            { name: 'Рабочее место мастера производственного обучения', quantity: 1 },
            { name: 'Сварочный многопостовой выпрямитель ВДМ', quantity: 1 },
            { name: 'Столы сварщика (сварочные посты)', quantity: 8, unit: 'постов' },
            { name: 'Вытяжная и приточная вентиляция', quantity: 1 },
            { name: 'Экраны защитные (шторы брезентовые огнеупорные)', quantity: 8 },
            { name: 'Сварочные инверторы для сварки', quantity: 2 },
            { name: 'Сварочный аппарат «Кентавр»', quantity: 1 },
            { name: 'Сварочный аппарат Practica', quantity: 1 },
            { name: 'Сварочный инвертор Ресанта', quantity: 1 },
            { name: 'Сварочные маски', quantity: 15 },
            { name: 'Станок заточной', quantity: 1 },
            { name: 'Столы слесарные с тисками', quantity: 10 }
        ],
        post2: [
            { name: 'Сварочный углекислотный аппарат Электроприбор ПДГ', quantity: 1 },
            { name: 'Столы сварщика (сварочный пост)', quantity: 1, unit: 'пост' },
            { name: 'Баллоны углекислотные, редукторы баллонные', quantity: 1 },
            { name: 'Экраны защитные (шторы брезентовые огнеупорные)', quantity: 8 },
            { name: 'Сварочные маски', quantity: 2 }
        ],
        post3: [
            { name: 'Рабочие столы сварщика с защитными экранами', quantity: 2 },
            { name: 'Генераторы ацетиленовые', quantity: 2 },
            { name: 'Баллоны кислородные, редукторы баллонные', quantity: 2, unit: 'компл' },
            { name: 'Тележки для баллонов', quantity: 1 },
            { name: 'Клапаны обратные', quantity: 3 },
            { name: 'Горелки кислородно-пропановая и кислородно-ацетиленовая', quantity: 2, unit: 'компл' }
        ],
        ppe: [
            { name: 'Спецодежда (костюм сварщика брезентовый и рукавицы)', quantity: 25 },
            { name: 'Защитная обувь', quantity: 25, unit: 'пар' },
            { name: 'Рукавицы (комбинированные с 2-ным налодонником)', quantity: 25, unit: 'пар' },
            { name: 'Защитные очки', quantity: 12 },
            { name: 'Кепка (берет суконный)', quantity: 25 },
            { name: 'Каска', quantity: 3 },
            { name: 'Аптечка', quantity: 1 },
            { name: 'Защитные очки для шлифовки', quantity: 5 },
            { name: 'Сварочная маска', quantity: 8 }
        ],
        tools: [
            { name: 'Ручная шлифовальная машинка (болгарка) с защитным кожухом', quantity: 2 },
            { name: 'Металлическая щетка для шлифовальной машинки', quantity: 1 },
            { name: 'Молоток для отделения шлака', quantity: 15 },
            { name: 'Зубило', quantity: 8 },
            { name: 'Напильники', quantity: 10 },
            { name: 'Металлические щетки', quantity: 5 },
            { name: 'Молоток', quantity: 10 },
            { name: 'Универсальный шаблон сварщика', quantity: 1 },
            { name: 'Стальная линейка с метрической разметкой', quantity: 3 },
            { name: 'Прямоугольник', quantity: 3 },
            { name: 'Струбцины и приспособления для сборки под сварку', quantity: 1, unit: 'компл' }
        ]
    };

    const masters: Master[] = [
        {
            id: 1,
            name: 'Малюгин Вадим Григорьевич',
            photo: '/src/assets/Мастерские/Сварка/Малюгин.jpg'
        },
        {
            id: 2,
            name: 'Аринин Александр Николаевич',
            photo: '/src/assets/Мастерские/Сварка/Аринин.png'
        },
    ];

    const workExamples = [
        '/src/assets/Мастерские/Сварка/пример зонтик.jpg',
        '/src/assets/Мастерские/Сварка/пример1.jpg',
        '/src/assets/Мастерские/Сварка/пример2.jpg',
        '/src/assets/Мастерские/Сварка/пример3.jpg',
        '/src/assets/Мастерские/Сварка/пример4.jpg',
        '/src/assets/Мастерские/Сварка/пример5.jpg',
    ];

    const [currentMasterIndex, setCurrentMasterIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showMoreEquipment, setShowMoreEquipment] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            nextMaster();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextMaster = () => {
        setCurrentMasterIndex((prev) => (prev + 1) % masters.length);
    };

    const prevMaster = () => {
        setCurrentMasterIndex((prev) => (prev - 1 + masters.length) % masters.length);
    };

    const openModal = (image: string) => {
        setSelectedImage(image);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-primary mb-12 text-center">
                    Сварочная мастерская
                </h1>
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-6">
                        Добро пожаловать в ГСТ
                    </h1>
                    <h2 className="text-2xl font-semibold mb-6 text-white">
                        О нашем техникуме
                    </h2>
                    <p className="text-gray-300 mb-4 text-lg">
                        Гуковский строительный техникум (ГСТ) - это современное образовательное учреждение,
                        где студенты получают качественное профессиональное образование в области строительства
                        и смежных специальностей.
                    </p>
                    <p className="text-gray-300 text-lg">
                        Наши мастерские оснащены современным оборудованием и предоставляют широкий спектр
                        услуг как для обучения студентов, так и для выполнения заказов.
                    </p>
                </div>

                <div className="mb-16 bg-gray-800 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-primary mb-8">Наше оборудование</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {equipment.map((item, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                                    <p className="text-gray-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {equipment.map((item, index) => (
                                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                                    <img
                                        src={item.photo}
                                        alt={`Оборудование: ${item.name}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = '/src/assets/placeholder.jpg';
                                            console.error(`Ошибка загрузки изображения: ${item.photo}`);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={() => setShowMoreEquipment(!showMoreEquipment)}
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            {showMoreEquipment ? 'Скрыть' : 'Показать еще'}
                        </button>
                        {showMoreEquipment && (
                            <div className="mt-6 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Пост №1: Ручная дуговая сварка плавящимся электродом</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.post1.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} {item.unit || 'шт'})</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Пост №2: Полуавтоматическая и ручная дуговая сварка</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.post2.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} {item.unit || 'шт'})</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Пост №3: Газовая сварка и резка</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.post3.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} {item.unit || 'шт'})</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Средства индивидуальной защиты</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.ppe.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} {item.unit || 'шт'})</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Инструменты и приспособления</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.tools.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} {item.unit || 'шт'})</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-16 bg-gray-800 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-primary mb-8">Наши мастера</h2>
                    <div className="relative">
                        <div className="flex justify-center items-center">
                            <button
                                onClick={prevMaster}
                                className="absolute left-0 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                            >
                                <FaChevronLeft size={24} />
                            </button>
                            <div className="text-center">
                                <div className="w-48 h-48 mx-auto mb-4 relative rounded-full overflow-hidden">
                                    <img
                                        src={masters[currentMasterIndex].photo}
                                        alt={masters[currentMasterIndex].name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    {masters[currentMasterIndex].name}
                                </h3>
                            </div>
                            <button
                                onClick={nextMaster}
                                className="absolute right-0 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                            >
                                <FaChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-primary mb-8">Примеры наших работ</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workExamples.map((photo, index) => (
                            <div 
                                key={index} 
                                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                                onClick={() => openModal(photo)}
                            >
                                <img
                                    src={photo}
                                    alt={`Пример сварочной работы ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.currentTarget.src = '/src/assets/placeholder.jpg';
                                        console.error(`Ошибка загрузки изображения: ${photo}`);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-w-4xl max-h-[90vh] mx-4">
                            <img
                                src={selectedImage}
                                alt="Увеличенное изображение"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-4 -right-4 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-white transition-all hover:scale-110"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeldingWorkshop;