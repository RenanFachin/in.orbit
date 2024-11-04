import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBr from 'dayjs/locale/pt-BR'

dayjs.locale(ptBr)


export function Summary(){
  const {data} = useQuery({
    // 2 propriedades obrigatórias:
    queryKey: ['getSummary'], // SEMPRE SERÁ UM ARRAY e É A IDENTIFICAÇÃO ÚNICA PARA A REQUISIÇÃO
    queryFn: getSummary,
    // CACHE INTERNO -> evitando chamadas desnecessárias
    // aqui ele está buscando o que está no cache da função de dentro do app.tsx
    staleTime: 1000 * 60 // 60 segundos
  })

  if (!data){
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMMM')

  const completedPercentage = Math.round(data.summary.completed * 100 /data.summary.total)

  // transformando um objeto em array:
  // key = chaves
  // values = valores
  // entries = chaves e valores
  console.log(data.summary.goalsPerDay)
  const dataInArray = Object.entries(data.summary.goalsPerDay).map(([dataKey, goals]) => {
    const weekDay = dayjs(dataKey).format('dddd')
    const parsedDate = dayjs(dataKey).format('D MMMM')

    return (
      <div className="flex flex-col gap-4" key={dataKey}>
            <h4 className="font-medium">{weekDay} <span className="text-zinc-400 text-xs">({parsedDate})</span></h4>

        <ul className="flex flex-col gap-3">
        {goals.map((goal) => {
          const time = dayjs(goal.createdAt).format('HH:mm')

          return (
            <li className="flex items-center gap-2" key={goal.id}>
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-zinc-400 text-sm">
                Você completou <span className="text-zinc-100">{goal.title}</span> às <span className="text-zinc-100">{time}h</span>
              </span>
            </li>
          )
        })}
        </ul>
      </div>
    )
  })

  return (
    <div className="py-10 max-w-lg px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />

          <span className="capitalize">
           {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
            <Button size="sm">
              <Plus className='size-4'/>
              Cadastrar meta
            </Button>
          </DialogTrigger>
      </div>


      <div className="flex flex-col gap-3">
        <Progress max={15} value={8}>
          <ProgressIndicator style={{width: `${completedPercentage}%`}}/>
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Você completou <span className="text-zinc-300">{data.completed}</span> de <span className="text-zinc-300">{data.total}</span> metas nessa semana.</span>

          <span>{completedPercentage}%</span>
        </div>

        <Separator />


        <div className="flex gap-3 flex-wrap">
          <OutlineButton className="rounded-none">
            <Plus className="size-4 text-zinc-600"/>
            Nadar
          </OutlineButton>

          <OutlineButton className="rounded-none">
            <Plus className="size-4 text-zinc-600"/>
            Praticar exercícios
          </OutlineButton>

          <OutlineButton className="rounded-none">
            <Plus className="size-4 text-zinc-600"/>
            Nadar
          </OutlineButton>

          <OutlineButton className="rounded-none">
            <Plus className="size-4 text-zinc-600"/>
            Nadar
          </OutlineButton>

          <OutlineButton className="rounded-none">
            <Plus className="size-4 text-zinc-600"/>
            Nadar
          </OutlineButton>

          <OutlineButton className="rounded-none">
            <Plus className="size-4 text-zinc-600"/>
            Nadar
          </OutlineButton>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana:</h2>

          {
            dataInArray
          }
        </div>
      </div>
    </div>
  )
}