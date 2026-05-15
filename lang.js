/**
 * MiaCasa — Global Translation System (lang.js)
 * Include this on every page BEFORE any page-specific scripts.
 * 
 * HTML elements use:
 *   data-t="key"   → el.textContent = translation
 *   data-th="key"  → el.innerHTML   = translation (for <em>, <br> etc.)
 * 
 * To add a new page: add keys here, add data-t/data-th to the HTML.
 * setLang(lang) is global and persists via localStorage.
 */

const TRANSLATIONS = {
  /* ── NAV (all pages) ──────────────────────────────────────────── */
  'nav-home':        {en:'Home',                         vn:'Trang chủ'},
  'nav-hanoi':       {en:'MiaCasa Hanoi',                vn:'MiaCasa Hà Nội'},
  'nav-oq':          {en:'MiaCasa Old Quarter',          vn:'MiaCasa Phố Cổ'},
  'nav-story':       {en:'Our Story',                    vn:'Câu chuyện'},
  'nav-contact':     {en:'Contact Us',                   vn:'Liên hệ'},
  'nav-stays':       {en:'Stays',                        vn:'Chỗ nghỉ'},
  'nav-book':        {en:'Book',                         vn:'Đặt phòng'},
  'nav-gallery':     {en:'Gallery',                      vn:'Ảnh'},
  'nav-about':       {en:'About',                        vn:'Giới thiệu'},
  'nav-rooms':       {en:'Rooms',                        vn:'Phòng'},
  'nav-blog':        {en:'Blog',                         vn:'Nhật ký'},
  'nav-book-now':    {en:'Book Now',                     vn:'Đặt ngay'},
  'nav-amenities':   {en:'Amenities',                    vn:'Tiện nghi'},
  'nav-location':    {en:'Location',                     vn:'Vị trí'},
  'nav-rules':       {en:'Rules',                        vn:'Nội quy'},
  'nav-faq':         {en:'FAQ',                          vn:'Câu hỏi'},
  'nav-reviews':     {en:'Reviews',                      vn:'Đánh giá'},
  'nav-apartment':   {en:'Apartment',                    vn:'Căn hộ'},
  'sticky-book':     {en:'📅 Book Now',                  vn:'📅 Đặt ngay'},
  'book-now-home':   {en:'Book Now →',                   vn:'Đặt ngay →'},

  /* ── HOMEPAGE HERO ────────────────────────────────────────────── */
  'hero-tag':        {en:'Hanoi, Vietnam',               vn:'Hà Nội, Việt Nam'},
  'hero-h1':         {en:'Boutique Homestays<br>in <em>Hanoi</em>', vn:'Homestay Boutique<br>tại <em>Hà Nội</em>'},
  'hero-sub':        {en:'Warm, local stays in the heart of the city — perfect for couples, solo travelers, and small groups.',
                      vn:'Chỗ nghỉ ấm áp, đậm chất địa phương — lý tưởng cho các cặp đôi, khách solo và nhóm nhỏ.'},
  'hero-cta1':       {en:'View MiaCasa Hanoi',           vn:'Xem MiaCasa Hà Nội'},
  'hero-cta2':       {en:'View MiaCasa Old Quarter',     vn:'Xem MiaCasa Phố Cổ'},
  'hero-cta3':       {en:'Explore Stays',                vn:'Khám phá chỗ nghỉ'},

  /* ── HOMEPAGE WELCOME ─────────────────────────────────────────── */
  'welcome-tag':     {en:'A Different Kind of Stay',     vn:'Trải nghiệm khác biệt'},
  'welcome-title':   {en:'A Different Kind<br>of <em>Stay</em>', vn:'Một Trải Nghiệm<br><em>Khác Biệt</em>'},
  'wl-p1':           {en:'At MiaCasa, we believe travel should feel personal, not transactional.',
                      vn:'Tại MiaCasa, chúng tôi tin rằng du lịch nên mang tính cá nhân, không phải giao dịch.'},
  'wl-p2':           {en:'Our homes are designed to be comfortable, calm, and genuinely local — whether you are here for a short visit or a longer stay. Choose a <a href="miacasa-hanoi.html" style="color:var(--terracotta);text-decoration:none;font-weight:500;">quiet room near Hanoi Railway Station</a>, or book our <a href="miacasa-oldquarter.html" style="color:var(--terracotta);text-decoration:none;font-weight:500;">entire apartment in the Old Quarter</a>.',
                      vn:'Những ngôi nhà được thiết kế để thoải mái, yên tĩnh và đậm chất địa phương — dù bạn ở ngắn hay dài ngày.'},
  'wl-cta':          {en:'Learn about Our Story →',      vn:'Tìm hiểu câu chuyện của chúng tôi →'},

  /* ── HOMEPAGE PROPERTIES ──────────────────────────────────────── */
  /* 'sec-stays':       {en:'Our Homestays in Hanoi',       vn:'Chỗ nghỉ của chúng tôi tại Hà Nội'},
  'stays-title':     {en:'Two stays, <em>one spirit</em>', vn:'Hai nơi, <em>một tinh thần</em>'},
  'stays-sub':       {en:'Choose the quiet neighbourhood charm of MiaCasa Hanoi, or the electric energy of MiaCasa Old Quarter.',
                      vn:'Chọn sự yên tĩnh của MiaCasa Hà Nội, hoặc năng lượng sôi động của MiaCasa Phố Cổ.'},
  'card-h-cta':      {en:'Explore MiaCasa Hanoi →',      vn:'Khám phá MiaCasa Hà Nội →'},
  'card-oq-cta':     {en:'Explore MiaCasa Old Quarter →', vn:'Khám phá MiaCasa Phố Cổ →'}, */

  /* ── HOMEPAGE WHY BOOK DIRECT ─────────────────────────────────── */
  'sec-direct':      {en:'Why Book Direct',              vn:'Tại sao đặt trực tiếp'},
  'direct-title':    {en:'Better rates,<br><em>direct connection</em>', vn:'Giá tốt hơn,<br><em>kết nối trực tiếp</em>'},
  'direct-1':        {en:'Save 10–15% compared to booking platforms',  vn:'Tiết kiệm 10–15% so với các nền tảng đặt phòng'},
  'direct-2':        {en:'Direct support via WhatsApp',                vn:'Hỗ trợ trực tiếp qua WhatsApp'},
  'direct-3':        {en:'Flexible check-in and personalized help',    vn:'Check-in linh hoạt và hỗ trợ cá nhân hoá'},
  'direct-4':        {en:'No hidden fees',                             vn:'Không phí ẩn'},
  'direct-headline': {en:'📌 Why book direct with MiaCasa', vn:'📌 Tại sao đặt trực tiếp với MiaCasa'},
  'direct-cta':      {en:'Same stay. Better price. Book direct.', vn:'Cùng một chỗ nghỉ. Giá tốt hơn. Đặt trực tiếp.'},

  /* ── HOMEPAGE BOOKING SECTION ─────────────────────────────────── */
  'sec-book':        {en:'Reservations',                vn:'Đặt phòng'},
  'book-title':      {en:'Book Your Stay <em>Direct</em>', vn:'Đặt phòng <em>trực tiếp</em>'},
  'book-sub':        {en:'Better rates. No platform fees. Instant confirmation.', vn:'Giá tốt hơn. Không phí nền tảng. Xác nhận ngay lập tức.'},
  'choose-stay':     {en:'Choose your stay',            vn:'Chọn chỗ nghỉ của bạn'},
  // Add to your TRANSLATIONS object
  'selector-oq-explore': {en:'Explore →', vn:'Khám phá →'},
  'selector-h-explore': {en:'Explore →', vn:'Khám phá →'},
  'lbl-room':        {en:'Room / Space',                vn:'Phòng / Không gian'},
  'lbl-checkin':     {en:'Check-in',                   vn:'Nhận phòng'},
  'lbl-checkout':    {en:'Check-out',                  vn:'Trả phòng'},
  'lbl-guests':      {en:'Guests',                     vn:'Khách'},
  'lbl-name':        {en:'Full Name',                  vn:'Họ và tên'},
  'lbl-email':       {en:'Email',                      vn:'Email'},
  'lbl-phone':       {en:'Phone Number',               vn:'Số điện thoại'},
  'instant-title':   {en:'Instant Booking Available',  vn:'Đặt phòng ngay lập tức'},
  'instant-desc':    {en:'Secure your stay in minutes using PayPal or local QR payment. No back-and-forth. No waiting.', vn:'Đặt phòng an toàn trong vài phút qua PayPal hoặc chuyển khoản QR. Không qua lại. Không chờ đợi.'},
  'instant-banner':  {en:'Instant booking available — Pay securely via PayPal or local QR. No waiting, no platform fees.', vn:'Đặt phòng ngay lập tức — Thanh toán an toàn qua PayPal hoặc QR nội địa. Không chờ đợi, không phí nền tảng.'},
  'instant-punch':   {en:'⚡ Instant booking. No platform fees. Confirm in minutes.', vn:'⚡ Đặt phòng ngay. Không phí nền tảng. Xác nhận trong vài phút.'},
  'pay-label':       {en:'Pay securely using:',        vn:'Thanh toán an toàn qua:'},
  'pay-secure':      {en:'Secure Checkout',            vn:'Thanh toán an toàn'},
  'trust-1':         {en:'No platform fees',           vn:'Không phí nền tảng'},
  'trust-2':         {en:'Direct confirmation with host', vn:'Xác nhận trực tiếp với chủ nhà'},
  'trust-3':         {en:'Better rates than Airbnb & Booking.com', vn:'Giá tốt hơn Airbnb & Booking.com'},
  'trust-anchor':    {en:'❤️ Loved by guests for location, comfort, and thoughtful details.', vn:'❤️ Được khách yêu thích vì vị trí, sự thoải mái và chi tiết chu đáo.'},
  'secondary-text':  {en:'Prefer to confirm first?',   vn:'Muốn xác nhận trước?'},
  'secondary-avail': {en:'Contact Us',                  vn:'Liên hệ'},
  'secondary-wa':    {en:'WhatsApp Us',                vn:'Nhắn tin WhatsApp'},
  'reassurance':     {en:'Questions before booking? We usually respond within minutes on WhatsApp.', vn:'Có câu hỏi trước khi đặt phòng? Chúng tôi thường trả lời trong vài phút qua WhatsApp.'},
  'reassure-1':      {en:'Direct booking = better price', vn:'Đặt trực tiếp = giá tốt hơn'},
  'reassure-2':      {en:'Verified property with real guest stays', vn:'Chỗ nghỉ đã được xác minh với khách thực tế'},
  'reassure-3':      {en:'Fast support via WhatsApp', vn:'Hỗ trợ nhanh qua WhatsApp'},
  'social-proof':    {en:'⭐ Loved by guests visiting Hanoi · 4.8★ from recent stays', vn:'⭐ Được yêu thích bởi khách du lịch Hà Nội · 4.8★ từ những lưu trú gần đây'},
  'social-proof-banner': {en:'⭐ Loved by guests. Better price direct. No platform fees.', vn:'⭐ Được khách yêu thích. Giá tốt hơn khi đặt trực tiếp. Không phí nền tảng.'},
  'better-title':    {en:'📌 Book direct & save on platform fees', vn:'📌 Đặt trực tiếp & tiết kiệm phí nền tảng'},
  'better-sub':      {en:'Same stay. Better price. Direct support.', vn:'Cùng một chỗ nghỉ. Giá tốt hơn. Hỗ trợ trực tiếp.'},
  'better-message':  {en:'Same stay. Better price. No platform fees.', vn:'Cùng một chỗ nghỉ. Giá tốt hơn. Không phí nền tảng.'},
  'better-cta':      {en:'Book direct with us.', vn:'Đặt phòng trực tiếp với chúng tôi.'},
  'brand-clarify':   {en:'MiaCasa Hanoi is a boutique homestay brand in Hanoi, Vietnam.', vn:'MiaCasa Hanoi là thương hiệu homestay boutique tại Hà Nội, Việt Nam.'},
  'booking-check':   {en:'Check Availability', vn:'Kiểm tra lịch trống'},
  'booking-reserve': {en:'Reserve Now →', vn:'Đặt phòng ngay →'},
  'booking-not-available': {en:'Not Available', vn:'Không khả dụng'},
  'checking-availability': {en:'⏳ Checking availability...', vn:'⏳ Đang kiểm tra...'},
  'room-available':  {en:'✅ Room available! Enter your details to book.', vn:'✅ Phòng trống! Nhập thông tin của bạn để đặt phòng.'},
  'room-available-with-details': {en:'✅ Room available! Fill in your details to book.', vn:'✅ Phòng trống! Điền thông tin để đặt phòng.'},
  'room-not-available': {en:'❌ This room is booked. Try our other property or choose different dates.', vn:'❌ Phòng này đã được đặt. Hãy thử chỗ nghỉ khác hoặc chọn ngày khác.'},
  'both-booked':     {en:'❌ Both properties are booked for these dates. Please try different dates.', vn:'❌ Cả hai chỗ nghỉ đều đã được đặt vào những ngày này. Vui lòng chọn ngày khác.'},

  /* ── QR PAYMENT ───────────────────────────────────────────────── */
  'scan-title':      {en:'📱 Scan to Pay & Confirm Instantly', vn:'📱 Quét để thanh toán & xác nhận ngay'},
  'scan-subtitle':   {en:'Secure payment via bank QR or PayPal', vn:'Thanh toán an toàn qua QR ngân hàng hoặc PayPal'},
  'amount-title':    {en:'Amount:', vn:'Số tiền:'},
  'ref-title':       {en:'Booking Ref:', vn:'Mã đặt phòng:'},
  'qr-confirm':      {en:'✅ Confirmation sent via WhatsApp within minutes.', vn:'✅ Xác nhận được gửi qua WhatsApp trong vài phút.'},
  'qr-complete':     {en:'I\'ve completed the transfer →', vn:'Tôi đã chuyển khoản →'},

  /* ── HOMEPAGE FINAL CTA ───────────────────────────────────────── */
  'final-title':     {en:'Ready to plan your stay<br><em>in Hanoi?</em>', vn:'Sẵn sàng lên kế hoạch<br><em>tại Hà Nội?</em>'},
  'final-cta1':      {en:'Check availability at MiaCasa Hanoi →', vn:'Kiểm tra lịch trống MiaCasa Hà Nội →'},
  'final-cta2':      {en:'Check availability at Old Quarter →', vn:'Kiểm tra lịch trống Phố Cổ →'},

  /* ── HOMEPAGE SEO TEXT BLOCK ──────────────────────────────────── */
  'seo-block':       {en:'Looking for a homestay or apartment in Hanoi? Book direct at MiaCasa — <a href="miacasa-hanoi.html" style="color:var(--terracotta);text-decoration:none;">private rooms near Hanoi Railway Station</a> and a <a href="miacasa-oldquarter.html" style="color:var(--terracotta);text-decoration:none;">3-bedroom apartment in the Old Quarter, Hoàn Kiếm</a>. No platform fees. Best rate guaranteed.',
                      vn:'Tìm homestay hoặc căn hộ tại Hà Nội? Đặt trực tiếp tại MiaCasa — chỗ nghỉ boutique gần Ga Hà Nội và trong Phố Cổ Hoàn Kiếm. Không phí nền tảng. Giá tốt nhất được đảm bảo.'},

  
  /* ── HOUSE RULES ──────────────────────────────────────────────── */
  'sec-rules':       {en:'House Rules', vn:'Nội quy'},
  'rules-title':     {en:'A few things to keep in <em>mind</em>', vn:'Một vài điều cần <em>lưu ý</em>'},
  'rules-sub':       {en:'To ensure everyone has a wonderful stay, we ask all guests to respect these simple guidelines.', vn:'Để đảm bảo mọi người có kỳ lưu trú tuyệt vời, chúng tôi đề nghị khách tuân thủ các quy định đơn giản sau.'},
  'rule-checkinout': {en:'Check-in / Check-out', vn:'Nhận / Trả phòng'},
  'rule-cio-1':      {en:'Check-in from 2:00 PM (self check-in)', vn:'Nhận phòng từ 14:00 (tự check-in)'},
  'rule-cio-2':      {en:'MiaCasaHanoi: check-out by 12:00 PM (noon)', vn:'MiaCasaHanoi: trả phòng trước 12:00 (trưa)'},
  'rule-cio-3':      {en:'MiaCasaOldQuarter: check-out by 11:00 AM', vn:'MiaCasaOldQuarter: trả phòng trước 11:00'},
  'rule-cio-4':      {en:'Early/late check-in available on request', vn:'Nhận / trả phòng sớm / muộn theo yêu cầu'},
  'rule-cio-5':      {en:'Luggage storage available at MiaCasaHanoi — longer durations may incur an extra charge', vn:'Có thể gửi hành lý tại MiaCasaHanoi — thời gian dài có thể tính thêm phí'},
  'rule-noise':      {en:'Noise & Guests', vn:'Tiếng ồn & Khách'},
  'rule-noise-1':    {en:'Quiet hours 10:00 PM – 7:00 AM', vn:'Giờ yên tĩnh 22:00 – 7:00'},
  'rule-noise-2':    {en:'No unregistered overnight guests', vn:'Không đón khách qua đêm chưa đăng ký'},
  'rule-noise-3':    {en:'Be mindful of neighbours', vn:'Tôn trọng hàng xóm'},
  'rule-noise-4':    {en:'Groups of 4+ need prior notice', vn:'Nhóm từ 4 người trở lên cần thông báo trước'},
  'rule-smoking':    {en:'Smoking & Pets', vn:'Hút thuốc & Thú cưng'},
  'rule-smoke-1':    {en:'No smoking indoors', vn:'Không hút thuốc trong nhà'},
  'rule-smoke-2':    {en:'Balcony/terrace smoking only', vn:'Chỉ hút thuốc ở ban công / sân thượng'},
  'rule-smoke-3':    {en:'Pets welcome — additional charge applies, please inform the host in advance', vn:'Chào đón thú cưng — phụ phí áp dụng, vui lòng báo chủ nhà trước'},
  'rule-smoke-4':    {en:'Candles permitted with care', vn:'Cho phép dùng nến cẩn thận'},
  'rule-propcare':   {en:'Property Care', vn:'Bảo quản tài sản'},
  'rule-prop-1':     {en:'Treat the space as your own home', vn:'Đối xử với không gian như ngôi nhà của bạn'},
  'rule-prop-2':     {en:'Report damages promptly', vn:'Báo cáo hư hỏng ngay lập tức'},
  'rule-prop-3':     {en:'No shoes inside — slippers provided', vn:'Không đi giày trong nhà — có dép'},
  'rule-prop-4':     {en:'Use designated rubbish bins', vn:'Dùng thùng rác đúng nơi quy định'},
  'rule-legal':      {en:'Legal Requirement', vn:'Yêu cầu pháp lý'},
  'rule-legal-1':    {en:'Vietnamese law requires all guests to provide a copy of their passport or national ID', vn:'Pháp luật Việt Nam yêu cầu tất cả khách phải cung cấp bản sao hộ chiếu hoặc CMND/CCCD'},
  'rule-legal-2':    {en:'Please send a photo to the host via WhatsApp or email before or upon check-in', vn:'Vui lòng gửi ảnh cho chủ nhà qua WhatsApp hoặc email trước hoặc khi nhận phòng'},
  'rule-legal-3':    {en:'Bookings cannot be confirmed without this document', vn:'Đặt phòng không thể xác nhận nếu thiếu tài liệu này'},
  'rule-legal-4':    {en:'Information is used solely for local authority registration', vn:'Thông tin chỉ dùng để đăng ký với cơ quan chức năng địa phương'},
  'rule-payment':    {en:'Payments & Cancellation', vn:'Thanh toán & Hủy phòng'},
  'rule-pay-1':      {en:'Free cancellation up to 48h prior', vn:'Miễn phí hủy trước 48 giờ'},
  'rule-pay-2':      {en:'Bank transfer or PayPal accepted', vn:'Chấp nhận chuyển khoản ngân hàng hoặc PayPal'},
  'rule-pay-3':      {en:'Security deposit for long stays', vn:'Đặt cọc bảo đảm cho lưu trú dài ngày'},
  'rule-eco':        {en:'Eco Guidelines', vn:'Hướng dẫn sinh thái'},
  'rule-eco-1':      {en:'Turn off A/C when leaving', vn:'Tắt điều hoà khi ra ngoài'},
  'rule-eco-2':      {en:'Mineral water provided (2 bottles per room per stay)', vn:'Cung cấp nước khoáng (2 chai mỗi phòng mỗi lần ở)'},
  'rule-eco-3':      {en:'We minimise single-use plastics where possible', vn:'Chúng tôi giảm thiểu đồ nhựa dùng một lần'},
  'rule-eco-4':      {en:'Towel reuse encouraged', vn:'Khuyến khích tái sử dụng khăn tắm'},



  /* ── CONTACT FORM ─────────────────────────────────────────────── */
  'invoice-text':    {en:'Need an invoice for your stay?', vn:'Cần hóa đơn cho kỳ lưu trú của bạn?'},
  'invoice-link':    {en:'Click here →', vn:'Bấm vào đây →'},
  'cancel-text':     {en:'✈️ Need to cancel your booking?', vn:'✈️ Cần hủy đặt phòng?'},
  'cancel-link':     {en:'Request cancellation →', vn:'Yêu cầu hủy →'},
  'sec-contact':     {en:'Get in Touch', vn:'Liên hệ'},
  'contact-title':   {en:"We'd love to <em>hear from you</em>", vn:'Chúng tôi rất mong <em>được nghe từ bạn</em>'},
  'contact-sub':     {en:'Questions, special requests, or just want to say hello — reach out anytime.', vn:'Câu hỏi, yêu cầu đặc biệt, hoặc chỉ muốn chào hỏi — hãy liên hệ bất cứ lúc nào.'},
  'contact-findus':  {en:'Find us in Hanoi', vn:'Tìm chúng tôi tại Hà Nội'},
  'contact-whatsapp-lbl': {en:'WhatsApp / Phone', vn:'WhatsApp / Điện thoại'},
  'contact-email-lbl': {en:'Email', vn:'Email'},
  'contact-response-lbl': {en:'Response time', vn:'Thời gian phản hồi'},
  'contact-response-val': {en:'Within 2 hours · 7am – 10pm ICT', vn:'Trong vòng 2 giờ · 7h – 22h hàng ngày'},
  'hosts-tag': {en:'Your Hosts', vn:'Chủ nhà của bạn'},
  'hosts-title': {en:'Hosted by <em>Linh &amp; Ngọc</em>', vn:'Được dẫn dắt bởi <em>Linh &amp; Ngọc</em>'},
  'hosts-desc': {en:'Two friends who built every room themselves. Real people who answer your messages and care how your stay goes.', vn:'Hai người bạn đã tự tay xây dựng mọi căn phòng. Những người thật, trả lời tin nhắn và quan tâm đến kỳ nghỉ của bạn.'},
  'hosts-story': {en:'Read our story →', vn:'Đọc câu chuyện của chúng tôi →'},
  'urgency-signal': {en:'🔥 Popular pick — booked most weekends this season', vn:'🔥 Được yêu thích — thường hết phòng vào cuối tuần'},
  'lbl-cname':       {en:'Name', vn:'Họ tên'},
  'lbl-cemail':      {en:'Email', vn:'Email'},
  'lbl-cprop':       {en:'Property', vn:'Chỗ ở'},
  'lbl-csubject':    {en:'Subject', vn:'Chủ đề'},
  'lbl-cmsg':        {en:'Message', vn:'Tin nhắn'},
  'ph-cname':        {en:'Your name', vn:'Tên của bạn'},
  'ph-cemail':       {en:'your@email.com', vn:'email@cua.ban'},
  'ph-cmsg':         {en:'Tell us how we can help...', vn:'Cho chúng tôi biết chúng tôi có thể giúp gì...'},
  'btn-whatsapp':    {en:'Send via WhatsApp →', vn:'Gửi qua WhatsApp →'},
  'subject-booking': {en:'Booking Enquiry', vn:'Hỏi về đặt phòng'},
  'subject-special': {en:'Special Request', vn:'Yêu cầu đặc biệt'},
  'subject-calendar': {en:'Calendar Sync / Channel Manager', vn:'Đồng bộ lịch / Quản lý kênh'},
  'subject-other':   {en:'Other', vn:'Khác'},
  'contact-confirm': {en:'✓ Message sent! We\'ll be in touch soon.', vn:'✓ Tin nhắn đã gửi! Chúng tôi sẽ liên hệ lại sớm.'},
  'prop-hanoi':      {en:'MiaCasa Hanoi', vn:'MiaCasa Hà Nội'},
  'prop-oldquarter': {en:'MiaCasa Old Quarter', vn:'MiaCasa Phố Cổ'},
  'captcha-label':   {en:'Security Check: What is {num1} + {num2}?', vn:'Kiểm tra bảo mật: {num1} + {num2} bằng bao nhiêu?'},
  'captcha-placeholder': {en:'Enter answer', vn:'Nhập câu trả lời'},
  'captcha-refresh': {en:'⟳ Refresh', vn:'⟳ Làm mới'},
  'whatsapp-link':   {en:'💬 WhatsApp', vn:'💬 WhatsApp'},
  'call-link':       {en:'📞 Call +84 869 922 261', vn:'📞 Gọi +84 869 922 261'},

  /* ── FOOTER TRANSLATIONS ─────────────────────────────────────── */
  'footer-stays-title': {en:'Our Stays', vn:'Chỗ nghỉ'},
  'footer-info-title': {en:'Information', vn:'Thông tin'},
  'footer-also-title': {en:'Also on', vn:'Cũng có trên'},
  'footer-hanoi':    {en:'MiaCasa Hanoi', vn:'MiaCasa Hà Nội'},
  'footer-oq':       {en:'MiaCasa Old Quarter', vn:'MiaCasa Phố Cổ'},
  'footer-book':     {en:'Book Direct', vn:'Đặt trực tiếp'},
  'footer-avail':    {en:'Availability', vn:'Lịch trống'},
  'footer-amenities': {en:'Amenities', vn:'Tiện nghi'},
  'footer-rules':    {en:'House Rules', vn:'Nội quy'},
  'footer-gallery':  {en:'Gallery', vn:'Thư viện ảnh'},
  'footer-reviews':  {en:'Reviews', vn:'Đánh giá'},
  'footer-tagline':  {en:'Two distinct homestays in Hanoi — crafted with love for travellers who want a real home, not just a bed.',
                      vn:'Hai homestay độc đáo tại Hà Nội — được tạo ra với tình yêu cho những du khách muốn có một ngôi nhà thực sự, không chỉ là một chiếc giường.'},
  'footer-copy':     {en:'© 2025 MiaCasa Homestays. All rights reserved.', vn:'© 2025 MiaCasa Homestays. Bảo lưu mọi quyền.'},
  'footer-made':     {en:'Made with ♡ in Hanoi', vn:'Được tạo với ♡ tại Hà Nội'},
  'footer-airbnb-h': {en:'Airbnb – MiaCasaHanoi', vn:'Airbnb – MiaCasa Hà Nội'},
  'footer-airbnb-oq': {en:'Airbnb – MiaCasaOldQuarter', vn:'Airbnb – MiaCasa Phố Cổ'},
  'footer-booking-h': {en:'Booking.com – MiaCasaHanoi', vn:'Booking.com – MiaCasa Hà Nội'},
  'footer-booking-oq': {en:'Booking.com – MiaCasaOldQuarter', vn:'Booking.com – MiaCasa Phố Cổ'},
  'footer-agoda-h':  {en:'Agoda – MiaCasaHanoi', vn:'Agoda – MiaCasa Hà Nội'},
  'footer-hanoi-title': {en:'MiaCasa Hanoi', vn:'MiaCasa Hà Nội'},
  'footer-hanoi-address': {en:'92 Ngh. 51 Ng. Linh Quang, Văn Chương, Hanoi, Vietnam', vn:'92 Ngõ 51 Ng. Linh Quang, Văn Chương, Hà Nội, Việt Nam'},
  'footer-oq-title': {en:'MiaCasa Old Quarter', vn:'MiaCasa Phố Cổ'},
  'footer-oq-address': {en:'38 P. Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm, Hanoi, Vietnam', vn:'38 Phố Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm, Hà Nội, Việt Nam'},
  'footer-contact-title': {en:'Contact Us', vn:'Liên hệ'},
  'footer-whatsapp': {en:'WhatsApp +84 869 922 261', vn:'WhatsApp +84 869 922 261'},
  'footer-call':     {en:'Call +84 869 922 261', vn:'Gọi +84 869 922 261'},
  'footer-response': {en:'⏱️ Responses within 2 hours (7am - 10pm ICT)', vn:'⏱️ Phản hồi trong 2 giờ (7h - 22h giờ Việt Nam)'},

  /* ── ADDITIONAL FOOTER TRANSLATIONS ───────────────────────────── */
  'footer-brand-p':  {en:'Two distinct homestays in Hanoi — crafted with love for travellers who want a real home, not just a bed.',
                      vn:'Hai homestay độc đáo tại Hà Nội — được tạo ra với tình yêu cho những du khách muốn có một ngôi nhà thực sự, không chỉ là một chỗ ngủ.'},
  'footer-rating':   {en:'⭐ 4.9★ · 200+ happy guests', vn:'⭐ 4.9★ · Hơn 200 khách hài lòng'},
  'footer-our-stays': {en:'Our Stays', vn:'Chỗ ở của chúng tôi'},
  'footer-hanoi-link': {en:'MiaCasa Hanoi', vn:'MiaCasa Hà Nội'},
  'footer-oq-link':  {en:'MiaCasa Old Quarter', vn:'MiaCasa Phố Cổ'},
  'footer-book-direct': {en:'Book Direct', vn:'Đặt trực tiếp'},
  'footer-info':     {en:'Information', vn:'Thông tin'},
  'footer-story':    {en:'Our Story', vn:'Câu chuyện của chúng tôi'},
  'footer-blog':     {en:'Blog', vn:'Blog'},
  'footer-contact':  {en:'Contact', vn:'Liên hệ'},
  'social-facebook': {en:'Facebook', vn:'Facebook'},
  'social-instagram': {en:'Instagram', vn:'Instagram'},
  'social-tiktok':   {en:'TikTok', vn:'TikTok'},
  'footer-copyright': {en:'© 2025 MiaCasa Homestays', vn:'© 2025 MiaCasa Homestays'},

  /* ── MIACASA HANOI PAGE ───────────────────────────────────────── */
  'h-tag':           {en:'MiaCasa Hanoi · Văn Miếu, Hanoi', vn:'MiaCasa Hà Nội · Văn Miếu, Hà Nội'},
  'h-h1':            {en:'A Calm Stay Near<br><em>Hanoi Railway Station</em>', vn:'Chỗ Nghỉ Yên Tĩnh Gần<br><em>Ga Hà Nội</em>'},
  'h-sub':           {en:'Located near Văn Miếu and the Train Street area — a peaceful base to explore Hanoi.',
                      vn:'Nằm gần Văn Miếu và khu vực Phố Tàu Hỏa — điểm xuất phát yên tĩnh để khám phá Hà Nội.'},
  'h-cta1':          {en:'Check Availability', vn:'Kiểm tra lịch trống'},
  'h-cta2':          {en:'Book via WhatsApp', vn:'Đặt qua WhatsApp'},
  'h-about-tag':     {en:'About the Stay', vn:'Về chỗ nghỉ'},
  'h-about-title':   {en:'A quiet, local<br><em>stay in Hanoi</em>', vn:'Chỗ nghỉ yên tĩnh,<br><em>đậm chất địa phương</em>'},
  'h-about-p1':      {en:"MiaCasaHanoi is designed for travelers who want a quieter, more local experience while staying close to Hanoi's main attractions.",
                      vn:'MiaCasaHanoi được thiết kế cho những du khách muốn trải nghiệm yên tĩnh, đậm chất địa phương hơn trong khi vẫn gần các điểm tham quan chính của Hà Nội.'},
  'h-about-p2':      {en:'Located near Hanoi Railway Station and Văn Miếu – Quốc Tử Giám, the property offers easy access to the Old Quarter without the constant noise and crowds.',
                      vn:'Nằm gần Ga Hà Nội và Văn Miếu – Quốc Tử Giám, chỗ nghỉ cung cấp khả năng tiếp cận dễ dàng đến Phố Cổ mà không có tiếng ồn và đông người.'},
  'h-about-p3':      {en:'Each room is thoughtfully designed with natural light, wooden accents, and a warm, minimalist aesthetic.',
                      vn:'Mỗi phòng được thiết kế tinh tế với ánh sáng tự nhiên, điểm nhấn gỗ và thẩm mỹ tối giản ấm áp.'},
  'h-who-tag':       {en:'Perfect For', vn:'Phù hợp cho'},
  'h-who-title':     {en:'Who <em>stays here</em>', vn:'Ai <em>phù hợp</em>'},
  'h-who-1':         {en:'Couples looking for a calm stay', vn:'Các cặp đôi tìm kiếm chỗ nghỉ yên tĩnh'},
  'h-who-2':         {en:'Solo travelers and digital nomads', vn:'Khách solo và người làm việc từ xa'},
  'h-who-3':         {en:'Guests who prefer local neighborhoods over tourist-heavy areas', vn:'Khách thích khu phố địa phương hơn khu vực du lịch đông đúc'},
  'h-rooms-tag':     {en:'Rooms', vn:'Phòng nghỉ'},
  'h-rooms-title':   {en:'Three private<br><em>rooms</em>', vn:'Ba phòng<br><em>riêng tư</em>'},
  'h-rooms-sub':     {en:'Each room has an en-suite bathroom and kitchenette, designed with simplicity and natural materials.',
                      vn:'Mỗi phòng có phòng tắm riêng và bếp nhỏ, được thiết kế đơn giản với vật liệu tự nhiên.'},
  'h-room1':         {en:'🌸 Spring Room — light, airy, and calming', vn:'🌸 Phòng Xuân — sáng, thoáng và thư thái'},
  'h-room2':         {en:'☀️ Summer Room — warm tones with a cozy feel', vn:'☀️ Phòng Hạ — tông ấm với cảm giác ấm cúng'},
  'h-room3':         {en:'🍂 Autumn Room — soft, relaxed, and restful', vn:'🍂 Phòng Thu — nhẹ nhàng, thư giãn và nghỉ ngơi'},
  'h-amen-tag':      {en:"What's Included", vn:'Tiện nghi'},
  'h-amen-title':    {en:'Every comfort,<br><em>thoughtfully provided</em>', vn:'Mọi tiện nghi,<br><em>được chuẩn bị chu đáo</em>'},
  'h-am1':           {en:'High-speed WiFi', vn:'WiFi tốc độ cao'},
  'h-am1s':          {en:'100 Mbps — great for remote work', vn:'100 Mbps — phù hợp làm việc từ xa'},
  'h-am2':           {en:'Air conditioning & fan', vn:'Điều hoà & quạt'},
  'h-am2s':          {en:'Climate control in every room', vn:'Kiểm soát nhiệt độ trong mỗi phòng'},
  'h-am3':           {en:'Ensuite private bathroom', vn:'Phòng tắm riêng'},
  'h-am3s':          {en:'Premium toiletries & fluffy towels', vn:'Dụng cụ vệ sinh cao cấp & khăn tắm mềm mại'},
  'h-am4':           {en:'In-room kitchenette', vn:'Bếp nhỏ trong phòng'},
  'h-am4s':          {en:'Mini fridge, kettle & cooking basics', vn:'Tủ lạnh mini, ấm đun & dụng cụ nấu ăn cơ bản'},
  'h-am5':           {en:'Self check-in 24h', vn:'Tự nhận phòng 24h'},
  'h-am5s':          {en:'Code lockbox — arrive any time', vn:'Hộp khoá bảo mật — đến bất cứ lúc nào'},
  'h-am6':           {en:'Café downstairs', vn:'Quán cà phê tầng dưới'},
  'h-am6s':          {en:'Your daily coffee ritual sorted', vn:'Thói quen cà phê sáng được đảm bảo'},
  'h-am7':           {en:'Local guide & curated map', vn:'Bản đồ địa phương'},
  'h-am7s':          {en:'Hidden gems, cafés & tips from the host', vn:'Địa điểm ẩn, quán cà phê & mẹo từ chủ nhà'},
  'h-am8':           {en:'Free laundry', vn:'Giặt ủi miễn phí'},
  'h-am8s':          {en:'Washing machine & dryer with detergent', vn:'Máy giặt và máy sấy bao gồm bột giặt'},
  'h-loc-tag':       {en:'Location', vn:'Vị trí'},
  'h-loc-title':     {en:'Near Train Street<br><em>& Old Quarter</em>', vn:'Gần Phố Tàu Hỏa<br><em>& Phố Cổ</em>'},
  'h-loc-addr':      {en:'📍 92 Ngh. 51 Ng. Linh Quang, Văn Chương, Hanoi — 5 minutes to Train Street · Close to Hanoi Railway Station · Easy access to Old Quarter and Hoan Kiem.',
                      vn:'📍 92 Ngh. 51 Ng. Linh Quang, Văn Chương, Hà Nội — 5 phút đến Phố Tàu Hỏa · Gần Ga Hà Nội · Dễ dàng tiếp cận Phố Cổ và Hồ Hoàn Kiếm.'},
  'h-loc-seo':       {en:'Staying near Hanoi Railway Station means you are 5–10 minutes from the Old Quarter, close to Văn Miếu (Temple of Literature), and well connected for trains and day trips.',
                      vn:'Ở gần Ga Hà Nội nghĩa là bạn chỉ cách Phố Cổ 5–10 phút, gần Văn Miếu (Quốc Tử Giám) và thuận tiện đi tàu và các chuyến tham quan.'},
  'h-book-tag':      {en:'Reservations', vn:'Đặt phòng'},
  'h-book-title':    {en:'Book your <em>stay</em>', vn:'Đặt <em>phòng ngay</em>'},
  'h-book-sub':      {en:'Book your stay in Hanoi direct — select your dates below or message us on WhatsApp for the best rate.',
                      vn:'Đặt phòng trực tiếp tại Hà Nội — chọn ngày bên dưới hoặc nhắn tin qua WhatsApp để có giá tốt nhất.'},
  'h-book-note':     {en:'From PRICE_PLACEHOLDER₫/night · Direct booking homestay Hanoi — best rate, no platform fees',
                    vn:'Từ PRICE_PLACEHOLDER₫/đêm · Đặt trực tiếp homestay Hà Nội — giá tốt nhất, không phí nền tảng'},

  'floating-book':   {en:'📅 Book Now', vn:'📅 Đặt ngay'},
  'oquarter-summary-1': {en:'In the heart of Old Quarter', vn:'Giữa lòng Phố Cổ'},
  'oquarter-summary-2': {en:'Walk to everything', vn:'Đi bộ đến mọi nơi'},
  'oquarter-summary-3': {en:'Rooftop terrace & BBQ', vn:'Sân thượng & tiệc nướng'},
  'oquarter-summary-4': {en:'Best for groups & social travelers', vn:'Phù hợp cho nhóm & du khách thích giao lưu'},
  'hero-h1-new':     {en:'Boutique stays in Hanoi,<br><em>designed for comfort & location</em>', vn:'Lưu trú boutique tại Hà Nội,<br><em>thiết kế cho sự thoải mái & vị trí</em>'},
  'hero-sub-new':    {en:'Choose between vibrant Old Quarter energy or a quiet local retreat.', vn:'Chọn giữa năng lượng sôi động của Phố Cổ hoặc một nơi nghỉ dưỡng yên tĩnh.'},
  'hero-check-dates': {en:'Check your dates →', vn:'Kiểm tra ngày của bạn →'},
  'hero-compare':    {en:'Compare properties', vn:'So sánh chỗ nghỉ'},
  'h-cta-wa':        {en:'📱 Book via WhatsApp', vn:'📱 Đặt qua WhatsApp'},
  'h-cta-av':        {en:'Check Availability', vn:'Kiểm tra lịch trống'},
  'h-cross-name':    {en:'Also explore: MiaCasa Old Quarter', vn:'Cũng khám phá: MiaCasa Phố Cổ'},
  'h-cross-sub':     {en:'Old Quarter · Hoan Kiem · Entire apartment for groups', vn:'Phố Cổ · Hoàn Kiếm · Toàn bộ căn hộ cho nhóm'},
  'hanoi-trust-1':   {en:'🌿 Quiet local neighborhood near Train Street & Văn Miếu', vn:'🌿 Khu phố yên tĩnh gần Phố Tàu & Văn Miếu'},
  'hanoi-trust-2':   {en:'🍳 Private rooms with kitchenette — ideal for longer stays', vn:'🍳 Phòng riêng với bếp nhỏ — lý tưởng cho lưu trú dài ngày'},
  'hanoi-trust-3':   {en:'⭐ Highly rated for cleanliness, comfort & host support', vn:'⭐ Được đánh giá cao về độ sạch sẽ, thoải mái & hỗ trợ chủ nhà'},

  /* ── MIACASA OLD QUARTER PAGE ─────────────────────────────────── */
  'oq-tag':          {en:'MiaCasa Old Quarter · Hoan Kiem, Hanoi', vn:'MiaCasa Phố Cổ · Hoàn Kiếm, Hà Nội'},
  'oq-h1':           {en:'Stay in the Heart<br><em>of Hoàn Kiếm</em>', vn:'Ở Ngay Trung Tâm<br><em>Hoàn Kiếm</em>'},
  'oq-sub':          {en:"A full apartment in Hanoi's Old Quarter — perfect for groups and families.",
                      vn:'Toàn bộ căn hộ trong Phố Cổ Hà Nội — hoàn hảo cho nhóm và gia đình.'},
  'oq-cta1':         {en:'Check Availability', vn:'Kiểm tra lịch trống'},
  'oq-cta2':         {en:'Book via WhatsApp', vn:'Đặt qua WhatsApp'},
  'oq-about-tag':    {en:'About the Stay', vn:'Về chỗ nghỉ'},
  'oq-about-title':  {en:'In the vibrant<br><em>Old Quarter</em>', vn:'Trong<br><em>Phố Cổ sôi động</em>'},
  'oq-about-p1':     {en:"Located in the vibrant Old Quarter, MiaCasa Old Quarter places you right in the center of Hanoi's culture, food, and nightlife.",
                      vn:'Nằm trong Phố Cổ sôi động, MiaCasa Old Quarter đặt bạn ngay trung tâm văn hóa, ẩm thực và cuộc sống về đêm của Hà Nội.'},
  'oq-about-p2':     {en:'The apartment features three queen beds, making it ideal for families or small groups who want to stay together in one comfortable space.',
                      vn:'Căn hộ có ba giường đôi, lý tưởng cho gia đình hoặc nhóm nhỏ muốn ở cùng nhau trong một không gian thoải mái.'},
  'oq-about-p3':     {en:'Step outside and you are instantly surrounded by local cafés, street food, and historic streets.',
                      vn:'Bước ra ngoài là ngay lập tức bao quanh bởi quán cà phê địa phương, đồ ăn đường phố và những con phố lịch sử.'},
  'oq-who-tag':      {en:'Perfect For', vn:'Phù hợp cho'},
  'oq-who-title':    {en:'Who <em>stays here</em>', vn:'Ai <em>phù hợp</em>'},
  'oq-who-1':        {en:'Families', vn:'Gia đình'},
  'oq-who-2':        {en:'Groups of friends', vn:'Nhóm bạn bè'},
  'oq-who-3':        {en:'Travelers who want to stay in the center of everything', vn:'Du khách muốn ở ngay trung tâm mọi thứ'},
  'oq-apt-tag':      {en:'The Apartment', vn:'Căn hộ'},
  'oq-apt-title':    {en:'Entire apartment,<br><em>yours alone</em>', vn:'Toàn bộ căn hộ,<br><em>của riêng bạn</em>'},
  'oq-apt-sub':      {en:'Complete privacy for your group — across two levels with an open terrace above the Old Quarter.',
                      vn:'Sự riêng tư hoàn toàn cho nhóm — trên hai tầng với sân thượng mở nhìn ra Phố Cổ.'},
  'oq-feat1':        {en:'🛏️ 3 Queen Beds', vn:'🛏️ 3 Giường Đôi'},
  'oq-feat1s':       {en:'2 on main level + 1 attic bed — sleeps up to 6', vn:'2 tầng chính + 1 gác xép — ngủ tối đa 6 người'},
  'oq-feat2':        {en:'🌿 Open Terrace', vn:'🌿 Sân thượng mở'},
  'oq-feat2s':       {en:'Your quiet corner above the Old Quarter', vn:'Góc thư giãn của bạn trên Phố Cổ'},
  'oq-feat3':        {en:'🔒 Smart Lock', vn:'🔒 Khoá thông minh'},
  'oq-feat3s':       {en:'Keypad entry — arrive any time, no key needed', vn:'Nhập mã — đến bất cứ lúc nào, không cần chìa khoá'},
  'oq-amen-tag':     {en:"What's Included", vn:'Tiện nghi'},
  'oq-amen-title':   {en:'Everything you need,<br><em>right here</em>', vn:'Mọi thứ bạn cần,<br><em>ngay tại đây</em>'},
  'oq-am1':          {en:'High-speed WiFi', vn:'WiFi tốc độ cao'},
  'oq-am1s':         {en:'100 Mbps — great for remote work', vn:'100 Mbps — phù hợp làm việc từ xa'},
  'oq-am2':          {en:'Air conditioning', vn:'Điều hoà'},
  'oq-am2s':         {en:'Climate control throughout', vn:'Kiểm soát nhiệt độ toàn căn hộ'},
  'oq-am3':          {en:'Full apartment access', vn:'Toàn bộ căn hộ'},
  'oq-am3s':         {en:'Complete privacy — just your group', vn:'Riêng tư hoàn toàn — chỉ nhóm của bạn'},
  'oq-am4':          {en:'Open outdoor terrace', vn:'Sân thượng mở'},
  'oq-am4s':         {en:'Your quiet corner above the Old Quarter', vn:'Góc thư giãn của bạn trên Phố Cổ'},
  'oq-am5':          {en:'Smart lock · Self check-in', vn:'Khoá thông minh · Tự nhận phòng'},
  'oq-am5s':         {en:'Keypad entry — arrive any time', vn:'Nhập mã — đến bất cứ lúc nào'},
  'oq-am6':          {en:'White noise machine', vn:'Máy tạo tiếng ồn trắng'},
  'oq-am6s':         {en:'Helps mask street noise for better sleep', vn:'Giúp che tiếng ồn đường phố, ngủ ngon hơn'},
  'oq-am7':          {en:'Street food at your door', vn:'Đồ ăn đường phố ngay cửa'},
  'oq-am7s':         {en:'The best of Hanoi within walking distance', vn:'Tinh hoa ẩm thực Hà Nội trong tầm đi bộ'},
  'oq-amen-sub':     {en:'Everything you need for a comfortable stay in the heart of the Old Quarter.', 
                      vn:'Mọi thứ bạn cần cho một kỳ nghỉ thoải mái ngay trung tâm Phố Cổ.'},
  'oq-am8':          {en:'Smart TV', vn:'Tivi thông minh'},
  'oq-am8s':         {en:'Netflix & YouTube ready', vn:'Sẵn sàng Netflix & YouTube'},
  'oq-loc-tag':      {en:'Location', vn:'Vị trí'},
  'oq-loc-title':    {en:'Heart of<br><em>Hoan Kiem & Old Quarter</em>', vn:'Trung tâm<br><em>Hoàn Kiếm & Phố Cổ</em>'},
  'oq-loc-addr':     {en:'📍 38 P. Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm, Hanoi — Walking distance to Hoan Kiem Lake · Surrounded by cafés and street food · Central location for all major attractions.',
                      vn:'📍 38 P. Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm, Hà Nội — Đi bộ đến Hồ Hoàn Kiếm · Bao quanh bởi quán cà phê và đồ ăn đường phố · Vị trí trung tâm cho tất cả điểm tham quan chính.'},
  'oq-loc-seo':      {en:'Staying in Hoàn Kiếm means walking distance to Hoàn Kiếm Lake, easy access to night markets and street food, and a fully immersive Old Quarter experience.',
                      vn:'Ở Hoàn Kiếm nghĩa là đi bộ đến Hồ Hoàn Kiếm, dễ dàng tiếp cận chợ đêm và đồ ăn đường phố, và trải nghiệm Phố Cổ hoàn toàn sâu sắc.'},
  'oq-book-tag':     {en:'Reservations', vn:'Đặt phòng'},
  'oq-book-title':   {en:'Book your <em>stay</em>', vn:'Đặt <em>phòng ngay</em>'},
  'oq-book-sub':     {en:'Book this Old Quarter apartment direct — check availability below or message us for the best rate.',
                      vn:'Đặt căn hộ Phố Cổ trực tiếp — kiểm tra lịch trống bên dưới hoặc nhắn tin qua WhatsApp để có giá tốt nhất.'},
  'oq-book-note':    {en:'From PRICE_PLACEHOLDER₫/night · Apartment in Old Quarter Hanoi for rent — direct booking, best price guaranteed',
                    vn:'Từ PRICE_PLACEHOLDER₫/đêm · Thuê căn hộ Phố Cổ Hà Nội — đặt trực tiếp, giá tốt nhất'},
  'oq-cta-wa':       {en:'📱 Book via WhatsApp', vn:'📱 Đặt qua WhatsApp'},
  'oq-cta-av':       {en:'Check Availability', vn:'Kiểm tra lịch trống'},
  'oq-cross-name':   {en:'Also explore: MiaCasa Hanoi', vn:'Cũng khám phá: MiaCasa Hà Nội'},
  'oq-cross-sub':    {en:'Near Train Street · Private rooms · Ideal for couples & solo travellers', vn:'Gần Phố Tàu Hỏa · Phòng riêng · Lý tưởng cho cặp đôi & khách solo'},
  'oquarter-trust-1': {en:'📍 Right in the heart of the Old Quarter — walk everywhere', vn:'📍 Ngay trung tâm Phố Cổ — đi bộ đến mọi nơi'},
  'oquarter-trust-2': {en:'🏠 Spacious apartment with private terrace', vn:'🏠 Căn hộ rộng rãi với sân thượng riêng'},
  'oquarter-trust-3': {en:'⭐ Highly rated by guests for location & hosting', vn:'⭐ Được khách đánh giá cao về vị trí & sự đón tiếp'},
  'oquarter-authentic': {en:'🏙️ In the heart of Hanoi\'s Old Quarter — lively evenings and real city energy. Best suited for guests who want to experience Hanoi, not escape it.', vn:'🏙️ Giữa lòng Phố Cổ Hà Nội — buổi tối sôi động và năng lượng thành phố thực sự. Phù hợp nhất cho những ai muốn trải nghiệm Hà Nội, không phải trốn tránh nó.'},
  'oldquarter-notice': {en:'⚠ Heads up: The neighbourhood is lively and can be noisy at night. Access is via steep stairs — not ideal for young children, elderly guests, or anyone with mobility concerns.', vn:'⚠ Lưu ý: Khu phố sôi động và có thể ồn ào vào ban đêm. Lối lên là cầu thang dốc — không phù hợp cho trẻ nhỏ, người lớn tuổi hoặc người có vấn đề về đi lại.'},

  /* ── OUR STORY PAGE ────────────────────────────────────────────── */
    /* ── ADDITIONAL CONTACT FORM & FOOTER TRANSLATIONS ─────────────── */
  'prop-hanoi':        {en:'MiaCasa Hanoi', vn:'MiaCasa Hà Nội'},
  'prop-oldquarter':   {en:'MiaCasa Old Quarter', vn:'MiaCasa Phố Cổ'},
  'captcha-label':     {en:'Security Check: What is {num1} + {num2}?', vn:'Kiểm tra bảo mật: {num1} + {num2} bằng bao nhiêu?'},
  'captcha-placeholder': {en:'Enter answer', vn:'Nhập câu trả lời'},
  'captcha-refresh':   {en:'⟳ Refresh', vn:'⟳ Làm mới'},
  'whatsapp-link':     {en:'💬 WhatsApp', vn:'💬 WhatsApp'},
  'call-link':         {en:'📞 Call +84 869 922 261', vn:'📞 Gọi +84 869 922 261'},
  'footer-brand-p':    {en:'Two distinct homestays in Hanoi — crafted with love for travellers who want a real home, not just a bed.',
                        vn:'Hai homestay độc đáo tại Hà Nội — được tạo ra với tình yêu cho những du khách muốn có một ngôi nhà thực sự, không chỉ là một chỗ ngủ.'},
  'footer-rating':     {en:'⭐ 4.9★ · 200+ happy guests', vn:'⭐ 4.9★ · Hơn 200 khách hài lòng'},
  'footer-our-stays':  {en:'Our Stays', vn:'Chỗ ở của chúng tôi'},
  'footer-hanoi-link': {en:'MiaCasa Hanoi', vn:'MiaCasa Hà Nội'},
  'footer-oq-link':    {en:'MiaCasa Old Quarter', vn:'MiaCasa Phố Cổ'},
  'footer-book-direct': {en:'Book Direct', vn:'Đặt trực tiếp'},
  'footer-info':       {en:'Information', vn:'Thông tin'},
  'footer-story':      {en:'Our Story', vn:'Câu chuyện của chúng tôi'},
  'footer-blog':       {en:'Blog', vn:'Blog'},
  'footer-contact':    {en:'Contact', vn:'Liên hệ'},
  'social-facebook':   {en:'Facebook', vn:'Facebook'},
  'social-instagram':  {en:'Instagram', vn:'Instagram'},
  'social-tiktok':     {en:'TikTok', vn:'TikTok'},
  'footer-copyright':  {en:'© 2025 MiaCasa Homestays', vn:'© 2025 MiaCasa Homestays'},
   'story-hero-title': {en:'How MiaCasa Began', vn:'Hành trình bắt đầu của MiaCasa'},
  'story-hero-subtitle': {en:'A small idea, built with care in Hanoi', vn:'Một ý tưởng nhỏ, được xây dựng với sự chăm chút tại Hà Nội'},
  'story-tag':       {en:'MiaCasa Homestays', vn:'MiaCasa Homestays'},
  'story-h1':        {en:'Our <em>Story</em>', vn:'Câu Chuyện<br><em>Của Chúng Tôi</em>'},
  'story-lead':      {en:'MiaCasa didn\'t start as a business. It started as an idea of home.', vn:'MiaCasa không bắt đầu như một công việc kinh doanh. Nó bắt đầu từ một ý tưởng về cảm giác như ở nhà.'},
  'story-back':      {en:'← Back to MiaCasa Homestays', vn:'← Quay lại MiaCasa Homestays'},
  'story-p1':        {en:'When we first thought about opening a homestay in Hanoi, the goal wasn\'t to build something big or commercial. It was simple — to create a space that felt calm, lived-in, and real. A place where someone arriving in a new city could actually feel at ease.', vn:'Khi chúng tôi lần đầu nghĩ đến việc mở một homestay tại Hà Nội, mục tiêu không phải là xây dựng một nơi thật lớn hay mang tính thương mại. Rất đơn giản — chúng tôi muốn tạo ra một không gian yên tĩnh, có cảm giác "sống thật", nơi mà bất kỳ ai đến một thành phố mới cũng có thể cảm thấy thoải mái.'},
  'story-mobile-line1': {en:'MiaCasa is a small homestay in Hanoi, built by locals who care deeply about how a <strong>place</strong> feels.',
                       vn:'MiaCasa là một homestay nhỏ tại Hà Nội, được xây dựng bởi người địa phương, những người quan tâm sâu sắc đến cảm giác của <strong>không gian</strong>.'},
  'story-mobile-line2': {en:'Whether it\'s a quiet room near the train station or a full apartment in the Old Quarter, every stay is designed with intention.',
                       vn:'Dù là căn phòng yên tĩnh gần ga tàu hay toàn bộ căn hộ ở Phố Cổ, mỗi kỳ lưu trú đều được thiết kế có chủ ý.'},
  'story-mobile-line3': {en:'What started as a simple idea grew into two distinct homes in Hanoi.',
                       vn:'Một ý tưởng nhỏ giản đơn đã phát triển thành hai không gian sống khác biệt tại Hà Nội.'},
  'story-mobile-line4': {en:'One is in the quieter Văn Miếu area.',
                       vn:'Một ở khu Văn Miếu yên tĩnh.'},
  'story-mobile-line5': {en:'The other sits in the heart of the Old Quarter.',
                       vn:'Một ở giữa lòng Phố Cổ sôi động.'},
  'story-mobile-line6': {en:'Stay near Văn Miếu for a calm, local atmosphere.',
                       vn:'Ở gần Văn Miếu để tận hưởng bầu không khí yên bình, đậm chất địa phương.'},
  'story-mobile-line7': {en:'Or choose the Old Quarter if you want to be in the center of everything.',
                       vn:'Hoặc chọn Phố Cổ nếu bạn muốn ở ngay trung tâm mọi hoạt động.'},
  'story-mobile-line8': {en:'This was never meant to be just a place to stay.',
                       vn:'Đây không chỉ đơn thuần là một nơi để ngủ.'},
  'story-mobile-line9': {en:'It\'s meant to feel calm, thoughtful, and genuinely lived in.',
                       vn:'Đó là nơi bạn cảm thấy bình yên, được chăm chút, và thực sự như sống trong chính ngôi nhà của mình.'},
  'story-p1-line1':  {en:'When we first thought about opening a homestay in Hanoi,', vn:'Khi chúng tôi lần đầu nghĩ đến việc mở một homestay tại Hà Nội,'},
  'story-p1-line2':  {en:'the goal wasn\'t to build something big or commercial.', vn:'mục tiêu không phải là xây dựng một nơi thật lớn hay mang tính thương mại.'},
  'story-p1-line3':  {en:'It was simple — to create a space that felt calm, lived-in, and real.', vn:'Rất đơn giản — chúng tôi muốn tạo ra một không gian yên tĩnh, có cảm giác "sống thật".'},
  'story-p1-line4':  {en:'A place where someone arriving in a new city could actually feel at ease.', vn:'Một nơi mà bất kỳ ai đến một thành phố mới cũng có thể cảm thấy thoải mái.'},
  'story-quote':     {en:'Not a hotel. Not just a listing. A home.', vn:'Không phải khách sạn. Không chỉ là một chỗ ở. Mà là một ngôi nhà.'},
  'story-convert':   {en:'If this feels like the kind of place you\'d want to stay in Hanoi, you can explore our spaces below.', vn:'Nếu bạn cảm thấy đây là nơi phù hợp cho chuyến đi của mình, bạn có thể khám phá các không gian của MiaCasa bên dưới.'},
  'story-hanoi-subtitle': {en:'Quiet neighborhood · Close to Văn Miếu & Train Street', vn:'Khu phố yên tĩnh · Gần Văn Miếu & Phố Tàu'},
  'story-oq-subtitle': {en:'Right in the center · Walk to Hoàn Kiếm Lake', vn:'Ngay trung tâm · Đi bộ đến Hồ Hoàn Kiếm'},
  'story-seo-1':     {en:'MiaCasa is a small homestay in Hanoi built by locals who care deeply about how a space feels — whether it\'s a quiet room near the Train Station or a full apartment in the Old Quarter.', vn:'MiaCasa là một homestay nhỏ tại Hà Nội, được xây dựng bởi những người địa phương luôn quan tâm đến cảm giác không gian — dù là phòng yên tĩnh gần Ga Hà Nội hay căn hộ trọn vẹn ở Phố Cổ.'},
  'story-seo-2':     {en:'MiaCasa is a locally run homestay in Hanoi designed for travelers looking for a more personal stay — away from crowded tourist zones, close to local life.', vn:'MiaCasa là homestay địa phương tại Hà Nội, được thiết kế cho du khách muốn trải nghiệm cá nhân hơn — xa khu du lịch đông đúc, gần cuộc sống thực của người dân.'},
  'story-seo-3':     {en:'What started as a small idea has grown into two distinct homestays in Hanoi — one in the quieter Văn Miếu area, and one in the heart of the Old Quarter.', vn:'Một ý tưởng nhỏ đã phát triển thành hai homestay riêng biệt tại Hà Nội — một ở khu vực Văn Miếu yên tĩnh, và một ở trung tâm Phố Cổ.'},
  'story-seo-4':     {en:'Today, MiaCasa includes two homestays in Hanoi — one near Văn Miếu for a quieter stay, and one in the Old Quarter for those who want to be in the center of everything.', vn:'Hôm nay, MiaCasa bao gồm hai homestay tại Hà Nội — một gần Văn Miếu cho kỳ nghỉ yên tĩnh, và một ở Phố Cổ cho những ai muốn ở trung tâm mọi thứ.'},
  'story-how-title': {en:'How It Began', vn:'Mọi thứ bắt đầu như thế nào'},
  'story-how-p1':    {en:'The first space we worked on became what is now MiaCasa Hanoi.', vn:'Không gian đầu tiên mà chúng tôi thực hiện chính là MiaCasa Hanoi.'},
  'story-how-p2':    {en:'It wasn\'t perfect. The walls needed painting. The furniture was chosen piece by piece. Some things were changed more than once. It took time, effort, and a lot of small decisions that no one really sees.', vn:'Nó không hoàn hảo ngay từ đầu. Tường cần sơn lại, nội thất được chọn từng món một, có những thứ phải thay đổi nhiều lần. Tất cả mất thời gian, công sức, và rất nhiều quyết định nhỏ mà không ai thấy.'},
  'story-how-p3':    {en:'But that was the point. We didn\'t want to rush it. We wanted it to feel right.', vn:'Nhưng đó chính là điều chúng tôi mong muốn. Chúng tôi không làm vội. Chúng tôi muốn làm cho đúng.'},
  'story-building-title': {en:'Building MiaCasa', vn:'Xây dựng MiaCasa'},
  'story-building-p1': {en:'Creating a space that feels like home doesn\'t happen overnight.', vn:'Tạo ra một không gian có cảm giác như ở nhà không phải là chuyện một sớm một chiều.'},
  'story-building-p1b': {en:'It happens piece by piece, decision by decision.', vn:'Nó được hình thành từng chút một, từng quyết định nhỏ.'},
  'story-before-title': {en:'Before', vn:'Trước'},
  'story-before-desc': {en:'Empty walls. Raw space. A blank canvas.', vn:'Tường trống. Không gian thô. Một bức tranh trống.'},
  'story-messy-title': {en:'Messy Stage', vn:'Giai đoạn lộn xộn'},
  'story-messy-desc': {en:'Paint, tools, dust — real process.', vn:'Sơn, dụng cụ, bụi — quá trình thực sự.'},
  'story-furniture-title': {en:'Furniture Arriving', vn:'Bàn ghế đến'},
  'story-furniture-desc': {en:'Piece by piece, choice by choice.', vn:'Từng món một, từng lựa chọn.'},
  'story-during-title': {en:'During', vn:'Trong quá trình'},
  'story-during-desc': {en:'Painting. Arranging. Making it ours.', vn:'Sơn tường. Sắp xếp. Biến nó thành của chúng tôi.'},
  'story-after-title': {en:'Almost Finished', vn:'Gần hoàn thiện'},
  'story-after-desc': {en:'Warm, calm, and ready.', vn:'Ấm áp, yên tĩnh và sẵn sàng.'},
  'story-pause-1':   {en:'Slowly. Carefully. One detail at a time.', vn:'Chậm rãi. Cẩn trọng. Từng chi tiết một.'},
  'story-pause-2':   {en:'Piece by piece. Choice by choice.', vn:'Từng món một. Từng lựa chọn.'},
  'story-mission':   {en:'They didn\'t just want to create a place to stay — they wanted to create a space that feels calm, thoughtful, and genuinely lived in.', vn:'Họ không chỉ muốn tạo ra một nơi để ở — họ muốn tạo ra một không gian yên tĩnh, có chiều sâu và cảm giác thực sự sống động.'},
  'story-hosts-title': {en:'Meet the Hosts', vn:'Gặp gỡ chủ nhà'},
  'story-hosts-p1':  {en:'MiaCasa is built and run by Linh and Ngọc — long-time friends who became business partners through a shared vision.', vn:'MiaCasa được xây dựng và vận hành bởi Linh và Ngọc — hai người bạn lâu năm và hiện là đối tác kinh doanh.'},
  'story-linh-detail': {en:'Professional interior designer who focuses on creating spaces that feel calm, warm, and quietly beautiful — the kind of places she would want to stay in herself.', vn:'Nhà thiết kế nội thất chuyên nghiệp, tập trung tạo ra những không gian yên tĩnh, ấm áp và đẹp một cách nhẹ nhàng — nơi mà chính cô ấy cũng muốn ở.'},
  'story-ngoc-detail': {en:'Works in hospitality and brings a deep understanding of what guests actually need — from comfort to small thoughtful touches that make a stay memorable.', vn:'Làm việc trong ngành dịch vụ, thấu hiểu những gì khách thực sự cần — từ sự thoải mái đến những chi tiết nhỏ chu đáo làm nên kỳ nghỉ đáng nhớ.'},
  'story-hosts-p2':  {en:'Together, they built MiaCasa from scratch — learning, adjusting, and improving along the way. Linh shapes how it looks. Ngọc shapes how it feels.', vn:'Cùng nhau, họ xây dựng MiaCasa từ những bước đầu tiên — vừa làm, vừa học, vừa điều chỉnh. Linh định hình không gian. Ngọc định hình cảm giác.'},
  'story-hanoi-title': {en:'Building MiaCasa Hanoi', vn:'Xây dựng MiaCasa Hanoi'},
  'story-hanoi-p1':  {en:'MiaCasa Hanoi became a calm, quiet space — tucked away from the noise, but still close to everything that makes Hanoi special. It\'s designed for travelers who want a slower, more grounded stay. A place to come back to after a long day in the city.', vn:'MiaCasa Hanoi dần trở thành một không gian yên tĩnh, nhẹ nhàng — tách khỏi sự ồn ào nhưng vẫn đủ gần để khám phá Hà Nội. Đây là nơi dành cho những ai muốn một nhịp sống chậm hơn, một nơi để trở về sau một ngày dài.'},
  'story-hanoi-gallery': {en:'From Empty Space to MiaCasa Hanoi', vn:'Từ không gian trống đến MiaCasa Hanoi'},
  'story-oq-title':  {en:'Creating MiaCasa Old Quarter', vn:'Tạo nên MiaCasa Old Quarter'},
  'story-oq-p1':     {en:'After MiaCasa Hanoi, the idea was to create something with a different energy. That became MiaCasa Old Quarter.', vn:'Sau MiaCasa Hanoi, chúng tôi muốn tạo ra một không gian với năng lượng khác. Đó là MiaCasa Old Quarter.'},
  'story-oq-p2':     {en:'Here, the focus is not quiet — it\'s connection. A full apartment in the heart of the Old Quarter, surrounded by street food, night walks, and the constant rhythm of the city. It\'s designed for groups and families — people who want to experience Hanoi together.', vn:'Ở đây không phải là sự yên tĩnh — mà là sự kết nối. Một căn hộ trọn vẹn giữa lòng Phố Cổ, nơi mọi thứ luôn sống động: đồ ăn đường phố, những buổi tối dạo phố, và nhịp sống không ngừng. Phù hợp cho nhóm bạn và gia đình — những người muốn trải nghiệm Hà Nội cùng nhau.'},
  'story-oq-p3':     {en:'Same care. Different feeling.', vn:'Cùng một sự chăm chút. Nhưng một cảm giác khác.'},
  'story-oq-gallery': {en:'Bringing the Old Quarter Space to Life', vn:'Hành trình hoàn thiện không gian Phố Cổ'},
  'story-same-title': {en:'What Stays the Same', vn:'Những điều không thay đổi'},
  'story-same-p1':   {en:'Even though the spaces are different, the intention behind them is the same.', vn:'Dù mỗi không gian có một phong cách riêng, nhưng tinh thần vẫn giống nhau.'},
  'story-same-1':    {en:'Thoughtful spaces instead of over-designed ones', vn:'Không gian có sự chăm chút, không quá cầu kỳ'},
  'story-same-2':    {en:'Honest communication instead of scripted service', vn:'Giao tiếp chân thành, không theo kịch bản'},
  'story-same-3':    {en:'Real hospitality instead of transactions', vn:'Sự hiếu khách thật sự, không chỉ là dịch vụ'},
  'story-same-p2':   {en:'We also offer direct booking through this website — so guests can avoid platform fees and connect with us more directly.', vn:'Chúng tôi cũng cung cấp đặt phòng trực tiếp qua website này — giúp bạn tránh phí trung gian và kết nối dễ dàng hơn với chúng tôi.'},
  'story-different-title': {en:'What Makes Us Different', vn:'Điều gì làm nên sự khác biệt'},
  'story-diff-1-title': {en:'🎨 Designed by a professional', vn:'🎨 Thiết kế chuyên nghiệp'},
  'story-diff-1-desc': {en:'Interior designer behind every detail', vn:'Từng chi tiết đều được nhà thiết kế chăm chút'},
  'story-diff-2-title': {en:'🏠 Locally hosted', vn:'🏠 Chủ nhà tại chỗ'},
  'story-diff-2-desc': {en:'Not managed remotely. We\'re here.', vn:'Không qua trung gian. Chúng tôi ở đây.'},
  'story-diff-3-title': {en:'💰 Direct booking', vn:'💰 Đặt phòng trực tiếp'},
  'story-diff-3-desc': {en:'No platform fees, best rate', vn:'Không phí nền tảng, giá tốt nhất'},
  'story-diff-4-title': {en:'✨ Thoughtful details', vn:'✨ Chi tiết chu đáo'},
  'story-diff-4-desc': {en:'Small touches that make a difference', vn:'Những điều nhỏ tạo nên sự khác biệt'},
  'story-why-title': {en:'Why guests choose MiaCasa', vn:'Tại sao khách chọn MiaCasa'},
  'story-why-1-title': {en:'🎨 Designed with intention', vn:'🎨 Thiết kế có chủ ý'},
  'story-why-1-desc': {en:'Not just furnished — thoughtfully created', vn:'Không chỉ được trang bị — mà được tạo ra một cách chu đáo'},
  'story-why-2-title': {en:'🏠 Locally hosted', vn:'🏠 Chủ nhà tại chỗ'},
  'story-why-2-desc': {en:'Not managed remotely. We\'re here.', vn:'Không qua trung gian. Chúng tôi ở đây.'},
  'story-why-3-title': {en:'💰 Direct booking', vn:'💰 Đặt phòng trực tiếp'},
  'story-why-3-desc': {en:'No platform fees, best rate guaranteed', vn:'Không phí nền tảng, giá tốt nhất đảm bảo'},
  'story-why-4-title': {en:'✨ Spaces that feel lived-in', vn:'✨ Không gian sống động'},
  'story-why-4-desc': {en:'Real homes, not staged showrooms', vn:'Nhà thực sự, không phải phòng trưng bày'},
  'story-belief':    {en:'We believe where you stay should feel personal, not transactional.', vn:'Chúng tôi tin rằng nơi bạn ở nên mang lại cảm giác cá nhân, không chỉ là một giao dịch.'},
  'story-properties-title': {en:'Our Spaces', vn:'Không gian của chúng tôi'},
  'story-hanoi-bullet-1': {en:'Ideal for couples & solo travelers', vn:'Lý tưởng cho cặp đôi & khách solo'},
  'story-hanoi-bullet-2': {en:'3 private rooms with kitchenettes', vn:'3 phòng riêng với bếp nhỏ'},
  'story-hanoi-bullet-3': {en:'~5 min walk to Train Street', vn:'~5 phút đi bộ đến Phố Tàu'},
  'story-oq-bullet-1': {en:'Best for groups & families', vn:'Phù hợp cho nhóm & gia đình'},
  'story-oq-bullet-2': {en:'Entire 3-bedroom apartment, sleeps up to 6', vn:'Toàn bộ căn hộ 3 phòng ngủ, ngủ tối đa 6 người'},
  'story-oq-bullet-3': {en:'Open terrace', vn:'Sân thượng mở'},
  'story-growing-title': {en:'Always Improving', vn:'Không ngừng hoàn thiện'},
  'story-growing-p1': {en:'MiaCasa has welcomed guests from around the world, with a hosting experience built on care, consistency, and attention to detail.', vn:'MiaCasa đã chào đón khách từ khắp nơi trên thế giới, với trải nghiệm lưu trú được xây dựng trên sự quan tâm, nhất quán và chú trọng đến từng chi tiết.'},
  'story-growing-p2': {en:'The spaces are thoughtfully designed and well maintained. What continues to grow is the care, the warmth, and the small touches that turn a good stay into a memorable one.', vn:'Không gian được thiết kế chu đáo và bảo trì tốt. Điều tiếp tục phát triển là sự quan tâm, sự ấm áp và những điểm nhỏ làm nên một kỳ nghỉ đáng nhớ.'},
  'story-growing-p3': {en:'Each stay helps us refine the experience even further.', vn:'Mỗi lần lưu trú đều giúp chúng tôi hoàn thiện trải nghiệm hơn nữa.'},
  'story-growing-p4': {en:'When you stay with us, you\'re not just booking a room. You\'re stepping into a home we\'ve built with intention — and continue to look after, one detail at a time.', vn:'Khi bạn ở cùng chúng tôi, bạn không chỉ đặt một căn phòng. Bạn đang bước vào một ngôi nhà được xây dựng với chủ ý — và tiếp tục được chăm chút, từng chi tiết một.'},
  'story-growing-quote': {en:'We\'re glad you\'re here.', vn:'Chúng tôi rất vui vì bạn ở đây.'},
  'story-closing':   {en:'If you\'re planning a trip to Hanoi, we\'d love to host you.', vn:'Nếu bạn đang lên kế hoạch cho chuyến đi tới Hà Nội, chúng tôi rất mong được đón tiếp bạn.'},
  'story-closing-emphasis': {en:'Experience MiaCasa for yourself.', vn:'Trải nghiệm MiaCasa cho chính bạn.'},
  'story-closing-sub': {en:'Whether you\'re traveling solo, as a couple, or with family — there\'s a space for you.', vn:'Dù bạn đi một mình, cùng bạn đời hay cả gia đình — đều có không gian phù hợp cho bạn.'},
  'story-anchor':    {en:'A small homestay brand built in Hanoi by two friends who care about thoughtful spaces.', vn:'Một thương hiệu homestay nhỏ được xây dựng tại Hà Nội bởi hai người bạn, những người quan tâm đến không gian có chiều sâu.'},
  'story-cta-view-h': {en:'Explore MiaCasa Hanoi →', vn:'Khám phá MiaCasa Hà Nội →'},
  'story-cta-view-oq': {en:'Explore Old Quarter →', vn:'Khám phá Phố Cổ →'},
  'story-cta-avail': {en:'Check Availability', vn:'Xem lịch trống'},
  'story-cta-wa':    {en:'WhatsApp', vn:'WhatsApp'},
  'story-cta-h':     {en:'Explore MiaCasa Hanoi →', vn:'Khám phá MiaCasa Hà Nội →'},
  'story-cta-oq':    {en:'Explore MiaCasa Old Quarter →', vn:'Khám phá MiaCasa Phố Cổ →'},
  'story-before':    {en:'📷 Before', vn:'📷 Trước'},
  'story-during':    {en:'📷 During', vn:'📷 Trong quá trình'},
  'story-after':     {en:'📷 After', vn:'📷 Sau'},
  'story-oq-before': {en:'📷 Before', vn:'📷 Trước'},
  'story-oq-during': {en:'📷 During', vn:'📷 Trong quá trình'},
  'story-oq-after':  {en:'📷 After', vn:'📷 Sau'},
  'story-grounding': {en:'A small homestay brand built in Hanoi by two friends who care about thoughtful spaces.', vn:'Một thương hiệu homestay nhỏ được xây dựng tại Hà Nội bởi hai người bạn, những người quan tâm đến không gian có chiều sâu.'},

  /* ── FAQ ──────────────────────────────────────────────────────── */
  'faq-tag':         {en:"FAQ", vn:"Câu hỏi thường gặp"},
  'faq-title':       {en:"Frequently Asked<br><em>Questions</em>", vn:"Câu Hỏi<br><em>Thường Gặp</em>"},
  'faq-choosetitle': {en:'Not sure which property to choose?', vn:'Chưa biết chọn chỗ nghỉ nào?'},
  'faq-choose-oq':   {en:'Choose MiaCasa Old Quarter if you want to stay in the center, close to attractions and nightlife.', vn:'Chọn MiaCasa Phố Cổ nếu bạn muốn ở trung tâm, gần các điểm tham quan và cuộc sống về đêm.'},
  'faq-choose-h':    {en:'Choose MiaCasa Hanoi if you prefer a quieter, more local experience.', vn:'Chọn MiaCasa Hà Nội nếu bạn thích không khí yên tĩnh và đậm chất địa phương hơn.'},
  'faq-help-title':  {en:"Not sure which property to choose?", vn:"Không chắc nên chọn chỗ nghỉ nào?"},
  'faq-help-oq':     {en:"Choose MiaCasa Old Quarter if you want to stay in the center, close to attractions and nightlife", vn:"Chọn MiaCasa Phố Cổ nếu bạn muốn ở trung tâm, gần các điểm tham quan và cuộc sống về đêm"},
  'faq-help-h':      {en:"Choose MiaCasaHanoi if you prefer a quieter, more local experience", vn:"Chọn MiaCasaHanoi nếu bạn thích trải nghiệm yên tĩnh và đậm chất địa phương hơn"},
  
  /* ── FAQ ──────────────────────────────────────────────────────── */
  'faq-tag':         {en:"FAQ", vn:"Câu hỏi thường gặp"},
  'faq-title':       {en:"Frequently Asked<br><em>Questions</em>", vn:"Câu Hỏi<br><em>Thường Gặp</em>"},
  'faq-choosetitle': {en:'Not sure which property to choose?', vn:'Chưa biết chọn chỗ nghỉ nào?'},
  'faq-choose-oq':   {en:'Choose MiaCasa Old Quarter if you want to stay in the center, close to attractions and nightlife.', vn:'Chọn MiaCasa Phố Cổ nếu bạn muốn ở trung tâm, gần các điểm tham quan và cuộc sống về đêm.'},
  'faq-choose-h':    {en:'Choose MiaCasa Hanoi if you prefer a quieter, more local experience.', vn:'Chọn MiaCasa Hà Nội nếu bạn thích không khí yên tĩnh và đậm chất địa phương hơn.'},
  'faq-help-title':  {en:"Not sure which property to choose?", vn:"Không chắc nên chọn chỗ nghỉ nào?"},
  'faq-help-oq':     {en:"Choose MiaCasa Old Quarter if you want to stay in the center, close to attractions and nightlife", vn:"Chọn MiaCasa Phố Cổ nếu bạn muốn ở trung tâm, gần các điểm tham quan và cuộc sống về đêm"},
  'faq-help-h':      {en:"Choose MiaCasaHanoi if you prefer a quieter, more local experience", vn:"Chọn MiaCasaHanoi nếu bạn thích trải nghiệm yên tĩnh và đậm chất địa phương hơn"},
  'h-faq-q1':        {en:"How far is MiaCasaHanoi from the Old Quarter?", vn:"MiaCasaHanoi cách Phố Cổ bao xa?"},
  'h-faq-a1':        {en:"MiaCasaHanoi is about 10–15 minutes by Grab or taxi from the Old Quarter and Hoàn Kiếm Lake. Close enough to explore easily, while staying in a quieter, more local neighborhood.", vn:"MiaCasaHanoi cách Phố Cổ và Hồ Hoàn Kiếm khoảng 10–15 phút bằng Grab hoặc taxi. Gần đủ để dễ dàng khám phá, trong khi vẫn ở trong một khu phố yên tĩnh và đậm chất địa phương hơn."},
  'h-faq-q2':        {en:"Is the area quiet?", vn:"Khu vực có yên tĩnh không?"},
  'h-faq-a2':        {en:"Yes. The homestay is located in a peaceful residential area, away from busy tourist streets. Ideal if you prefer a calm environment after a day exploring Hanoi.", vn:"Có. Homestay nằm trong một khu dân cư yên tĩnh, cách xa những con phố du lịch tấp nập. Lý tưởng nếu bạn thích môi trường bình yên sau một ngày khám phá Hà Nội."},
  'h-faq-q3':        {en:"Is it near Railway Street?", vn:"Có gần Phố Tàu Hỏa không?"},
  'h-faq-a3':        {en:"Yes — within walking distance or a very short ride to Hanoi Railway Street. Convenient if you want to visit without staying in the crowded area.", vn:"Có — chỉ cần đi bộ hoặc đi xe rất ngắn đến Phố Tàu Hỏa Hà Nội. Rất tiện nếu bạn muốn ghé thăm nhưng không muốn ở trong khu đông đúc."},
  'h-faq-q4':        {en:"Is MiaCasaHanoi suitable for long stays or remote work?", vn:"MiaCasaHanoi có phù hợp cho lưu trú dài ngày hoặc làm việc từ xa không?"},
  'h-faq-a4':        {en:"Absolutely. Many guests choose this property for longer stays because of the quiet surroundings, comfortable rooms, and reliable WiFi.", vn:"Hoàn toàn phù hợp. Nhiều khách chọn chỗ nghỉ này cho kỳ lưu trú dài ngày vì không gian yên tĩnh, phòng thoải mái và WiFi ổn định."},
  'h-faq-q5':        {en:"Are there local food options nearby?", vn:"Gần đây có nhiều lựa chọn ăn uống địa phương không?"},
  'h-faq-a5':        {en:"Yes — plenty of authentic local eateries, cafés, and small shops within walking distance. A great area to experience everyday Hanoi life.", vn:"Có — rất nhiều quán ăn địa phương đích thực, quán cà phê và cửa hàng nhỏ trong tầm đi bộ. Khu vực tuyệt vời để trải nghiệm cuộc sống Hà Nội hàng ngày."},
  'h-faq-q6':        {en:"How do I check in?", vn:"Tôi nhận phòng như thế nào?"},
  'h-faq-a6':        {en:"We offer self check-in with clear instructions sent before your arrival. Simple and flexible, especially for late arrivals.", vn:"Chúng tôi cung cấp dịch vụ tự nhận phòng với hướng dẫn rõ ràng được gửi trước khi bạn đến. Đơn giản và linh hoạt, đặc biệt cho những người đến muộn."},
  'h-faq-q7':        {en:"Can I book directly through the website?", vn:"Tôi có thể đặt phòng trực tiếp qua website không?"},
  'h-faq-a7':        {en:"Yes. Booking directly gives you better rates compared to platforms like Airbnb or Booking.com.", vn:"Có. Đặt phòng trực tiếp qua website của chúng tôi sẽ cho bạn mức giá tốt hơn so với các nền tảng như Airbnb hoặc Booking.com."},
  'h-faq-q8':        {en:'❓ Is there a laundry?', vn:'❓ Có máy giặt không?'},
  'h-faq-a8':        {en:'Yes, free washing machine and dryer with detergent provided.', vn:'Có, máy giặt và máy sấy miễn phí kèm bột giặt.'},
  'oq-faq-q1':       {en:"Is MiaCasaOldQuarter located in the center of Hanoi?", vn:"MiaCasaOldQuarter có nằm ở trung tâm Hà Nội không?"},
  'oq-faq-a1':       {en:"Yes. The apartment is in the heart of the Old Quarter, within walking distance of Hoàn Kiếm Lake, night markets, and major attractions.", vn:"Có. Căn hộ nằm ngay trung tâm Phố Cổ, trong tầm đi bộ đến Hồ Hoàn Kiếm, chợ đêm và các điểm tham quan chính."},
  'oq-faq-q2':       {en:"Is it noisy at night?", vn:"Ban đêm có ồn không?"},
  'oq-faq-a2':       {en:"Being in the Old Quarter, the area can be lively, especially evenings and weekends. If you enjoy city energy, great fit. If you prefer quiet, MiaCasaHanoi may be a better option.", vn:"Ở Phố Cổ, khu vực có thể khá sôi động, đặc biệt vào buổi tối và cuối tuần. Nếu bạn thích năng lượng thành phố, rất phù hợp. Nếu bạn thích yên tĩnh, MiaCasaHanoi có thể là lựa chọn tốt hơn."},
  'oq-faq-q3':       {en:"Is this property suitable for families or groups?", vn:"Chỗ nghỉ này có phù hợp cho gia đình hoặc nhóm không?"},
  'oq-faq-a3':       {en:"Yes. The apartment has multiple beds and a spacious layout, making it ideal for families or small groups traveling together.", vn:"Có. Căn hộ có nhiều giường và bố cục rộng rãi, lý tưởng cho gia đình hoặc nhóm nhỏ đi cùng nhau."},
  'oq-faq-q4':       {en:"How far is it from Hoàn Kiếm Lake?", vn:"Cách Hồ Hoàn Kiếm bao xa?"},
  'oq-faq-a4':       {en:"Just a short walk — typically around 5 to 10 minutes depending on your pace.", vn:"Chỉ cần đi bộ một chút — thường khoảng 5 đến 10 phút tùy tốc độ của bạn."},
  'oq-faq-q5':       {en:"Are restaurants and cafés nearby?", vn:"Gần đây có nhà hàng và quán cà phê không?"},
  'oq-faq-a5':       {en:"You will be surrounded by some of the best food, cafés, and street eats Hanoi has to offer — all within walking distance.", vn:"Bạn sẽ được bao quanh bởi những món ăn ngon nhất Hà Nội, quán cà phê và ẩm thực đường phố — tất cả trong tầm đi bộ."},
  'oq-faq-q6':       {en:"How do I check in?", vn:"Tôi nhận phòng như thế nào?"},
  'oq-faq-a6':       {en:"We provide simple self check-in instructions before your arrival, so you can arrive at your convenience.", vn:"Chúng tôi cung cấp hướng dẫn tự nhận phòng đơn giản trước khi bạn đến, để bạn có thể đến theo sự tiện lợi của mình."},
  'oq-faq-q7':       {en:"Can I book directly for better prices?", vn:"Tôi có thể đặt trực tiếp để được giá tốt hơn không?"},
  'oq-faq-a7':       {en:"Yes. Direct bookings through our website are more affordable since they avoid third-party platform fees.", vn:"Có. Đặt phòng trực tiếp qua website thường có giá phải chăng hơn vì tránh được phí nền tảng bên thứ ba."},
  'hanoi-feel-title': {en:'🌅 Experience Hanoi differently', vn:'🌅 Trải nghiệm Hà Nội khác biệt'},
  'hanoi-feel-1':    {en:'☕ Quiet mornings away from traffic', vn:'☕ Buổi sáng yên tĩnh, xa khói bụi'},
  'hanoi-feel-2':    {en:'🏡 Live like a local in a real neighborhood', vn:'🏡 Sống như người địa phương'},
  'hanoi-feel-3':    {en:'🌿 Slower, more personal Hanoi experience', vn:'🌿 Trải nghiệm Hà Nội chậm rãi hơn'},

  /* ── COMPARE STAYS SECTION (homepage) ────────────────────────── */
  'compare-tag':     {en:'Compare Stays', vn:'So sánh chỗ nghỉ'},
  'compare-title': {en:'Not sure <em>which to choose?</em>', vn:'Chưa biết <em>nên chọn nơi nào?</em>'},
  'compare-sub':     {en:'Both are women-owned, locally run, and book direct for the best price. The difference is in the vibe.', vn:'Cả hai đều do phụ nữ làm chủ, vận hành địa phương, và đặt trực tiếp để có giá tốt nhất. Sự khác biệt nằm ở không khí.'},
  'compare-h-title': {en:'Quiet, local, residential', vn:'Yên tĩnh, đậm chất địa phương'},
  'compare-h-li1':   {en:'Near Train Street &amp; Văn Miếu', vn:'Gần Phố Tàu Hỏa &amp; Văn Miếu'},
  'compare-h-li2':   {en:'3 private en-suite rooms · up to 3 guests each', vn:'3 phòng riêng có phòng tắm · tối đa 3 khách mỗi phòng'},
  'compare-h-li3':   {en:'Best for couples, solo travelers, remote workers', vn:'Phù hợp cho cặp đôi, khách solo, người làm việc từ xa'},
  'compare-h-li4':   {en:'From <span id="compare-hanoi-price">750,000</span>₫ / night', vn:'Từ <span id="compare-hanoi-price">750.000</span>₫ / đêm'},
  'compare-h-cta':   {en:'Explore MiaCasa Hanoi →', vn:'Khám phá MiaCasa Hà Nội →'},
  'compare-oq-title':{en:'Central, vibrant, Old Quarter', vn:'Trung tâm, sôi động, Phố Cổ'},
  'compare-oq-li1':  {en:'Heart of Hoàn Kiếm · steps from the lake', vn:'Trung tâm Hoàn Kiếm · ngay cạnh hồ'},
  'compare-oq-li2':  {en:'Entire apartment · 3 queen beds · up to 6 guests', vn:'Toàn bộ căn hộ · 3 giường đôi · tối đa 6 khách'},
  'compare-oq-li3':  {en:'Best for families, groups, Old Quarter lovers', vn:'Phù hợp cho gia đình, nhóm bạn, người yêu Phố Cổ'},
  'compare-oq-li4':  {en:'From <span id="compare-oldquarter-price">1,200,000</span>₫ / night', vn:'Từ <span id="compare-oldquarter-price">1.200.000</span>₫ / đêm'},
  'compare-oq-cta':  {en:'Explore Old Quarter →', vn:'Khám phá MiaCasa Phố Cổ →'},

  /* ── CHOOSE YOUR STAY SELECTOR ─────────────────────────────────── */
  'choose-title':        {en:'Choose Your Stay', vn:'Chọn Chỗ Nghỉ Của Bạn'},
  'selector-oq-title':   {en:'Entire Apartment', vn:'Toàn Bộ Căn Hộ'},
  'selector-oq-desc':    {en:'MiaCasa Old Quarter · Hoàn Kiếm', vn:'MiaCasa Phố Cổ · Hoàn Kiếm'},
  'selector-oq-feat1':   {en:'3 queen beds · Sleeps up to 6', vn:'3 giường đôi · Ngủ tối đa 6 người'},
  'selector-oq-feat2':   {en:'Private terrace · Smart lock', vn:'Sân thượng riêng · Khóa thông minh'},
  'selector-oq-feat3':   {en:'Steps from Hoàn Kiếm Lake', vn:'Cách Hồ Hoàn Kiếm vài bước'},
  'selector-oq-btn':     {en:'Book Your Dates →', vn:'Đặt Ngày Của Bạn →'},
  'selector-h-title':    {en:'Rooms or Full Home', vn:'Phòng Hoặc Toàn Bộ Căn Hộ'},
  'selector-h-desc':     {en:'MiaCasa Hanoi · Văn Miếu', vn:'MiaCasa Hà Nội · Văn Miếu'},
  'selector-h-feat1':    {en:'3 private rooms · Up to 3 guests each', vn:'3 phòng riêng · Tối đa 3 khách mỗi phòng'},
  'selector-h-feat2':    {en:'Kitchenette · Free laundry', vn:'Bếp nhỏ · Giặt ủi miễn phí'},
  'selector-h-feat3':    {en:'5 min walk to Train Street', vn:'5 phút đi bộ đến Phố Tàu'},
  'selector-h-btn':      {en:'Book Your Dates →', vn:'Đặt Ngày Của Bạn →'},

  /* ── TRUST BADGES ──────────────────────────────────────────────── */
  'trust-instant':       {en:'✓ Instant confirmation', vn:'✓ Xác nhận ngay lập tức'},
  'trust-best-rate':     {en:'✓ Best rate guaranteed', vn:'✓ Giá tốt nhất đảm bảo'},
  'trust-support':       {en:'✓ Support within 2 hours', vn:'✓ Hỗ trợ trong 2 giờ'},

  /* ── UPDATED CTA BUTTONS ───────────────────────────────────────── */
  'secondary-book':      {en:'Book Your Dates →', vn:'Đặt Ngày Của Bạn →'},
  'booking-book-dates':  {en:'Book Your Dates →', vn:'Đặt Ngày Của Bạn →'},
  
  /* ── DIFFERENTIATORS STRIP ─────────────────────────────────────── */
  'diff-private':        {en:'🏠 Private stays, host nearby', vn:'🏠 Ở riêng tư, chủ nhà gần bên'},
  'diff-self':           {en:'🔓 Self check-in, arrive anytime', vn:'🔓 Tự nhận phòng, đến bất cứ lúc nào'},
  'diff-flex':           {en:'🛏️ Flexible: 1 room, 2 rooms, or full home', vn:'🛏️ Linh hoạt: 1 phòng, 2 phòng, hoặc cả căn hộ'},
  'diff-rate':           {en:'💰 Best rate when you book direct', vn:'💰 Giá tốt nhất khi đặt trực tiếp'},
};

