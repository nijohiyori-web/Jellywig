// ============================================================
// PortfolioItem.jsx —— 一張作品卡（子元件）
// ------------------------------------------------------------
// 這個元件負責畫「單獨一張」作品卡。
//
// 學習重點：props（屬性）怎麼接收？
//   父元件寫 <PortfolioItem item={某筆資料} />
//   子元件就用「函式的參數」接住它：function PortfolioItem({ item })
//   之後就能用 item.character、item.price… 取出每個欄位。
// ============================================================

import styles from './PortfolioItem.module.css';

// { item } 這個寫法叫「解構」，意思是「從 props 裡只拿出 item 這一個」。
function PortfolioItem({ item }) {
  return (
    <article className={styles.item}>
      <div className={styles.imageArea}>
        {/* 主圖：實際做出來的假髮照片 */}
        <div className={styles.portrait}>
          <img
            src={`${import.meta.env.BASE_URL}${item.portrait}`}
            alt={`${item.character} 作品`}
            loading="lazy" // 圖片捲到才載入，網頁開得更快
          />
        </div>

        {/*
          角色原圖（參考圖）不是每筆都有。
          下面是 React 的「條件顯示」：
          {條件 && <要顯示的東西/>}
          ── 只有當 item.reference 有值時，後面那段才會被畫出來。
        */}
        {item.reference && (
          <div className={styles.reference} title="角色原圖">
            <img
              src={`${import.meta.env.BASE_URL}${item.reference}`}
              alt={`${item.character} 角色參考`}
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.source}>{item.source}</p>
        <h3 className={styles.character}>{item.character}</h3>

        {/* specs 是一個字串陣列（這頂假髮的規格），用 .map() 列出來 */}
        <ul className={styles.specs}>
          {item.specs.map((spec, i) => (
            <li key={i}>{spec}</li>
          ))}
        </ul>

        <p className={styles.price}>
          <span className={styles.priceLabel}>NTD</span>
          <span className={styles.priceNum}>{item.price}</span>
        </p>
      </div>
    </article>
  );
}

export default PortfolioItem;
