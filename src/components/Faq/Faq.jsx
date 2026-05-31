// ============================================================
// Faq.jsx —— 假髮科普（左邊目錄 + 右邊內容）
// ------------------------------------------------------------
// 這是最進階的元件。畫面分成兩半：
//   左邊：sticky（會跟著捲動黏住）的目錄
//   右邊：一篇一篇的問答內容
// 互動：使用者捲到哪一篇，左邊目錄就自動「高亮」那一項。
//
// 這裡會用到兩個新工具（先看懂「在做什麼」就好，細節以後再深入）：
//   1. useRef        → 抓住「真正的 HTML 元素」，待會要量它的位置。
//   2. IntersectionObserver → 瀏覽器內建的「偵測器」，
//      會幫我們監看哪一篇問答正出現在畫面上。
// ============================================================

import { useEffect, useRef, useState } from 'react';
import styles from './Faq.module.css';
import { faqData } from '../../data/faq'; // 每筆是 { id, question, answer }

function Faq() {
  // 目前「高亮中」的問答 id，一開始預設第一篇。
  const [activeId, setActiveId] = useState(faqData[0].id);

  // 用一個物件存放每一篇問答的 DOM 元素，像 { 'faq-1': <element>, ... }。
  // useRef 的特點：它的值改變「不會」害畫面重畫，很適合拿來存 DOM。
  const answerElements = useRef({});

  // useEffect：元件出現後，建立「捲動偵測器」。[] 代表只做一次。
  useEffect(() => {
    // 建立偵測器，每當被監看的元素「進入或離開畫面」就會呼叫這個函式。
    const observer = new IntersectionObserver(
      (entries) => {
        // entries 是這次有變化的元素們。
        // 步驟：只留下「正出現在畫面上」的，再依離畫面頂端的距離由近到遠排序。
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

        // 取最靠近頂端的那一篇，當作「目前正在看」的，設為高亮。
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        // 偵測範圍：把上邊界往下推 80px（避開導覽列），下邊界縮到中間，
        // 這樣「畫面上半部出現的那篇」才會被當成目前閱讀的段落。
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      }
    );

    // 把每一篇問答的元素都交給偵測器去監看。
    Object.values(answerElements.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    // 善後：元件消失時關掉偵測器。
    return () => observer.disconnect();
  }, []);

  // 點目錄連結時：平滑捲動到對應的那篇問答。
  const handleNavClick = (event, id) => {
    event.preventDefault(); // 取消瀏覽器預設的「瞬間跳過去」
    const element = answerElements.current[id];
    if (!element) return;

    // 計算要捲到的位置：元素目前的位置 + 已捲動距離 - 導覽列高度 - 一點空隙。
    const navbarHeight = 72;
    const targetTop =
      element.getBoundingClientRect().top + window.scrollY - navbarHeight - 24;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>假髮科普</h2>

        <div className={styles.layout}>
          {/* ---- 左：會黏住的目錄 ---- */}
          <aside className={styles.toc}>
            <div className={styles.tocSticky}>
              <p className={styles.tocLabel}>目錄</p>
              <ol className={styles.tocList}>
                {faqData.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleNavClick(event, item.id)}
                      // 若這項正是高亮中的，就多套一個 active 樣式
                      className={`${styles.tocLink} ${
                        activeId === item.id ? styles.tocLinkActive : ''
                      }`}
                    >
                      <span className={styles.tocNum}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.tocText}>{item.question}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* ---- 右：可捲動的問答內容 ---- */}
          <div className={styles.answers}>
            {faqData.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                // ref 回呼：元素被畫出來時，把它存進 answerElements，
                // 之後偵測器和捲動才能找到它。
                ref={(element) => (answerElements.current[item.id] = element)}
                className={styles.answerBlock}
              >
                <header className={styles.answerHeader}>
                  <span className={styles.answerNum}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.answerQuestion}>{item.question}</h3>
                </header>

                <div className={styles.answerBody}>
                  {/*
                    答案文字裡可能有換行符號 '\n'。
                    用 split('\n') 把它切成「一段一段」，每段包成一個 <p>。
                  */}
                  {item.answer.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
