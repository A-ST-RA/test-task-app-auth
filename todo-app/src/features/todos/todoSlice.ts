import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
};

const mockFetch = <T>(data: T, delay = 1000): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const GET = createAsyncThunk('todos/fetchTodos', async () => {
    const data: Todo[] = [
        { id: 1, title: 'Написать авторизацию на nextjs', completed: false },
        { id: 2, title: 'TodoList на react, rtk, typescript', completed: true },
    ];
    return await mockFetch(data);
});

export const POST = createAsyncThunk('todos/addTodo', async (title: string) => {
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    return await mockFetch(newTodo);
});

export const PUT = createAsyncThunk('todos/updateTodo', async (todo: Todo) => {
    return await mockFetch(todo);
});

export const DELETE = createAsyncThunk('todos/deleteTodo', async (id: number) => {
    return await mockFetch(id);
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GET.pending, (state) => {
                state.loading = true;
            })
            .addCase(GET.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(POST.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })
            .addCase(PUT.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(DELETE.fulfilled, (state, action: PayloadAction<number>) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
