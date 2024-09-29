import fastify from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPedingGoalsRoute } from './routes/get-pending-goals'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Registrando as rotas
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPedingGoalsRoute)



app.listen({
  port: 3333,
}).then(() => {
  console.log("HTTP server running!")
})