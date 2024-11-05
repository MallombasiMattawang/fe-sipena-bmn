SIPENA BMN (Sistem Pengendalian Barang Milik Negara)

Deskripsi

SIPENA BMN adalah aplikasi yang dirancang untuk mendukung pengelolaan Barang Milik Negara (BMN) secara efektif dan efisien. Aplikasi ini menyediakan fitur untuk pendataan, monitoring, pengendalian/inspeksi, serta pelaporan BMN, yang bertujuan untuk memastikan pengelolaan BMN sesuai dengan ketentuan dan terpantau dengan baik.

Fitur Utama

	1.	Pendataan BMN
Mengelola data barang milik negara, mencakup informasi detail seperti kategori, kondisi, lokasi, dan status setiap barang. Fitur ini memastikan semua BMN tercatat dengan rapi dan terstruktur.
	2.	Monitoring
Memungkinkan pemantauan kondisi dan status BMN secara berkala. Fitur ini membantu pengguna untuk melihat riwayat penggunaan, pergerakan, serta kondisi terkini dari setiap aset yang terdaftar.
	3.	Pengendalian / Inspeksi
Mendukung proses inspeksi dan pengendalian BMN secara rutin atau berkala. Fitur ini memungkinkan pengguna untuk mencatat hasil inspeksi dan memastikan barang dalam kondisi layak dan sesuai standar.
	4.	Pelaporan BMN
Menyediakan fungsi pelaporan yang komprehensif untuk mendokumentasikan status dan kondisi BMN. Laporan dapat dihasilkan secara otomatis berdasarkan data yang ada dan dapat disesuaikan sesuai kebutuhan.

Teknologi yang Digunakan

	•	Frontend: React.js
	•	Backend: Laravel
	•	Database: MySQL
	•	API: RESTful API

Cara Instalasi

	1.	Clone repository ini:

git clone https://github.com/MallombasiMattawang/fe-sipena-bmn.git
cd fe-sipena-bmn


	2.	Instal dependensi:

npm install


	3.	Konfigurasi end-point pada file /src/services/Api.jsx:

baseURL: 'https://api.contoh-domain-sipena.com',


	4.	Jalankan aplikasi:

npm run dev



Penggunaan

	•	Masuk ke aplikasi menggunakan akun yang telah terdaftar.
	•	Akses fitur pendataan untuk menambah atau memperbarui informasi BMN.
	•	Gunakan fitur monitoring untuk memantau status BMN yang telah tercatat.
	•	Lakukan inspeksi melalui fitur pengendalian untuk memastikan kondisi dan status BMN.
	•	Hasilkan laporan melalui fitur pelaporan untuk dokumentasi dan evaluasi.

