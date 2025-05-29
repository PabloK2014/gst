import React, { useState, useEffect } from 'react';
import { Category, categoryService } from '../../services/categoryService';
import { TrashIcon } from '@heroicons/react/24/outline';

export const CategoryManager: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState({ 
        name: '', 
        description: '' 
    });
    const [error, setError] = useState('');
    const [deleteConfirmCategory, setDeleteConfirmCategory] = useState<Category | null>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAllCategories();
            setCategories(data);
            setError('');
        } catch (err) {
            setError('Не удалось загрузить категории');
            console.error('Error loading categories:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await categoryService.createCategory(newCategory);
            setNewCategory({ name: '', description: '' });
            loadCategories();
            setError('');
        } catch (err) {
            setError('Не удалось создать категорию');
            console.error('Error creating category:', err);
        }
    };

    const handleDeleteClick = (category: Category) => {
        setDeleteConfirmCategory(category);
    };

    const handleDeleteConfirm = async () => {
        if (deleteConfirmCategory?.id) {
            try {
                await categoryService.deleteCategory(deleteConfirmCategory.id);
                loadCategories();
                setDeleteConfirmCategory(null);
                setError('');
            } catch (err) {
                setError('Не удалось удалить категорию');
                console.error('Error deleting category:', err);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-white mb-6">
                Управление категориями
            </h2>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Название категории
                        </label>
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Описание
                        </label>
                        <textarea
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            rows={2}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Добавить категорию
                    </button>
                </form>
            </div>

            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div className="space-y-2">
                    {categories.filter(category => category.description !== null).map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                    >
                        <div>
                            <h3 className="text-lg font-medium text-white">{category.name}</h3>
                            <p className="text-gray-400">{category.description}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteClick(category)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                ))}
                </div>


            </div>
            {deleteConfirmCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4 text-white">
                            Подтверждение удаления
                        </h2>
                        <p className="text-white mb-4">
                            Вы действительно хотите удалить категорию {deleteConfirmCategory.name}?
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setDeleteConfirmCategory(null)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Нет
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Да
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
