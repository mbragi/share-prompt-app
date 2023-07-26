'use client'
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn,signOut, useSession, getProviders}from 'next-auth/react'
function Nav() {
 const isUserLoggedIn = true
 const [providers , setProviders] = useState(null)
 const [toggleDropdown, setToggleDropdown] = useState(false)
 useEffect(()=>{
  const setProvider = async ()=>{
   const res = await getProviders();
   setProviders(res)
  }

  setProvider()
 },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
     <Link href='/' className='flex gap-2 text-center'>
      <Image 
       src='/assets/images/logo.svg'
       alt='Promptopia Logo'
       width='30'
       height='30'
       className='object-contain'
       />
       <p className="logo_text">Promptopia</p>
     </Link>
     {/* Destop Nav  */}
     <div className='sm:flex hidden'>
      {isUserLoggedIn ? 
      <div className='flex gap-3 md:gap-5'>
       <Link href='/create-prompt' className='black_btn'>
        Create Post
       </Link>

       <button type='button' onClick={signOut} className="outline_btn">
        signOut
       </button>

       <Link href='/profile'>
        <Image
         src='/assets/images/logo.svg'
         width={37}
         height={37}
         alt='profile'
         className='rounded-full'
         />
       </Link>
      </div> : 
      <>
       {
        providers && Object.values(providers).map((provider)=>{
         <button 
           type='button' 
           key={provider.name} 
           onClick={()=>signIn(provider.id)}
           className='black_btn'
         >
          Sign In
         </button>
        })
       }
      </>}
     </div>

      {/* Mobile Nav  */}
      <div className="sm:hidden flex relative">
       {isUserLoggedIn ? 
       <div className="flex text-black">
         <Image
         src='/assets/images/logo.svg'
         width={37}
         height={37}
         alt='profile'
         className='rounded-full'
         onClick={()=> setToggleDropdown(!toggleDropdown)}
         />
        {
         toggleDropdown ? (
          <div className="dropdown">
           <Link className="dropdown_link"
             onClick={()=> setToggleDropdown(false)}
             href='/profile'
           >
             Profile
           </Link>
           <Link className="dropdown_link"
             onClick={()=> setToggleDropdown(false)}
             href='/create-prompt'
           >
             Create Prompt
           </Link>
           <button type='button'
            onClick={()=>{
             setToggleDropdown(false)
             signOut();
            }}
            className='mt-5 w-full black_btn'
            >
             Sign Out
            </button>
          </div>):''
        }
       </div>
       : 
       <>
        {
        providers && Object.values(providers).map((provider)=>{
         <button 
           type='button' 
           key={provider.name} 
           onClick={()=>signIn(provider.id)}
           className='black_btn'
         >
          Sign In
         </button>
        })
       }
       </>
      }
      </div>
    </nav>
  )
}

export default Nav
