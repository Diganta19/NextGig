import React,{useContext} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const {setIsSearched,setSearchFilter} = useContext(AppContext);

    const titleRef = React.useRef(null)
    const locationRef = React.useRef(null)

    const onSearch = () => {
        setIsSearched(true);

        setSearchFilter({
            title:titleRef.current.value,
            location:locationRef.current.value
        })
        console.log({
            title:titleRef.current.value,
            location:locationRef.current.value
        });
        
    }
  return (
    <div className='container 2xl:px-20 my-10 mx-auto '>
      <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white mx-2 rounded-xl text-center'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 1000+ Jobs To Apply Here For You</h2>
        <p className='max-w-xl mb-8 mx-auto text-sm font-light px-5 '>Land Your Dream Job Here - Start Right Now</p>
        <div className='flex item-center justify-between bg-white rounded text-grey-600 max-w-xl pl-4 mx-4 sm:mx-auto '>
            <div className='flex items-center'>
                <img  className="h-4 sm:h-5" src={assets.search_icon} alt="" srcset="" />
                <input type="text" placeholder="Search For Jobs" className='max-sm:text-xs p-2 rounded outline-none w-full text-black'  ref={titleRef} />
            </div>
            <div className='flex items-center'>
                <img  className="h-4 sm:h-5" src={assets.location_icon  } alt="" srcset="" />
                <input type="text" placeholder="Location" className='max-sm:text-xs p-2 rounded outline-none w-full text-black' ref={locationRef} />
            </div>
            <button className='bg-blue-600 px-6 py-2 rounded text-white m-1' onClick={onSearch}>Search</button>
        </div>
      </div>

      <div className='border border-grey-100 mx-2 mt-5 p-6 rounded-md flex shadow-md'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
            <p className='font-medium'>Trusted By</p>
            <img className="h-6" src={assets.microsoft_logo} alt="" srcset="" />
            <img className="h-6" src={assets.walmart_logo} alt="" srcset="" />
            <img className="h-6" src={assets.adobe_logo} alt="" srcset="" />
            <img className="h-6" src={assets.amazon_logo} alt="" srcset="" />
            <img className="h-6" src={assets.samsung_logo} alt="" srcset="" />
            <img className="h-6" src={assets.accenture_logo} alt="" srcset="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
