# Product Requirements Document (PRD)
## Sistem Virtual Tour $360^\circ$ VR & Denah Interaktif Multi-Event

**Versi Dokumen:** 1.0  
**Target Platform:** Aplikasi Berbasis Web (Mobile-First & Desktop Responsive)  
**Model Akses:** Internal Operasional (Admin & Kru) + Akses Publik Tanpa Login (Klien & Tamu)

---

## 1. Ringkasan Produk

### 1.1 Latar Belakang & Konsep
Dalam penyelenggaraan acara skala besar seperti pernikahan, pameran, maupun acara korporat, panitia, vendor dekorasi, klien, dan tamu undangan membutuhkan gambaran visual tata letak ruangan secara nyata. Denah dua dimensi konvensional sering kali belum cukup untuk menunjukkan detail ukuran dekorasi, atmosfer ruangan, dan alur pergerakan tamu di lapangan.

Sistem ini merupakan platform berbasis web yang menggabungkan **Denah Lokasi Interaktif** dengan **Virtual Tour Panorama $360^\circ$ (Mode VR)**. Setiap titik pin pada denah terhubung langsung ke tampilan panorama $360^\circ$ yang dapat direkam langsung menggunakan kamera ponsel kru di lokasi, lengkap dengan fitur perbandingan kondisi **Sebelum** dan **Sesudah** pada titik yang sama.

### 1.2 Tujuan Utama Produk
1. **Sentralisasi Multi-Event:** Mengelola banyak acara dalam satu dasbor terpusat beserta pembagian akses untuk kru lapangan.
2. **Produksi Konten $360^\circ$ Praktis:** Memungkinkan kru lapangan mengambil foto panorama $360^\circ$ langsung melalui browser ponsel saat mengetuk titik pin di denah, tanpa wajib menggunakan kamera $360^\circ$ eksternal.
3. **Komparasi Visual Sebelum & Sesudah:** Menyediakan sakelar perbandingan kondisi area saat persiapan/loading (**Sebelum**) dan saat dekorasi selesai atau acara berlangsung (**Sesudah**) pada titik pin yang sama.
4. **Distribusi Publik Tanpa Hambatan:** Memudahkan klien dan tamu undangan menjelajahi denah dan ruang virtual $360^\circ$ cukup melalui tautan atau pemindaian QR Code tanpa proses registrasi maupun login.

---

## 2. Peran Pengguna & Hak Akses

| Peran Pengguna | Metode Autentikasi | Hak Akses & Tanggung Jawab Utama |
| :--- | :--- | :--- |
| **Admin Utama** | Login (Email & Kata Sandi) | Membuat dan mengelola seluruh event, mengunggah atau menggambar denah, mengatur titik pin dan panah navigasi antar-titik, mengelola akun kru, meninjau hasil foto, serta mengunduh tautan publik dan QR Code. |
| **Kru Lapangan** | Login (Email & Kata Sandi) | Melihat daftar event yang ditugaskan, membuka denah interaktif, memilih titik pin lokasi, mengambil foto $360^\circ$ langsung lewat kamera browser atau mengunggah foto panorama untuk kategori **Sebelum** dan **Sesudah**. |
| **Klien & Tamu Undangan** | Tanpa Login (Tautan / QR Code) | Membuka halaman publik event, melihat denah dan daftar keterangan area, masuk ke tampilan panorama $360^\circ$, berpindah antar-titik, membandingkan tampilan **Sebelum/Sesudah**, serta mengaktifkan mode kacamata VR. |

---

## 3. Alur Kerja Sistem (User Flow)

### 3.1 Alur Kerja Admin Utama
1. Masuk ke dasbor Admin dan membuat profil event baru (nama acara, tanggal, lokasi venue, logo penyelenggara, dan musik latar opsional).
2. Menyusun denah acara melalui dua opsi: mengunggah gambar denah jadi atau menggambar tata letak baru menggunakan kanvas editor denah.
3. Menempatkan titik pin lokasi di atas denah, mengisi nomor pin, nama area, serta deskripsi detail dekorasi, lalu menghubungkan titik pin yang berdekatan untuk panah navigasi di ruang $360^\circ$.
4. Menugaskan event kepada akun kru lapangan yang bertugas.
5. Memantau progres kelengkapan foto pada tiap titik pin, lalu menyalin tautan publik atau mengunduh QR Code untuk dibagikan kepada klien dan tamu.

