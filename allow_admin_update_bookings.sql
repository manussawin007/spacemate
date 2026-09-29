-- อนุญาตให้ Admin หรือทุกคนสามารถอัปเดตสถานะการจอง (bookings) ได้ (เช่นกดยืนยันสลิป)
CREATE POLICY "Allow all users to update bookings"
ON public.bookings
FOR UPDATE
USING (true)
WITH CHECK (true);
