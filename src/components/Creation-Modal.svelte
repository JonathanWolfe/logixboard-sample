<script>
  import { createEventDispatcher } from "svelte";

  import Shipment from "../models/shipment";

  const dispatch = createEventDispatcher();

  export let active = false;
  export let db;

  let client;
  let origin;
  let destination;
  let mode;
  let etd;
  let eta;
  let status;

  let form;

  $: if (active) {
    document.documentElement.classList.add("is-clipped");
  }

  function setDefaults() {
    client = "";
    origin = "";
    destination = "";
    mode = "Rail";
    etd = "";
    eta = "";
    status = "In Transit";

    active = false;
  }

  setDefaults();

  function submit() {
    const inputs = Array.from(form.querySelectorAll("input, select"));
    let allValid = true;

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];

      const valid = input.reportValidity();

      if (!valid) {
        input.classList.add("is-danger");

        allValid = false;
      } else {
        input.classList.remove("is-danger");
      }
    }

    if (allValid) {
      const instance = new Shipment({
        client,
        origin,
        destination,
        mode,
        etd,
        eta,
        status
      });

      try {
        db.get("shipments")
          .insert(instance)
          .write();

        dispatch("entrycreated", { instance });

        setDefaults();
      } catch (err) {
        alert("An error occured! check the console");
      }
    }
  }

  function cancel() {
    setDefaults();
    document.documentElement.classList.remove("is-clipped");
  }
</script>

<style>

</style>

<div class:is-active={active} class="modal">
  <div on:click={cancel} class="modal-background" />

  <div bind:this={form} class="modal-content">

    <div class="box content">
      <div class="field">
        <label class="label">Client Name</label>
        <div class="control">
          <input bind:value={client} class="input" type="text" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Origin</label>
        <div class="control">
          <input bind:value={origin} class="input" type="text" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Destination</label>
        <div class="control">
          <input bind:value={destination} class="input" type="text" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Mode</label>
        <div class="control">
          <div class="select">
            <select bind:value={mode} required>
              <option>Rail</option>
              <option>Air</option>
              <option>Sea</option>
              <option>Road</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Est. Departure</label>
        <div class="control">
          <input
            bind:value={etd}
            class="input"
            type="text"
            placeholder="mm/dd/yy"
            pattern="\d\d/\d\d/\d\d"
            minlength="6"
            maxlength="8"
            required />
        </div>
      </div>

      <div class="field">
        <label class="label">Est. Arrival</label>
        <div class="control">
          <input
            bind:value={eta}
            class="input"
            type="text"
            placeholder="mm/dd/yy"
            pattern="\d\d/\d\d/\d\d"
            minlength="6"
            maxlength="8"
            required />
        </div>
      </div>

      <div class="field">
        <label class="label">Status</label>
        <div class="control">
          <div class="select">
            <select bind:value={status} required>
              <option>Arrived</option>
              <option>TransportError</option>
              <option>In Transit</option>
              <option>Roll-Over</option>
              <option>Cancelled</option>
              <option>Customs Hold</option>
            </select>
          </div>
        </div>
      </div>

      <button on:click={submit} class="button is-link">Create Entry</button>
    </div>
  </div>

  <button on:click={cancel} class="modal-close is-large" aria-label="close" />
</div>
