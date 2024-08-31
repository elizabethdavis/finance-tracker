import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import EditExpenseForm from './EditExpenseForm';

interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  createdAt: Timestamp;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const expensesQuery = query(
        collection(db, 'expenses'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribeExpenses = onSnapshot(expensesQuery, 
        (snapshot) => {
          const newExpenses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Expense[];
          setExpenses(newExpenses);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error fetching expenses:', err);
          setError('Failed to load expenses. Please try again later.');
          setLoading(false);
        }
      );

      const categoriesQuery = query(collection(db, 'categories'), where('userId', '==', user.uid));
      const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
        const newCategories = snapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data().name;
          return acc;
        }, {} as { [key: string]: string });
        setCategories(newCategories);
      });

      return () => {
        unsubscribeExpenses();
        unsubscribeCategories();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = async (expenseId: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteDoc(doc(db, 'expenses', expenseId));
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading expenses...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (expenses.length === 0) {
    return <div className="text-center mt-8">No expenses found. Add some expenses to see them here!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>
      {editingExpense && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <EditExpenseForm
              expense={editingExpense}
              categories={categories}
              onClose={() => setEditingExpense(null)}
              onUpdate={() => setEditingExpense(null)}
            />
          </div>
        </div>
      )}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="mb-4 p-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{expense.description}</p>
                <p className="text-sm text-gray-600">{categories[expense.categoryId] || 'Uncategorized'}</p>
                <p className="text-xs text-gray-500">
                  {expense.createdAt.toDate().toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${expense.amount.toFixed(2)}</p>
                <button
                  onClick={() => handleEdit(expense)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;