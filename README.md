# UseCaseToGUI-Salt-
UseCaseToGUI merupakan aplikasi yang digunakan untuk memproses Use Cases Scenario menjadi Graphical User Interface (GUI) berbasis Salt.

# Cara Kerja Aplikasi
Pada aplikasi ini pengguna akan melengkapi data-data use case scenario untuk membuat GUI berbasis salt. Data-data yang perlu diisi antara lain:

* Nama Sistem
* Nama Aktor
* Nama Fitur
* Deskripsi Fitur
* Kondisi Awal
* Kondisi Akhir
* Skenario Normal
* Skenario Alternatif
* Skenario Eksepsi

Pada saat mengisi skenario dari use case, pengguna dapat menggunakan elemen-elemen yang ada untuk mentranslasi skenario menjadi GUI. Perintah elemen yaitu sebagai berikut {element_name#element_id>value}. Contoh penggunaan elemen-elemen yang ada yaitu sebagai berikut:

Elemen        | Perintah
------------- | -------------
Input Field   | {input#element_id>value}
Button        | {button#btnElement_id>value}
Radio Button  | {radio#element_id>value}
Check Box     | {check_box#element_id>value}
Text Area     | {text_area#element_id>value}
Drop List     | {drop_list#element_id>value}
Help Text     | {help_text#element_id>value}

Setelah memenuhi data-data use case scenario, pengguna dapat menata urutan elemen dan meng-generate GUI dari skenario normal, alternatif, atau eksepsi.

# Cara Instalasi
Berikut ini adalah langkah-langkah untuk menginstal Aplikasi UseCase 2020 :

1. Clone atau download secara manual aplikasi "UseCaseToGUI-Salt-" dari repository GitHub
2. Letakkan folder aplikasi di mana saja
3. Install modul django di folder aplikasi
4. Nyalakan server Django dengan 'python manage.py runserver'
5. Akses aplikasi melalui localhost http://127.0.0.1:8000/

Jika tidak ada kesalahan, pengguna akan memasuki halaman home aplikasi seperi berikut:
![image](https://user-images.githubusercontent.com/94850405/175884216-6e46557f-c656-472e-b10a-2d29d100e505.png)

# Cara Penggunaan Aplikasi
1. Buat Use Case Scenario baru dengan menekan tombol "Create Use Case Scenario" pada halaman Home.
![image](https://user-images.githubusercontent.com/94850405/175884982-a98c4a89-da7f-4c6b-a17c-b49fd687a0dd.png)

2. Melengkapi data Use Case Scenario.
![image](https://user-images.githubusercontent.com/94850405/175885224-fc692779-f94a-49e4-b38b-5be75ba0afa2.png)

3. Lengkapi skenario normal, alternatif, dan eksepsi dari use case. Kemudian tekan tombol submit.
![image](https://user-images.githubusercontent.com/94850405/175885876-5055b721-5f8d-4f9c-bbe5-2b6a97435784.png)

4. Pengguna akan kembali ke halaman home, pada halaman home pengguna dapat mengedit, mengkonfigurasi skenario normal, alternatif, dan eksepsi, atau menghapus use case sceanrio yang telah dibuat sebelumnya.
![image](https://user-images.githubusercontent.com/94850405/175886331-3dc92525-40f3-44d1-8a12-382e6f8eef51.png)

5. Pengguna dapat memilih skenario apa yang ingin di generate dan menata urutan dari elemen yang ada.
![image](https://user-images.githubusercontent.com/94850405/175886695-aa44341e-86b0-478c-8e04-eee23cedc502.png)

6. Setelah selesai menata urutan, pengguna dapat menekan tombol "Generate" dan GUI selesai dibuat.
![image](https://user-images.githubusercontent.com/94850405/175886988-fb8df1a7-5b63-446d-a1e6-dbff85e1ed3b.png)

# Anggota Kelompok

* Afifa Witania (081911633001)
* Ermawati (081911633005)
* Mayke Law Deryuke Sihombing (081911633013)
* Luluk Fajar Sari(081911633014)
* Aldythia Sri Bagitta Maximilliana Radiks (081911633042)
* Ruben Timoty Anthony Siregar(081911633045)
* Leonardo Chandra (081911633050)
