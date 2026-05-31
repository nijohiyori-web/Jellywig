// ============================================================
// Hero.jsx —— 首頁最上面那張大圖
// ------------------------------------------------------------
// 這是最單純的元件：它沒有任何「邏輯」，
// 只是把固定的圖片和文字畫出來而已。
//
// 學習重點：
// 1. 元件就是一個「回傳 JSX 的函式」。
// 2. JSX 裡寫樣式要用 className（不是 HTML 的 class）。
// 3. styles.xxx 來自 CSS Module，可以避免不同檔案的樣式互相打架。
// ============================================================

import styles from './Hero.module.css';

function Hero() {
  return (
    // id="home" 是給導覽列點擊時「跳到這裡」用的錨點
    <section id="home" className={styles.hero}>
      {/* 點水母圖，會跳到「最新消息」區塊 */}
      <a href="#news" className={styles.heroJellyLink} aria-label="查看最新消息">
        {/* alt="" 代表這張是純裝飾圖，唸螢幕的輔助工具會略過它 */}
        <img src={`${import.meta.env.BASE_URL}images/jellyfish.png`} alt="" className={styles.heroJelly} />
      </a>

      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <img
            src={`${import.meta.env.BASE_URL}images/jellywig-logo.png`}
            alt="JellyWig"
            className={styles.logo}
          />
        </div>
        <h1 className={styles.subtitle}>揺れる髪、目覚める角色</h1>
      </div>
    </section>
  );
}

export default Hero;
