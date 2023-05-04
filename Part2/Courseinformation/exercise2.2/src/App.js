import { useState, useEffect } from 'react'
import comservices from './services/communications'

const Button = ({ f }) => {

  return <>
    <button type="button" onClick={f} >show</button>
  </>

}
const AllCountryNames = ({ countries }) => {

  return (<div>
    {countries.name.common}
  </div>)
}

const CountriesTwoToTen = ({ filteredCountry }) => {
  const [name, setName] = useState('')
  const [area, setArea] = useState()
  const [lang, setLang] = useState([])
  const [capital, setCapital] = useState("")
  const [flags, setFlags] = useState("https://upload.wikimedia.org/wikipedia/commons/f/fa/Globe.svg")

  const views = (n) => {

    setName(n.name.common)
    setCapital(n.capital)
    setArea(n.area)
    setLang(Object.values(n.languages).map((n, i) => <li key={i}>{n}</li>))
    setFlags(n.flags.png)
  }

  return (
    <div>
      {filteredCountry.map((n, i) => { return (<div key={i}>{n.name.common} < Button f={(event) => views(n)} /></div>) })}
      <br />
      <div>
        <strong>name: {name}</strong>
        <div>capital:{capital}</div>
        Area: {area}
        <div><strong>Language</strong></div>
        {lang}
        <div><strong>Flags:</strong></div>
        <img src={flags} height={50} width={70} />
      </div>
    </div>
  )
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
    {arrayOfObjectValues.map((val, index) => <ul key={index}><li>{val}</li></ul>)}
    <img src={country[0].flags.png} height={60} width={70} />

  </div >
  )
}

const Filter = ({ country, cs, area, language, name }) => {

  if (cs === "")
    return (<>{ }</>)

  const filteredCountry = country.filter(n => {
    return n.name.common.toLowerCase().indexOf(cs.toLowerCase()) > -1
  })

  if (filteredCountry.length > 10) {
    return (<>Too many matches, specify another filter</>)
  }
  if (filteredCountry.length > 1 && filteredCountry.length <= 10)
    return (<div><CountriesTwoToTen filteredCountry={filteredCountry} /></div>)

  if (filteredCountry.length === 1)
    return (<><DataForOneCountry country={filteredCountry} /></>)

  return (<div>
    {filteredCountry.map((cnames, i) => <AllCountryNames key={i} countries={cnames} />)}
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


  //console.log(country)

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
