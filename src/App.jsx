import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyinfo from './hooks/useCurrencyinfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyinfo = useCurrencyinfo(from)
  const options = Object.keys(currencyinfo || {})

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyinfo[to])
  }

  return (
    <div
      className="relative w-full h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4386379/pexels-photo-4386379.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
      }}
    >
      {/* soft gradient accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/30 via-blue-400/20 to-cyan-300/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-pink-400/20 via-purple-500/20 to-indigo-500/20 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />

      <div className="w-full max-w-md mx-auto rounded-2xl p-6 backdrop-blur-xl bg-white/15 ring-1 ring-white/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.02] hover:bg-white/25">
        <h1 className="text-3xl font-extrabold text-center mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
          💱 Currency Converter
        </h1>
        <p className="text-center text-white/80 text-sm mb-6">Convert currencies in real time with a clean, modern UI</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          <div className="w-full mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>

          <div className="relative w-full flex justify-center my-4">
            <button
              type="button"
              onClick={swap}
              className="inline-flex items-center gap-2 border-2 border-white/60 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300/40 active:scale-95 transition-all duration-300"
            >
              <span className="text-lg">🔁</span>
              <span>Swap</span>
            </button>
          </div>

          <div className="w-full mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-2xl hover:from-indigo-600 hover:via-purple-600 hover:to-fuchsia-700 focus:outline-none focus:ring-4 focus:ring-purple-300/40 active:scale-[0.99] transition-all duration-300"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>

        <p className="text-center text-white/90 mt-5 text-sm">
          🌍 Live currency exchange made simple
        </p>
      </div>
    </div>
  )
}

export default App