/* ── Engine ────────────────────────────────────────────────────────────────── */
var currentLang = (function(){
  try{ return localStorage.getItem('mia_lang')||'en'; }catch(e){ return 'en'; }
})();

function setLang(lang){
    currentLang = lang;
    window.currentLang = lang;  // Make sure window.currentLang is also set
    
    // Save to localStorage
    try{ 
        localStorage.setItem('mia_lang', lang); 
    } catch(e){}
    
    // Update active button styles
    var en = document.getElementById('lang-en');
    var vn = document.getElementById('lang-vn');
    if(en) en.classList.toggle('active', lang === 'en');
    if(vn) vn.classList.toggle('active', lang === 'vn');
    
    // Apply translations to the page
    applyTranslations();
  
  // Re-render dynamic sections - ONLY if the grid exists on this page
  /* if (typeof renderProperties === 'function' && document.getElementById('properties-grid')) {
    renderProperties();  // Remove the false parameter
  } */
  if (typeof renderAmenities === 'function') renderAmenities();
  if (typeof renderBookingSelector === 'function' && document.getElementById('booking-prop-sel')) {
    renderBookingSelector();
  }
  if (typeof activeProp !== 'undefined' && typeof selectProp === 'function' && document.getElementById('properties-grid')) {
    try { selectProp(activeProp); } catch(e) {}
}
  
  // Force body class or attribute to help with any CSS-based language rules
  document.documentElement.setAttribute('data-lang', lang);
}

