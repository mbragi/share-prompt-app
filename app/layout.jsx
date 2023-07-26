import '@/styles/global.css'
import Nav from '@components/Nav'

export const metadata = {
  title: 'Promptopia',
  description: 'A place to find inspiration for your next prompt.'
}

export default function Layout({ children }) {
 return (
  <html lang='en'>
   <body>
    <div className="main">
     <div className="gradient"/>
      <div className='w-full sm:px-4 px-10'>
       <main className='app'>
        <Nav/>
        {children}
       </main>
     </div>
    </div>
   </body>
  </html>
 )
}