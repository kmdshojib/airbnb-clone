import TosterProvider from './Providers/TosterProvider'
import RegisterModal from './components/Modals/RegisterModal'
import NavBar from './components/NavBar/NavBar'
import './globals.css'
import { Nunito } from 'next/font/google'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnB',
  description: 'AirBnB clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <>
          <TosterProvider />
          <RegisterModal />
          <NavBar />
        </>
        {children}
      </body>
    </html>
  )
}
