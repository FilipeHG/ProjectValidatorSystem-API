import { pgTable, uuid, varchar, text, numeric, date, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const projetos = pgTable('projetos', {
  id: uuid('id').primaryKey().defaultRandom(),
  nome: varchar('nome', { length: 255 }).notNull(),
  dataDeInicio: date('data_de_inicio').notNull(),
  previsaoDeTermino: date('previsao_de_termino').notNull(),
  orcamentoTotal: numeric('orcamento_total', { precision: 18, scale: 2 }).notNull(),
  descricao: text('descricao').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  riscoCalculado: varchar('risco_calculado', { length: 20 }).notNull(),
  dtCriacao: timestamp('dt_criacao', { withTimezone: true }).defaultNow().notNull(),
  dtAtualizacao: timestamp('dt_atualizacao', { withTimezone: true }).defaultNow().notNull(),
});

export const insertProjetoSchema = createInsertSchema(projetos);
export const selectProjetoSchema = createSelectSchema(projetos);
