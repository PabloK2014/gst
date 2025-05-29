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
    // Временные данные для демонстрации
    const equipment: Equipment[] = [
        {
            name: 'Сварочный аппарат MIG-250',
            description: 'Профессиональный сварочный аппарат для полуавтоматической сварки',
            photo: '/src/assets/Мастерские/Сварка/верстак.jpg'
        },
        {
            name: 'Аппарат плазменной резки CUT-40',
            description: 'Аппарат для точной плазменной резки металла',
            photo: '/src/assets/Мастерские/Сварка/верстак 2.jpg'
        },
        {
            name: 'Аппарат плазменной резки CUT-40',
            description: 'Аппарат для точной плазменной резки металла',
            photo: '/src/assets/Мастерские/Сварка/Вадим.jpg'
        },
    ];

    const masters: Master[] = [
        {
            id: 1,
            name: 'Малюгин Вадим Григорьевич',
            photo: '/src/assets/Мастерские/Сварка/malugin.jpg'
        },
        {
            id: 2,
            name: 'Аринин Александр николаевич',
            photo: '/src/assets/Мастерские/Сварка/Александр.jpg'
        },
    ];

    const workExamples = [
        '/src/assets/Мастерские/Сварка/пример зонтик.jpg',
        '/src/assets/Мастерские/Сварка/пример1.jpg',
        '/src/assets/Мастерские/Сварка/пример зонтик.jpg',
        '/src/assets/Мастерские/Сварка/пример зонтик.jpg',
        '/src/assets/Мастерские/Сварка/пример зонтик.jpg',
        '/src/assets/Мастерские/Сварка/пример зонтик.jpg',
    ];

    const [currentMasterIndex, setCurrentMasterIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                        Гуковсикй строительный техникум (ГСТ) - это современное образовательное учреждение,
                        где студенты получают качественное профессиональное образование в области строительства
                        и смежных специальностей.
                    </p>
                    <p className="text-gray-300 text-lg">
                        Наши мастерские оснащены современным оборудованием и предоставляют широкий спектр
                        услуг как для обучения студентов, так и для выполнения заказов.
                    </p>
                </div>

                {/* Секция с оборудованием */}
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
                </div>

                {/* Слайдер с мастерами */}
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

                {/* Галерея примеров работ */}
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