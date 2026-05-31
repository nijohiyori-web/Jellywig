// ============================================================
// News.jsx —— 最新消息區塊
// ------------------------------------------------------------
// 一樣是純畫面元件，內容都是寫死的文字與圖片。
//
// 學習重點：JSX 裡也可以放一般的 HTML 標籤，
// 例如 <strong> 讓文字變粗體。
// ============================================================

import styles from './News.module.css';

function News() {
  return (
    <section id="news" className={styles.news}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>最新消息</h2>

        <div className={styles.content}>
          <div className={styles.imageBox}>
            <img src={`${import.meta.env.BASE_URL}images/jellyfish.png`} alt="水母" />
          </div>

          <div className={styles.text}>
            <p className={styles.alert}>暫停接單！</p>
            <p className={styles.contact}>
              聯絡方式 Discord：<strong>Yanyu1099</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default News;
