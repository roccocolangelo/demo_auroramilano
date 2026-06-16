// Aurora Upload Manager

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("upload-form");
  const status = document.getElementById("status");
  const input = document.querySelector('input[type="file"]');
  const label = document.querySelector('.file-label span');

  // ✅ Mostra nome file selezionato
  if (input && label) {
    input.addEventListener("change", () => {
      if (input.files.length > 0) {
        label.textContent = input.files[0].name;
      }
    });
  }

  // ✅ Upload file
  if (form) {
    form.addEventListener("submit", async (e)  => {
      e.preventDefault();

      const data = new FormData(form);

      status.innerHTML = "Caricamento in corso... ⏳";

      try {
        const res = await fetch(
          "https://aurora-docs.roccocolangelo.workers.dev/upload",
          {
            method: "POST",
            body: data
          }
        );

        const result = await res.json();

        if (result.ok) {
          status.innerHTML = `
            ✅ Upload completato<br/>
            <a href="${result.url}" target="_blank">Apri documento</a>
          `;
        } else {
          status.innerHTML = `❌ Errore: ${result.error}`;
        }

      } catch (err) {
        status.innerHTML = "❌ Errore di rete";
      }

    });
  }

});