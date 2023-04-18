import { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/Card';
import List from '../components/List';
import { ALL_COUNTRIES } from '../config';
import { Controls } from '../components/Controls';
import { useHistory } from 'react-router-dom';

const HomePage = ({ setCountries, countries }) => {
  const [filtredCountries, setFiltredCountries] = useState(countries);

  const { push } = useHistory();

  const handleSearch = (search, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter(c => c.region.includes(region))
    }

    if (search) {
      data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFiltredCountries(data);
  };


  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries])

  return (
    <>
      <Controls onSearch={handleSearch} />
        <List>
          {filtredCountries.map((c) => {
              const countryInfo = {
                img: c.flags.png,
                name: c.name,
                info: [
                  {
                    title: 'Population',
                    description: c.population.toLocaleString()
                  },
                  {
                    title: 'Region',
                    description: c.region
                  },
                  {
                    title: 'Capital',
                    description: c.capital
                  },
                ],
              };

              return (
                <Card
                  key={c.name}
                  onClick={() => push(`/country/${c.name}`)}
                  {...countryInfo}
                />
              )
            })
          }
        </List>
      </>
  )
}

export default HomePage
