# Migration `20200625194731-add-field-name-user-in-table-user`

This migration has been generated by Gabriel Barreto at 6/25/2020, 7:47:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "name_user" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200617013027-add-field-updated-at..20200625194731-add-field-name-user-in-table-user
--- datamodel.dml
+++ datamodel.dml
@@ -2,17 +2,18 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
   id        Int      @id @default(autoincrement())
+  name_user String
   email     String   @unique
   password  String
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
@@ -25,9 +26,9 @@
   email       String?
   contact     String?
   address     Address?
   createdAt   DateTime @default(now())
-  updatedAt DateTime @updatedAt
+  updatedAt   DateTime @updatedAt
 }
 model Address {
   id           Int      @id @default(autoincrement())
@@ -50,14 +51,14 @@
   price_total  Float
   category_id  Int?
   category     Category? @relation(fields: [category_id], references: [id])
   createdAt    DateTime  @default(now())
-  updatedAt DateTime @updatedAt
+  updatedAt    DateTime  @updatedAt
 }
 model Category {
   id            Int       @id @default(autoincrement())
   name_category String
   product       Product[]
   createdAt     DateTime  @default(now())
-  updatedAt DateTime @updatedAt
+  updatedAt     DateTime  @updatedAt
 }
```


