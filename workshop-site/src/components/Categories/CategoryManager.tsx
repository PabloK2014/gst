import React, { useState, useEffect } from 'react';
import { Category, categoryService } from '../../services/categoryService';
import { Button, TextField, Box, Typography, List, ListItem, ListItemText, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const CategoryManager: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAllCategories();
            setCategories(data);
        } catch (err) {
            setError('Не удалось загрузить категории');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await categoryService.createCategory(newCategory);
            setNewCategory({ name: '', description: '' });
            loadCategories();
        } catch (err) {
            setError('Не удалось создать категорию');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await categoryService.deleteCategory(id);
            loadCategories();
        } catch (err) {
            setError('Не удалось удалить категорию');
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Управление категориями
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Название категории"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Описание"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        margin="normal"
                        required
                        multiline
                        rows={2}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Добавить категорию
                    </Button>
                </form>
            </Paper>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <List>
                {categories.map((category) => (
                    <ListItem
                        key={category.id}
                        divider
                        secondaryAction={
                            <IconButton 
                                edge="end" 
                                aria-label="delete"
                                onClick={() => handleDelete(category.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={category.name}
                            secondary={category.description}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
