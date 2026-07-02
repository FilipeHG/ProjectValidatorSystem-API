import { createInsertSchema } from 'drizzle-zod';
import { projetos } from '../../infrastructure/database/schema';
import { z } from 'zod';

const projectBaseSchema = createInsertSchema(projetos).pick({
  nome: true,
  dataDeInicio: true,
  previsaoDeTermino: true,
  orcamentoTotal: true,
  descricao: true,
}).extend({
  orcamentoTotal: z.number().positive(),
  dataDeInicio: z.string(),
  previsaoDeTermino: z.string(),
}).strict();

export const createProjectSchema = projectBaseSchema.refine(
  data => new Date(data.previsaoDeTermino) >= new Date(data.dataDeInicio),
  {
    message: "A previsão de término não pode ser anterior à data de início",
    path: ["previsaoDeTermino"],
  }
);
export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = projectBaseSchema.partial().refine(
  data => {
    if (data.dataDeInicio && data.previsaoDeTermino) {
      return new Date(data.previsaoDeTermino) >= new Date(data.dataDeInicio);
    }
    return true;
  },
  {
    message: "A previsão de término não pode ser anterior à data de início",
    path: ["previsaoDeTermino"],
  }
);
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export const changeStatusSchema = z.object({
  status: createInsertSchema(projetos).shape.status,
}).strict();
export type ChangeStatusDto = z.infer<typeof changeStatusSchema>;
