import React, { useEffect } from 'react'
import axios from 'axios';
import Card from '../components/Card';
import List from '../components/List';
import { ALL_COUNTRIES } from '../config';
import Controls from '../components/Controls';
import { useHistory } from 'react-router-dom';

const HomePage = ({countries, setCountries}) => {
  // const [countries, setCountries] = useState([])

  const { push } = useHistory();

  useEffect(() => {
    if (!countries.length)
    axios.get(ALL_COUNTRIES).then(({data}) => setCountries(data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // try
  return (
    <>
      <Controls />
        <List>
          {
            countries.map(c => {
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
