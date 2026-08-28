<script>
  import { config } from "../lib/config.js";
  import ParticipantCard from "./ParticipantCard.svelte";

  let { onsuccess } = $props();

  let nextId = 1;

  function createParticipant() {
    return {
      id: nextId++,
      name: "",
      ageGroupId: "",
      activities: [],
    };
  }

  let participants = $state([createParticipant()]);
  let statusMessage = $state("");
  let statusType = $state("");
  let submitting = $state(false);

  let atMax = $derived(participants.length >= config.maxParticipants);

  function addParticipant() {
    if (atMax) return;
    participants = [...participants, createParticipant()];
  }

  function removeParticipant(index) {
    participants = participants.filter((_, i) => i !== index);
  }

  function setStatus(message, type = "") {
    statusMessage = message;
    statusType = type;
  }

  function validateParticipants() {
    const result = [];

    for (const p of participants) {
      const name = p.name.trim();
      const ageGroup = config.ageGroups.find((g) => g.id === p.ageGroupId);
      const activities = config.activities.filter((a) =>
        p.activities.includes(a.id),
      );

      if (!name) {
        throw new Error("Bitte für jede Person einen Vollnamen angeben.");
      }
      if (!ageGroup) {
        throw new Error(`Bitte Altersgruppe für ${name} wählen.`);
      }
      if (activities.length === 0) {
        throw new Error(`Bitte mindestens ein Angebot für ${name} wählen.`);
      }

      result.push({
        name,
        ageGroup: ageGroup.label,
        amount: ageGroup.amount,
        activities: activities.map((a) => a.label),
      });
    }

    return result;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!config.appsScriptUrl) {
      setStatus(
        "Noch nicht verbunden: Bitte zuerst die Google-Sheets-URL in src/lib/config.js eintragen (siehe SETUP.txt).",
        "error",
      );
      return;
    }

    let validated;
    try {
      validated = validateParticipants();
    } catch (err) {
      setStatus(err.message, "error");
      return;
    }

    submitting = true;
    setStatus("Wird gesendet …");

    const payload = {
      participants: validated,
    };

    try {
      await fetch(config.appsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const summary = `${validated.length} Person(en) angemeldet.`;
      onsuccess(summary);
      setStatus("");
    } catch (err) {
      setStatus(
        "Senden fehlgeschlagen. Bitte Internet prüfen oder später erneut versuchen.",
        "error",
      );
      console.error(err);
    } finally {
      submitting = false;
    }
  }
</script>

<section
  class="animate-rise relative mx-auto mb-4 w-full max-w-3xl px-4"
  style="animation-delay: 0.16s"
>
  <form
    onsubmit={handleSubmit}
    novalidate
    class="rounded-2xl border border-line bg-white/90 p-5 shadow-[0_18px_50px_rgba(20,36,28,0.08)] backdrop-blur-sm sm:p-6"
  >
    <h2 class="font-display mb-4 text-xl tracking-tight text-ink">Teilnehmer</h2>

    <div class="mb-5 grid gap-4">
      {#each participants as participant, index (participant.id)}
        <ParticipantCard
          {index}
          {participant}
          onremove={() => removeParticipant(index)}
        />
      {/each}
    </div>

    <div class="flex flex-col gap-5 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        disabled={atMax}
        onclick={addParticipant}
        class="cursor-pointer rounded-full border-0 bg-[#e7eee9] px-5 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {atMax ? "Maximum 10 Personen erreicht" : "+ Person hinzufügen"}
      </button>
      <button
        type="submit"
        disabled={submitting}
        class="cursor-pointer rounded-full border-0 bg-accent px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(31,122,76,0.28)] transition hover:-translate-y-px hover:bg-accent-deep disabled:cursor-wait disabled:opacity-65 disabled:hover:translate-y-0 sm:ml-auto"
      >
        Anmeldung absenden
      </button>
    </div>

    <p
      role="status"
      aria-live="polite"
      class="mt-4 min-h-[1.4em] text-sm {statusType === 'error'
        ? 'text-warn'
        : statusType === 'ok'
          ? 'text-accent-deep'
          : 'text-muted'}"
    >
      {statusMessage}
    </p>
  </form>
</section>

<style>
  .font-display {
    font-family: var(--font-display);
  }
</style>
