ALTER TABLE "todo" ADD COLUMN "title" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "content" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN IF EXISTS "phone_number";--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN IF EXISTS "email";