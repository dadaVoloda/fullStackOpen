import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }
  const filterCountry = () => {
    if (!filter) return countries

    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
  }

  const filteredCountries = filterCountry()
  return (
    <div>
      <span>find countries </span>
      <input
        value={filter}
        onChange={(e) => {
          handleChangeFilter(e)
          filterCountry()
        }}
        type='text'
      />
      <div>
        {filteredCountries.length === 1 ? (
          <CountryInfo country={filteredCountries[0]} />
        ) : (
          <Countries countries={filteredCountries} />
        )}
      </div>
    </div>
  )
}

export default App
