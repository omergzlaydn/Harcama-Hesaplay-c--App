document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name-input");
  const harcamaInput = document.getElementById("harcama");
  const fiyatInput = document.getElementById("fiyat");
  const statusInput = document.getElementById("status-input");
  const ekleBtn = document.querySelector(".ekle-btn");
  const totalInfo = document.getElementById("total-info");
  const filterSelect = document.getElementById("filter-select");
  const listContainer = document.querySelector(".list");

  ekleBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const harcama = harcamaInput.value.trim();
    const fiyat = parseFloat(fiyatInput.value);
    const odendi = statusInput.checked;

    if (harcama !== "" && !isNaN(fiyat) && fiyat > 0) {
      const expenseItem = createExpenseItem(harcama, fiyat, odendi);
      listContainer.appendChild(expenseItem);

      harcamaInput.value = "";
      fiyatInput.value = "";
      statusInput.checked = false;

      updateTotal();
    } else {
      alert("Lütfen geçerli bir harcama bilgisi girin.");
    }
  });

  function createExpenseItem(harcama, fiyat, odendi) {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense");

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const harcamaName = document.createElement("h2");
    harcamaName.textContent = harcama;

    const fiyatAmount = document.createElement("h2");
    fiyatAmount.textContent = `${fiyat} ₺`;

    expenseInfo.appendChild(harcamaName);
    expenseInfo.appendChild(fiyatAmount);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons");

    const deleteButton = document.createElement("img");
    deleteButton.src = "delete-icon.png";
    deleteButton.alt = "Delete";
    deleteButton.addEventListener("click", function () {
      expenseItem.remove();
      updateTotal();
    });

    const togglePayedButton = document.createElement("img");
    togglePayedButton.src = odendi ? "paid-icon.png" : "unpaid-icon.png";
    togglePayedButton.alt = odendi ? "Paid" : "Unpaid";
    togglePayedButton.addEventListener("click", function () {
      odendi = !odendi;
      togglePayedButton.src = odendi ? "paid-icon.png" : "unpaid-icon.png";
      harcamaName.style.textDecoration = odendi ? "line-through" : "none";
      fiyatAmount.style.color = odendi ? "#2ecc71" : "#e74c3c";
      updateTotal();
    });

    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(togglePayedButton);

    expenseItem.appendChild(expenseInfo);
    expenseItem.appendChild(buttonsContainer);

    if (odendi) {
      expenseItem.classList.add("payed");
    }

    return expenseItem;
  }

  function updateTotal() {
    const expenses = document.querySelectorAll(".expense");
    const filterValue = filterSelect.value;

    let total = 0;

    expenses.forEach((expense) => {
      if (filterValue === "all" || (filterValue === "payed" && expense.classList.contains("payed")) || (filterValue === "not-payed" && !expense.classList.contains("payed"))) {
        const fiyatText = expense.querySelector(".expense-info h2:nth-child(2)").textContent;
        const fiyat = parseFloat(fiyatText.replace(" ₺", ""));
        total += fiyat;
      }
    });

    totalInfo.textContent = total.toFixed(2);
  }

  filterSelect.addEventListener("change", updateTotal);
});
