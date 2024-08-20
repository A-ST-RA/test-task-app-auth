import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { GET, POST, PUT, DELETE } from './todoSlice';

const TodoList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, loading } = useSelector((state: RootState) => state.todos);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        dispatch(GET());
    }, [dispatch]);

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            dispatch(POST(newTodo));
            setNewTodo('');
        }
    };

    const handleToggleTodo = (id: number, completed: boolean) => {
        dispatch(PUT({ id, title: todos.find(todo => todo.id === id)?.title || '', completed }));
    };

    const handleDeleteTodo = (id: number) => {
        dispatch(DELETE(id));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="todo-list">
            <h1>ToDo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New task"
            />
            <button disabled={newTodo.length === 0} onClick={handleAddTodo}>Add Task</button>
            <ul>
                {todos.map((todo) => (
                        <li key={todo.id}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id, !todo.completed)}
                                />
                                {todo.title}
                            </div>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

