<script>
    import { todos } from '$lib/stores/todos';
    import { writable } from 'svelte/store';

    const editIndex = writable(null);
    let editedTitle = '';

    function startEdit(todo, index) {
        editedTitle = todo.title;
        editIndex.set(index);
    }

    function saveEdit(id, index) {
        todos.update(items => {
            items[index].title = editedTitle;
            localStorage.setItem('todos', JSON.stringify(items));
            return items;
        });
        editIndex.set(null);
    }

    function cancelEdit() {
        editIndex.set(null);
    }

    function deleteTodo(id) {
        todos.remove(id);
    }
</script>

{#if $todos.length > 0}
    <table class="mt-6 w-full border">
        <thead>
        <tr class="bg-gray-100 text-left">
            <th class="p-2">#</th>
            <th class="p-2">Title</th>
            <th class="p-2">Actions</th>
        </tr>
        </thead>
        <tbody>
        {#each $todos as todo, i}
            <tr class="border-t">
                <td class="p-2 align-top">{i + 1}</td>
                <td class="p-2 align-top">
                    {#if $editIndex === i}
                        <input
                                bind:value={editedTitle}
                                class="border p-1 w-full"
                        />
                    {:else}
                        {todo.title}
                    {/if}
                </td>
                <td class="p-2 align-top space-x-2">
                    {#if $editIndex === i}
                        <button
                                on:click={() => saveEdit(todo.id, i)}
                                class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                            Save
                        </button>
                        <button
                                on:click={cancelEdit}
                                class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                    {:else}
                        <button
                                on:click={() => startEdit(todo, i)}
                                class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                            Edit
                        </button>
                        <button
                                on:click={() => deleteTodo(todo.id)}
                                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                            Delete
                        </button>
                    {/if}
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
{:else}
    <p class="mt-6 text-gray-500">No todos yet. Add one!</p>
{/if}
