const apiUrl = "https://script.google.com/macros/s/AKfycbzmCEjxaiCMtb8RsxPHyV6_teBsdkOoVa9jrquZg2PMNGgFXrhLdNadzp6uMxkJjFhW/exec";

const form = document.getElementById("form");
const tbody = document.getElementById("data-body");
const resetBtn = document.getElementById("reset");

function loadData() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
      data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.ID}</td>
          <td>${item.NAMA}</td>
          <td>${item.EKSKUL}</td>
          <td>${item.STATUS}</td>
          <td>
            <button class="action-btn" onclick="editData('${item.ID}', '${item.NAMA}', '${item.EKSKUL}', '${item.STATUS}')">Edit</button>
            <button class="action-btn" onclick="deleteData('${item.ID}')">Hapus</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    action: "update",
    ID: document.getElementById("id").value,
    NAMA: document.getElementById("nama").value,
    EKSKUL: document.getElementById("ekskul").value,
    STATUS: document.getElementById("status").value
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      loadData();
    });
});

function deleteData(id) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ action: "delete", ID: id }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(() => loadData());
}

function editData(id, nama, ekskul, status) {
  document.getElementById("id").value = id;
  document.getElementById("nama").value = nama;
  document.getElementById("ekskul").value = ekskul;
  document.getElementById("status").value = status;
}

resetBtn.addEventListener("click", function () {
  form.reset();
});

loadData();