function applyTranslations(){
    var lang = currentLang;
    
    // data-t → textContent
    document.querySelectorAll('[data-t]').forEach(function(el){
        var e = TRANSLATIONS[el.getAttribute('data-t')];
        if(e && e[lang]!==undefined) el.textContent = e[lang];
    });
    
    // data-th → innerHTML
    document.querySelectorAll('[data-th]').forEach(function(el){
        var e = TRANSLATIONS[el.getAttribute('data-th')];
        if(e && e[lang]!==undefined) el.innerHTML = e[lang];
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-t-placeholder]').forEach(function(el){
        var key = el.getAttribute('data-t-placeholder');
        var e = TRANSLATIONS[key];
        if(e && e[lang]!==undefined) el.placeholder = e[lang];
    });
    
    // Translate select options
    document.querySelectorAll('select option[data-t]').forEach(function(opt){
        var key = opt.getAttribute('data-t');
        var e = TRANSLATIONS[key];
        if(e && e[lang]!==undefined) opt.textContent = e[lang];
    });
    
    // ADD THIS - Re-render properties when language changes
    if (typeof renderProperties === 'function' && document.getElementById('properties-grid')) {
        try {
            renderProperties();
            console.log('Properties re-rendered after language change');
        } catch(e) {
            console.warn('Failed to re-render properties:', e.message);
        }
    }
    
    // Re-run FAQ toggle display to ensure content is visible after translation
    document.querySelectorAll('.faq-item.open .faq-a').forEach(function(el){
        el.style.maxHeight = el.scrollHeight + 'px';
    });
    
    // page-specific hooks
    _hooks.forEach(function(fn){ 
        try{ 
            fn(lang); 
        } catch(e){ 
            console.warn('hook err:', e.message); 
        } 
    });
}

