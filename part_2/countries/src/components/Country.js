import { useState } from 'react'
import CountryInfo from './CountryInfo'

const Country = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false)
  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <>
      <div>
        <span>{country.name.common}</span>
        <button onClick={handleShowInfo} type='button'>
          {showInfo ? 'hide' : 'show'}
        </button>
      </div>
      {showInfo && <CountryInfo country={country} />}
    </>
  )
}

export default Country
