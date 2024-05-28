ALTER TABLE "user" ADD COLUMN "email" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "provider" varchar(20) NOT NULL;