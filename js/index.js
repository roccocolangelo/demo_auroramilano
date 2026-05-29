async function loadDocuments() {
  try {
    const res = await fetch("https://aurora-docs.roccocolangelo.workers.dev/list-all");

    if (!res.ok) {
      throw new Error("Errore nel fetch documenti");
    }

    const data = await res.json();

    const container = document.getElementById("documents-list");

    // pulisce eventuale lista precedente
    container.innerHTML = "";

    if (!data.files || data.files.length === 0) {
      container.innerHTML = "<li>Nessun documento disponibile</li>";
      return;
    }

    data.files.forEach(file => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = file.url;
      a.textContent = file.name || file.key.split("/").pop();
      a.target = "_blank";

      // EXTRA: mostra dimensione
      const sizeKB = (file.size / 1024).toFixed(1);
      a.textContent += ` (${sizeKB} KB)`;

      li.appendChild(a);
      container.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    const container = document.getElementById("documents-list");
    container.innerHTML = "<li>Errore nel caricamento documenti</li>";
  }
}

// load automatico
document.addEventListener("DOMContentLoaded", loadDocuments);
