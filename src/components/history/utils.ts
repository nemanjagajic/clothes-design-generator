import { HistoryItemType } from "./types";


export const addItemToHistory = (item: HistoryItemType) => {

    let historyStr = localStorage.getItem('history') || '[]'

    if (historyStr) {
        const history = JSON.parse(historyStr)
        history.push(item)
        if (history.length > 20) {
            history.shift()
        }

        localStorage.setItem('history', JSON.stringify(history))

    }
}