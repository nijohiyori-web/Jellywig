// ============================================================
// Emergency.jsx —— 漫展急救包（會算錢的購物小算盤）⭐
// ------------------------------------------------------------
// 這是整個專案最「有互動」的元件，也是最值得好好讀的。
// 功能：
//   1. 左邊一排商品按鈕，點一下就「加 1」放進清單。
//   2. 右邊有一個小算盤，可以對每個品項 +1 / -1 / 移除 / 清空。
//   3. 自動加總目前要付多少錢。
//   4. 右下角按鈕可以收合 / 展開小算盤。
//
// 核心觀念：用一個「數量陣列 quantities」記住每個商品買幾個。
//   商品資料有幾筆，quantities 就有幾格，一開始全部是 0。
//   例如商品有 14 筆 → quantities = [0, 0, 0, ... 共14個0]。
//   第 0 個商品買 2 個、第 3 個買 1 個 → [2, 0, 0, 1, 0, ...]。
// ============================================================

import { useState } from 'react';
import styles from './Emergency.module.css';
import { emergencyData } from '../../data/emergency'; // 每筆是 { item: 名稱, price: 價格 }

function Emergency() {
  // ---- 狀態 1：每個商品各買了幾個 ----
  // 用 emergencyData.map(() => 0) 產生一個「和商品一樣長、全是 0」的陣列。
  const [quantities, setQuantities] = useState(() => emergencyData.map(() => 0));

  // ---- 狀態 2：右邊小算盤是「展開」還是「收合」 ----
  // 初始值用一個函式算出來（這叫 lazy initializer，只會在第一次執行一次）：
  //   桌機（寬度 > 768px）→ 預設「展開」，方便邊看商品邊結帳。
  //   手機（寬度 ≤ 768px）→ 預設「收合」，否則浮動小算盤會蓋住畫面中央的商品。
  // 768 這個數字對齊 Emergency.module.css 裡的手機斷點。
  const [isCartOpen, setIsCartOpen] = useState(() => window.innerWidth > 768);

  // --------------------------------------------------------
  // 重要觀念：在 React 裡「不可以直接改原本的陣列」，
  // 要「做一份新的陣列」再交給 setQuantities，React 才會發現有變、重畫畫面。
  // 下面四個函式都遵守這個規則：用 .map() 複製一份，只改要動的那一格。
  // --------------------------------------------------------

  // 某個商品數量 +1（點商品按鈕、或小算盤的 + 都會用到）
  const increase = (targetIndex) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, index) =>
        index === targetIndex ? quantity + 1 : quantity
      )
    );
    // 加東西時順便把小算盤打開，讓使用者看到結果
    setIsCartOpen(true);
  };

  // 某個商品數量 -1（最少到 0，不能變負數）
  const decrease = (targetIndex) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, index) =>
        index === targetIndex ? Math.max(0, quantity - 1) : quantity
      )
    );
  };

  // 把某個商品直接歸 0（小算盤的「移除」按鈕）
  const removeItem = (targetIndex) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, index) =>
        index === targetIndex ? 0 : quantity
      )
    );
  };

  // 全部歸 0（「清空」按鈕）
  const clearAll = () => {
    setQuantities((prevQuantities) => prevQuantities.map(() => 0));
  };

  // --------------------------------------------------------
  // 從狀態「算出」要顯示的東西。
  // 這些值不需要另外用 useState 記住，因為它們可以由 quantities 直接算出來。
  // 每次畫面重畫時，下面兩個值都會自動重新計算，保證跟最新數量一致。
  // --------------------------------------------------------

  // 目前總金額 = 每個商品的（價格 × 數量）全部加起來
  let totalPrice = 0;
  emergencyData.forEach((product, index) => {
    totalPrice += product.price * quantities[index];
  });

  // 已選購清單 = 只留下「數量大於 0」的商品，並順便記住它的位置 index 和數量
  const selectedItems = emergencyData
    .map((product, index) => ({
      ...product, // 把原本的 item、price 帶過來
      index, // 記住它在原陣列的位置（按 +/-/移除 時要用）
      quantity: quantities[index], // 目前買幾個
    }))
    .filter((product) => product.quantity > 0);

  return (
    <section id="emergency" className={styles.emergency}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>漫展急救包</h2>

        {/* ---- 左邊：商品按鈕區 ---- */}
        <div className={styles.items}>
          {emergencyData.map((product, index) => (
            <button
              key={index}
              type="button"
              // 有買的商品（數量 > 0）多套一個 itemActive 樣式（變亮）
              className={`${styles.item} ${
                quantities[index] > 0 ? styles.itemActive : ''
              }`}
              onClick={() => increase(index)} // 點一下就加 1
            >
              <span className={styles.itemName}>{product.item}</span>
              <span className={styles.itemPrice}>
                <span className={styles.priceUnit}>NT$</span>
                {product.price}
              </span>

              {/* 買了幾個就在角落顯示數字徽章 */}
              {quantities[index] > 0 && (
                <span className={styles.badge}>{quantities[index]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ---- 右邊：浮動小算盤 ---- */}
      <div className={styles.floatCart}>
        {/* 收合 / 展開按鈕 */}
        <button
          type="button"
          className={styles.toggle}
          // setIsCartOpen(目前的相反) → 開變關、關變開
          onClick={() => setIsCartOpen((open) => !open)}
          aria-expanded={isCartOpen}
          aria-label={isCartOpen ? '收合小算盤' : '展開小算盤'}
        >
          {isCartOpen ? '◀' : '▶'}
        </button>

        {/* 只有展開時才畫出小算盤內容 */}
        {isCartOpen && (
          <aside className={styles.cart}>
            <h3 className={styles.cartTitle}>選購清單</h3>

            {/*
              如果還沒選任何東西，就顯示提示文字；
              否則顯示清單。這叫「三元運算子」：條件 ? A : B
            */}
            {selectedItems.length === 0 ? (
              <p className={styles.empty}>點左邊品項加入</p>
            ) : (
              <>
                <ul className={styles.cartList}>
                  {selectedItems.map((product) => (
                    <li key={product.index} className={styles.cartRow}>
                      <span className={styles.cartName}>{product.item}</span>

                      {/* 數量調整：- 數字 + */}
                      <div className={styles.qty}>
                        <button
                          type="button"
                          onClick={() => decrease(product.index)}
                          aria-label={`減少 ${product.item}`}
                        >
                          −
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increase(product.index)}
                          aria-label={`增加 ${product.item}`}
                        >
                          +
                        </button>
                      </div>

                      {/* 這個品項的小計 = 單價 × 數量 */}
                      <span className={styles.cartSub}>
                        {product.price * product.quantity}
                      </span>

                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => removeItem(product.index)}
                        aria-label={`移除 ${product.item}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>

                <button type="button" className={styles.clear} onClick={clearAll}>
                  清空
                </button>
              </>
            )}

            {/* 總金額 */}
            <div className={styles.total}>
              <span className={styles.totalLabel}>目前金額</span>
              <span className={styles.totalValue}>NT${totalPrice}</span>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}

export default Emergency;
