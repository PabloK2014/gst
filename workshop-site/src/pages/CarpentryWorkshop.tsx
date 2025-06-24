import React, { useState } from 'react';
import {FaTimes } from 'react-icons/fa';

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
            name: 'станок токарный с копиром JET',
            description: 'верстак для обработки древесины',
            photo: '/assets/Мастерские/Столяр/СтолярПила2.JPG'
        },
        {
            name: 'Токарный станок по дереву',
            description: 'Станок для точной токарной обработки древесины',
            photo: '/assets/Мастерские/Столяр/столяробщ.JPG'
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
            { name: 'Комплект эл. гравера', quantity: 1 },
            { name: 'Станок УРТ-410 фуговально-рейсмусовый', quantity: 1 },
            { name: 'Станок рейсмусовый JE', quantity: 1 },
            { name: 'Станок углозарезной DEWALT радиально-консольная пила', quantity: 1 },
            { name: 'Станок токарный с копиром JET', quantity: 1 },
            { name: 'Станок СЗЕП-600Т (для заточки пил)', quantity: 1 },
            { name: 'Сушильная камера аэродинамическая 10м', quantity: 1 },
            { name: 'Пылесос для сборки стружки JET DC-1100CK', quantity: 2 },
            { name: 'Станок SС-30А форматно-раскроечный L 3000мм', quantity: 1 },
            { name: 'Станок В-70 кромкооблицовочный', quantity: 1 },
            { name: 'Установка компрессорная С54/С-100LВ 30А', quantity: 1 },
            { name: 'Станок ШЛ П-ст плоскошлифовальный ленточный', quantity: 1 },
            { name: 'Станок ФСШ-1А (К) фрезерный с шипорезной кареткой', quantity: 1 },
            { name: 'Станок долбежный JET 719A', quantity: 1 },
            { name: 'Станок BRAVO 5-250 комбинированный деревообрабатывающий', quantity: 1 },
            { name: 'Станок настольно-сверлильный ЗК-631', quantity: 1 },
            { name: 'Станок точильно-шлифовальный ЗК-631', quantity: 1 },
            { name: 'Станок 4-х сторонний деревообрабатывающий', quantity: 1 },
            { name: 'Станок деревообрабатывающий', quantity: 1 },
            { name: 'Пылесос для стружки «Корвет»', quantity: 1 },
            { name: 'Установка вентиляционная пылеулавливающая', quantity: 1 },
            { name: 'Станок Ц6-2 (круглопильный)', quantity: 1 },
            { name: 'Станок рейсмусовый односторонний СР6-9', quantity: 1 },
            { name: 'Станок долбежный (модернизирован из комбинированного)', quantity: 1 },
            { name: 'Станок настольно-сверлильный JET', quantity: 1 },
            { name: 'Пресс гидравлический горячий 2-х пролетный', quantity: 1 },
            { name: 'Вайма сборочная вертикальная', quantity: 1 }
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
            photo: '/assets/Мастерские/Столяр/sidenko.png'
        },
        {
            id: 2,
            name: 'зайцев Виталий Александрович',
            photo: '/assets/Мастерские/Столяр/zaicev.png'
            
        }
    ];

    const workExamples = [
        '/assets/Мастерские/Столяр/пример4.jpg',
        '/assets/Мастерские/Столяр/пример3.jpg',
        '/assets/Мастерские/Столяр/stol.jpg',
        '/assets/Мастерские/Столяр/стол2.jpg',
        '/assets/Мастерские/Столяр/фото1.jpg',
        '/assets/Мастерские/Столяр/фото2.jpg',
    ];

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showMoreEquipment, setShowMoreEquipment] = useState(false);

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
                    <h2 className="text-2xl font-semibold mb-6 text-white">
                        Мастерская столярных работ
                    </h2>
                    <p className="text-gray-300 mb-4 text-lg">
                        Добро пожаловать в мастерскую столярных работ! Здесь студенты раскрывают секреты работы с деревом, создавая функциональные и эстетичные изделия под руководством опытных мастеров. Наша мастерская сочетает традиции столярного дела с современными технологиями.
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
                            {equipment.map((item) => (
                                <div key={item.name} className="bg-gray-700 p-4 rounded-lg">
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
                                            e.currentTarget.src = '/placeholder.jpg';
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
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {masters.map((master) => (
                            <div key={master.id} className="text-center">
                                <div className="w-48 h-48 mx-auto mb-4 relative rounded-full overflow-hidden">
                                    <img
                                        src={master.photo}
                                        alt={master.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-white">{master.name}</h3>
                            </div>
                        ))}
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
                                        e.currentTarget.src = '/placeholder.jpg';
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