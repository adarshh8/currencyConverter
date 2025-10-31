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
  const rate = currencyinfo && currencyinfo[to] ? currencyinfo[to] : 0

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
      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:22px_22px] opacity-25 mix-blend-overlay" />
      {/* soft gradient accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/30 via-blue-400/20 to-cyan-300/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-pink-400/20 via-purple-500/20 to-indigo-500/20 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />

      {/* glowing gradient behind the card */}
      <div className="absolute h-[420px] w-[420px] rounded-3xl bg-gradient-to-tr from-fuchsia-500/20 via-indigo-500/20 to-cyan-400/20 blur-2xl" />
      <div className="relative w-full max-w-md mx-auto rounded-2xl p-[2px] bg-gradient-to-r from-cyan-400/60 via-indigo-400/60 to-fuchsia-400/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
        <div className="rounded-2xl p-6 backdrop-blur-2xl bg-white/12 ring-1 ring-white/15 transition-all duration-500 hover:scale-[1.01] hover:bg-white/18">
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
            <div className="mt-2 text-[11px] uppercase tracking-wider text-white/70">Base: {from.toUpperCase()}</div>
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
            <div className="mt-2 text-[11px] uppercase tracking-wider text-white/70">Target: {to.toUpperCase()}</div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.55)] hover:from-indigo-600 hover:via-purple-600 hover:to-fuchsia-700 focus:outline-none focus:ring-4 focus:ring-purple-300/40 active:scale-[0.99] transition-all duration-300"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
          {rate ? (
            <p className="mt-3 text-center text-white/85 text-xs">1 {from.toUpperCase()} ≈ {rate.toFixed(4)} {to.toUpperCase()}</p>
          ) : null}
        </form>

        <p className="text-center text-white/90 mt-5 text-sm">
          🌍 Live currency exchange made simple
        </p>
      </div>
    </div>
  )
}

export default App
