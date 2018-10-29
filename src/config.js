import { Platform } from 'react-native';


export default {
  platPref: (Platform.OS === 'android') ? 'md-' : 'ios-',
  statusBarColor: '#167F60',
  navBarBackgroundColor: '#1DAA80',
  sLang: 'tr',
  lang: {
    tr: {
      lng: 'Dil: Türkçe',
      degerlendirme: 'Değerlendirme',
      butunHarcamalarSil: 'Bütün harcamaları sil',

      bugun: 'Bugün:',
      buay: 'Bu Ay:',

      harcamaEkle: 'Harcama Ekle',
      harcamaDuzenle: 'Harcama Düzenle',
      baslik: 'Başlık',
      aciklama: 'Açıklama',
      adet: 'Adet',
      birimF: 'Birim Fiyat',
      paraBirimi: '₺',
      harcamaSekli: ['Nakit', 'Kredi Kartı', 'Banka Kartı'],
      toplam: 'Toplam',
      ekleBtn: 'Ekle',
      kaydetBtn: 'Kaydet',
      silBtn: 'Sil',
      uyari: 'Silmek istediğinize emin misiniz?',
      iptal: 'İptal',
      sil: 'Sil'
    },
    en: {
      lng: 'Language: English',
      degerlendirme: 'Evaluation',
      butunHarcamalarSil: 'Delete All Expenses',

      bugun: 'Today:',
      buay: 'This Month:',

      harcamaEkle: 'Add Expense',
      harcamaDuzenle: 'Edit Expense',
      baslik: 'Title',
      aciklama: 'Explanation',
      adet: 'Piece',
      birimF: 'Unit price',
      paraBirimi: '$',
      harcamaSekli: ['Cash', 'Credit Card', 'Account Card'],
      toplam: 'Total',
      ekleBtn: 'Add',
      kaydetBtn: 'Save',
      silBtn: 'Delete',
      uyari: 'Are you sure you want to delete?',
      iptal: 'Cancel',
      sil: 'Delete'
    },
    de: {
      lng: 'Sprache: Deutsch',
      degerlendirme: 'Auswertung',
      butunHarcamalarSil: 'Alle Ausgaben löschen',

      bugun: 'Heute:',
      buay: 'Dieser Monat:',

      harcamaEkle: 'Kosten hinzufügen',
      harcamaDuzenle: 'Kosten bearbeiten',
      baslik: 'Titel',
      aciklama: 'Erläuterung',
      adet: 'Anzahl',
      birimF: 'Stückpreis',
      paraBirimi: '€',
      harcamaSekli: ['Barzahlung', 'Kreditkarte', 'Kontokarte'],
      toplam: 'Gesamt',
      ekleBtn: 'Hinzufügen',
      kaydetBtn: 'Sparen',
      silBtn: 'Löschen',
      uyari: 'Sind Sie sicher, dass Sie löschen möchten?',
      iptal: 'Absagen',
      sil: 'Löschen'
    }
  },
  expenseTypes: [
    { label: 'Ev Giderleri(Kira, boya vs.)', value: 'evGider' },
    { label: 'Yemek', value: 'yemek' },
    { label: 'Sağlık', value: 'saglik' },
    { label: 'Kozmetik', value: 'kozmetik' },
    { label: 'Elektronik', value: 'elektronik' },
    { label: 'Kıyafet', value: 'kiyafet' },
    { label: 'Okul', value: 'okul' },
  ],
}
