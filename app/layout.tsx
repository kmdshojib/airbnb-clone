import Modal from './components/Modals/Modal'
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
          <Modal isOpen />
          <NavBar />
        </>
        {children}
      </body>
    </html>
  )
}
