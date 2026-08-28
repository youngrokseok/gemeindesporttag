<script>
  import { config } from "../lib/config.js";

  const { event, program, fees } = config;
</script>

<section
  class="animate-rise relative mx-auto mb-4 w-full max-w-3xl px-4"
  style="animation-delay: 0.08s"
  aria-labelledby="program-heading"
>
  <div
    class="rounded-2xl border border-line bg-white/90 p-5 shadow-[0_18px_50px_rgba(20,36,28,0.08)] backdrop-blur-sm sm:p-6"
  >
    <h2
      id="program-heading"
      class="font-display mb-4 text-xl tracking-tight text-ink"
    >
      Programm
    </h2>

    <ul class="divide-y divide-line">
      {#each program as item}
        <li class="grid gap-1 py-3 text-muted sm:grid-cols-[minmax(8rem,0.9fr)_1.2fr] sm:gap-4">
          <span class="font-semibold text-ink">{item.name}</span>
          <span>{item.time}</span>
        </li>
      {/each}
    </ul>

    <div class="mt-5 border-t border-line pt-4">
      <p class="font-semibold text-ink">Eigenbeitrag pro Person</p>
      <p class="mt-1 text-muted">{fees}</p>
      <p class="mt-3 text-muted">
        PayPal:
        <a
          href="mailto:{event.paypalEmail}"
          class="font-semibold text-accent-deep underline underline-offset-2"
        >
          {event.paypalEmail}
        </a>
        <br />
        <span class="text-sm">
          Verwendungszweck: Name(n) + Gemeindesporttag · oder bar vor Ort
        </span>
      </p>
    </div>
  </div>
</section>

<style>
  .font-display {
    font-family: var(--font-display);
  }
</style>
