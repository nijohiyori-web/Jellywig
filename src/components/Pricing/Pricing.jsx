// ============================================================
// Pricing.jsx —— 價目表（表格）
// ------------------------------------------------------------
// 再練習一次 .map()，這次畫的是表格的每一列 <tr>。
//
// 學習重點：資料 pricingData 裡每一筆是一個物件 { item, price }，
// 所以在 .map() 裡可以用 row.item、row.price 取出欄位。
// ============================================================

import styles from './Pricing.module.css';
import { pricingData } from '../../data/pricing'; // 每筆是 { item: 品項, price: 價格 }

function Pricing() {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>價目表</h2>

        <table className={styles.table}>
          <tbody>
            {/* 每一筆 row 變成表格的一列：左邊品項、右邊價格 */}
            {pricingData.map((row, index) => (
              <tr key={index} className={styles.row}>
                <td className={styles.item}>{row.item}</td>
                <td className={styles.price}>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Pricing;