### 3.2 Alur Kerja Kru Lapangan
1. Membuka aplikasi web melalui browser ponsel dan masuk menggunakan akun kru.
2. Memilih event aktif yang ditugaskan lalu membuka denah interaktif acara.
3. Berdiri di titik area fisik di lokasi acara dan mengetuk nomor pin yang sesuai pada layar denah.
4. Memilih tab fase **Sebelum** atau **Sesudah**, kemudian menekan tombol **Ambil Foto $360^\circ$** untuk memotret langsung menggunakan kamera pemandu di browser (atau memilih **Unggah Foto Panorama** dari galeri ponsel).
5. Memeriksa hasil foto pada layar pratinjau $360^\circ$ dan menekan **Simpan** agar otomatis terpasang pada titik pin tersebut.

### 3.3 Alur Kerja Klien & Tamu Undangan
1. Memindai QR Code acara atau mengetuk tautan publik yang dibagikan penyelenggara melalui browser ponsel tanpa login.
2. Melihat tampilan denah acara lengkap dengan legenda keterangan area dan mengetuk salah satu titik pin untuk masuk ke mode virtual $360^\circ$.
3. Menggeser layar atau menggerakkan ponsel untuk melihat sekeliling ruangan, menekan panah arah di dalam layar untuk berpindah ke titik area berikutnya, menekan tombol **Sebelum / Sesudah** untuk membandingkan kondisi ruangan, atau mengaktifkan mode kacamata VR.

---

## 4. Spesifikasi Fitur Fungsional

### 4.1 Dasbor Multi-Event & Manajemen Tim
* **Daftar Event Terpusat:** Menampilkan seluruh acara dalam tampilan kartu atau tabel dengan filter status (*Draf*, *Persiapan*, *Berlangsung*, *Selesai*), kolom pencarian, dan indikator progres jumlah titik pin yang sudah terisi foto.
* **Konfigurasi Profil Event:** Pengaturan judul acara, tanggal pelaksanaan, nama gedung/venue, unggah logo acara, dan unggah file audio MP3 sebagai musik latar pada mode VR.
* **Manajemen Akun Kru:** Admin Utama dapat membuat akun kru baru, mengatur status aktif/nonaktif akun, serta memilih event mana saja yang dapat diakses oleh masing-masing kru.
* **Generator Tautan Publik & QR Code:** Setiap event secara otomatis memiliki tautan unik acak (*slug*) yang aman ditebak beserta generator QR Code siap unduh dalam format **PNG** (untuk dibagikan digital) dan **SVG** (untuk dicetak di papan informasi venue).

### 4.2 Pengelolaan Denah Interaktif & Multi-Foto Pin
* **Opsi 1 — Unggah Gambar Denah Jadi:**
  * Mendukung unggah berkas gambar beresolusi tinggi (JPG, PNG, WebP).
  * Dilengkapi fitur perbesaran (*zoom*) dan geser (*pan*) kanvas agar penempatan titik pin tetap akurat meskipun denah memiliki banyak detail ruangan.
* **Opsi 2 — Pembuat Denah Sederhana (Canvas Builder):**
  * Kanvas editor berbasis web untuk membuat denah dasar menggunakan bentuk ruangan, garis dinding, simbol pintu masuk/keluar, dan panah alur pergerakan tamu.
  * Pustaka ikon tata letak acara siap tarik-dan-lepas (*drag-and-drop*) seperti area penerima tamu, pelaminan, panggung musik, meja VIP, photobooth, taman gantung, dan layar tampilan.
  * Pembuatan daftar legenda area otomatis di sisi denah yang sinkron dengan nomor pin.
* **Manajemen Titik Pin & Multi-Foto:**
  * Setiap pin menyimpan nomor urut, judul area, deskripsi detail (misalnya ukuran dekorasi dan fungsi area), serta koordinat relatif $(X, Y)$ dalam persentase agar posisi pin selalu presisi di berbagai ukuran layar.
  * **Dukungan Lebih dari Satu Foto per Pin:** Satu titik pin dapat menampung beberapa foto panorama $360^\circ$ untuk mencakup beberapa sudut pandang pada area yang luas, dan setiap foto dikelompokkan ke dalam kategori **Sebelum** atau **Sesudah**.

