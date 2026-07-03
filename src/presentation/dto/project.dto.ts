import { createInsertSchema } from 'drizzle-zod';
import { projetos } from '../../infrastructure/database/schema';
import { z } from 'zod';
import { ProjectStatus } from '../../domain/enums/project-status.enum';

const projectBaseSchema = createInsertSchema(projetos).pick({
  nome: true,
  dataDeInicio: true,
  previsaoDeTermino: true,
  orcamentoTotal: true,
  descricao: true,
}).extend({
  nome: z.string().trim().min(1, { message: "Nome não pode ser vazio" }),
  descricao: z.string().trim().min(1, { message: "Descrição não pode ser vazia" }),
  orcamentoTotal: z.number().positive({ message: "Orçamento deve ser maior que zero" }),
  dataDeInicio: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Formato de data inválido" }),
  previsaoDeTermino: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Formato de data inválido" }),
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
  status: z.nativeEnum(ProjectStatus, {
    message: 'Status inválido. Valores permitidos: Em análise, Aprovado, Em andamento, Encerrado, Cancelado'
  }),
}).strict();
export type ChangeStatusDto = z.infer<typeof changeStatusSchema>;
