import { useEffect, useState } from 'react';
import './App.css'
import logo from "./assets/logo.png"

// eslint-disable-next-line no-undef
function MainContent({nama = "joko the king", status, tanggalLahir = "12/03/2004"}) {
  let [statusState, setStatus] = useState(status === "lolos");
  let noreg = Math.floor(Math.random() * 900000000) + 100000000;
  let nisn = Math.floor(Math.random() * 9000000000) + 1000000000;

  return (
    <>
      <header className={`header ${status}`}>
        <div className='logo-container'>
          <img src={logo} className='logo' alt='SNPB-LOGO' />
          <footer className='image-footer'>SELEKSI NASIONAL BERBASIS PRESTASI</footer>
        </div>

        <h1> {statusState ? "SELAMAT! ANDA DINYATAKAN LULUS!" : "ANDA DINYATAKAN TIDAK LULUS SELEKSI SNBP 2024"}</h1>
        {statusState ? <p></p> : <p>MASIH ADA KESEMPATAN MENDAFTAR DAN MENGIKUTI SNBT 2024 ATAU SELEKSI MANDIRI PTN.</p>}
      </header>

      <main className='main'>
        <p className='bl'>NISN <span className='NISN'>{nisn}</span> - NOREG <span className='NOREG'>{noreg}</span> </p>
        <h1>{nama}</h1>

        <p className='bl'>Tanggal Lahir</p>
        <h4>{tanggalLahir}</h4>

        <p className='bl'>Kabupaten/Kota</p>
        <h4>(Akan di Input ulang)</h4>

        <p className='bl'>Provinsi</p>
        <h4>(Akan di Input ulang)</h4>

        <footer className='footer'>
          {statusState ? <p>Status penerimaan Anda sebagai mahasiswa akan ditetapkan setelah PTN tujuan melakukan verifikasi data akademik (lapor dan/atau portofolio). Silakan Anda membaca peraturan tentang penerimaan mahasiswa baru di laman PTN tujuan. <br /> <br /> Khusus peserta KIP Kuliah, PTN tujuan juga dapat melakukan verifikasi data ekonomi dan/atau kunjungan ke tempat inggal anda sebelum menetapkan status penerimaan Anda</p> : <p>Jangan menyerah dan tetaplah berusaha, masih ada jalur lain yang belum anda coba. Mungkin disini kalian gagal tapi di tempat lain kalian masih berhasil, cukup terus percaya kepada diri anda dan anda pasti bisa. Ini bukan rezeky kamu tapi kamu bisa coba di lain waktu</p>}
        </footer>
      </main>
    </>
  )
}

function LoginInput({ onLogin }) {
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState(false);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const tanggalLahir = `${tanggal}/${bulan}/${tahun}`;
    const newStatus =  status ? "lolos" : "gagal"
    onLogin({ nama, tanggalLahir, status: newStatus });
  };

  return (
    <div className='container'>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className='logo-container'>
            <img src={logo} className='logo' alt='SNPB-LOGO' />
            <footer className='image-footer'>SELEKSI NASIONAL BERBASIS PRESTASI</footer>
          </div>

          <h1 className='title'>HASIL SELEKSI SNBP 2024</h1>
          <span className='subtitle'>Masukkan Namamu di kartu SNBP dan Tanggal Lahir</span>

          <div className='formContent'>
            {/* MAIN INPUT! */}
            <span className='input-caption'>Nama</span>
            <input type="text" name="yourName" placeholder='Nama mu pada kartu SNBP' className='input full' value={nama} onChange={(e) => setNama(e.target.value)} />

            <span className='input-caption'>Tanggal Lahir</span>
            <div className='tanggal'>
              <input type="tel" name="tanggal" placeholder='Tanggal' className='input date' value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
              <span className='separator'>/</span>
              <input type="tel" name="bulan" placeholder='Bulan' className='input date' value={bulan} onChange={(e) => setBulan(e.target.value)} />
              <span className='separator'>/</span>
              <input type="tel" name="tahun" placeholder='Tahun' className='input date' value={tahun} onChange={(e) => setTahun(e.target.value)} />
            </div>
          </div>

          <footer className='footerForm'>
            <button type="submit">LIHAT HASIL SELEKSI</button>
            <div className='statusContainer'>
              <label htmlFor="status-lulus">PENGUMUMAN HASIL SELEKSI SNBP 2024 (PDF)</label>
              <input type="checkbox" id='status-lulus' name="status-lulus" className='status' checked={status} onChange={() => setStatus(!status)} />
            </div>
          </footer>
        </form>
      </div>
    </div>
  )
}


function App() {
 const [loggedIn, setLoggedIn] = useState(false)
 const [userData, seUserData] = useState({})

 const handleLogin = (data) => {
  seUserData(data)
  setLoggedIn(true)
 }
  return (
    <>
  {loggedIn ? (<MainContent { ...userData } />) : (<LoginInput onLogin={handleLogin} />)}
    </>
  )
}

export default App
