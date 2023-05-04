
import { useState, useEffect } from 'react'
import comservices from './services/communications'

const CountryNames = ({ countries }) => {

  return (<div>
    {countries.name.common}
  </div>)
}

const DataForOneCountry = ({ country }) => {
  // when length of country is one, returns object
  const countryObject = country[0].languages
  const arrayOfObjectValues = Object.values(countryObject)

  return (<div>
    <h2>{country.map(n => n.name.common)}</h2>
    {country.map(n => n.capital)}
    <br />
    area {country.map(n => n.area)}
    <br />
    <h3>languages:</h3>
    {arrayOfObjectValues.map(val => <ul><li>{val}</li></ul>)}
    <img src={country[0].flags.png} height={60} width={70} />
  </div >
  )
}

const Filter = ({ country, cs }) => {

  if (cs === "")
    return (<>{ }</>)

  const filteredCountry = country.filter(n => {
    return n.name.common.toLowerCase().indexOf(cs.toLowerCase()) > -1
  })

  if (filteredCountry.length > 10)
    return (<>Too many matches, specify another filter</>)

  if (filteredCountry.length === 1)
    return (<><DataForOneCountry country={filteredCountry} /></>)

  return (<div>
    {filteredCountry.map((cnames, i) => <CountryNames key={i} countries={cnames} />)}
  </div>)
}
const App = () => {

  const [country, setCountry] = useState([])
  const [countrySearch, setCountrySearch] = useState('')

  useEffect(() => {
    comservices
      .getAll()
      .then(countrydata => setCountry(countrydata))

  }, [])


  console.log(country)

  const handleSearch = (event) => {

    setCountrySearch(event.target.value)

  }


  return (<div>
    <div>
      Find countries:<input
        onChange={handleSearch} />
    </div>
    <Filter country={country} cs={countrySearch} />
    {/*returnedCountries.map(n => <CountryNames key={n.car.cca2} countries={n} keywords={countrySearch} />)*/}
  </div>)
}
export default App