var _hooks = [];
function registerTranslationHook(fn){ _hooks.push(fn); }

// Register hooks for FAQ and Rules translation
registerTranslationHook(function(lang) {
  // Re-translate FAQ questions and answers
  document.querySelectorAll('.faq-q').forEach(function(btn) {
    var questionSpan = btn.querySelector('span:first-child');
    if (questionSpan && questionSpan.hasAttribute('data-t')) {
      var key = questionSpan.getAttribute('data-t');
      var e = TRANSLATIONS[key];
      if (e && e[lang] !== undefined) {
        var currentText = questionSpan.innerHTML;
        var hasEmoji = currentText.match(/^[❓\s]*/);
        if (hasEmoji && hasEmoji[0]) {
          questionSpan.innerHTML = hasEmoji[0] + ' ' + e[lang];
        } else {
          questionSpan.textContent = e[lang];
        }
      }
    }
  });
  
  // Re-translate FAQ answers
  document.querySelectorAll('.faq-a p').forEach(function(p) {
    if (p.hasAttribute('data-t')) {
      var key = p.getAttribute('data-t');
      var e = TRANSLATIONS[key];
      if (e && e[lang] !== undefined) p.textContent = e[lang];
    }
  });
  
  // Re-translate House Rules
  document.querySelectorAll('.rule-card .rule-title, .rule-card .rule-list li').forEach(function(el) {
    if (el.hasAttribute('data-t')) {
      var key = el.getAttribute('data-t');
      var e = TRANSLATIONS[key];
      if (e && e[lang] !== undefined) {
        if (el.tagName === 'LI') {
          var hasPrefix = el.innerHTML.match(/^[•\-\s]*/);
          if (hasPrefix) {
            el.innerHTML = hasPrefix[0] + ' ' + e[lang];
          } else {
            el.textContent = e[lang];
          }
        } else {
          el.textContent = e[lang];
        }
      }
    }
  });
});

