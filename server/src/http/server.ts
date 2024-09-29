import fastify from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPedingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// cors
app.register(fastifyCors, {
  origin: '*'
})

// Registrando as rotas
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPedingGoalsRoute)
app.register(getWeekSummaryRoute)

app.listen({
  port: 3333,
}).then(() => {
  console.log("HTTP server running!")
})