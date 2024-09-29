import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";


export function Summary(){
  return (
    <div className="py-10 max-w-lg px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />

          <span>
            5 a 10 de Agosto
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
          <ProgressIndicator style={{width: '50%'}}/>
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Você completou <span className="text-zinc-300">8</span> de <span className="text-zinc-300">15</span> metas nessa semana.</span>

          <span>50%</span>
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

          <div className="flex flex-col gap-4">
            <h4 className="font-medium">Domingo <span className="text-zinc-400 text-xs">(29 de Setembro)</span></h4>

            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-pink-500"/>

                <span className="text-zinc-400 text-sm">
                  Você completou <span className="text-zinc-100">Acordar cedo</span> às <span className="text-zinc-100">08:13h</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}