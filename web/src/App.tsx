import { Dialog} from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { EmptyGoals } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'


export function App() {
  const {data} = useQuery({
    // 2 propriedades obrigatórias:
    queryKey: ['getSummary'], // SEMPRE SERÁ UM ARRAY e É A IDENTIFICAÇÃO ÚNICA PARA A REQUISIÇÃO
    queryFn: getSummary,
    // CACHE INTERNO -> evitando chamadas desnecessárias
    staleTime: 1000 * 60 // 60 segundos
  })

  console.log('>>', data)

  return (
    <Dialog>

      {
        data?.summary.total && data?.summary.total> 0 ? <Summary /> : <EmptyGoals />
      }

      <CreateGoal />
    </Dialog>
  )
}