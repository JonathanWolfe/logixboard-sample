<script>
  import { onMount } from "svelte";

  import Pagination from "./Pagination.svelte";
  import CreationModal from "./Creation-Modal.svelte";

  export let db;

  let creationModalActive = false;

  let shipments = [];
  let total = 0;

  let headers = [
    { id: "id", display: "Shipment ID", hidden: true },
    { id: "client", display: "Client Name" },
    { id: "origin", display: "Origin" },
    { id: "destination", display: "Destination" },
    { id: "mode", display: "Mode" },
    { id: "etd", display: "Est. Departure" },
    { id: "eta", display: "Est. Arrival" },
    { id: "status", display: "Status" }
  ];
  let statuses = [
    { name: "Arrived", enabled: true, count: 0 },
    { name: "TransportError", enabled: true, count: 0 },
    { name: "In Transit", enabled: true, count: 0 },
    { name: "Roll-Over", enabled: true, count: 0 },
    { name: "Cancelled", enabled: true, count: 0 },
    { name: "Customs Hold", enabled: true, count: 0 }
  ];
  let modes = [
    { name: "Rail", enabled: true, count: 0 },
    { name: "Air", enabled: true, count: 0 },
    { name: "Sea", enabled: true, count: 0 },
    { name: "Road", enabled: true, count: 0 }
  ];
  let searchText = "";

  let currentPage = 1;
  let rowsPerPage = 15;

  function refreshShipments() {
    shipments = db.get("shipments").value();
  }

  function getAttrCounts(container, attr) {
    const collector = {};

    for (let i = 0; i < shipments.length; i += 1) {
      const value = shipments[i][attr];

      if (collector[value]) {
        collector[value] += 1;
      } else {
        collector[value] = 1;
      }
    }

    Object.keys(collector).forEach(key => {
      const index = container.findIndex(entry => entry.name === key);

      container[index].count = collector[key];
    });

    return container;
  }

  $: {
    total = Array.isArray(shipments) ? shipments.length : 0;

    statuses = getAttrCounts(statuses, "status");
    modes = getAttrCounts(modes, "mode");
  }

  function filterItems() {
    const enabledStatues = statuses.filter(i => i.enabled).map(i => i.name);
    const enabledModes = modes.filter(i => i.enabled).map(i => i.name);

    return shipments.filter(
      item =>
        enabledStatues.includes(item.status) &&
        enabledModes.includes(item.mode) &&
        (searchText && searchText.trim()
          ? Object.values(item).some(i =>
              String(i)
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase().trim())
            )
          : true)
    );
  }

  function paginate(filteredShipments) {
    const start = rowsPerPage * (currentPage - 1);
    const end = start - 1 + rowsPerPage;

    return filteredShipments.slice(start, end);
  }

  $: filteredShipments = filterItems(shipments, statuses, modes, searchText);

  $: visibleHeaders = headers.filter(i => !i.hidden);
  $: visibleItems = paginate(filteredShipments, currentPage, rowsPerPage);

  function visibleData(row, headers) {
    return Object.keys(row).filter(key => {
      const header = headers.find(i => i.id === key);

      if (!header) return false;
      if (header.hidden) return false;

      return true;
    });
  }

  onMount(() => {
    if (!db.ready) {
      document.body.addEventListener("db-ready", refreshShipments);
    } else {
      refreshShipments();
    }
  });
</script>

<style>
  main {
    padding: 1em;
    width: 80vw;
    margin: 0 auto;
  }

  fieldset {
    display: block;
  }

  .summary-info {
    margin-bottom: 2em;
  }

  table {
    position: relative;
  }

  table th {
    -webkit-position: sticky;
    position: sticky;
    vertical-align: bottom;
  }
</style>

<main class="section">
  <div class="container">
    <header class="summary-info level content">
      <div class="level-item">
        <div>
          <h4>Total: {total}</h4>
          <h4>Viewing: {filteredShipments.length}</h4>

          <button
            on:click={_ => (creationModalActive = true)}
            id="create-new"
            class="button is-success has-text-weight-bold">
            &plus; Create New Entry
          </button>
        </div>
      </div>

      <div class="level-item">
        <div>
          <h4>By Status:</h4>
          {#each statuses as status}
            <fieldset>
              <label class="checkbox">
                <input type="checkbox" bind:checked={status.enabled} />
                {status.name} ({status.count})
              </label>
            </fieldset>
          {/each}
        </div>
      </div>

      <div class="level-item">
        <div>
          <h4>By Mode:</h4>
          {#each modes as mode}
            <fieldset>
              <label class="checkbox">
                <input type="checkbox" bind:checked={mode.enabled} />
                {mode.name}: ({mode.count})
              </label>
            </fieldset>
          {/each}
        </div>
      </div>
    </header>

    <div class="field">
      <div class="control">
        <input
          bind:value={searchText}
          class="input"
          type="text"
          placeholder="Search..." />
      </div>
    </div>

    <Pagination
      {rowsPerPage}
      bind:currentPage
      total={filteredShipments.length} />

    <div class="table-container content">
      <table class="table is-bordered is-striped is-hoverable is-fullwidth">
        <thead class="has-background-info has-text-black">
          {#each visibleHeaders as header}
            <th class="header-{header.id}">{header.display}</th>
          {/each}
        </thead>

        <tbody>
          {#each visibleItems as shipment, i}
            <tr id={shipment.id} class="row-{i}">
              {#each visibleData(shipment, visibleHeaders) as column, j}
                <td class="column-{visibleHeaders[j].id} cell-{j}">
                  {shipment[column]}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>

<CreationModal
  {db}
  bind:active={creationModalActive}
  on:entrycreated={refreshShipments} />