// Register hook for Our Story page
registerTranslationHook(function(lang) {
  var storyElements = [
    'story-hero-title', 'story-hero-subtitle', 'story-tag', 'story-h1', 'story-lead',
    'story-back', 'story-p1', 'story-mobile-line1', 'story-mobile-line2', 'story-mobile-line3',
    'story-mobile-line4', 'story-mobile-line5', 'story-mobile-line6', 'story-mobile-line7',
    'story-mobile-line8', 'story-mobile-line9', 'story-p1-line1', 'story-p1-line2', 'story-p1-line3',
    'story-p1-line4', 'story-quote', 'story-how-title', 'story-how-p1', 'story-how-p2', 'story-how-p3',
    'story-building-title', 'story-building-p1', 'story-building-p1b', 'story-pause-2',
    'story-before-title', 'story-before-desc', 'story-messy-title', 'story-messy-desc',
    'story-furniture-title', 'story-furniture-desc', 'story-after-title', 'story-after-desc',
    'story-pause-1', 'story-different-title', 'story-diff-1-title', 'story-diff-1-desc',
    'story-diff-2-title', 'story-diff-2-desc', 'story-diff-3-title', 'story-diff-3-desc',
    'story-diff-4-title', 'story-diff-4-desc', 'story-why-title', 'story-why-1-title',
    'story-why-1-desc', 'story-why-2-title', 'story-why-2-desc', 'story-why-3-title',
    'story-why-3-desc', 'story-why-4-title', 'story-why-4-desc', 'story-properties-title',
    'story-hanoi-subtitle', 'story-oq-subtitle', 'story-hanoi-bullet-1', 'story-hanoi-bullet-2',
    'story-hanoi-bullet-3', 'story-oq-bullet-1', 'story-oq-bullet-2', 'story-oq-bullet-3',
    'story-hanoi-title', 'story-hanoi-p1', 'story-hanoi-gallery', 'story-oq-title', 'story-oq-p1',
    'story-oq-p2', 'story-oq-p3', 'story-oq-gallery', 'story-hosts-title', 'story-hosts-p1',
    'story-linh-detail', 'story-ngoc-detail', 'story-hosts-p2', 'story-same-title', 'story-same-p1',
    'story-same-1', 'story-same-2', 'story-same-3', 'story-same-p2', 'story-belief',
    'story-growing-title', 'story-growing-p1', 'story-growing-p2', 'story-growing-p3',
    'story-growing-p4', 'story-growing-quote', 'story-closing-emphasis', 'story-closing-sub',
    'story-cta-view-h', 'story-cta-view-oq', 'story-cta-avail', 'story-cta-wa',
    'story-before', 'story-during', 'story-after', 'story-oq-before', 'story-oq-during', 'story-oq-after'
  ];
  
  storyElements.forEach(function(key) {
    var elements = document.querySelectorAll('[data-t="' + key + '"], [data-th="' + key + '"]');
    elements.forEach(function(el) {
      var e = TRANSLATIONS[key];
      if (e && e[lang] !== undefined) {
        if (el.hasAttribute('data-th')) {
          el.innerHTML = e[lang];
        } else {
          el.textContent = e[lang];
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function(){
  // Get saved language or default to 'en'
  var savedLang = 'en';
  try{ 
    savedLang = localStorage.getItem('mia_lang') || 'en'; 
  } catch(e){}
  
  // Set the language (this will update buttons and content)
  setLang(savedLang);
  
  // Double-check button states after a short delay (fixes sync issues)
  setTimeout(function() {
    var en = document.getElementById('lang-en');
    var vn = document.getElementById('lang-vn');
    if(en && vn) {
      en.classList.toggle('active', currentLang === 'en');
      vn.classList.toggle('active', currentLang === 'vn');
    }
  }, 50);
});