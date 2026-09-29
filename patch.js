const fs = require('fs');

let html = fs.readFileSync('owner/main_owner.html', 'utf8');

// 1. Update the edit button to call openEditVenueModal
html = html.replace(
    /window\.location\.href='edit_space_owner\.html\?id=\$\{venue\.id\}';/g,
    "openEditVenueModal('${venueDataStr}')"
);

// 2. Add Edit Modal HTML
const modalHtml = `
    <!-- Edit Venue Modal -->
    <div id="edit-venue-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; justify-content: center; align-items: center; padding: 20px; backdrop-filter: blur(4px);">
        <div style="background: white; border-radius: 20px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <button onclick="closeEditVenueModal()" style="position: absolute; top: 15px; right: 15px; background: #f1f5f9; border: none; font-size: 1.2rem; color: #334155; cursor: pointer; border-radius: 50%; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center; z-index: 10;"><i class="fa-solid fa-times"></i></button>
            
            <div style="padding: 24px;">
                <h2 style="font-size: 1.5rem; font-weight: 700; color: #1e293b; margin-bottom: 20px;">แก้ไขรายละเอียดพื้นที่</h2>
                
                <input type="hidden" id="edit-venue-id">
                <input type="hidden" id="edit-venue-type">

                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 6px; display: block;">ชื่อตลาด / อีเวนต์</label>
                    <input type="text" id="edit-venue-name" style="width: 100%; padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; font-family: inherit; font-size: 1rem; background: #f8fafc;">
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 6px; display: block;">ที่ตั้ง</label>
                    <textarea id="edit-venue-location" rows="2" style="width: 100%; padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; font-family: inherit; font-size: 1rem; background: #f8fafc; resize: vertical;"></textarea>
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 6px; display: block;">รายละเอียดเพิ่มเติม</label>
                    <textarea id="edit-venue-desc" rows="4" style="width: 100%; padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; font-family: inherit; font-size: 1rem; background: #f8fafc; resize: vertical;"></textarea>
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 6px; display: block;">วันที่เปิดให้บริการ</label>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap;" id="edit-venue-days">
                        <button type="button" class="day-btn" onclick="this.classList.toggle('active')">จ.</button>
                        <button type="button" class="day-btn" onclick="this.classList.toggle('active')">อ.</button>
                        <button type="button" class="day-btn" onclick="this.classList.toggle('active')">พ.</button>
                        <button type="button" class="day-btn" onclick="this.classList.toggle('active')">พฤ.</button>
                        <button type="button" class="day-btn" onclick="this.classList.toggle('active')">ศ.</button>
                        <button type="button" class="day-btn" onclick="this.classList.toggle('active')">ส.</button>
                        <button type="button" class="day-btn" onclick="this.classList.toggle('active')">อา.</button>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 6px; display: block;">เวลาเปิด-ปิด</label>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <input type="time" id="edit-venue-time-start" style="flex: 1; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: inherit;">
                        <span style="color: #64748b; font-weight: 500;">ถึง</span>
                        <input type="time" id="edit-venue-time-end" style="flex: 1; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: inherit;">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 25px;">
                    <label class="form-label" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 6px; display: block;">ราคาเริ่มต้น (บาท)</label>
                    <input type="number" id="edit-venue-price" style="width: 100%; padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; font-family: inherit; font-size: 1rem; background: #f8fafc;" placeholder="0">
                </div>

                <button id="submit-edit-btn" class="book-btn" style="width: 100%; padding: 14px; font-size: 1.05rem;" onclick="submitEditVenue()">บันทึกการแก้ไข</button>
            </div>
        </div>
    </div>
`;

if (!html.includes('id="edit-venue-modal"')) {
    html = html.replace('<!-- Booking Approval Modal -->', modalHtml + '\\n    <!-- Booking Approval Modal -->');
}

