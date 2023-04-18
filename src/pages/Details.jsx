import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5';
import { useParams, useHistory } from 'react-router-dom'
import { Button } from '../components/Button';
import Info from '../components/Info';
import { searchByCountry } from '../config';

const Details = () => {
  const {name} = useParams();
  const {push, goBack} = useHistory();
  const [country, setCountry] = useState(null);

  console.log(country)

  useEffect(() => {
    axios.get(searchByCountry(name)).then(
      ({data}) => setCountry(data[0])
    )
  }, [name])


  return (
    <div>
      <Button onClick={goBack}>
        <IoArrowBack /> Back
      </Button>

      {country && <Info push={push} {...country} />}
    </div>
  )
}

export default Details
