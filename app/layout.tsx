import TosterProvider from './Providers/TosterProvider'
import getCurrentUser from './actions/getCurrentUser'
import LoginModal from './components/Modals/LoginModal'
import RegisterModal from './components/Modals/RegisterModal'
import RentModal from './components/Modals/RentModal'
import NavBar from './components/NavBar/NavBar'
import './globals.css'
import { Nunito } from 'next/font/google'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnB',
  description: 'AirBnB clone',
}

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <>
          <TosterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </>
        {children}
      </body>
    </html>
  )
}

export default RootLayout