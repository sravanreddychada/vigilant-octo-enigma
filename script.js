fetch('data/dues.json')
  .then(res => res.json())
  .then(data => {
    display(data);
    updateStats(data);

    document.getElementById("search").addEventListener("input", function () {
      const value = this.value.toLowerCase();
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.house.toLowerCase().includes(value)
      );
      display(filtered);
      updateStats(filtered);
    });
  });

function display(data) {
  const table = document.querySelector("#duesTable tbody");
  table.innerHTML = "";

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.house}</td>
        <td>₹${item.due}</td>
        <td class="${item.status === 'Paid' ? 'paid' : 'pending'}">
          ${item.status}
        </td>
      </tr>
    `;
  });
}

function updateStats(data) {
  let totalDue = 0;
  let pending = 0;

  data.forEach(item => {
    totalDue += item.due;
    if (item.status === "Pending") pending++;
  });

  document.getElementById("totalOwners").innerText = data.length;
  document.getElementById("totalDue").innerText = "₹" + totalDue;
  document.getElementById("pendingCount").innerText = pending;
}