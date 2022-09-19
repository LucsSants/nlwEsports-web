import './styles/main.css'
import logoImg from './assets/logo-nlw.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import { GameController } from 'phosphor-react'
import { Input } from './components/Form/Input'

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

  useEffect(()=> {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
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

      <Dialog.Root>
        <CreateAdBanner/>

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed '/>

          <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[488px] shadow-lg shadow-black/50'>

            <Dialog.Title className='text-3xl font-black'>Puiblique um anúncio</Dialog.Title>

              <form className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className="font-semibold">Qual é o game?</label>
                  <Input 
                  id="game" 
                  placeholder="Selecione o game que deseja Jogar" 
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input id="name" placeholder="Como te chamam dentro do game?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input type="number" id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu discord?</label>
                    <Input id="discord" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className="flex flex-col gap-2"> 
                    <label htmlFor="weekDays">Qando constuma jogar?</label>
                    <div className='grid grid-cols-4 gap-1'>
                      <button className='w-8 h-8 rounded bg-zinc-900 hover:bg-violet-400' title='Domingo'>D</button>
                      <button className='w-8 h-8 rounded bg-zinc-900 hover:bg-violet-400' title='Segunda'>S</button>
                      <button className='w-8 h-8 rounded bg-zinc-900 hover:bg-violet-400' title='Terça'>T</button>
                      <button className='w-8 h-8 rounded bg-zinc-900 hover:bg-violet-400' title='Quarta'>Q</button>
                      <button className='w-8 h-8 rounded bg-zinc-900 hover:bg-violet-400' title='Quinta'>Q</button>
                      <button className='w-8 h-8 rounded bg-zinc-900 hover:bg-violet-400' title='Sexta'>S</button>
                      <button className='w-8 h-8 rounded bg-zinc-900 hover:bg-violet-400' title='Sábado'>S</button>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hoursStart">Qual horáio do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input type="time" placeholder='De'/>
                      <Input type="time" placeholder='Até'/>
                    </div>
                  </div>
                </div>

                <div className='mt-2 flex gap-2 text-sm'>
                      <Input type="checkbox" />
                      Costumo me conectar ao chat de voz.
                </div>

                <footer className='mt-4 justify-end flex gap-4'>
                  <Dialog.Close
                    type='button'
                    className='bg-zinc-500 h-12 px-5 rounded-lg font-semibold hover:bg-zinc-700'
                  >
                    Cancelar
                  </Dialog.Close>
                  <button type="submit" className='bg-violet-500 h-12 px-5 rounded-lg flex gap-2 justify-center items-center hover:bg-violet-700'>
                    <GameController size={24}/>
                    Encontrar duo
                  </button>
                </footer>

              </form>
            

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      
   </div>
  )
}

export default App
