import './styles/main.css'
import logoImg from './assets/logo-nlw.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import { CreateAdmodal } from './components/CreateAdModal'
import axios from 'axios'


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  }
}



function App() {
  const [games, setGames] = useState<Game[]>([])
  const [dialogControl, setDialogControl] = useState(false)

  function close() {
    setDialogControl(false)
    return null
  }

  useEffect(()=> {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])
  
  return (
   <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />
      
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return(
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} ads={game._count.ads}/>
          )
        })}
       
      </div>

      <Dialog.Root open={dialogControl} onOpenChange={setDialogControl}>
        <CreateAdBanner />
        <CreateAdmodal closeModal={close} />
        
      </Dialog.Root>
      
   </div>
  )
}

export default App
