-- ==============================================================================
-- สคริปต์ SQL: เปิดสิทธิ์การลบตลาด/อีเวนต์, ล็อคพื้นที่ และการจอง (Supabase RLS Policy)
-- แก้ปัญหา: "กดยืนยันการลบตลาด/พื้นที่แล้ว แต่ในฐานข้อมูลไม่ยอมลบ"
-- วิธีใช้: คัดลอกโค้ดทั้งหมดนี้ไปวางในหน้า Supabase Dashboard -> SQL Editor แล้วกด "Run"
-- ==============================================================================

-- 1. อนุญาตให้ลบตลาด/อีเวนต์ (venues)
DROP POLICY IF EXISTS "Allow delete venues" ON public.venues;
CREATE POLICY "Allow delete venues"
ON public.venues
FOR DELETE
USING (true);

-- 2. อนุญาตให้ลบล็อคพื้นที่ (spaces)
DROP POLICY IF EXISTS "Allow delete spaces" ON public.spaces;
CREATE POLICY "Allow delete spaces"
ON public.spaces
FOR DELETE
USING (true);

-- 3. อนุญาตให้ลบประวัติการจอง (bookings) ที่เกี่ยวข้อง
DROP POLICY IF EXISTS "Allow delete bookings" ON public.bookings;
CREATE POLICY "Allow delete bookings"
ON public.bookings
FOR DELETE
USING (true);
