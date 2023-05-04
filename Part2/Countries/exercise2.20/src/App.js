import { useState, useEffect } from 'react'
import comservices from './services/communications'

const WeatherReport = ({ country, weatherData }) => {
  if (weatherData === null) // ensures weatherData is not null
    return

  return (
    <div>
      <h3>Weather in {country.map(n => n.capital)}</h3>
      <div><strong>temperature {weatherData.main.temp} Celcius</strong></div>
      <div>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather.map(n => n.icon)}@2x.png`} />
      </div>
      <div><strong>Wind {weatherData.wind.speed}m/s</strong></div>
    </div>
  )

}

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

const CountriesTwoToTen = ({ filteredCountries }) => {
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
      {filteredCountries.map((n, i) => { return (<div key={i}>{n.name.common} < Button f={(event) => views(n)} /></div>) })}
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

const DataForOneCountry = ({ country, api_key }) => {

  const [data, setData] = useState(null)

  // when country length is one, returns object
  const countryObject = country[0].languages
  const arrayOfObjectValues = Object.values(countryObject)
  // returns array of single element
  const cap = country[0].capital

  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cap[0]}&appid=${api_key}&units=metric`

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const fetched = await comservices.getWeatherData(baseUrl)
        setData(fetched)
      }
      catch (error) { console.log(error) }
    }
    fetchWeatherData()
  }, [])

  console.log('logging weather data', data)

  return (<div>
    <h2>{country.map(n => n.name.common)}</h2>
    <strong>Capital</strong> : {country.map(n => n.capital)}
    <br />
    area {country.map(n => n.area)}
    <br />
    <h3>languages:</h3>
    {arrayOfObjectValues.map((val, index) => <ul key={index}><li>{val}</li></ul>)}
    <img src={country[0].flags.png} height={60} width={70} />
    <WeatherReport weatherData={data} country={country} />
  </div >
  )

}

const Filter = ({ filteredCountries, cs, api_key }) => {

  if (cs === "")
    return (<>{ }</>)
  if (filteredCountries.length > 10) {

    return (<>Too many matches, specify another filter</>)
  }
  if (filteredCountries.length > 1 && filteredCountries.length <= 10)
    return (<div><CountriesTwoToTen filteredCountries={filteredCountries} /></div>)

  if (filteredCountries.length === 1)
    return (<>{<DataForOneCountry country={filteredCountries} api_key={api_key} />}</>)

  return (<div>
    {filteredCountries.map((cnames, i) => <AllCountryNames key={i} countries={cnames} />)}
  </div>)
}

const App = () => {

  const [country, setCountry] = useState([])
  const [countrySearch, setCountrySearch] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {

    comservices
      .getAll()
      .then(countries => setCountry(countries))
  }, [])

  const filterFn = () => {
    const filteredCountries = country.filter(n => {
      return n.name.common.toLowerCase().indexOf(countrySearch.toLowerCase()) > -1
    })
    return filteredCountries
  }
  const filteredCountries = filterFn()

  const handleSearch = (event) => {
    setCountrySearch(event.target.value)

  }

  return (<div>
    <div>
      Find countries:<input onChange={handleSearch} />
    </div>
    {<Filter country={country} filteredCountries={filteredCountries} cs={countrySearch} api_key={api_key} />}
    {/*country.map((countrynames, i) => <AllCountryNames key={i} countries={countrynames} />)*/}
  </div>)
}
export default App
