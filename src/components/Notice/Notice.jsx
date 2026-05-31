// ============================================================
// Notice.jsx —— 注意事項（編號清單）
// ------------------------------------------------------------
// 這裡開始學 React 最常用的招式：用 .map() 把「一份資料陣列」
// 自動變成「一排畫面」。
//
// 想法：與其手動寫 8 個 <li>，不如把 8 條規則放進一個陣列
// （src/data/notice.js），再叫 React 幫我們一條一條畫出來。
// 以後規則增減，只要改資料檔，不用動畫面。
// ============================================================

import styles from './Notice.module.css';
import { noticeData } from '../../data/notice'; // 一個字串陣列，每個字串是一條規則

function Notice() {
  return (
    <section id="notice" className={styles.notice}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>注意事項</h2>

        <ol className={styles.list}>
          {/*
            .map() 會把陣列裡的每一個項目，變成一段 JSX。
            這裡 rule 是「那條規則的文字」，index 是「它的順序編號」(從 0 開始)。
          */}
          {noticeData.map((rule, index) => (
            // key 是 React 用來分辨「哪一個是哪一個」的身分證，
            // 用 .map() 畫清單時一定要給 key，這裡用順序當 key。
            <li key={index} className={styles.item}>
              {/*
                index 從 0 開始，所以 +1 才是給人看的編號。
                padStart(2, '0') 把 "1" 補成 "01"、"2" 補成 "02"，讓編號對齊好看。
              */}
              <span className={styles.num}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.text}>{rule}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Notice;
