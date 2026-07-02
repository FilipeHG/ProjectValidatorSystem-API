import { createInsertSchema } from 'drizzle-zod';
import { projetos } from '../../infrastructure/database/schema';
import { z } from 'zod';

export const createProjectSchema = createInsertSchema(projetos).pick({
  nome: true,
  dataDeInicio: true,
  previsaoDeTermino: true,
  orcamentoTotal: true,
  descricao: true,
}).extend({
  orcamentoTotal: z.number().positive(),
  dataDeInicio: z.string(),
  previsaoDeTermino: z.string(),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export const changeStatusSchema = z.object({
  status: createInsertSchema(projetos).shape.status,
});
export type ChangeStatusDto = z.infer<typeof changeStatusSchema>;