### 4.3 Modul Kamera Pemandu $360^\circ$ Langsung di Browser
* **Pemindaian Panorama Berbasis Web:**
  * Memanfaatkan akses kamera belakang ponsel (WebRTC) dan sensor orientasi/giroskop perangkat untuk menampilkan titik-titik target panduan di layar.
  * Kru cukup berdiri di titik pusat lokasi dan mengarahkan kamera mengikuti titik panduan berputar $360^\circ$ secara horizontal dan vertikal hingga seluruh sudut ruangan tertangkap.
  * Sistem secara otomatis menggabungkan hasil tangkapan menjadi satu gambar panorama *equirectangular*.
* **Opsi Unggah Cadangan:**
  * Menyediakan tombol unggah foto panorama dari penyimpanan ponsel jika kru menggunakan fitur panorama bawaan ponsel, kamera $360^\circ$ eksternal, atau berada di kondisi pencahayaan lokasi yang minim.
* **Pratinjau & Kompresi Otomatis:**
  * Menampilkan pratinjau interaktif $360^\circ$ sesaat setelah pengambilan gambar agar kru dapat memastikan hasil tidak buram atau terpotong sebelum disimpan ke server.
  * Melakukan kompresi otomatis dan pembuatan versi *thumbnail* ringan secara langsung saat proses unggah.

### 4.4 Penampil Virtual Tour $360^\circ$ & Mode VR Publik
* **Denah Mini Interaktif (Mini-Map):** Menampilkan denah acara di sudut layar dengan penanda titik aktif serta indikator arah pandang kamera (*field of view*) yang berputar sesuai arah layar pengguna. Pengguna dapat memperbesar denah mini untuk melompat langsung ke titik pin lain.
* **Sakelar Instan Sebelum & Sesudah:** Tombol mengambang di dalam layar $360^\circ$ yang memungkinkan pengunjung beralih antara tampilan **Sebelum** dan **Sesudah** dengan mempertahankan sudut pandang kamera yang sama.
* **Pemilih Sudut Foto (Multi-Angle Switcher):** Jika sebuah titik pin memiliki lebih dari satu foto $360^\circ$, muncul pilihan thumbnail kecil di bagian bawah layar untuk berpindah sudut pandang di area yang sama.
* **Panah Navigasi Antar-Titik:** Hotspot panah arah di dalam ruang $360^\circ$ yang menghubungkan satu area ke area berdekatan sehingga pengunjung dapat berjalan menyusuri ruangan tanpa harus kembali ke denah utama.
* **Kartu Informasi Area:** Tombol info untuk menampilkan detail nama area, ukuran properti, dan keterangan sesuai legenda denah.
* **Giroskop, Musik Latar & Mode Kacamata VR:**
  * Tombol sensor gerak ponsel agar sudut pandang $360^\circ$ mengikuti gerakan tangan pengguna.
  * Tombol kontrol putar/senyap musik latar acara.
  * Tombol mode VR layar terbelah dua (*stereoscopic split-screen*) untuk digunakan pada perangkat kacamata VR ponsel.

---

## 5. Arsitektur Teknis & Kebutuhan Non-Fungsional

### 5.1 Rekomendasi Tumpukan Teknologi
| Lapisan Sistem | Teknologi yang Direkomendasikan | Keterangan Penggunaan |
| :--- | :--- | :--- |
| **Frontend Web** | HTML5, Tailwind CSS, JavaScript (Vue.js / React / Vanilla JS) | Antarmuka responsif untuk dasbor Admin, halaman kerja Kru di ponsel, dan penampil publik. |
| **Engine $360^\circ$ & VR** | Pannellum atau Photo Sphere Viewer (WebGL) | Merender gambar *equirectangular* menjadi ruang $360^\circ$, panah navigasi, sensor giroskop, dan mode layar terbelah VR. |
| **Kanvas & Kamera** | HTML5 Canvas, Konva.js / Fabric.js, WebRTC & DeviceOrientation API | Editor pembuatan denah, penempatan koordinat pin, dan pemindaian kamera $360^\circ$ di browser. |
| **Backend & API** | Laravel (PHP) atau Node.js (Express/NestJS) | Manajemen autentikasi peran, logika multi-event, validasi dan pemrosesan gambar, serta penyajian REST API. |
| **Database & Storage** | MySQL / PostgreSQL & Penyimpanan Lokal Server Terstruktur | Penyimpanan data relasional serta folder terpisah per event untuk denah, foto $360^\circ$ resolusi penuh, pratinjau, dan audio. |

