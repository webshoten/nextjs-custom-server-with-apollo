ALTER TABLE "book" DROP CONSTRAINT "book_userId_user_userId_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD PRIMARY KEY ("sub");--> statement-breakpoint
ALTER TABLE "book" ADD COLUMN "sub" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book" ADD CONSTRAINT "book_sub_user_sub_fk" FOREIGN KEY ("sub") REFERENCES "user"("sub") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "userId";