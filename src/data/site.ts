// Facts for the homepage. Single source: veon/client.json (ids in comments). Nothing here is invented.

export const BOOKING_URL = "https://n421383.alteg.io/"; // C-007, contacts.messengers[2]: general link until the client confirms per-branch links (UX-R06)
export const TELEGRAM_URL = "https://t.me/Janvi_Cosmetology_bot"; // contacts.messengers[0]
export const VIBER_URL = "viber://pa?chatURI=janvilviv"; // contacts.messengers[1]

export const FUTURE_NOTE = "Розділ у розробці";

export interface Branch {
  id: string;
  street: string;
  short: string;
  note?: string;
  weekdays: string;
  sunday: string;
  sundayOpen: boolean;
  phone: string;
  tel: string;
  email: string;
  map: string;
}

const map = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// contacts.addresses, contacts.phones[0-2] (header numbers, UX-R07), contacts.emails
export const branches: Branch[] = [
  {
    id: "lychakivska",
    street: "Личаківська, 39",
    short: "Личаківська",
    note: "Зручна парковка",
    weekdays: "10:00–19:00",
    sunday: "10:00–16:00",
    sundayOpen: true,
    phone: "(073) 674-72-83",
    tel: "+380736747283",
    email: "janvicosmetics@gmail.com",
    map: map("вул. Личаківська, 39, Львів"),
  },
  {
    id: "horodotska",
    street: "Городоцька, 181",
    short: "Городоцька",
    note: "Праворуч від ТЦ «Скриня», зручна парковка",
    weekdays: "10:00–19:00",
    sunday: "вихідний",
    sundayOpen: false,
    phone: "(073) 852-67-32",
    tel: "+380738526732",
    email: "janvigorodotska@gmail.com",
    map: map("вул. Городоцька, 181, Львів"),
  },
  {
    id: "zamarstynivska",
    street: "Замарстинівська, 170 С",
    short: "Замарстинівська",
    weekdays: "10:00–19:00",
    sunday: "вихідний",
    sundayOpen: false,
    phone: "+38 (093) 686-88-76",
    tel: "+380936868876",
    email: "janvicosmetics@gmail.com",
    map: map("вул. Замарстинівська, 170С, Львів"),
  },
];

export interface Procedure { id?: string; name: string; }
export interface Direction { id: string; name: string; scope: string; procedures: Procedure[]; }

// company.business_lines + company.products_services
export const directions: Direction[] = [
  {
    id: "estetychna",
    name: "Естетична косметологія",
    scope: "Апаратні й доглядові процедури для обличчя і тіла",
    procedures: [
      { name: "Чистки обличчя: комбінована, механічна" },
      { name: "Мікродермабразія" },
      { name: "Мікрострумова терапія" },
      { name: "Карбокситерапія" },
      { name: "Кріомасаж" },
    ],
  },
  {
    id: "inyektsiina",
    name: "Ін'єкційна косметологія",
    scope: "Ботулінотерапія, філери, біоревіталізація",
    procedures: [
      { id: "p-zmorshky", name: "Ботокс, Диспорт, Ксеомін" },
      { id: "p-pitlyvist", name: "Лікування гіпергідрозу" },
      { name: "Філери" },
      { name: "Біоревіталізація" },
    ],
  },
  {
    id: "lazerna",
    name: "Лазерна косметологія",
    scope: "Епіляція, судини, татуювання, шліфування",
    procedures: [
      { id: "p-volossia", name: "Лазерна епіляція" },
      { id: "p-sudyny", name: "Видалення судин (фотокоагуляція)" },
      { id: "p-tatuiuvannia", name: "Видалення татуювань" },
      { name: "Лазерне шліфування шкіри" },
      { name: "Карбонова чистка" },
      { name: "Фотоомолодження" },
    ],
  },
  {
    id: "dermatolohiia",
    name: "Дерматологія",
    scope: "Консультація лікаря і процедури за призначенням",
    procedures: [
      { name: "Консультація дерматолога" },
      { id: "p-novoutvorennia", name: "Видалення новоутворень і папілом" },
      { name: "Кріодеструкція бородавок" },
      { name: "Лікування оніхомікозу лазером" },
    ],
  },
  {
    id: "masazh",
    name: "Масаж і шугаринг",
    scope: "Процедури для тіла",
    procedures: [
      { name: "Класичний масаж" },
      { name: "Антицелюлітний масаж" },
      { name: "Шугаринг" },
    ],
  },
];

// UX scenario С2: a visitor's word -> the procedure (mapping from company.products_services only)
export const concerns = [
  { word: "Судини", target: "p-sudyny" },
  { word: "Татуювання", target: "p-tatuiuvannia" },
  { word: "Зморшки", target: "p-zmorshky" },
  { word: "Небажане волосся", target: "p-volossia" },
  { word: "Новоутворення", target: "p-novoutvorennia" },
  { word: "Пітливість", target: "p-pitlyvist" },
];

// company socials (all confirmed)
export const socials = [
  { name: "Instagram", url: "https://www.instagram.com/janvi_lviv/" },
  { name: "Facebook", url: "https://www.facebook.com/janvilviv/" },
  { name: "TikTok", url: "https://www.tiktok.com/@janvi.lviv" },
  { name: "YouTube", url: `https://www.youtube.com/@${encodeURIComponent("КосметологічнийЦентрЖанві")}` },
];
