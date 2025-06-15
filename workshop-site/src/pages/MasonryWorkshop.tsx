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

const MasonryWorkshop: React.FC = () => {
    const equipment: Equipment[] = [
        {
            name: 'Камнерезный станок DIAM SK 800/2.2',
            description: 'Профессиональная бетономешалка для приготовления строительных растворов',
            photo: '/assets/Мастерские/Камень/stanok.jpg'
        },
        {
            name: 'Камнерезный станок',
            description: 'Станок для точной резки камня и плитки',
            photo: '/assets/Мастерские/Камень/оборудование1.jpg'
        },
    ];

    const additionalEquipment = {
        machines: [
            { name: 'Камнерезный станок DIAM SK 800/2.2', quantity: 3 }
        ],
        tools: [
            { name: 'Верстак', quantity: 6 },
            { name: 'Растворный ящик', quantity: 6 },
            { name: 'Ведро', quantity: 20 },
            { name: 'Лопата совковая', quantity: 6 },
            { name: 'Щетка для уборки', quantity: 6 },
            { name: 'Совок для уборки', quantity: 6 },
            { name: 'Правило 2м', quantity: 6 },
            { name: 'Кельма каменщика', quantity: 6 },
            { name: 'Расшивка для формирования швов плоская', quantity: 6 },
            { name: 'Расшивка для формирования швов вогнутая', quantity: 6 },
            { name: 'Молоток-кирочка', quantity: 6 },
            { name: 'Киянка резиновая', quantity: 6 },
            { name: 'Нож строительный', quantity: 6 },
            { name: 'Рулетка', quantity: 6 },
            { name: 'Металлическая линейка', quantity: 6 },
            { name: 'Уровень строительный 600 мм', quantity: 6 },
            { name: 'Уровень строительный 1000 мм', quantity: 6 },
            { name: 'Уровень строительный 1500 мм', quantity: 6 },
            { name: 'Угольник металлический 300 мм', quantity: 6 },
            { name: 'Уровень электронный 600мм', quantity: 6 },
            { name: 'Электронный угломер', quantity: 6 },
            { name: 'Щетка сметка', quantity: 6 },
            { name: 'Тачка строительная', quantity: 3 },
            { name: 'Строительный миксер', quantity: 4 },
            { name: 'Контейнер для строительных отходов 120л', quantity: 3 },
            { name: 'Контейнер для бытовых отходов 240л', quantity: 2 },
            { name: 'Часы настенные', quantity: 2 },
            { name: 'Огнетушитель', quantity: 2 }
        ],
        ppe: [
            { name: 'Спецодежда', quantity: 25, unit: 'компл' },
            { name: 'Защитная обувь', quantity: 25, unit: 'пар' },
            { name: 'Рукавицы', quantity: 25, unit: 'пар' },
            { name: 'Защитные очки', quantity: 12, unit: 'шт' },
            { name: 'Кепка', quantity: 25, unit: 'шт' },
            { name: 'Аптечка', quantity: 1, unit: 'шт' }
        ]
    };
    const masters: Master[] = [
        {
            id: 1,
            name: 'Лесников Игорь Юрьевич',
            photo: '/assets/Мастерские/Камень/Лесников.jpg'
        },
        {
            id: 2,
            name: 'Сидоров Михаил Петрович',
            photo: '/assets/Мастерские/Каменные/master2.jpg'
        },
    ];

    const workExamples = [
        '/assets/Мастерские/Камень/пример1.jpg',
        '/assets/Мастерские/Камень/фото.jpg',
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
                    Мастерская каменных работ
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
                                    <h3 className="text-xl font-semibold text-white mb-4">Станки</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.machines.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} шт)</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Инструменты и приспособления</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.tools.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} шт)</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Индивидуальные средства защиты</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.ppe.map((item, index) => (
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
                                    alt={`Пример каменной работы ${index + 1}`}
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

export default MasonryWorkshop;