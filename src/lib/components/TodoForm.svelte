<script>
    import { todos } from '$lib/stores/todos';

    let open = false;
    let newTodo = '';

    function addTodo() {
        if (newTodo.trim()) {
            todos.add({ id: Date.now(), title: newTodo });
            newTodo = '';
            open = false;
        }
    }
</script>

<button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        on:click={() => (open = true)}>
    + Add Todo
</button>

{#if open}
    <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 class="text-xl font-bold mb-4">Add Todo</h2>
            <form on:submit|preventDefault={addTodo}>
                <input
                        bind:value={newTodo}
                        type="text"
                        placeholder="Enter todo title"
                        class="border rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                />
                <div class="flex justify-end gap-2">
                    <button
                            type="button"
                            class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            on:click={() => (open = false)}>
                        Cancel
                    </button>
                    <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
