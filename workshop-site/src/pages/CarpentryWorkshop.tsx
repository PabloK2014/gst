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

const CarpentryWorkshop: React.FC = () => {
    const equipment: Equipment[] = [
        {
            name: 'Фрезерный станок',
            description: 'Профессиональный фрезерный станок для обработки древесины',
            photo: '/src/assets/Мастерские/Столярные/milling.jpg'
        },
        {
            name: 'Токарный станок по дереву',
            description: 'Станок для точной токарной обработки древесины',
            photo: '/src/assets/Мастерские/Столярные/lathe.jpg'
        },
        {
            name: 'Ленточная пила',
            description: 'Профессиональная ленточная пила для распила древесины',
            photo: '/src/assets/Мастерские/Столярные/saw.jpg'
        },
    ];

    const additionalEquipment = {
        handTools: {
            marking: [
                { name: 'Рулетка', quantity: 10 },
                { name: 'Линейка', quantity: 15 },
                { name: 'Угольник', quantity: 11 },
                { name: 'Уровень', quantity: 3 },
                { name: 'Рейсмус', quantity: 1 },
                { name: 'Отвес', quantity: 2 },
                { name: 'Разметочный шнур', quantity: 1 }
            ],
            sawing: [
                { name: 'Ножовка для продольного пиления', quantity: 15 },
                { name: 'Ножовка для поперечного пиления', quantity: 15 },
                { name: 'Двуручная пила', quantity: 2 },
                { name: 'Лучковая пила', quantity: 2 }
            ],
            planing: [
                { name: 'Рубанок', quantity: 13 },
                { name: 'Фуганок', quantity: 4 }
            ],
            chiseling: [
                { name: 'Стамеска плоская 16мм', quantity: 13 },
                { name: 'Стамеска плоская 12мм', quantity: 9 },
                { name: 'Стамеска плоская 8мм', quantity: 10 },
                { name: 'Стамеска плоская 6мм', quantity: 5 }
            ],
            drilling: [
                { name: 'Коловорот', quantity: 5 },
                { name: 'Перовое сверло, центровое сверло', quantity: 47 }
            ],
            auxiliary: [
                { name: 'Молоток', quantity: 13 },
                { name: 'Киянка деревянная', quantity: 13 },
                { name: 'Киянка деревянная резиновая', quantity: 3 },
                { name: 'Клещи', quantity: 5 },
                { name: 'Струбцины', quantity: 5 },
                { name: 'Гвоздодёр', quantity: 3 },
                { name: 'Напильники', quantity: 10 }
            ]
        },
        powerTools: [
            { name: 'Электрорубанок', quantity: 1 },
            { name: 'Ручная циркулярная пила', quantity: 1 },
            { name: 'Электролобзик', quantity: 3 },
            { name: 'Дрель', quantity: 2 },
            { name: 'Перфоратор', quantity: 1 },
            { name: 'Шлифовальные машины', quantity: 2 },
            { name: 'Пила торцовочная', quantity: 1 },
            { name: 'Пылесос', quantity: 1 },
            { name: 'Шуруповерт', quantity: 3 },
            { name: 'Фрезерная машина', quantity: 1 },
            { name: 'Комплект эл. гравера', quantity: 1 }
        ],
        fixtures: [
            { name: 'Шкаф для хранения инструментов', quantity: 2 },
            { name: 'Стеллажи для хранения материалов', quantity: 4 },
            { name: 'Шкаф для спец. одежды обучающихся', quantity: 1 },
            { name: 'Спецодежда', quantity: 1, unit: 'компл' },
            { name: 'Рабочее место – столярный верстак с тисками', quantity: 15 }
        ]
    };

    const masters: Master[] = [
        {
            id: 1,
            name: 'Сиденко Роман Владимирович',
            photo: '/src/assets/Мастерские/Столярные/master1.jpg'
        },
        {
            id: 2,
            name: 'Зайцев Виталий Александрович',
            photo: '/src/assets/Мастерские/Столярные/master2.jpg'
        },
    ];

    const workExamples = [
        '/src/assets/Мастерские/Столяр/пример4.jpg',
        '/src/assets/Мастерские/Столяр/пример3.jpg',
        '/src/assets/Мастерские/Столяр/стол.jpg',
        '/src/assets/Мастерские/Столяр/стол2.jpg',
        '/src/assets/Мастерские/Столяр/фото1.jpg',
        '/src/assets/Мастерские/Столяр/фото2.jpg',
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
                    Мастерская столярных работ
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
                                    <h3 className="text-xl font-semibold text-white mb-4">Ручной инструмент</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-300">Разметочный</h4>
                                            <ul className="text-gray-300 list-disc pl-5">
                                                {additionalEquipment.handTools.marking.map((item, index) => (
                                                    <li key={index}>{item.name} ({item.quantity} шт)</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-300">Для пиления</h4>
                                            <ul className="text-gray-300 list-disc pl-5">
                                                {additionalEquipment.handTools.sawing.map((item, index) => (
                                                    <li key={index}>{item.name} ({item.quantity} шт)</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-300">Для строгания</h4>
                                            <ul className="text-gray-300 list-disc pl-5">
                                                {additionalEquipment.handTools.planing.map((item, index) => (
                                                    <li key={index}>{item.name} ({item.quantity} шт)</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-300">Для долбления</h4>
                                            <ul className="text-gray-300 list-disc pl-5">
                                                {additionalEquipment.handTools.chiseling.map((item, index) => (
                                                    <li key={index}>{item.name} ({item.quantity} шт)</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-300">Для сверления</h4>
                                            <ul className="text-gray-300 list-disc pl-5">
                                                {additionalEquipment.handTools.drilling.map((item, index) => (
                                                    <li key={index}>{item.name} ({item.quantity} шт)</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-300">Вспомогательный инструмент</h4>
                                            <ul className="text-gray-300 list-disc pl-5">
                                                {additionalEquipment.handTools.auxiliary.map((item, index) => (
                                                    <li key={index}>{item.name} ({item.quantity} шт)</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Электроинструмент</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.powerTools.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} шт)</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Приспособления, принадлежности, инвентарь</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.fixtures.map((item, index) => (
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
                                    alt={`Пример столярной работы ${index + 1}`}
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

export default CarpentryWorkshop;