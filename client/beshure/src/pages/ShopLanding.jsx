import React from 'react'
import Hero from '../components/people/Hero'

function ShopLanding() {
  return (
    <div className=' mx-6  '>
        <Hero type={"shop"}/>
        <div className='max-w-[1000px] mx-auto px-5 flex flex-col gap-6'>
           <div className='flex flex-col gap-2 text-start'>
             <h1 className='textStyleHeading2SemiBold'>Why List Your Shop with Us?</h1>
            <p className='textStyleRegular14 text-clr-brown-500'>
                Join a growing community of shopkeepers who are connecting with local shoppers and boosting their sales.
            </p>
           </div>
            <div className='flex  mb-10    gap-4'>
                <div className='p-4 px-4 rounded-2xl border border-clr-brown-300 flex-auto '>
                    <img className='my-4' src='people.svg'></img>
                    <h4 className="textStyleBold22">Reach More Customers</h4>
                    <p className='textStyleRegular14 mt-3'>Connect with a wider audience of potential customers in your area and beyond.</p>
                </div>
                 <div className='p-4 px-4 rounded-2xl border border-clr-brown-300 flex-auto  '>
                    <img className='my-4' src='location.svg'></img>
                    <h4 className='textStyleBold22'>Increase Visibility</h4>
                    <p className='textStyleRegular14 mt-3'>Get your shop in front of more eyes with our easy-to-use platform pnd powerful search features.</p>
                </div>
                 <div className='p-4 px-4 rounded-2xl border border-clr-brown-300 flex-auto '>
                    <img className='my-4' src='dollar.svg'></img>
                    <h4 className="textStyleBold22">Boost Your Sales</h4>
                    <p className='textStyleRegular14  text-clr-brown-500 mt-3'>Drive more foot traffic to your shop and watch your sales grow with our targeted marketing tools.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShopLanding