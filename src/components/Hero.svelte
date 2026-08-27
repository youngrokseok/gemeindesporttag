<script>
  import { config } from "../lib/config.js";

  const { event } = config;
</script>

<header class="animate-rise relative mx-auto w-full max-w-2xl px-4 pt-14 pb-6">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-deep">
    {event.dateLabel}
  </p>
  <h1
    class="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl"
  >
    {event.title}
  </h1>
  <p class="mt-4 max-w-lg text-lg text-muted">
    Melde dich und bis zu {config.maxParticipants} Personen an – Familie, Freunde,
    Kinder.
  </p>
  <p class="mt-4 font-semibold text-ink">
    {event.place}, {event.address}
  </p>
</header>

<style>
  .font-display {
    font-family: var(--font-display);
  }
</style>
