-- อนุญาตให้ Admin หรือทุกคนสามารถดึงข้อมูล bookings เพื่อมาแสดงในหน้าตรวจสอบสลิปได้
CREATE POLICY "Allow all users to view bookings"
ON public.bookings
FOR SELECT
USING (true);
