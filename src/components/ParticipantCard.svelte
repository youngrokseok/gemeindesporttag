<script>
  import { config } from "../lib/config.js";

  let { index, participant, onremove } = $props();

  const canRemove = $derived(index > 0);

  function toggleActivity(activityId) {
    if (participant.activities.includes(activityId)) {
      participant.activities = participant.activities.filter(
        (id) => id !== activityId,
      );
    } else {
      participant.activities = [...participant.activities, activityId];
    }
  }
</script>

<article
  class="animate-rise rounded-xl border border-line bg-white/70 p-4 sm:p-5"
>
  <div class="mb-4 flex items-center justify-between gap-3">
    <h4 class="font-display m-0 text-base tracking-tight text-ink">
      Teilnehmer {index + 1}
    </h4>
    {#if canRemove}
      <button
        type="button"
        class="cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold text-warn"
        onclick={() => onremove()}
      >
        Entfernen
      </button>
    {/if}
  </div>

  <label class="mb-4 block">
    <span class="mb-1.5 block text-sm font-semibold text-ink">Vollname</span>
    <input
      type="text"
      bind:value={participant.name}
      required
      maxlength="120"
      placeholder="Vor- und Nachname"
      class="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-ink outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
    />
  </label>

  <fieldset class="mb-4 border-0 p-0">
    <legend class="mb-2 block text-sm font-semibold text-ink">
      Altersgruppe / Eigenbeitrag
    </legend>
    <div class="grid gap-2">
      {#each config.ageGroups as group}
        <label
          class="flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 transition
            {participant.ageGroupId === group.id
            ? 'border-accent/55 bg-[#eef8f2]'
            : 'border-line bg-white'}"
        >
          <input
            type="radio"
            name="age-{participant.id}"
            value={group.id}
            bind:group={participant.ageGroupId}
            class="mt-1 accent-accent"
          />
          <span class="text-sm font-medium text-ink">{group.label}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset class="border-0 p-0">
    <legend class="mb-2 block text-sm font-semibold text-ink">
      Teilnahme an
    </legend>
    <div class="grid gap-2">
      {#each config.activities as activity}
        <label
          class="flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 transition
            {participant.activities.includes(activity.id)
            ? 'border-accent/55 bg-[#eef8f2]'
            : 'border-line bg-white'}"
        >
          <input
            type="checkbox"
            checked={participant.activities.includes(activity.id)}
            onchange={() => toggleActivity(activity.id)}
            class="mt-1 accent-accent"
          />
          <span class="text-sm font-medium text-ink">{activity.label}</span>
        </label>
      {/each}
    </div>
  </fieldset>
</article>

<style>
  .font-display {
    font-family: var(--font-display);
  }
</style>
