import { writable } from 'svelte/store';

export interface Todo {
    id: number;
    title: string;
}

function createTodoStore() {
    const stored: Todo[] = typeof localStorage !== 'undefined'
        ? JSON.parse(localStorage.getItem('todos') || '[]')
        : [];

    const { subscribe, set, update } = writable<Todo[]>(stored);

    return {
        subscribe,
        add: (todo: Todo) =>
            update((items) => {
                const newItems = [...items, todo];
                localStorage.setItem('todos', JSON.stringify(newItems));
                return newItems;
            }),
        remove: (id: number) =>
            update((items) => {
                const newItems = items.filter((t) => t.id !== id);
                localStorage.setItem('todos', JSON.stringify(newItems));
                return newItems;
            }),
        updateTitle: (id: number, newTitle: string) =>
            update((items) => {
                const newItems = items.map((t) => (t.id === id ? { ...t, title: newTitle } : t));
                localStorage.setItem('todos', JSON.stringify(newItems));
                return newItems;
            }),
        clear: () => {
            localStorage.removeItem('todos');
            set([]);
        }
    };
}

export const todos = createTodoStore();