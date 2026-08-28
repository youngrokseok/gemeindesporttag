<script>
  import { config } from "../lib/config.js";

  let { summary, onagain } = $props();

  const { event } = config;
</script>

<section
  class="animate-rise relative mx-auto mb-4 w-full max-w-3xl px-4"
  aria-live="polite"
>
  <div
    class="rounded-2xl border border-accent/30 bg-white/90 p-6 shadow-[0_18px_50px_rgba(20,36,28,0.08)] backdrop-blur-sm"
  >
    <div
      class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef8f2] text-2xl"
      aria-hidden="true"
    >
      ✓
    </div>
    <h2 class="font-display mb-3 text-2xl tracking-tight text-accent-deep">
      Danke für die Anmeldung!
    </h2>
    <p class="text-muted">{summary}</p>
    <p class="mt-4 text-muted">
      Eigenbeitrag per PayPal an
      <a
        href="mailto:{event.paypalEmail}"
        class="font-semibold text-accent-deep underline underline-offset-2"
      >
        {event.paypalEmail}
      </a>
      (Verwendungszweck: Name(n) + Gemeindesporttag) oder bar vor Ort.
    </p>
    <button
      type="button"
      class="mt-6 cursor-pointer rounded-full border-0 bg-[#e7eee9] px-5 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-px"
      onclick={() => onagain()}
    >
      Weitere Anmeldung
    </button>
  </div>
</section>

<style>
  .font-display {
    font-family: var(--font-display);
  }
</style>
