import React, { useState, useEffect } from 'react';
import { User, userService, UserFilter } from '../../services/userService';
import { toast } from 'react-toastify';

export const UserManager: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const perPage = 10;

    const loadUsers = async (filter: UserFilter) => {
        try {
            setLoading(true);
            const response = await userService.getUsers(filter);
            setUsers(response.items);
            setTotalPages(response.total_pages);
            setTotalUsers(response.total);
        } catch (err) {
            console.error('Ошибка при загрузке пользователей:', err);
            toast.error('Не удалось загрузить пользователей');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const filter: UserFilter = {
            search: searchQuery,
            page: currentPage,
            per_page: perPage
        };
        loadUsers(filter);
    }, [searchQuery, currentPage]);

    const handleRoleChange = async (userId: number, role: string) => {
        try {
            await userService.updateUserRole(userId, role);
            const updatedUsers = users.map(user =>
                user.id === userId ? { ...user, role } : user
            );
            setUsers(updatedUsers);
            toast.success('Роль пользователя успешно обновлена');
        } catch (err) {
            console.error('Ошибка при обновлении роли:', err);
            toast.error('Не удалось обновить роль пользователя');
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Поиск по email или телефону"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
            </div>

            {loading ? (
                <div className="text-center text-gray-400">Загрузка...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Пользователь
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Телефон
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Роль
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-white">
                                            {user.username}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">
                                            {user.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="bg-gray-700 border border-gray-600 rounded-lg text-white px-2 py-1"
                                        >
                                            <option value="user">Пользователь</option>
                                            <option value="admin">Администратор</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-4 px-6 py-3 bg-gray-700">
                            <div className="text-sm text-gray-300">
                                Всего пользователей: {totalUsers}
                            </div>
                            <div className="flex space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 rounded-lg transition-colors ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};