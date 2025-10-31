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
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4386379/pexels-photo-4386379.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-300/40 rounded-2xl p-6 backdrop-blur-md bg-white/20 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/30">
        <h1 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg tracking-wide">
          💱 Currency Converter
        </h1>
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
              className="border-2 border-white bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-blue-600 transition-all duration-300"
            >
              🔁 Swap
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
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold tracking-wide shadow-md hover:shadow-xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
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
