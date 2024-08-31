import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

interface Category {
  id: string;
  name: string;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'categories'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedCategories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }));
        setCategories(fetchedCategories);
      });

      return () => unsubscribe();
    }
  }, []);

  const addCategory = async () => {
    const user = auth.currentUser;
    if (user && newCategoryName.trim() !== '') {
      try {
        await addDoc(collection(db, 'categories'), {
          userId: user.uid,
          name: newCategoryName.trim()
        });
        setNewCategoryName('');
      } catch (error) {
        console.error('Error adding category:', error);
        alert('Failed to add category. Please try again.');
      }
    }
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const updateCategory = async () => {
    if (editingCategory && newCategoryName.trim() !== '') {
      try {
        await updateDoc(doc(db, 'categories', editingCategory.id), {
          name: newCategoryName.trim()
        });
        setEditingCategory(null);
        setNewCategoryName('');
      } catch (error) {
        console.error('Error updating category:', error);
        alert('Failed to update category. Please try again.');
      }
    }
  };

  const deleteCategory = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteDoc(doc(db, 'categories', categoryId));
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {editingCategory ? (
          <button
            onClick={updateCategory}
            className="mt-2 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Update Category
          </button>
        ) : (
          <button
            onClick={addCategory}
            className="mt-2 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Category
          </button>
        )}
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center mb-2 p-2 border-b">
            <span>{category.name}</span>
            <div>
              <button
                onClick={() => startEditing(category)}
                className="mr-2 text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;