import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
// Users table for authentication and roles
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").unique(),
    phone: text("phone").notNull().unique(),
    password: text("password"), // hashed password for authentication
    role: text("role").notNull().default("student"), // student, coach, admin, staff, manager
    permissions: jsonb("permissions").default({}),
    isActive: boolean("is_active").default(true),
    lastLogin: timestamp("last_login"),
    profileImageUrl: text("profile_image_url"),
    createdBy: integer("created_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Coaches table
export const coaches = pgTable("coaches", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").unique(),
    phone: text("phone").notNull(),
    specialization: text("specialization").notNull(),
    experience: integer("experience").default(0),
    qualifications: text("qualifications"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Sports table
export const sports = pgTable("sports", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    feeStructure: jsonb("fee_structure").notNull(), // { baseAmount, skillLevels: {beginner: 1000, intermediate: 1500, advanced: 2000} }
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Batches table
export const batches = pgTable("batches", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    sportId: integer("sport_id").references(() => sports.id),
    coachId: integer("coach_id").references(() => coaches.id),
    schedule: jsonb("schedule").notNull(), // { days: ['monday', 'wednesday'], time: '6:00 AM - 7:30 AM' }
    maxCapacity: integer("max_capacity").notNull(),
    currentCapacity: integer("current_capacity").default(0),
    skillLevel: text("skill_level").notNull(), // beginner, intermediate, advanced
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
});
// Students table
export const students = pgTable("students", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    studentId: text("student_id").unique().notNull(), // STU001, STU002, etc.
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    dateOfBirth: date("date_of_birth"),
    address: text("address"),
    emergencyContact: jsonb("emergency_contact"), // { name, phone, relation }
    medicalNotes: text("medical_notes"),
    sportId: integer("sport_id").references(() => sports.id),
    batchId: integer("batch_id").references(() => batches.id),
    skillLevel: text("skill_level").notNull(),
    joiningDate: timestamp("joining_date").defaultNow(),
    isActive: boolean("is_active").default(true),
    profileImageUrl: text("profile_image_url"),
    createdAt: timestamp("created_at").defaultNow(),
});
// Payments table
export const payments = pgTable("payments", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    paymentType: text("payment_type").notNull(), // monthly, registration, tournament
    paymentMethod: text("payment_method").notNull(), // cash, upi, card, online
    status: text("status").notNull().default("pending"), // pending, completed, failed
    transactionId: text("transaction_id"),
    receiptNumber: text("receipt_number"),
    paymentDate: timestamp("payment_date"),
    dueDate: timestamp("due_date"),
    monthYear: text("month_year"), // "2025-01" for monthly payments
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
});
// Attendance table
export const attendance = pgTable("attendance", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id),
    batchId: integer("batch_id").references(() => batches.id),
    date: date("date").notNull(),
    status: text("status").notNull(), // present, absent, late
    checkInTime: timestamp("check_in_time"),
    checkOutTime: timestamp("check_out_time"),
    notes: text("notes"),
    markedBy: integer("marked_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
});
// Communications table
export const communications = pgTable("communications", {
    id: serial("id").primaryKey(),
    type: text("type").notNull(), // sms, email, whatsapp, notification
    recipientType: text("recipient_type").notNull(), // student, coach, parent, all
    recipientIds: jsonb("recipient_ids"), // array of user/student IDs
    subject: text("subject"),
    message: text("message").notNull(),
    status: text("status").notNull().default("pending"), // pending, sent, delivered, failed
    scheduledAt: timestamp("scheduled_at"),
    sentAt: timestamp("sent_at"),
    deliveryReport: jsonb("delivery_report"),
    createdBy: integer("created_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
});
// Campaigns table
export const campaigns = pgTable("campaigns", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    type: text("type").notNull(), // enrollment, retention, promotion
    targetAudience: jsonb("target_audience"), // criteria for targeting
    channels: jsonb("channels"), // sms, email, whatsapp
    content: jsonb("content"), // message templates
    status: text("status").notNull().default("draft"), // draft, active, paused, completed
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    metrics: jsonb("metrics"), // reach, engagement, conversion
    createdBy: integer("created_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
});
// Student Badges table
export const studentBadges = pgTable("student_badges", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    icon: text("icon").notNull(),
    criteria: jsonb("criteria"), // conditions to earn the badge
    points: integer("points").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
});
// Student Badge Earnings table
export const studentBadgeEarnings = pgTable("student_badge_earnings", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id),
    badgeId: integer("badge_id").references(() => studentBadges.id),
    earnedAt: timestamp("earned_at").defaultNow(),
    notes: text("notes"),
});
// GPS Tracking table
export const gpsTracking = pgTable("gps_tracking", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    latitude: decimal("latitude", { precision: 10, scale: 8 }),
    longitude: decimal("longitude", { precision: 11, scale: 8 }),
    accuracy: decimal("accuracy", { precision: 8, scale: 2 }),
    timestamp: timestamp("timestamp").defaultNow(),
    activity: text("activity"), // arriving, departing, training
    location: text("location"), // academy, home, transit
});
// System Settings table
export const systemSettings = pgTable("system_settings", {
    id: serial("id").primaryKey(),
    key: text("key").notNull().unique(),
    value: jsonb("value").notNull(),
    description: text("description"),
    category: text("category").notNull(), // general, payment, notification, security
    updatedBy: integer("updated_by").references(() => users.id),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Relations
export const usersRelations = relations(users, ({ many }) => ({
    students: many(students),
    communications: many(communications),
    campaigns: many(campaigns),
    gpsTracking: many(gpsTracking),
}));
export const studentsRelations = relations(students, ({ one, many }) => ({
    user: one(users, { fields: [students.userId], references: [users.id] }),
    sport: one(sports, { fields: [students.sportId], references: [sports.id] }),
    batch: one(batches, { fields: [students.batchId], references: [batches.id] }),
    payments: many(payments),
    attendance: many(attendance),
    badgeEarnings: many(studentBadgeEarnings),
}));
export const sportsRelations = relations(sports, ({ many }) => ({
    students: many(students),
    batches: many(batches),
}));
export const batchesRelations = relations(batches, ({ one, many }) => ({
    sport: one(sports, { fields: [batches.sportId], references: [sports.id] }),
    coach: one(coaches, { fields: [batches.coachId], references: [coaches.id] }),
    students: many(students),
    attendance: many(attendance),
}));
export const coachesRelations = relations(coaches, ({ many }) => ({
    batches: many(batches),
}));
export const paymentsRelations = relations(payments, ({ one }) => ({
    student: one(students, { fields: [payments.studentId], references: [students.id] }),
}));
export const attendanceRelations = relations(attendance, ({ one }) => ({
    student: one(students, { fields: [attendance.studentId], references: [students.id] }),
    batch: one(batches, { fields: [attendance.batchId], references: [batches.id] }),
    markedBy: one(users, { fields: [attendance.markedBy], references: [users.id] }),
}));
// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertStudentSchema = createInsertSchema(students);
export const selectStudentSchema = createSelectSchema(students);
export const insertPaymentSchema = createInsertSchema(payments);
export const selectPaymentSchema = createSelectSchema(payments);
export const insertAttendanceSchema = createInsertSchema(attendance);
export const selectAttendanceSchema = createSelectSchema(attendance);
