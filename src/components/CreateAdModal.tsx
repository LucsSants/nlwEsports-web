import { GameController, Check, CaretDown } from 'phosphor-react'
import { Input } from './Form/Input'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useEffect, useState, FormEvent} from 'react';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
}

export function CreateAdmodal( ) {

  const [games, setGames] = useState<Game[]>([])
  const [weekDays,setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  
    useEffect(()=> {
      axios('http://localhost:3333/games').then(response => {
        setGames(response.data)
      })
    }, [])

    async function handleCreateAd(event : FormEvent) {
      event.preventDefault()
      
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)

      if (!data.name) {
        return
      }

      try {
         await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsOfPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso')
      }catch (err) {
        alert('Erro ao criar anúncio')
        console.log(err)
      }
    }

  return(
    <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed '/>

          <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[488px] shadow-lg shadow-black/50'>

            <Dialog.Title className='text-3xl font-black'>Puiblique um anúncio</Dialog.Title>

              <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className="font-semibold">Qual é o game?</label>
                  <select 
                    name='game'
                    id="game" 
                    className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 appearance-none"
                    defaultValue='a'
                  >
                    <option value='a' disabled>Selecione o game que deseja Jogar</option>
                    {games.map(game => {
                      return <option key={game.id} value={game.id}>{game.title}</option>
                    }) }
                  </select>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu discord?</label>
                    <Input name='discord' id="discord" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className="flex flex-col gap-2"> 
                    <label htmlFor="weekDays">Qando constuma jogar?</label>
                    
                      <ToggleGroup.Root 
                        type='multiple' 
                        className='grid grid-cols-4 gap-1'
                        value={weekDays}
                        onValueChange={setWeekDays}
                      >
                        <ToggleGroup.Item 
                          className={`w-8 h-8 rounded hover:bg-violet-400 ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                          value='0'  
                          title={'Domingo'}
                        >
                          D
                        </ToggleGroup.Item>

                        <ToggleGroup.Item 
                          className={`w-8 h-8 rounded hover:bg-violet-400 ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                          value='1' 
                          title={'Segunda'
                        }
                        >
                          S
                        </ToggleGroup.Item>

                        <ToggleGroup.Item 
                          className={`w-8 h-8 rounded hover:bg-violet-400 ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                          value='2' 
                          title={'Terça'}>
                          T
                        </ToggleGroup.Item>

                        <ToggleGroup.Item 
                          className={`w-8 h-8 rounded hover:bg-violet-400 ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                          value='3' 
                          title={'Quarta'}
                        >
                          Q
                          </ToggleGroup.Item>

                        <ToggleGroup.Item 
                          className={`w-8 h-8 rounded hover:bg-violet-400 ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                          value='4' 
                          title={'Quinta'}
                        >
                          Q
                          </ToggleGroup.Item>
                        <ToggleGroup.Item 
                          className={`w-8 h-8 rounded hover:bg-violet-400 ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                          value='5' 
                          title={'Sexta'}>
                          S
                        </ToggleGroup.Item>

                        <ToggleGroup.Item 
                          className={`w-8 h-8 rounded hover:bg-violet-400 ${weekDays.includes('6') ? ' bg-violet-500' : 'bg-zinc-900'}`} 
                          value='6' 
                          title={'Sábado'}
                        >
                          S
                        </ToggleGroup.Item>

                      </ToggleGroup.Root>
                    
                  </div>

                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">Qual horáio do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input name="hourStart" id="hourStart" type="time" placeholder='De'/>
                      <Input name="hourEnd" id="hourEnd" type="time" placeholder='Até'/>
                    </div>
                  </div>
                </div>

                <label className='mt-2 flex items-center gap-2 text-sm'>
                      <Checkbox.Root
                        checked={useVoiceChannel}
                        onCheckedChange={(checked)=> {
                          if(checked) {
                            setUseVoiceChannel(true)
                          } else {
                            setUseVoiceChannel(false)
                          }
                        }}
                        className='w-6 h-6 bg-zinc-900 rounded-sm flex items-center justify-center'
                        >
                        <Checkbox.Indicator>
                          <Check className='h-4 w-4 text-emerald-400 font-black'/>
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      Costumo me conectar ao chat de voz.
                </label>

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
  )
}