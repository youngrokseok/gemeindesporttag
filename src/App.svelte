<script>
  import Hero from "./components/Hero.svelte";
  import Program from "./components/Program.svelte";
  import SignupForm from "./components/SignupForm.svelte";
  import SuccessPanel from "./components/SuccessPanel.svelte";

  let showSuccess = $state(false);
  let successSummary = $state("");
  let formKey = $state(0);

  function handleSuccess(summary) {
    successSummary = summary;
    showSuccess = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAgain() {
    showSuccess = false;
    successSummary = "";
    formKey += 1;
  }
</script>

<div
  class="pointer-events-none fixed inset-0 opacity-35"
  aria-hidden="true"
  style="
    background-image:
      linear-gradient(rgba(20, 36, 28, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(20, 36, 28, 0.04) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(circle at center, black, transparent 75%);
  "
></div>

<Hero />

<main>
  <Program />

  {#if showSuccess}
    <SuccessPanel summary={successSummary} onagain={handleAgain} />
  {:else}
    {#key formKey}
      <SignupForm onsuccess={handleSuccess} />
    {/key}
  {/if}
</main>

<footer class="relative mx-auto w-full max-w-2xl px-4 py-6 pb-10 text-sm text-muted">
  <p>Gemeindesporttag · Anmeldung digital</p>
</footer>
