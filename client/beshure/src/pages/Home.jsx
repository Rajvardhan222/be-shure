import React from 'react'
import Hero from '../components/people/Hero'
import ShopList from './ShopList'
import Search from './Search'

function Home() {
  return (
    <div className='mx-6'>
        <Hero type={"shop"}/>
    </div>
  )
}

export default Home