# Migration `20200615171211-alter-field-category-in-product`

This migration has been generated by Gabriel Barreto at 6/15/2020, 5:12:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200612175835-alter-type-column-contact-to-string..20200615171211-alter-field-category-in-product
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
@@ -36,14 +36,14 @@
   client       Client? @relation(fields: [client_id], references: [id])
 }
 model Product {
-  id          Int      @id @default(autoincrement())
+  id          Int       @id @default(autoincrement())
   name        String
   qtd         Int
   price       Float
   price_total Float
-  category    Category
+  category    Category?
 }
 model Category {
   id         Int      @id @default(autoincrement())
```


