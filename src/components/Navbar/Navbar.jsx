// ============================================================
// Navbar.jsx —— 最上方的導覽列
// ------------------------------------------------------------
// 這是第一個會「記住東西」的元件。
// 需求：使用者往下捲一點點之後，導覽列要換個樣式（例如加陰影）。
//
// 為了做到這件事，要學兩個 React 的核心工具：
//   1. useState  → 讓元件「記住」一個會變動的值（這裡記「有沒有捲動」）。
//   2. useEffect → 在元件出現後，幫我們「掛上」瀏覽器的捲動監聽器。
// ============================================================

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

// 導覽列上的連結，做成資料陣列，之後用 .map() 畫出來。
// 想新增/調整選單，只要改這個陣列即可。
const links = [
  { label: '首頁', href: '#home' },
  { label: '最新消息', href: '#news' },
  { label: '注意事項', href: '#notice' },
  { label: '作品集', href: '#portfolio' },
  { label: '漫展急救包', href: '#emergency' },
  { label: '價目表', href: '#pricing' },
  { label: '假髮科普', href: '#faq' },
];

function Navbar() {
  // isScrolled：記住「使用者是否已經往下捲」。
  // useState(false) 代表一開始是 false（還沒捲）。
  // setIsScrolled 是「唯一能改變這個記憶」的函式，一改 React 就會重畫畫面。
  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect：在這個元件「第一次出現在畫面上」之後執行。
  // 第二個參數 [] 是空陣列，代表「只在出現時做一次」。
  useEffect(() => {
    // 每次畫面捲動就會呼叫這個函式：
    // 捲超過 20 像素就記成 true，否則 false。
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // 開始監聽瀏覽器的捲動事件
    window.addEventListener('scroll', handleScroll, { passive: true });

    // return 的這個函式是「善後（清理）」：
    // 當元件消失時，把剛剛掛上的監聽器拿掉，避免浪費記憶體。
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // 樣式會依 isScrolled 而變：捲動後額外套上 styles.scrolled。
    // 這種「用樣板字串組 className」的寫法，是 React 切換樣式的常見做法。
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <ul className={styles.links}>
          {/* 把連結陣列一個一個畫成 <li><a>…</a></li> */}
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
