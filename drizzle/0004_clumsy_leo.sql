CREATE TABLE IF NOT EXISTS "book" (
	"bookId" serial PRIMARY KEY NOT NULL,
	"day" integer NOT NULL,
	"time" integer NOT NULL,
	"userId" integer,
	"userType" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"userId" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"fedId" varchar(256) NOT NULL,
	"userType" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book" ADD CONSTRAINT "book_userId_user_userId_fk" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
