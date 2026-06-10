# Romantic Birthday Website 💖 (Dành riêng cho Ngọc Trân)

Một trang web sinh nhật lãng mạn, tinh tế và đậm chất điện ảnh được thiết kế để làm quà tặng sinh nhật bất ngờ dành cho bạn gái. Trang web được xây dựng bằng Next.js 15, TailwindCSS và Framer Motion.

## 🎬 Trải Nghiệm Qua 10 Chương Kỷ Niệm

1. **Section 1: Thiệp chúc mừng đóng** 💌: Giao diện tối giản với cánh thiệp bay bổng, phát sáng mờ ảo, mời gọi người dùng chạm để mở khóa.
2. **Section 2: Hiệu ứng mở phong thư 3D** ✉️: Nắp phong thư tự động mở ra góc 180 độ, lá thư trượt ra ngoài mượt mà ở tốc độ 60 FPS đi kèm nhạc nền piano du dương được kích hoạt.
3. **Section 3: Thư tình đánh máy tự động** ✍️: Lời thư hiển thị dưới hiệu ứng gõ chữ tự nhiên trên nền giấy kem cổ điển, hỗ trợ nút bấm "Xem nhanh".
4. **Section 4: Giới thiệu Album Kỷ Niệm** ✨: Hiệu ứng chuyển cảnh mờ ảo dẫn lối người xem vào thế giới ký ức.
5. **Section 5: Trình chiếu ảnh điện ảnh (Slideshow)** 🎞️: Zoom chậm nghệ thuật (Ken Burns Effect) kết hợp hiệu ứng giao thoa chéo (Crossfade) mượt mà, hiển thị ngày tháng, tên kỷ niệm tương ứng.
6. **Section 6: Album Polaroid tương tác** 📸: Các tấm ảnh Polaroid ngẫu nhiên bay vào màn hình từ các hướng, người dùng có thể cầm kéo, ném, sắp xếp các tấm ảnh một cách nghịch ngợm.
7. **Section 7 & 8: Đồng hồ đếm thời gian bên nhau** ⏳: Đếm chi tiết Năm/Tháng/Ngày/Giờ/Phút/Giây thời gian yêu nhau cập nhật thời gian thực trên nền vũ trụ lấp lánh, cùng nút quà tặng nhấp nháy phát sáng.
8. **Section 9 & 10: Climax Trái Tim Ảnh Ghép khổng lồ** 💖: Tất cả hình ảnh kỉ niệm thu bé lại, bay từ tâm và khóa vị trí thành một hình trái tim toán học hoàn hảo nhịp đập nhẹ nhàng trong bầu trời đầy sao.

---

## 🛠️ Cài Đặt và Tùy Biến

Tất cả các thông số quan trọng được đặt tập trung trong [lib/config.ts](file:///e:/Project/Ca%20Nhan/HappyBirthDayNgocTran/lib/config.ts):

* **girlfriendName**: Tên của bạn gái (Mặc định: `"Ngọc Trân"`).
* **loveStartDate**: Ngày bắt đầu yêu nhau (Mặc định: `"2024-03-15T00:00:00"`).
* **finalMessages**: Các thông điệp hiển thị tuần tự ở phần kết thúc.
* **Thư tình**: Thay đổi nội dung thư tại [public/data/love-letter.txt](file:///e:/Project/Ca%20Nhan/HappyBirthDayNgocTran/public/data/love-letter.txt).
* **Ảnh kỉ niệm**: Đặt toàn bộ ảnh mới vào [public/images](file:///e:/Project/Ca%20Nhan/HappyBirthDayNgocTran/public/images). Hệ thống tự động nhận diện và sắp xếp mà không cần sửa code.
* **Mô tả ảnh**: Cập nhật tiêu đề và ngày chụp tương ứng tại [public/data/memories.json](file:///e:/Project/Ca%20Nhan/HappyBirthDayNgocTran/public/data/memories.json).

---

## 🚀 Hướng Dẫn Triển Khai Lên Vercel (Vercel Ready)

Trang web đã được cấu hình hoàn hảo để chạy trực tiếp trên **Vercel** chỉ với vài bước đơn giản:

### Cách 1: Đẩy mã nguồn lên GitHub (Khuyên Dùng)

1. Tạo một repository mới trên GitHub (Ví dụ: `HappyBirthDayNgocTran`).
2. Thực hiện đẩy mã nguồn lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: init romantic birthday website"
   git branch -M main
   git remote add origin <URL_REPO_CUA_BAN>
   git push -u origin main
   ```
3. Truy cập [Vercel](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
4. Chọn **Add New** > **Project** và import repository `HappyBirthDayNgocTran`.
5. Giữ nguyên toàn bộ cấu hình mặc định (Vercel tự động nhận diện Next.js). Click **Deploy**.

### Cách 2: Triển khai trực tiếp qua Vercel CLI

1. Cài đặt Vercel CLI toàn cục nếu chưa có:
   ```bash
   npm install -g vercel
   ```
2. Mở terminal tại thư mục dự án và chạy lệnh:
   ```bash
   vercel
   ```
3. Chọn các thiết lập mặc định và đồng ý liên kết tài khoản.
4. Chạy lệnh sau để build và publish bản Production chính thức:
   ```bash
   vercel --prod
   ```

---

## 🎙️ Nhạc Nền Dự Phòng (Audio Fallback)

Hệ thống tích hợp thư viện **Howler.js** để phát tệp `/public/music/background.mp3`.
Để tăng độ tin cậy và phòng tránh lỗi (ví dụ file nhạc chưa tải kịp hoặc bị trình duyệt chặn autoplay):
* Web sẽ chỉ phát nhạc sau khi người dùng tương tác click mở thiệp (Gesture Trigger).
* Nếu tệp MP3 lỗi hoặc không tồn tại, **Web Audio API** sẽ tự kích hoạt bộ tạo âm tổng hợp (Synthesizer) chơi chuỗi hợp âm rải C - G/B - Am - F theo giai điệu du dương lãng mạn.
