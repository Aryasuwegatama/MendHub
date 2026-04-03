import { pgTable, serial, text, timestamp, integer, boolean, varchar, decimal } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  role: varchar('role', { length: 20 }).default('user'), // 'admin', 'user'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  categoryId: integer('category_id').references(() => categories.id).notNull(),
});

export const providers = pgTable('providers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  description: text('description'),
  suburb: varchar('suburb', { length: 100 }).notNull(),
  contactNumber: varchar('contact_number', { length: 20 }),
  email: varchar('email', { length: 255 }).notNull(),
  categoryId: integer('category_id').references(() => categories.id).notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id), // Nullable for anonymous bookings
  providerId: integer('provider_id').references(() => providers.id).notNull(),
  serviceId: integer('service_id').references(() => services.id).notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'confirmed', 'completed', 'cancelled'
  bookingDate: timestamp('booking_date').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const quoteRequests = pgTable('quote_requests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id), // Nullable for anonymous quotes
  providerId: integer('provider_id').references(() => providers.id).notNull(),
  serviceId: integer('service_id').references(() => services.id).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const businessSubmissions = pgTable('business_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'reviewed', 'approved', 'rejected'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.id).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'completed', 'refunded'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const recommenderLogs = pgTable('recommender_logs', {
  id: serial('id').primaryKey(),
  query: text('query').notNull(),
  categorySuggested: varchar('category_suggested', { length: 100 }),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
