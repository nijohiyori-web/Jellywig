// ============================================================
// App.jsx —— 整個網站的「總指揮」
// ------------------------------------------------------------
// 一個網頁是由很多「區塊」組成的（導覽列、首頁、最新消息…）。
// 在 React 裡，每個區塊都是一個「元件 (Component)」，
// 而 App 的工作就是把這些元件「照順序排好」，組成完整的網頁。
//
// 學習重點：元件就像積木，App 負責把積木一塊一塊疊起來。
// ============================================================

// 先把每一塊積木（元件）拿進來
import Navbar from './components/Navbar/Navbar'; // 上方導覽列
import Hero from './components/Hero/Hero'; // 首頁大圖
import News from './components/News/News'; // 最新消息
import Notice from './components/Notice/Notice'; // 注意事項
import Portfolio from './components/Portfolio/Portfolio'; // 作品集
import Emergency from './components/Emergency/Emergency'; // 漫展急救包
import Pricing from './components/Pricing/Pricing'; // 價目表
import Faq from './components/Faq/Faq'; // 假髮科普

function App() {
  // 一個元件 = 一個會「回傳畫面」的函式。
  // 下面 return 裡面長得像 HTML 的東西，叫做 JSX。
  return (
    // <> </> 叫做「Fragment（片段）」，
    // 因為 return 只能回傳「一個」最外層標籤，
    // 但我們又不想多包一層 <div>，所以用這個空標籤把大家裝起來。
    <>
      {/* 導覽列固定在最上面，所以放在 main 外面 */}
      <Navbar />

      {/* <main> 裡面放網頁的主要內容，由上往下依序排列 */}
      <main>
        <Hero />
        <News />
        <Notice />
        <Portfolio />
        <Emergency />
        <Pricing />
        <Faq />
      </main>
    </>
  );
}

// 把 App 匯出，這樣 main.jsx 才能 import 它
export default App;
