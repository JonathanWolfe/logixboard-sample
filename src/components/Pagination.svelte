<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let total = 0;
  export let rowsPerPage = 15;
  export let currentPage = 1;

  let previousPage = 1;
  let nextPage = 1;

  $: lastPage = Math.ceil(parseInt(total) / parseInt(rowsPerPage)) || 1;

  $: {
    const current = parseInt(currentPage);

    previousPage = Math.max(current - 1, 1);
    nextPage = Math.min(current + 1, lastPage);
  }

  function goToPrevious() {
    currentPage = parseInt(previousPage);
  }

  function goToNext() {
    currentPage = parseInt(nextPage);
  }

  function goToSpecific(event) {
    currentPage = parseInt(event.target.dataset.page);
  }

  $: {
    dispatch("pagechange", { currentPage });
  }
</script>

<nav class="pagination is-centered" role="navigation" aria-label="pagination">
  <button
    on:click={goToPrevious}
    disabled={previousPage === currentPage}
    class="pagination-previous">
    Previous
  </button>

  <button
    on:click={goToNext}
    disabled={lastPage === currentPage}
    class="pagination-next">
    Next page
  </button>

  <ul class="pagination-list">
    {#if currentPage !== 1}
      <li>
        <button
          on:click={goToSpecific}
          data-page="1"
          class="pagination-link"
          aria-label="Goto page 1">
          1
        </button>
      </li>
    {/if}

    {#if previousPage - 1 >= 2}
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
    {/if}

    {#if previousPage !== 1}
      <li>
        <button
          on:click={goToPrevious}
          class="pagination-link"
          aria-label="Goto page {previousPage}">
          {previousPage}
        </button>
      </li>
    {/if}

    <li>
      <button
        class="pagination-link is-current"
        aria-label="Page {currentPage}"
        aria-current="page">
        {currentPage}
      </button>
    </li>

    {#if nextPage !== lastPage}
      <li>
        <button
          on:click={goToNext}
          class="pagination-link"
          aria-label="Goto page {nextPage}">
          {nextPage}
        </button>
      </li>
    {/if}

    {#if nextPage + 1 < lastPage}
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
    {/if}

    {#if lastPage !== 1 && lastPage !== currentPage}
      <li>
        <button
          on:click={goToSpecific}
          data-page={lastPage}
          class="pagination-link"
          aria-label="Goto page {lastPage}">
          {lastPage}
        </button>
      </li>
    {/if}
  </ul>
</nav>
