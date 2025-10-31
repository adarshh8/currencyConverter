import { useEffect, useState } from "react"

function useCurrencyinfo(currency) {
    const [data, setData] = useState({}) // ✅ added state

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`) // ✅ backticks
            .then((res) => res.json())
            .then((res) => setData(res[currency]))
            .catch((err) => console.error("Error fetching currency info:", err))
    }, [currency])

    return data
}

export default useCurrencyinfo
