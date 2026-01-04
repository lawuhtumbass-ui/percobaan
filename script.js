let pengeluaran = JSON.parse(localStorage.getItem('pengeluaran')) || [];
let uangBulanan = parseInt(localStorage.getItem('uangBulanan')) || 0;
let totalPengeluaran = 0;

const uangInput = document.getElementById('uangBulanan');
uangInput.value = uangBulanan;

pengeluaran.forEach(item => totalPengeluaran += item.jumlah);
render();

function tambahPengeluaran() {
  const nama = document.getElementById('namaPengeluaran').value;
  const jumlah = parseInt(document.getElementById('jumlahPengeluaran').value);
  uangBulanan = parseInt(uangInput.value);

  if (!nama || !jumlah || !uangBulanan) {
    alert('Lengkapi semua data');
    return;
  }

  const tanggal = new Date().toLocaleDateString('id-ID');

  pengeluaran.push({ nama, jumlah, tanggal });
  totalPengeluaran += jumlah;

  localStorage.setItem('pengeluaran', JSON.stringify(pengeluaran));
  localStorage.setItem('uangBulanan', uangBulanan);

  document.getElementById('namaPengeluaran').value = '';
  document.getElementById('jumlahPengeluaran').value = '';

  render();
}

function render() {
  const list = document.getElementById('listPengeluaran');
  list.innerHTML = '';

  pengeluaran.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.tanggal} - ${item.nama} - Rp ${item.jumlah} <button onclick="hapus(${index})">x</button>`;
    list.appendChild(li);
  });

  const sisa = uangBulanan - totalPengeluaran;

  document.getElementById('total').textContent = totalPengeluaran;
  document.getElementById('sisa').textContent = sisa;

  const status = totalPengeluaran > uangBulanan * 0.8 ? 'BOROS' : 'HEMAT';
  document.getElementById('status').textContent = status;
}

function hapus(index) {
  totalPengeluaran -= pengeluaran[index].jumlah;
  pengeluaran.splice(index, 1);

  localStorage.setItem('pengeluaran', JSON.stringify(pengeluaran));
  render();
}
