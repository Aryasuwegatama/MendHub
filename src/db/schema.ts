import { pgTable, text, timestamp, boolean, varchar, decimal, uuid, primaryKey } from 'drizzle-orm/pg-core';

export const admins = pgTable('admins', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).default('admin').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const providers = pgTable('providers', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  contactName: varchar('contact_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  suburb: varchar('suburb', { length: 100 }).notNull(),
  serviceArea: varchar('service_area', { length: 255 }).notNull(),
  address: text('address'),
  description: text('description').notNull(),
  websiteUrl: text('website_url'),
  status: varchar('status', { length: 20 }).default('inactive').notNull(), // 'active', 'inactive'
  isFeatured: boolean('is_featured').default(false).notNull(),
  mapLocationText: varchar('map_location_text', { length: 255 }).notNull(),
  approvedAt: timestamp('approved_at'),
  approvedByAdminId: uuid('approved_by_admin_id').references(() => admins.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const providerCategories = pgTable('provider_categories', {
  providerId: uuid('provider_id').references(() => providers.id).notNull(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.providerId, t.categoryId] }),
}));

export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').references(() => providers.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  priceMethod: varchar('price_method', { length: 20 }).default('fixed').notNull(), // 'fixed', 'quote'
  startingPrice: decimal('starting_price', { precision: 10, scale: 2 }),
  estimatedDuration: varchar('estimated_duration', { length: 100 }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bookings = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').references(() => providers.id).notNull(),
  serviceId: uuid('service_id').references(() => services.id),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }).notNull(),
  serviceAddress: text('service_address').notNull(),
  bookingDate: timestamp('booking_date').notNull(),
  issueDescription: text('issue_description').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'confirmed', 'completed', 'cancelled'
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const quoteRequests = pgTable('quote_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').references(() => providers.id).notNull(),
  serviceId: uuid('service_id').references(() => services.id),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }).notNull(),
  issueDescription: text('issue_description').notNull(),
  deviceDetails: varchar('device_details', { length: 255 }),
  preferredDate: varchar('preferred_date', { length: 100 }),
  status: varchar('status', { length: 50 }).default('pending').notNull(), // 'pending', 'quote_provided', 'accepted', 'rejected'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const businessSubmissions = pgTable('business_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  contactName: varchar('contact_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  suburb: varchar('suburb', { length: 100 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'approved', 'rejected'
  reviewedAt: timestamp('reviewed_at'),
  reviewerNotes: text('reviewer_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'resolved'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  bookingId: uuid('booking_id').references(() => bookings.id),
  quoteRequestId: uuid('quote_request_id').references(() => quoteRequests.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'completed', 'failed'
  transactionReference: varchar('transaction_reference', { length: 255 }).notNull(),
  receiptUrl: varchar('receipt_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const recommenderLogs = pgTable('recommender_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  itemType: varchar('item_type', { length: 100 }).notNull(),
  issueType: varchar('issue_type', { length: 100 }).notNull(),
  recommendedCategoryId: uuid('recommended_category_id').references(() => categories.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notificationLogs = pgTable('notification_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  recipientEmail: varchar('recipient_email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(), // 'sent', 'failed'
  sentAt: timestamp('sent_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').references(() => providers.id).notNull(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  rating: decimal('rating', { precision: 2, scale: 1 }).notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
