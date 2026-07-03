CREATE TABLE "projetos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"data_de_inicio" date NOT NULL,
	"previsao_de_termino" date NOT NULL,
	"orcamento_total" numeric(18, 2) NOT NULL,
	"descricao" text NOT NULL,
	"status" varchar(50) NOT NULL,
	"risco_calculado" varchar(20) NOT NULL,
	"dt_criacao" timestamp with time zone DEFAULT now() NOT NULL,
	"dt_atualizacao" timestamp with time zone DEFAULT now() NOT NULL
);
