// ============================================================
// Portfolio.jsx —— 作品集（父元件）
// ------------------------------------------------------------
// 這裡學「父元件 → 子元件」的合作方式。
//
// 分工：
//   Portfolio（父）   = 負責跑迴圈，決定「有幾張作品卡」
//   PortfolioItem（子）= 負責畫「一張作品卡」長什麼樣子
//
// 父元件把每一筆作品資料，透過 props（屬性）交給子元件，
// 就像把一張訂單交給師傅，師傅照著訂單做出成品。
// ============================================================

import styles from './Portfolio.module.css';
import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { portfolioData } from '../../data/portfolio';

function Portfolio() {
  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>作品集</h2>

        <div className={styles.list}>
          {/*
            把每一筆作品 item 交給 <PortfolioItem />。
            item={item} 就是在「傳 props」：把這筆資料命名為 item 傳過去。
            key 用 item.id（每筆資料獨一無二的編號），比用 index 更穩。
          */}
          {portfolioData.map((item, index) => (
            <PortfolioItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
