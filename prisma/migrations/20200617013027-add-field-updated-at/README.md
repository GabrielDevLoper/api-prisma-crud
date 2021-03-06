# Migration `20200617013027-add-field-updated-at`

This migration has been generated by Gabriel Barreto at 6/17/2020, 1:30:27 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Address" ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;

ALTER TABLE "public"."Category" ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;

ALTER TABLE "public"."Client" ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;

ALTER TABLE "public"."Product" ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;

ALTER TABLE "public"."User" ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200616135302-alter-relation-product-with-category..20200617013027-add-field-updated-at
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url      = "postgresql://postgres:postgres@localhost:5432/prisma-crud?schema=public"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,8 +14,9 @@
   id        Int      @id @default(autoincrement())
   email     String   @unique
   password  String
   createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
 }
 model Client {
   id          Int      @id @default(autoincrement())
@@ -24,8 +25,9 @@
   email       String?
   contact     String?
   address     Address?
   createdAt   DateTime @default(now())
+  updatedAt DateTime @updatedAt
 }
 model Address {
   id           Int      @id @default(autoincrement())
@@ -36,8 +38,9 @@
   number       Int?
   client_id    Int?
   client       Client?  @relation(fields: [client_id], references: [id])
   createdAt    DateTime @default(now())
+  updatedAt    DateTime @updatedAt
 }
 model Product {
   id           Int       @id @default(autoincrement())
@@ -47,12 +50,14 @@
   price_total  Float
   category_id  Int?
   category     Category? @relation(fields: [category_id], references: [id])
   createdAt    DateTime  @default(now())
+  updatedAt DateTime @updatedAt
 }
 model Category {
   id            Int       @id @default(autoincrement())
   name_category String
   product       Product[]
   createdAt     DateTime  @default(now())
+  updatedAt DateTime @updatedAt
 }
```


