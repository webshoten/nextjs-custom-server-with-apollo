ALTER TABLE "book" DROP CONSTRAINT "book_day_unique";--> statement-breakpoint
ALTER TABLE "book" DROP CONSTRAINT "book_time_unique";--> statement-breakpoint
ALTER TABLE "book" ADD CONSTRAINT "day_time" UNIQUE("day","time");