# Migration `20200616135302-alter-relation-product-with-category`

This migration has been generated by Gabriel Barreto at 6/16/2020, 1:53:02 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."Product_category_id"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200615193811-add-field-created-at-into-all-tables..20200616135302-alter-relation-product-with-category
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -50,9 +50,9 @@
   createdAt    DateTime  @default(now())
 }
 model Category {
-  id            Int      @id @default(autoincrement())
+  id            Int       @id @default(autoincrement())
   name_category String
-  product       Product?
-  createdAt     DateTime @default(now())
+  product       Product[]
+  createdAt     DateTime  @default(now())
 }
```


