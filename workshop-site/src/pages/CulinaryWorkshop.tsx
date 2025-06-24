import React, { useState} from 'react';
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

const CulinaryWorkshop: React.FC = () => {
    const equipment: Equipment[] = [
        {
            name: 'Пароконвектомат Radax CC06MO',
            description: 'Пароконвектомат Radax CHEKHOV CC06M0 предназначен для приготовления различных блюд, выпечки хлебобулочных и кондитерских изделий на предприятиях общественного питания и торговли. Модель оснащена подсветкой, механическим управлением и дверцей с левым открыванием.',
            photo: '/assets//Мастерские/Повар/CC06M0.jpg'
        },
        {
            name: 'Фритюрница HURAKAN HKN FR6L',
            description: 'Фритюрница Hurakan HKN-FR6L предназначена для приготовления широкого спектра блюд в большом объеме масла или жира на предприятиях общественного питания и торговли. Модель оснащена электромеханической системой управления, регулировкой температуры и холодной зоной. Корпус выполнен из нержавеющей стали.',
            photo: '/assets//Мастерские/Повар/hurakan.jpg'
        },
        {
            name: 'Машина для вакуумной упаковки Caso VacuChef 40',
            description: 'Однокамерный вакуумный упаковщик CASO VacuChef 40 используется на предприятиях пищевой промышленности, общественного питания и торговли для упаковки в вакуум полуфабрикатов и готовых блюд в пакетах или контейнерах для увеличения срока хранения. Модель оснащена сенсорной панелью управления, крышкой из закаленного стекла и зажимами для пакетов внутри камеры. Корпус выполнен из нержавеющей стали.',
            photo: '/assets//Мастерские/Повар/caso.jpg'
        },
    ];

    const additionalEquipment = {
        
        mainEquipment: [
            { name: 'Весы настольные электронные MAS MSC-05', quantity: 5 },
            { name: 'Пароконвектомат Radax CC06MO', quantity: 5 },
            { name: 'Жарочный шкаф', quantity: 1 },
            { name: 'Микроволновая печь COMFEE CMW207M05W', quantity: 1 },
            { name: 'Плита индукционная 143 TFX', quantity: 5 },
            { name: 'Фритюрница HURAKAN HKN FR6L', quantity: 1 },
            { name: 'Шкаф холодильный Бирюса 310', quantity: 5 },
            { name: 'Шкаф морозильный Frostor F 600 S', quantity: 2 },
            { name: 'Шкаф шоковой заморозки POLAIR CR10-L', quantity: 1 },
            { name: 'Планетарный миксер Gemlux GL-SM5.1GR', quantity: 5 },
            { name: 'Блендер (ручной с дополнительной насадкой для взбивания) Polaris PHB 1065', quantity: 5 },
            { name: 'Мясорубка промышленная профессиональная HURAKAN HKN-22SP', quantity: 1 },
            { name: 'Слайсер Viatto VA MS2218', quantity: 1 },
            { name: 'Куттер с подогревом Fimar EasyLine TM1128', quantity: 1 },
            { name: 'Соковыжималка VIATTO VA-JE900S', quantity: 1 },
            { name: 'Машина для вакуумной упаковки Caso VacuChef 40', quantity: 1 },
            { name: 'Кофемолка Profi Cook PC-EKM 1205', quantity: 1 },
            { name: 'Газовая горелка (для карамелизации) FLAME GUN PX no:915 PX + баллон газа', quantity: 5 },
            { name: 'Набор инструментов для карвинга', quantity: 1 },
            { name: 'Стол производственный с моечной ванной ВСРП-С4/10', quantity: 5 },
            { name: 'Стеллаж передвижной СТАНДАРТ СКК-8/5 ЭНК-С', quantity: 5 },
            { name: 'Моечная ванна двухсекционная', quantity: 1 },
            { name: 'Весы для молекулярной кухни', quantity: 5 },
            { name: 'Стол производственный ЦК СРОб-15/6 ЭЦК', quantity: 5 },
            { name: 'Кремер-Сифон для сливок 0,25л KAYSER', quantity: 5 },
            { name: 'Ручная машинка для приготовления пасты и равиоли Aceline', quantity: 5 },
            { name: 'Блендер стационарный Kitfort KT-1310', quantity: 1 },
            { name: 'Дегидратор AIRHOT FD-6G', quantity: 1 },
            { name: 'Коптильный пистолет Окуриватель JAU SG', quantity: 1 }
        ],
        toolsAndInventory: [
            { name: 'Набор разделочных досок, пластиковые', quantity: 5 },
            { name: 'Подставка для разделочных досок металлическая', quantity: 5 },
            { name: 'Термометр инфракрасный (Пирометр) DT-8500', quantity: 5 },
            { name: 'Термометр (шуп)', quantity: 5 },
            { name: 'Гастроемкости из нержавеющей стали', quantity: 120 },
            { name: 'Крышки к гастроемкостям из нержавеющей стали', quantity: 55 },
            { name: 'Набор кастрюль с крышками из нержавеющей стали для индукционных плит', quantity: 5 },
            { name: 'Сотейник для индукционных плит', quantity: 15 },
            { name: 'Сковорода для индукционных плит', quantity: 10 },
            { name: 'Гриль сковорода для индукционных плит', quantity: 5 },
            { name: 'Шенуа', quantity: 5 },
            { name: 'Сито для протирания', quantity: 10 },
            { name: 'Сито (для муки)', quantity: 5 },
            { name: 'Ложка для мороженного', quantity: 1 },
            { name: 'Шпатель кондитерский', quantity: 5 },
            { name: 'Венчик', quantity: 10 },
            { name: 'Шумовка', quantity: 5 },
            { name: 'Молоток металлический для отбивания мяса', quantity: 5 },
            { name: 'Терка 4-х сторонняя', quantity: 5 },
            { name: 'Половник', quantity: 5 },
            { name: 'Ложки столовые', quantity: 50 },
            { name: 'Набор кухонных ножей (поварская тройка)', quantity: 5 },
            { name: 'Овощечистка', quantity: 5 },
            { name: 'Лопатка-палетка изогнутая', quantity: 5 },
            { name: 'Щипцы универсальные', quantity: 10 },
            { name: 'Набор кондитерских насадок', quantity: 5 },
            { name: 'Набор кондитерских форм (квадрат)', quantity: 5 },
            { name: 'Форма для выпечки тартов круг', quantity: 15 },
            { name: 'Набор кондитерских форм (круг)', quantity: 5 },
            { name: 'Миски нержавеющая сталь', quantity: 50 },
            { name: 'Набор пинцетов для оформления блюд', quantity: 5 },
            { name: 'Ножницы для рыбы, птицы', quantity: 5 },
            { name: 'Тарелка круглая белая плоская', quantity: 45 },
            { name: 'Тарелка глубокая белая', quantity: 30 },
            { name: 'Соусник', quantity: 15 },
            { name: 'Пластиковая урна для мусора', quantity: 10 },
            { name: 'Скребок для теста', quantity: 5 },
            { name: 'Банка для хранения жидкостей', quantity: 10 },
            { name: 'Диспенсер (пластиковая бутылка с носиком для соуса)', quantity: 10 },
            { name: 'Миска пластик', quantity: 10 },
            { name: 'Мерный стакан', quantity: 5 },
            { name: 'Лопатки силиконовые', quantity: 15 },
            { name: 'Лопатка деревянная', quantity: 5 },
            { name: 'Кисточка силиконовая', quantity: 5 },
            { name: 'Скалка', quantity: 5 },
            { name: 'Силиконовый коврик', quantity: 10 },
            { name: 'Силиконовый коврик перфорированный', quantity: 5 },
            { name: 'Силиконовая форма “кнели”', quantity: 5 },
            { name: 'Силиконовая форма полусфера средняя', quantity: 5 },
            { name: 'Силиконовая форма полусфера большая', quantity: 5 },
            { name: 'Силиконовая форма для десертов или муссовых пирожных из серии объемных 3D форм', quantity: 10 },
            { name: 'Прихватка – варежка термостойкая силиконовая', quantity: 10 },
            { name: 'Ковёр диэлектрический', quantity: 10 },
            { name: 'Жироуловитель', quantity: 5 }
        ]
    };

    const masters: Master[] = [
        {
            id: 1,
            name: 'Хорольская Олеся Валерьевна',
            photo: '/assets/Мастерские/Повар/Хорольская.jpg'
        },
        {
            id: 2,
            name: 'Гусева Любовь Владимировна',
            photo: '/assets//Мастерские/Повар/gusina.jpg'
        },
    ];

    const workExamples = [
        '/assets/Мастерские/Повар/пример1.jpg',
        '/assets/Мастерские/Повар/pelmen.jpg',
        '/assets/Мастерские/Повар/пример3.jpg',
        '/assets/Мастерские/Повар/пример4.jpg',
        '/assets/Мастерские/Повар/tort.jpg',
        '/assets/Мастерские/Повар/primer6.jpg',
    ];


    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showMoreEquipment, setShowMoreEquipment] = useState(false);

    const openModal = (image: string) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-primary mb-12 text-center">
                    Кулинарная мастерская
                </h1>
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-6 text-white">
                        О нашей учебной кухне ресторана
                    </h2>
                    <p className="text-gray-300 mb-4 text-lg">
                        В нашей учебной кухне студенты обучаются искусству приготовления пищи
                        под руководством опытных мастеров. Мы используем современное профессиональное
                        оборудование и качественные ингредиенты.
                    </p>
                    <p className="text-gray-300 text-lg">
                        Наша мастерская предоставляет услуги по приготовлению блюд для различных
                        мероприятий, а также проводит мастер-классы по кулинарному искусству.
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
                                            e.currentTarget.src = '/assets/placeholder.jpg';
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
                                    <h3 className="text-xl font-semibold text-white mb-4">Основное и вспомогательное технологическое оборудование</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.mainEquipment.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} шт)</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Инструменты и инвентарь</h3>
                                    <ul className="text-gray-300 list-disc pl-5">
                                        {additionalEquipment.toolsAndInventory.map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity} шт)</li>
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
                                    alt={`Пример кулинарной работы ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.currentTarget.src = '/assets/placeholder.jpg';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
                        onClick={closeModal}
                    >
                        <div className="relative max-w-4xl max-h-[90vh] mx-4">
                            <img
                                src={selectedImage}
                                alt="Увеличенное изображение"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button
                                onClick={closeModal}
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

export default CulinaryWorkshop;