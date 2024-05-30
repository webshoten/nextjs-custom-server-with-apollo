ALTER TABLE "book" ADD COLUMN "bookType" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "userType";