### 5.2 Performa, Penyimpanan & Keamanan
* **Pemuatan Bertahap (*Progressive Loading*):** Setiap foto $360^\circ$ yang disimpan otomatis menghasilkan versi pratinjau ringan beresolusi rendah yang dimuat cepat dalam waktu di bawah $1\text{ detik}$, diikuti pemuatan resolusi penuh secara bertahap agar nyaman dibuka melalui jaringan seluler.
* **Batas & Optimasi Berkas:** Ukuran unggah maksimal foto panorama dibatasi hingga $15\text{ MB}$ per berkas dan dikonversi otomatis ke format teroptimasi (WebP atau JPEG) untuk menghemat ruang server tanpa menurunkan ketajaman detail.
* **Keamanan Sistem:** Autentikasi berbasis sesi/token terenkripsi bagi Admin dan Kru, validasi tipe MIME berkas pada sisi server untuk mencegah unggahan berkas berbahaya, serta penggunaan kode unik acak pada tautan publik event.

---

## 6. Rancangan Struktur Basis Data

| Tabel | Kolom Utama | Deskripsi & Relasi |
| :--- | :--- | :--- |
| `users` | `id`, `name`, `email`, `password`, `role`, `is_active`, `created_at` | Menyimpan akun pengguna internal dengan nilai `role` berupa `admin` atau `kru`. |
| `events` | `id`, `title`, `event_date`, `venue_name`, `public_slug`, `bg_music_path`, `status`, `created_at` | Menyimpan data setiap acara beserta tautan publik unik (`public_slug`). |
| `event_assignments` | `id`, `event_id`, `user_id` | Tabel relasi untuk menugaskan akun kru lapangan ke event tertentu. |
| `floorplans` | `id`, `event_id`, `source_type`, `image_path`, `canvas_json` | Menyimpan denah acara (`source_type`: `upload` atau `builder`). |
| `location_pins` | `id`, `floorplan_id`, `pin_number`, `title`, `description`, `pos_x`, `pos_y` | Menyimpan titik pin lokasi pada denah beserta koordinat relatif $X$ dan $Y$. |
| `panorama_photos` | `id`, `pin_id`, `phase`, `angle_label`, `image_path`, `thumb_path`, `initial_yaw`, `created_by` | Menyimpan foto panorama $360^\circ$ pada setiap pin dengan nilai `phase` berupa `sebelum` atau `sesudah`. |
| `navigation_links` | `id`, `from_photo_id`, `to_pin_id`, `yaw`, `pitch`, `label` | Menyimpan titik koordinat arah panah navigasi di ruang $360^\circ$ menuju pin lokasi terdekat. |

---

## 7. Tahapan Pengembangan (Roadmap)

* **Tahap 1 — Dasbor Multi-Event & Hak Akses:** Pembangunan sistem login Admin dan Kru, pengelolaan multi-event, penugasan kru per acara, serta generator tautan publik dan QR Code.
* **Tahap 2 — Denah Interaktif & Manajemen Pin Multi-Foto:** Pembangunan fitur unggah denah dan kanvas pembuat denah sederhana, penempatan koordinat pin, serta fitur unggah banyak foto untuk fase **Sebelum** dan **Sesudah**.
* **Tahap 3 — Penampil Virtual Tour $360^\circ$ & Mode VR Publik:** Pembangunan halaman publik tanpa login yang memuat denah mini interaktif, sakelar perbandingan Sebelum/Sesudah, panah navigasi antar-titik, kartu informasi area, musik latar, dan mode VR kacamata.
* **Tahap 4 — Modul Kamera Pemandu $360^\circ$ di Browser:** Integrasi kamera WebRTC dan sensor orientasi ponsel untuk pemindaian titik panduan $360^\circ$ serta penggabungan gambar otomatis langsung dari layar denah kru.