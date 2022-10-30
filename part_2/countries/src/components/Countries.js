import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
  return (
    <>
      {countries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        countries.map((country) => <Country key={country.name.common} country={country} />)
      )}
    </>
  )
}

export default Countries
