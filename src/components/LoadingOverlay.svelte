<script>
  let {
    message = "Anmeldung wird gesendet …",
  } = $props();
</script>

<div
  class="fixed inset-0 z-[9999] flex h-dvh w-screen flex-col items-center justify-center bg-ink/50"
  role="alertdialog"
  aria-busy="true"
  aria-live="assertive"
  aria-label={message}
>
  <div
    class="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-7 shadow-[0_18px_50px_rgba(20,36,28,0.2)]"
  >
    <div
      class="h-12 w-12 animate-spin rounded-full border-[3px] border-line border-t-accent"
      aria-hidden="true"
    ></div>
    <p class="text-sm font-semibold text-ink">{message}</p>
  </div>
</div>
