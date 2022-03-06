/**開始按鈕 */
const startButton = document.querySelector("#start");
/**計數按鈕 */
const countButton = document.querySelector("#count");
/**發生錯誤按鈕 */
const errorButton = document.querySelector("#error");
/**計數完成按鈕 */
const completeButton = document.querySelector("#complete");

/**計數器內容 */
const currentCounterLabel = document.querySelector("#currentCounter");
/**只顯示偶數的計數器內容 */
const evenCounterLabel = document.querySelector("#evenCounter");
/**目前狀態 */
const statusLabel = document.querySelector("#status");

export const Button = { startButton, countButton, errorButton, completeButton };
export const Label = { currentCounterLabel, evenCounterLabel, statusLabel };
