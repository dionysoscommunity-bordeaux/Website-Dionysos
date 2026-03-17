import { z } from 'zod'

const partnerContactSchema = z.object({
  contactName: z.string().trim().min(2, 'Le nom du contact est requis.'),
  organization: z.string().trim().min(2, "Le nom de l'organisation est requis."),
  email: z.string().trim().email("Le format de l'email est invalide."),
  objective: z.string().trim().min(10, 'Merci de préciser votre objectif de partenariat.')
})

export default defineEventHandler(async (event) => {
  const payload = await readBody(event)
  const result = partnerContactSchema.safeParse(payload)

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message
    }))

    throw createError({
      statusCode: 400,
      statusMessage: 'Erreur de validation',
      data: {
        message: 'Le formulaire contient des informations invalides.',
        details
      }
    })
  }

  const { objective } = result.data

  console.info('[partner-contact] New request', {
    objectiveLength: objective.length
  })

  return {
    ok: true,
    data: {
      message: 'Votre demande de partenariat a bien été transmise. Nous vous recontactons rapidement.'
    }
  }
})