// 3. Add JS functions
const jsHtml = \`
        function openEditVenueModal(encodedData) {
            const venue = JSON.parse(decodeURIComponent(encodedData));
            document.getElementById('edit-venue-id').value = venue.id;
            document.getElementById('edit-venue-type').value = venue.type || 'market';
            document.getElementById('edit-venue-name').value = venue.name || '';
            document.getElementById('edit-venue-location').value = venue.location || '';
            
            const rawDesc = venue.description || '';
            let actualDesc = [];
            let activeDays = '';
            let timeStart = '';
            let timeEnd = '';
            let price = '';

            const lines = rawDesc.split('\\n');
            for(const line of lines) {
                const text = line.trim();
                if (!text) continue;

                if (text.startsWith('วันที่เปิดให้บริการ:')) {
                    activeDays = text.replace('วันที่เปิดให้บริการ:', '').trim();
                } else if (text.startsWith('เวลาให้บริการ:')) {
                    const timeStr = text.replace('เวลาให้บริการ:', '').trim();
                    const timeParts = timeStr.split('ถึง');
                    if (timeParts.length === 2) {
                        timeStart = timeParts[0].trim();
                        timeEnd = timeParts[1].trim();
                    }
                } else if (text.startsWith('ราคาเริ่มต้น:')) {
                    price = text.replace('ราคาเริ่มต้น:', '').replace('บาท', '').trim();
                } else {
                    actualDesc.push(text);
                }
            }

            document.getElementById('edit-venue-desc').value = actualDesc.join('\\n\\n');
            
            // Populate days
            document.querySelectorAll('#edit-venue-days .day-btn').forEach(btn => btn.classList.remove('active'));
            if (activeDays) {
                const dayLabels = activeDays.split(',').map(d => d.trim());
                document.querySelectorAll('#edit-venue-days .day-btn').forEach(btn => {
                    if (dayLabels.includes(btn.innerText.trim())) {
                        btn.classList.add('active');
                    }
                });
            }
            
            document.getElementById('edit-venue-time-start').value = timeStart;
            document.getElementById('edit-venue-time-end').value = timeEnd;
            document.getElementById('edit-venue-price').value = price;
            
            document.getElementById('edit-venue-modal').style.display = 'flex';
        }

        function closeEditVenueModal() {
            document.getElementById('edit-venue-modal').style.display = 'none';
        }

        async function submitEditVenue() {
            const venueId = document.getElementById('edit-venue-id').value;
            const type = document.getElementById('edit-venue-type').value;
            const name = document.getElementById('edit-venue-name').value.trim();
            const location = document.getElementById('edit-venue-location').value.trim();
            const descRaw = document.getElementById('edit-venue-desc').value.trim();
            
            const activeDays = Array.from(document.querySelectorAll('#edit-venue-days .day-btn.active')).map(btn => btn.innerText).join(', ');
            const timeStart = document.getElementById('edit-venue-time-start').value;
            const timeEnd = document.getElementById('edit-venue-time-end').value;
            const price = document.getElementById('edit-venue-price').value;

            if (!name || !location) {
                alert('กรุณากรอกชื่อและที่ตั้งให้ครบถ้วน');
                return;
            }

            const btn = document.getElementById('submit-edit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก...';
            btn.disabled = true;

            const extraDetails = [
                descRaw,
                activeDays ? \`วันที่เปิดให้บริการ: \${activeDays}\` : null,
                timeStart || timeEnd ? \`เวลาให้บริการ: \${timeStart || '-'} ถึง \${timeEnd || '-'}\` : null,
                price ? \`ราคาเริ่มต้น: \${price} บาท\` : null
            ].filter(Boolean).join('\\n\\n');

            try {
                const { error } = await supabaseClient
                    .from('venues')
                    .update({
                        name: name,
                        location: location,
                        address_details: location,
                        description: extraDetails
                    })
                    .eq('id', venueId);

                if (error) throw error;
                
                alert('อัปเดตข้อมูลสำเร็จ!');
                closeEditVenueModal();
                fetchOwnerData(); // Reload UI
            } catch(err) {
                console.error(err);
                alert('เกิดข้อผิดพลาด: ' + err.message);
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }
\`;

if (!html.includes('function openEditVenueModal')) {
    html = html.replace('function closeVenueModal() {', jsHtml + '\\n        function closeVenueModal() {');
}

// 4. Add day-btn css if not exist
const cssHtml = \`
        .day-btn {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 1px solid #e2e8f0;
            background-color: #ffffff;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 600;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .day-btn.active {
            background: #a46309;
            color: white;
            border-color: #a46309;
        }
\`;
if (!html.includes('.day-btn {')) {
    html = html.replace('/* Listing Cards */', cssHtml + '/* Listing Cards */');
}

fs.writeFileSync('owner/main_owner.html', html, 'utf8');
console.log('Patched main_owner.html successfully.');
