# 02 - Debug

## 問題說明

直接執行原始程式，或加入不存在的 YouTube ID，程式皆未拋出錯誤。  
使用 `console.log(response.ok, response.status, url)` 觀察發現，`videosURL` 中的 YouTube ID 被組成為 `undefined`。

## 問題原因

組合 URL 時是透過 `i` 變數從 `youtubeIds` 陣列中取值，然而 `await` 導致後續程式碼被包成 microtask callback 並延後執行。  
當這段 callback 被實際執行時，`for` 迴圈早已結束，`i` 的值已變成 `youtubeIds.length`。  
（事件循環流程：同步階段跑完迴圈 → 進入 microtask queue 執行剩餘程式，此時 `i` 已超出預期範圍）

## 修正方式

每次建立 Promise 時，應先將當下的 YouTube ID 存入區域變數，以避免在 `await` 之後的非同步區段中，讀取到已變動的 `i` 值，導致 URL 組合錯誤。  

註：這個問題也可以透過在每次 `for` 迴圈中使用 `let` 宣告變數來解決。

## 檔案說明

- `original.js`：原始版本，加上 `console.log(response.ok, response.status, url)` 用於觀察 output  
- `fixed.js`：修正後版本，於每次迴圈 Promise 中加入區域變數 `var youtubeId = youtubeIds[i]`，先取得 YouTube ID，避免在 `await` 後使用到已變動的 `i` 值
