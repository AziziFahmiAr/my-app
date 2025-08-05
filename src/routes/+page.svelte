<script>
  import TodoForm from '$lib/components/TodoForm.svelte';
  import TodoTable from '$lib/components/TodoTable.svelte';
</script>

<main class="max-w-xl mx-auto p-6">
  <h1 class="text-2xl font-bold mb-4">Todo List</h1>

  <TodoForm />
  <TodoTable />
</main>
