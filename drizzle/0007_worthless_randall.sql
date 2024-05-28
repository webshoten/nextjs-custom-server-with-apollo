ALTER TABLE "user" ADD COLUMN "sub" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "fedId";