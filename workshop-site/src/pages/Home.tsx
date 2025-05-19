const Home = () => {
  return (
    <div className="w-full h-full bg-gray-900">
      <div className="w-full h-full">
        <div className="container mx-auto px-8 py-6">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Добро пожаловать в ГСТ
          </h1>
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              О нашем техникуме
            </h2>
            <p className="text-gray-300 mb-4 text-lg">
              Городской строительный техникум (ГСТ) - это современное образовательное учреждение,
              где студенты получают качественное профессиональное образование в области строительства
              и смежных специальностей.
            </p>
            <p className="text-gray-300 text-lg">
              Наши мастерские оснащены современным оборудованием и предоставляют широкий спектр
              услуг как для обучения студентов, так и для выполнения заказов.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">
                Наши преимущества
              </h3>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Современное оборудование
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Опытные мастера
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Доступные цены
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Гарантия качества
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">
                Как сделать заказ
              </h3>
              <ol className="space-y-4 text-lg text-gray-300">
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mr-3">1</span>
                  Выберите категорию услуг
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mr-3">2</span>
                  Ознакомьтесь с предложениями
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mr-3">3</span>
                  Оставьте заявку
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mr-3">4</span>
                  Дождитесь подтверждения
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
