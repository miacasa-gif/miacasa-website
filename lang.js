/**
 * MiaCasa — Global Translation System  (lang.js)
 * Include this on every page BEFORE any page-specific scripts.
 * 
 * HTML elements use:
 *   data-t="key"   → el.textContent = translation
 *   data-th="key"  → el.innerHTML   = translation  (for <em>, <br> etc.)
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
  'nav-avail-btn':   {en:'Check Availability', vn:'Kiểm tra lịch trống'},
  'nav-avail-h':     {en:'Check Availability — Hanoi',   vn:'Lịch trống — Hà Nội'},
  'nav-avail-oq':    {en:'Check Availability — Old Quarter', vn:'Lịch trống — Phố Cổ'},

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
  'sec-stays':       {en:'Our Homestays in Hanoi',       vn:'Chỗ nghỉ của chúng tôi tại Hà Nội'},
  'stays-title':     {en:'Two stays, <em>one spirit</em>', vn:'Hai nơi, <em>một tinh thần</em>'},
  'stays-sub':       {en:'Choose the quiet neighbourhood charm of MiaCasa Hanoi, or the electric energy of MiaCasa Old Quarter.',
                      vn:'Chọn sự yên tĩnh của MiaCasa Hà Nội, hoặc năng lượng sôi động của MiaCasa Phố Cổ.'},
  'card-h-cta':      {en:'Explore MiaCasa Hanoi →',      vn:'Khám phá MiaCasa Hà Nội →'},
  'card-oq-cta':     {en:'Explore MiaCasa Old Quarter →', vn:'Khám phá MiaCasa Phố Cổ →'},

  /* ── HOMEPAGE WHY BOOK DIRECT ─────────────────────────────────── */
  'sec-direct':      {en:'Why Book Direct',              vn:'Tại sao đặt trực tiếp'},
  'direct-title':    {en:'Better rates,<br><em>direct connection</em>', vn:'Giá tốt hơn,<br><em>kết nối trực tiếp</em>'},
  'direct-1':        {en:'Save 10–15% compared to booking platforms',  vn:'Tiết kiệm 10–15% so với các nền tảng đặt phòng'},
  'direct-2':        {en:'Direct support via WhatsApp',                vn:'Hỗ trợ trực tiếp qua WhatsApp'},
  'direct-3':        {en:'Flexible check-in and personalized help',    vn:'Check-in linh hoạt và hỗ trợ cá nhân hoá'},
  'direct-4':        {en:'No hidden fees',                             vn:'Không phí ẩn'},

  /* ── CONTACT FORM ──────────────────────────────────────────── */
  'invoice-text':   {en:'Need an invoice for your stay?', vn:'Cần hóa đơn cho kỳ lưu trú của bạn?'},
'invoice-link':   {en:'Click here →', vn:'Bấm vào đây →'},


  /* ── HOMEPAGE FINAL CTA ───────────────────────────────────────── */
  'final-title':     {en:'Ready to plan your stay<br><em>in Hanoi?</em>', vn:'Sẵn sàng lên kế hoạch<br><em>tại Hà Nội?</em>'},
  'final-cta1':      {en:'Check availability at MiaCasa Hanoi →',         vn:'Kiểm tra lịch trống MiaCasa Hà Nội →'},
  'final-cta2':      {en:'Check availability at Old Quarter →',            vn:'Kiểm tra lịch trống Phố Cổ →'},

  /* ── HOMEPAGE SEO TEXT BLOCK ──────────────────────────────────── */
  'seo-block':       {en:'Looking for a homestay or apartment in Hanoi? Book direct at MiaCasa — <a href="miacasa-hanoi.html" style="color:var(--terracotta);text-decoration:none;">private rooms near Hanoi Railway Station</a> and a <a href="miacasa-oldquarter.html" style="color:var(--terracotta);text-decoration:none;">3-bedroom apartment in the Old Quarter, Hoàn Kiếm</a>. No platform fees. Best rate guaranteed.',
                      vn:'Tìm homestay hoặc căn hộ tại Hà Nội? Đặt trực tiếp tại MiaCasa — chỗ nghỉ boutique gần Ga Hà Nội và trong Phố Cổ Hoàn Kiếm. Không phí nền tảng. Giá tốt nhất được đảm bảo.'},

  /* ── MIACASA HANOI PAGE ───────────────────────────────────────── */
  'h-tag':           {en:'MiaCasa Hanoi · Văn Miếu, Hanoi',     vn:'MiaCasa Hà Nội · Văn Miếu, Hà Nội'},
  'h-h1':            {en:'A Calm Stay Near<br><em>Hanoi Railway Station</em>', vn:'Chỗ Nghỉ Yên Tĩnh Gần<br><em>Ga Hà Nội</em>'},
  'h-sub':           {en:'Located near Văn Miếu and the Train Street area — a peaceful base to explore Hanoi.',
                      vn:'Nằm gần Văn Miếu và khu vực Phố Tàu Hỏa — điểm xuất phát yên tĩnh để khám phá Hà Nội.'},
  'h-cta1':          {en:'Check Availability',            vn:'Kiểm tra lịch trống'},
  'h-cta2':          {en:'Book via WhatsApp',             vn:'Đặt qua WhatsApp'},
  'h-about-tag':     {en:'About the Stay',                vn:'Về chỗ nghỉ'},
  'h-about-title':   {en:'A quiet, local<br><em>stay in Hanoi</em>', vn:'Chỗ nghỉ yên tĩnh,<br><em>đậm chất địa phương</em>'},
  'h-about-p1':      {en:"MiaCasaHanoi is designed for travelers who want a quieter, more local experience while staying close to Hanoi's main attractions.",
                      vn:'MiaCasaHanoi được thiết kế cho những du khách muốn trải nghiệm yên tĩnh, đậm chất địa phương hơn trong khi vẫn gần các điểm tham quan chính của Hà Nội.'},
  'h-about-p2':      {en:'Located near Hanoi Railway Station and Văn Miếu – Quốc Tử Giám, the property offers easy access to the Old Quarter without the constant noise and crowds.',
                      vn:'Nằm gần Ga Hà Nội và Văn Miếu – Quốc Tử Giám, chỗ nghỉ cung cấp khả năng tiếp cận dễ dàng đến Phố Cổ mà không có tiếng ồn và đông người.'},
  'h-about-p3':      {en:'Each room is thoughtfully designed with natural light, wooden accents, and a warm, minimalist aesthetic.',
                      vn:'Mỗi phòng được thiết kế tinh tế với ánh sáng tự nhiên, điểm nhấn gỗ và thẩm mỹ tối giản ấm áp.'},
  'h-who-tag':       {en:'Perfect For',                   vn:'Phù hợp cho'},
  'h-who-title':     {en:'Who <em>stays here</em>',       vn:'Ai <em>phù hợp</em>'},
  'h-who-1':         {en:'Couples looking for a calm stay', vn:'Các cặp đôi tìm kiếm chỗ nghỉ yên tĩnh'},
  'h-who-2':         {en:'Solo travelers and digital nomads', vn:'Khách solo và người làm việc từ xa'},
  'h-who-3':         {en:'Guests who prefer local neighborhoods over tourist-heavy areas', vn:'Khách thích khu phố địa phương hơn khu vực du lịch đông đúc'},
  'h-rooms-tag':     {en:'Rooms',                         vn:'Phòng nghỉ'},
  'h-rooms-title':   {en:'Three private<br><em>rooms</em>', vn:'Ba phòng<br><em>riêng tư</em>'},
  'h-rooms-sub':     {en:'Each room has an en-suite bathroom and kitchenette, designed with simplicity and natural materials.',
                      vn:'Mỗi phòng có phòng tắm riêng và bếp nhỏ, được thiết kế đơn giản với vật liệu tự nhiên.'},
  'h-room1':         {en:'🌸 Spring Room — light, airy, and calming', vn:'🌸 Phòng Xuân — sáng, thoáng và thư thái'},
  'h-room2':         {en:'☀️ Summer Room — warm tones with a cozy feel', vn:'☀️ Phòng Hạ — tông ấm với cảm giác ấm cúng'},
  'h-room3':         {en:'🍂 Autumn Room — soft, relaxed, and restful', vn:'🍂 Phòng Thu — nhẹ nhàng, thư giãn và nghỉ ngơi'},
  'h-amen-tag':      {en:"What's Included",               vn:'Tiện nghi'},
  'h-amen-title':    {en:'Every comfort,<br><em>thoughtfully provided</em>', vn:'Mọi tiện nghi,<br><em>được chuẩn bị chu đáo</em>'},
  'h-am1':           {en:'High-speed WiFi',               vn:'WiFi tốc độ cao'},
  'h-am1s':          {en:'100 Mbps — great for remote work', vn:'100 Mbps — phù hợp làm việc từ xa'},
  'h-am2':           {en:'Air conditioning & fan',        vn:'Điều hoà & quạt'},
  'h-am2s':          {en:'Climate control in every room', vn:'Kiểm soát nhiệt độ trong mỗi phòng'},
  'h-am3':           {en:'Ensuite private bathroom',      vn:'Phòng tắm riêng'},
  'h-am3s':          {en:'Premium toiletries & fluffy towels', vn:'Dụng cụ vệ sinh cao cấp & khăn tắm mềm mại'},
  'h-am4':           {en:'In-room kitchenette',           vn:'Bếp nhỏ trong phòng'},
  'h-am4s':          {en:'Mini fridge, kettle & cooking basics', vn:'Tủ lạnh mini, ấm đun & dụng cụ nấu ăn cơ bản'},
  'h-am5':           {en:'Self check-in 24h',             vn:'Tự nhận phòng 24h'},
  'h-am5s':          {en:'Code lockbox — arrive any time', vn:'Hộp khoá bảo mật — đến bất cứ lúc nào'},
  'h-am6':           {en:'Café downstairs',               vn:'Quán cà phê tầng dưới'},
  'h-am6s':          {en:'Your daily coffee ritual sorted', vn:'Thói quen cà phê sáng được đảm bảo'},
  'h-am7':           {en:'Local guide & curated map',     vn:'Bản đồ địa phương'},
  'h-am7s':          {en:'Hidden gems, cafés & tips from the host', vn:'Địa điểm ẩn, quán cà phê & mẹo từ chủ nhà'},
  'h-loc-tag':       {en:'Location',                      vn:'Vị trí'},
  'h-loc-title':     {en:'Near Train Street<br><em>& Old Quarter</em>', vn:'Gần Phố Tàu Hỏa<br><em>& Phố Cổ</em>'},
  'h-loc-addr':      {en:'📍 92 Ngh. 51 Ng. Linh Quang, Văn Chương, Hanoi — 5 minutes to Train Street · Close to Hanoi Railway Station · Easy access to Old Quarter and Hoan Kiem.',
                      vn:'📍 92 Ngh. 51 Ng. Linh Quang, Văn Chương, Hà Nội — 5 phút đến Phố Tàu Hỏa · Gần Ga Hà Nội · Dễ dàng tiếp cận Phố Cổ và Hồ Hoàn Kiếm.'},
  'h-loc-seo':       {en:'Staying near Hanoi Railway Station means you are 5–10 minutes from the Old Quarter, close to Văn Miếu (Temple of Literature), and well connected for trains and day trips.',
                      vn:'Ở gần Ga Hà Nội nghĩa là bạn chỉ cách Phố Cổ 5–10 phút, gần Văn Miếu (Quốc Tử Giám) và thuận tiện đi tàu và các chuyến tham quan.'},
  'h-book-tag':      {en:'Reservations',                  vn:'Đặt phòng'},
  'h-book-title':    {en:'Book your <em>stay</em>',       vn:'Đặt <em>phòng ngay</em>'},
  'h-book-sub':      {en:'Book your stay in Hanoi direct — select your dates below or message us on WhatsApp for the best rate.',
                      vn:'Đặt phòng trực tiếp tại Hà Nội — chọn ngày bên dưới hoặc nhắn tin qua WhatsApp để có giá tốt nhất.'},
  'h-book-note':     {en:'From 750,000₫/night · Direct booking homestay Hanoi — best rate, no platform fees',
                      vn:'Từ 750.000₫/đêm · Đặt trực tiếp homestay Hà Nội — giá tốt nhất, không phí nền tảng'},
  'h-cta-wa':        {en:'📱 Book via WhatsApp',          vn:'📱 Đặt qua WhatsApp'},
  'h-cta-av':        {en:'Check Availability',            vn:'Kiểm tra lịch trống'},
  'h-cross-name':    {en:'Also explore: MiaCasa Old Quarter', vn:'Cũng khám phá: MiaCasa Phố Cổ'},
  'h-cross-sub':     {en:'Old Quarter · Hoan Kiem · Entire apartment for groups', vn:'Phố Cổ · Hoàn Kiếm · Toàn bộ căn hộ cho nhóm'},

  /* ── MIACASA OLDQUARTER PAGE ──────────────────────────────────── */
  'oq-tag':          {en:'MiaCasa Old Quarter · Hoan Kiem, Hanoi', vn:'MiaCasa Phố Cổ · Hoàn Kiếm, Hà Nội'},
  'oq-h1':           {en:'Stay in the Heart<br><em>of Hoàn Kiếm</em>', vn:'Ở Ngay Trung Tâm<br><em>Hoàn Kiếm</em>'},
  'oq-sub':          {en:"A full apartment in Hanoi's Old Quarter — perfect for groups and families.",
                      vn:'Toàn bộ căn hộ trong Phố Cổ Hà Nội — hoàn hảo cho nhóm và gia đình.'},
  'oq-cta1':         {en:'Check Availability',            vn:'Kiểm tra lịch trống'},
  'oq-cta2':         {en:'Book via WhatsApp',             vn:'Đặt qua WhatsApp'},
  'oq-about-tag':    {en:'About the Stay',                vn:'Về chỗ nghỉ'},
  'oq-about-title':  {en:'In the vibrant<br><em>Old Quarter</em>', vn:'Trong<br><em>Phố Cổ sôi động</em>'},
  'oq-about-p1':     {en:"Located in the vibrant Old Quarter, MiaCasa Old Quarter places you right in the center of Hanoi's culture, food, and nightlife.",
                      vn:'Nằm trong Phố Cổ sôi động, MiaCasa Old Quarter đặt bạn ngay trung tâm văn hóa, ẩm thực và cuộc sống về đêm của Hà Nội.'},
  'oq-about-p2':     {en:'The apartment features three queen beds, making it ideal for families or small groups who want to stay together in one comfortable space.',
                      vn:'Căn hộ có ba giường đôi, lý tưởng cho gia đình hoặc nhóm nhỏ muốn ở cùng nhau trong một không gian thoải mái.'},
  'oq-about-p3':     {en:'Step outside and you are instantly surrounded by local cafés, street food, and historic streets.',
                      vn:'Bước ra ngoài là ngay lập tức bao quanh bởi quán cà phê địa phương, đồ ăn đường phố và những con phố lịch sử.'},
  'oq-who-tag':      {en:'Perfect For',                   vn:'Phù hợp cho'},
  'oq-who-title':    {en:'Who <em>stays here</em>',       vn:'Ai <em>phù hợp</em>'},
  'oq-who-1':        {en:'Families',                      vn:'Gia đình'},
  'oq-who-2':        {en:'Groups of friends',             vn:'Nhóm bạn bè'},
  'oq-who-3':        {en:'Travelers who want to stay in the center of everything', vn:'Du khách muốn ở ngay trung tâm mọi thứ'},
  'oq-apt-tag':      {en:'The Apartment',                 vn:'Căn hộ'},
  'oq-apt-title':    {en:'Entire apartment,<br><em>yours alone</em>', vn:'Toàn bộ căn hộ,<br><em>của riêng bạn</em>'},
  'oq-apt-sub':      {en:'Complete privacy for your group — across two levels with an open terrace above the Old Quarter.',
                      vn:'Sự riêng tư hoàn toàn cho nhóm — trên hai tầng với sân thượng mở nhìn ra Phố Cổ.'},
  'oq-feat1':        {en:'🛏️ 3 Queen Beds',               vn:'🛏️ 3 Giường Đôi'},
  'oq-feat1s':       {en:'2 on main level + 1 attic bed — sleeps up to 6', vn:'2 tầng chính + 1 gác xép — ngủ tối đa 6 người'},
  'oq-feat2':        {en:'🌿 Open Terrace',               vn:'🌿 Sân thượng mở'},
  'oq-feat2s':       {en:'Your quiet corner above the Old Quarter', vn:'Góc thư giãn của bạn trên Phố Cổ'},
  'oq-feat3':        {en:'🔒 Smart Lock',                 vn:'🔒 Khoá thông minh'},
  'oq-feat3s':       {en:'Keypad entry — arrive any time, no key needed', vn:'Nhập mã — đến bất cứ lúc nào, không cần chìa khoá'},
  'oq-amen-tag':     {en:"What's Included",               vn:'Tiện nghi'},
  'oq-amen-title':   {en:'Everything you need,<br><em>right here</em>', vn:'Mọi thứ bạn cần,<br><em>ngay tại đây</em>'},
  'oq-am1':          {en:'High-speed WiFi',               vn:'WiFi tốc độ cao'},
  'oq-am1s':         {en:'100 Mbps — great for remote work', vn:'100 Mbps — phù hợp làm việc từ xa'},
  'oq-am2':          {en:'Air conditioning',              vn:'Điều hoà'},
  'oq-am2s':         {en:'Climate control throughout',    vn:'Kiểm soát nhiệt độ toàn căn hộ'},
  'oq-am3':          {en:'Full apartment access',         vn:'Toàn bộ căn hộ'},
  'oq-am3s':         {en:'Complete privacy — just your group', vn:'Riêng tư hoàn toàn — chỉ nhóm của bạn'},
  'oq-am4':          {en:'Open outdoor terrace',          vn:'Sân thượng mở'},
  'oq-am4s':         {en:'Your quiet corner above the Old Quarter', vn:'Góc thư giãn của bạn trên Phố Cổ'},
  'oq-am5':          {en:'Smart lock · Self check-in',    vn:'Khoá thông minh · Tự nhận phòng'},
  'oq-am5s':         {en:'Keypad entry — arrive any time', vn:'Nhập mã — đến bất cứ lúc nào'},
  'oq-am6':          {en:'White noise machine',           vn:'Máy tạo tiếng ồn trắng'},
  'oq-am6s':         {en:'Helps mask street noise for better sleep', vn:'Giúp che tiếng ồn đường phố, ngủ ngon hơn'},
  'oq-am7':          {en:'Street food at your door',      vn:'Đồ ăn đường phố ngay cửa'},
  'oq-am7s':         {en:'The best of Hanoi within walking distance', vn:'Tinh hoa ẩm thực Hà Nội trong tầm đi bộ'},
  'oq-loc-tag':      {en:'Location',                      vn:'Vị trí'},
  'oq-loc-title':    {en:'Heart of<br><em>Hoan Kiem & Old Quarter</em>', vn:'Trung tâm<br><em>Hoàn Kiếm & Phố Cổ</em>'},
  'oq-loc-addr':     {en:'📍 38 P. Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm, Hanoi — Walking distance to Hoan Kiem Lake · Surrounded by cafés and street food · Central location for all major attractions.',
                      vn:'📍 38 P. Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm, Hà Nội — Đi bộ đến Hồ Hoàn Kiếm · Bao quanh bởi quán cà phê và đồ ăn đường phố · Vị trí trung tâm cho tất cả điểm tham quan chính.'},
  'oq-loc-seo':      {en:'Staying in Hoàn Kiếm means walking distance to Hoàn Kiếm Lake, easy access to night markets and street food, and a fully immersive Old Quarter experience.',
                      vn:'Ở Hoàn Kiếm nghĩa là đi bộ đến Hồ Hoàn Kiếm, dễ dàng tiếp cận chợ đêm và đồ ăn đường phố, và trải nghiệm Phố Cổ hoàn toàn sâu sắc.'},
  'oq-book-tag':     {en:'Reservations',                  vn:'Đặt phòng'},
  'oq-book-title':   {en:'Book your <em>stay</em>',       vn:'Đặt <em>phòng ngay</em>'},
  'oq-book-sub':     {en:'Book this Old Quarter apartment direct — check availability below or message us for the best rate.',
                      vn:'Đặt căn hộ Phố Cổ trực tiếp — kiểm tra lịch trống bên dưới hoặc nhắn tin qua WhatsApp để có giá tốt nhất.'},
  'oq-book-note':    {en:'From 1,200,000₫/night · Apartment in Old Quarter Hanoi for rent — direct booking, best price guaranteed',
                      vn:'Từ 1.200.000₫/đêm · Thuê căn hộ Phố Cổ Hà Nội — đặt trực tiếp, giá tốt nhất'},
  'oq-cta-wa':       {en:'📱 Book via WhatsApp',          vn:'📱 Đặt qua WhatsApp'},
  'oq-cta-av':       {en:'Check Availability',            vn:'Kiểm tra lịch trống'},
  'oq-cross-name':   {en:'Also explore: MiaCasa Hanoi',   vn:'Cũng khám phá: MiaCasa Hà Nội'},
  'oq-cross-sub':    {en:'Near Train Street · Private rooms · Ideal for couples & solo travellers', vn:'Gần Phố Tàu Hỏa · Phòng riêng · Lý tưởng cho cặp đôi & khách solo'},

  /* ── OUR STORY PAGE ───────────────────────────────────────────── */
  'story-tag':       {en:'MiaCasa Homestays',             vn:'MiaCasa Homestays'},
  'story-h1':        {en:'Our <em>Story</em>',            vn:'Câu Chuyện<br><em>Của Chúng Tôi</em>'},
  'story-lead':      {en:'MiaCasa is a women-owned small business built with a simple idea — to create a place where guests feel genuinely welcome.',
                      vn:'MiaCasa là doanh nghiệp nhỏ do phụ nữ làm chủ, được xây dựng với ý tưởng đơn giản — tạo nên nơi mà khách cảm thấy thực sự được chào đón.'},
  'story-back':      {en:'← Back to MiaCasa Homestays',   vn:'← Quay lại MiaCasa Homestays'},
  'st-p1':           {en:'What started as a personal project has grown into a small collection of homes in Hanoi, each designed with care, warmth, and attention to detail.',
                      vn:'Từ một dự án cá nhân, MiaCasa dần phát triển thành tập hợp nhỏ những ngôi nhà tại Hà Nội, mỗi nơi được thiết kế với sự chăm chút, ấm áp và chú ý đến từng chi tiết.'},
  'st-p2':           {en:'We focus on what matters most: clean, comfortable spaces, honest and transparent communication, and a stay that feels easy and relaxed.',
                      vn:'Chúng tôi tập trung vào những gì quan trọng nhất: không gian sạch sẽ và thoải mái, giao tiếp trung thực và minh bạch, và kỳ lưu trú nhẹ nhàng và thư giãn.'},
  'st-p3':           {en:'Every guest matters to us. We are not a large hotel chain — and that is intentional.',
                      vn:'Mỗi khách đều quan trọng với chúng tôi. Chúng tôi không phải chuỗi khách sạn lớn — và điều đó là có chủ ý.'},
  'st-p4':           {en:'We believe in thoughtful hospitality, where small details make a big difference.',
                      vn:'Chúng tôi tin vào sự hiếu khách chu đáo, nơi những chi tiết nhỏ tạo ra sự khác biệt lớn.'},
  'st-sign':         {en:'We look forward to hosting you in Hanoi.',  vn:'Chúng tôi rất mong được đón tiếp bạn tại Hà Nội.'},
  'st-cta':          {en:'Book your stay →',              vn:'Đặt phòng ngay →'},
  /* ── FAQ — MIACASA HANOI ──────────────────────────────────────── */
  'faq-tag':        {en:"FAQ",                          vn:"Câu hỏi thường gặp"},
  'faq-title':      {en:"Frequently Asked<br><em>Questions</em>", vn:"Câu Hỏi<br><em>Thường Gặp</em>"},
  'h-faq-q1': {en:"How far is MiaCasaHanoi from the Old Quarter?",
               vn:"MiaCasaHanoi cách Phố Cổ bao xa?"},
  'h-faq-a1': {en:"MiaCasaHanoi is about 10–15 minutes by Grab or taxi from the Old Quarter and Hoàn Kiếm Lake. Close enough to explore easily, while staying in a quieter, more local neighborhood.",
               vn:"MiaCasaHanoi cách Phố Cổ và Hồ Hoàn Kiếm khoảng 10–15 phút bằng Grab hoặc taxi. Gần đủ để dễ dàng khám phá, trong khi vẫn ở trong một khu phố yên tĩnh và đậm chất địa phương hơn."},
  'h-faq-q2': {en:"Is the area quiet?",
               vn:"Khu vực có yên tĩnh không?"},
  'h-faq-a2': {en:"Yes. The homestay is located in a peaceful residential area, away from busy tourist streets. Ideal if you prefer a calm environment after a day exploring Hanoi.",
               vn:"Có. Homestay nằm trong một khu dân cư yên tĩnh, cách xa những con phố du lịch tấp nập. Lý tưởng nếu bạn thích môi trường bình yên sau một ngày khám phá Hà Nội."},
  'h-faq-q3': {en:"Is it near Railway Street?",
               vn:"Có gần Phố Tàu Hỏa không?"},
  'h-faq-a3': {en:"Yes — within walking distance or a very short ride to Hanoi Railway Street. Convenient if you want to visit without staying in the crowded area.",
               vn:"Có — chỉ cần đi bộ hoặc đi xe rất ngắn đến Phố Tàu Hỏa Hà Nội. Rất tiện nếu bạn muốn ghé thăm nhưng không muốn ở trong khu đông đúc."},
  'h-faq-q4': {en:"Is MiaCasaHanoi suitable for long stays or remote work?",
               vn:"MiaCasaHanoi có phù hợp cho lưu trú dài ngày hoặc làm việc từ xa không?"},
  'h-faq-a4': {en:"Absolutely. Many guests choose this property for longer stays because of the quiet surroundings, comfortable rooms, and reliable WiFi.",
               vn:"Hoàn toàn phù hợp. Nhiều khách chọn chỗ nghỉ này cho kỳ lưu trú dài ngày vì không gian yên tĩnh, phòng thoải mái và WiFi ổn định."},
  'h-faq-q5': {en:"Are there local food options nearby?",
               vn:"Gần đây có nhiều lựa chọn ăn uống địa phương không?"},
  'h-faq-a5': {en:"Yes — plenty of authentic local eateries, cafés, and small shops within walking distance. A great area to experience everyday Hanoi life.",
               vn:"Có — rất nhiều quán ăn địa phương đích thực, quán cà phê và cửa hàng nhỏ trong tầm đi bộ. Khu vực tuyệt vời để trải nghiệm cuộc sống Hà Nội hàng ngày."},
  'h-faq-q6': {en:"How do I check in?",
               vn:"Tôi nhận phòng như thế nào?"},
  'h-faq-a6': {en:"We offer self check-in with clear instructions sent before your arrival. Simple and flexible, especially for late arrivals.",
               vn:"Chúng tôi cung cấp dịch vụ tự nhận phòng với hướng dẫn rõ ràng được gửi trước khi bạn đến. Đơn giản và linh hoạt, đặc biệt cho những người đến muộn."},
  'h-faq-q7': {en:"Can I book directly through the website?",
               vn:"Tôi có thể đặt phòng trực tiếp qua website không?"},
  'h-faq-a7': {en:"Yes. Booking directly gives you better rates compared to platforms like Airbnb or Booking.com.",
               vn:"Có. Đặt phòng trực tiếp qua website của chúng tôi sẽ cho bạn mức giá tốt hơn so với các nền tảng như Airbnb hoặc Booking.com."},

  /* ── FAQ — MIACASA OLDQUARTER ─────────────────────────────────── */
  'oq-faq-q1': {en:"Is MiaCasaOldQuarter located in the center of Hanoi?",
                vn:"MiaCasaOldQuarter có nằm ở trung tâm Hà Nội không?"},
  'oq-faq-a1': {en:"Yes. The apartment is in the heart of the Old Quarter, within walking distance of Hoàn Kiếm Lake, night markets, and major attractions.",
                vn:"Có. Căn hộ nằm ngay trung tâm Phố Cổ, trong tầm đi bộ đến Hồ Hoàn Kiếm, chợ đêm và các điểm tham quan chính."},
  'oq-faq-q2': {en:"Is it noisy at night?",
                vn:"Ban đêm có ồn không?"},
  'oq-faq-a2': {en:"Being in the Old Quarter, the area can be lively, especially evenings and weekends. If you enjoy city energy, great fit. If you prefer quiet, MiaCasaHanoi may be a better option.",
                vn:"Ở Phố Cổ, khu vực có thể khá sôi động, đặc biệt vào buổi tối và cuối tuần. Nếu bạn thích năng lượng thành phố, rất phù hợp. Nếu bạn thích yên tĩnh, MiaCasaHanoi có thể là lựa chọn tốt hơn."},
  'oq-faq-q3': {en:"Is this property suitable for families or groups?",
                vn:"Chỗ nghỉ này có phù hợp cho gia đình hoặc nhóm không?"},
  'oq-faq-a3': {en:"Yes. The apartment has multiple beds and a spacious layout, making it ideal for families or small groups traveling together.",
                vn:"Có. Căn hộ có nhiều giường và bố cục rộng rãi, lý tưởng cho gia đình hoặc nhóm nhỏ đi cùng nhau."},
  'oq-faq-q4': {en:"How far is it from Hoàn Kiếm Lake?",
                vn:"Cách Hồ Hoàn Kiếm bao xa?"},
  'oq-faq-a4': {en:"Just a short walk — typically around 5 to 10 minutes depending on your pace.",
                vn:"Chỉ cần đi bộ một chút — thường khoảng 5 đến 10 phút tùy tốc độ của bạn."},
  'oq-faq-q5': {en:"Are restaurants and cafés nearby?",
                vn:"Gần đây có nhà hàng và quán cà phê không?"},
  'oq-faq-a5': {en:"You will be surrounded by some of the best food, cafés, and street eats Hanoi has to offer — all within walking distance.",
                vn:"Bạn sẽ được bao quanh bởi những món ăn ngon nhất Hà Nội, quán cà phê và ẩm thực đường phố — tất cả trong tầm đi bộ."},
  'oq-faq-q6': {en:"How do I check in?",
                vn:"Tôi nhận phòng như thế nào?"},
  'oq-faq-a6': {en:"We provide simple self check-in instructions before your arrival, so you can arrive at your convenience.",
                vn:"Chúng tôi cung cấp hướng dẫn tự nhận phòng đơn giản trước khi bạn đến, để bạn có thể đến theo sự tiện lợi của mình."},
  'oq-faq-q7': {en:"Can I book directly for better prices?",
                vn:"Tôi có thể đặt trực tiếp để được giá tốt hơn không?"},
  'oq-faq-a7': {en:"Yes. Direct bookings through our website are more affordable since they avoid third-party platform fees.",
                vn:"Có. Đặt phòng trực tiếp qua website thường có giá phải chăng hơn vì tránh được phí nền tảng bên thứ ba."},

  /* ── FAQ — SHARED FOOTER ──────────────────────────────────────── */
  'faq-help-title': {en:"Not sure which property to choose?",
                     vn:"Không chắc nên chọn chỗ nghỉ nào?"},
  'faq-help-oq':   {en:"Choose MiaCasa Old Quarter if you want to stay in the center, close to attractions and nightlife",
                    vn:"Chọn MiaCasa Phố Cổ nếu bạn muốn ở trung tâm, gần các điểm tham quan và cuộc sống về đêm"},
  'faq-help-h':    {en:"Choose MiaCasaHanoi if you prefer a quieter, more local experience",
                    vn:"Chọn MiaCasaHanoi nếu bạn thích trải nghiệm yên tĩnh và đậm chất địa phương hơn"},

  /* ── GALLERY ──────────────────────────────────────────────────── */
  'gal-tag':        {en:"Gallery",                      vn:"Thư viện ảnh"},
  'gal-title':      {en:"A look<br><em>inside</em>",    vn:"Nhìn <em>bên trong</em>"},
  'tease-tag':      {en:"Gallery",                      vn:"Thư viện ảnh"},
  'tease-title':    {en:"A peek<br><em>inside</em>",    vn:"Nhìn <em>bên trong</em>"},
  'tease-sub':      {en:"Handcrafted spaces designed to feel lived-in and effortlessly beautiful.",
                     vn:"Không gian thủ công mang cảm giác gần gũi và đẹp tự nhiên."},
  'tease-cta-h':    {en:"View MiaCasa Hanoi →",         vn:"Xem MiaCasa Hà Nội →"},
  'tease-cta-oq':   {en:"View Old Quarter Apartment →", vn:"Xem Căn hộ Phố Cổ →"},

  /* ── GALLERY (property pages) ─────────────────────────────────── */
  'gal-tag':          {en:'Gallery',                      vn:'Thư viện ảnh'},
  'gal-title':        {en:'A look<br><em>inside</em>',    vn:'Nhìn <em>bên trong</em>'},
  'gal-view-all':     {en:'View full gallery →',          vn:'Xem toàn bộ ảnh →'},

  /* ── HOMEPAGE GALLERY TEASER ──────────────────────────────────── */
  'tease-tag':        {en:'Gallery',                      vn:'Thư viện ảnh'},
  'tease-title':      {en:'A peek<br><em>inside</em>',    vn:'Nhìn <em>bên trong</em>'},
  'tease-sub':        {en:'Handcrafted spaces designed to feel lived-in and effortlessly beautiful.',
                       vn:'Không gian thủ công mang cảm giác gần gũi và đẹp tự nhiên.'},
  'tease-cta-h':      {en:'View MiaCasa Hanoi →',         vn:'Xem MiaCasa Hà Nội →'},
  'tease-cta-oq':     {en:'View Old Quarter Apartment →', vn:'Xem Căn hộ Phố Cổ →'},

  /* ── FAQ — SHARED ────────────────────────────────────────────── */
  'faq-tag':          {en:'Frequently Asked Questions', vn:'Câu hỏi thường gặp'},
  'faq-title':        {en:'Got <em>questions?</em>',   vn:'Bạn có <em>câu hỏi?</em>'},
  'faq-choosetitle':  {en:'Not sure which property to choose?', vn:'Chưa biết chọn chỗ nghỉ nào?'},
  'faq-choose-oq':    {en:'Choose MiaCasa Old Quarter if you want to stay in the center, close to attractions and nightlife.',
                       vn:'Chọn MiaCasa Phố Cổ nếu bạn muốn ở trung tâm, gần các điểm tham quan và cuộc sống về đêm.'},
  'faq-choose-h':     {en:'Choose MiaCasa Hanoi if you prefer a quieter, more local experience.',
                       vn:'Chọn MiaCasa Hà Nội nếu bạn thích không khí yên tĩnh và đậm chất địa phương hơn.'},

  /* ── FAQ — MIACASA HANOI ──────────────────────────────────────── */
  'h-faq-q1':  {en:'How far is MiaCasaHanoi from the Old Quarter?',
                vn:'MiaCasaHanoi cách Phố Cổ bao xa?'},
  'h-faq-a1':  {en:"MiaCasaHanoi is about 10–15 minutes by Grab or taxi from the Old Quarter and Hoàn Kiếm Lake. It's close enough to explore easily, while staying in a quieter, more local neighborhood.",
                vn:'MiaCasaHanoi cách Phố Cổ và Hồ Hoàn Kiếm khoảng 10–15 phút bằng Grab hoặc taxi. Đủ gần để khám phá dễ dàng, trong khi vẫn ở trong một khu phố yên tĩnh và đậm chất địa phương.'},
  'h-faq-q2':  {en:'Is the area quiet?',
                vn:'Khu vực có yên tĩnh không?'},
  'h-faq-a2':  {en:"Yes. The homestay is located in a peaceful residential area, away from the busy tourist streets. It's ideal if you prefer a calm and restful environment after a day of exploring Hanoi.",
                vn:'Có. Homestay nằm trong khu dân cư yên tĩnh, xa các con phố du lịch nhộn nhịp. Lý tưởng nếu bạn thích môi trường bình yên và nghỉ ngơi sau một ngày khám phá Hà Nội.'},
  'h-faq-q3':  {en:'Is it near Railway Street?',
                vn:'Có gần Phố Tàu Hỏa không?'},
  'h-faq-a3':  {en:"Yes, it's within walking distance or a very short ride to Hanoi Railway Street, making it convenient if you want to visit but not stay in the crowded area.",
                vn:'Có, cách Phố Tàu Hỏa đi bộ hoặc đi xe một đoạn rất ngắn, tiện lợi nếu bạn muốn ghé thăm mà không phải ở trong khu đông đúc.'},
  'h-faq-q4':  {en:'Is MiaCasaHanoi suitable for long stays or remote work?',
                vn:'MiaCasaHanoi có phù hợp cho lưu trú dài ngày hoặc làm việc từ xa không?'},
  'h-faq-a4':  {en:'Absolutely. Many guests choose this property for longer stays because of the quiet surroundings, comfortable rooms, and reliable WiFi.',
                vn:'Hoàn toàn. Nhiều khách chọn nơi này cho các kỳ nghỉ dài vì không gian yên tĩnh, phòng thoải mái và WiFi ổn định.'},
  'h-faq-q5':  {en:'Are there local food options nearby?',
                vn:'Có các lựa chọn ăn uống địa phương gần đây không?'},
  'h-faq-a5':  {en:"Yes, there are plenty of authentic local eateries, cafes, and small shops within walking distance. It's a great area to experience everyday Hanoi life.",
                vn:'Có, có nhiều quán ăn địa phương, quán cà phê và cửa hàng nhỏ trong tầm đi bộ. Đây là khu vực tuyệt vời để trải nghiệm cuộc sống Hà Nội hàng ngày.'},
  'h-faq-q6':  {en:'How do I check in?',
                vn:'Tôi nhận phòng như thế nào?'},
  'h-faq-a6':  {en:"We offer self check-in with clear instructions sent before your arrival. It's simple and flexible, especially for late arrivals.",
                vn:'Chúng tôi cung cấp tự nhận phòng với hướng dẫn rõ ràng được gửi trước khi đến. Đơn giản và linh hoạt, đặc biệt cho những ai đến muộn.'},
  'h-faq-q7':  {en:'Can I book directly through the website?',
                vn:'Tôi có thể đặt phòng trực tiếp qua website không?'},
  'h-faq-a7':  {en:'Yes. Booking directly through our website gives you better rates compared to platforms like Airbnb or Booking.com.',
                vn:'Có. Đặt phòng trực tiếp qua website của chúng tôi giúp bạn có mức giá tốt hơn so với các nền tảng như Airbnb hay Booking.com.'},

  /* ── FAQ — MIACASA OLD QUARTER ────────────────────────────────── */
  'oq-faq-q1': {en:'Is MiaCasaOldQuarter located in the center of Hanoi?',
                vn:'MiaCasaOldQuarter có nằm ở trung tâm Hà Nội không?'},
  'oq-faq-a1': {en:'Yes. The apartment is in the heart of the Old Quarter, within walking distance of Hoàn Kiếm Lake, night markets, and major attractions.',
                vn:'Có. Căn hộ nằm ngay trung tâm Phố Cổ, trong tầm đi bộ đến Hồ Hoàn Kiếm, chợ đêm và các điểm tham quan chính.'},
  'oq-faq-q2': {en:'Is it noisy at night?',
                vn:'Có ồn vào ban đêm không?'},
  'oq-faq-a2': {en:'Being in the Old Quarter, the area can be lively, especially in the evenings and on weekends. If you enjoy the energy of the city, it\'s a great fit. If you prefer quiet, MiaCasaHanoi may be a better option.',
                vn:'Nằm trong Phố Cổ, khu vực có thể sôi động, đặc biệt vào buổi tối và cuối tuần. Nếu bạn thích năng lượng của thành phố, đây là lựa chọn tuyệt vời. Nếu bạn thích yên tĩnh, MiaCasaHanoi có thể phù hợp hơn.'},
  'oq-faq-q3': {en:'Is this property suitable for families or groups?',
                vn:'Chỗ nghỉ này có phù hợp cho gia đình hoặc nhóm không?'},
  'oq-faq-a3': {en:'Yes. The apartment has multiple beds and a spacious layout, making it ideal for families or small groups traveling together.',
                vn:'Có. Căn hộ có nhiều giường và bố cục rộng rãi, lý tưởng cho các gia đình hoặc nhóm nhỏ cùng đi du lịch.'},
  'oq-faq-q4': {en:'How far is it from Hoàn Kiếm Lake?',
                vn:'Cách Hồ Hoàn Kiếm bao xa?'},
  'oq-faq-a4': {en:'It\'s just a short walk — typically around 5 to 10 minutes depending on your pace.',
                vn:'Chỉ một đoạn đi bộ ngắn — thường khoảng 5 đến 10 phút tùy theo tốc độ của bạn.'},
  'oq-faq-q5': {en:'Are restaurants and cafes nearby?',
                vn:'Có nhà hàng và quán cà phê gần đây không?'},
  'oq-faq-a5': {en:"You\'ll be surrounded by some of Hanoi's best food, cafes, and street eats — all within walking distance.",
                vn:'Bạn sẽ được bao quanh bởi những món ăn ngon nhất Hà Nội, quán cà phê và đồ ăn đường phố — tất cả trong tầm đi bộ.'},
  'oq-faq-q6': {en:'How do I check in?',
                vn:'Tôi nhận phòng như thế nào?'},
  'oq-faq-a6': {en:'We provide simple self check-in instructions before your arrival, so you can arrive at your convenience.',
                vn:'Chúng tôi cung cấp hướng dẫn tự nhận phòng đơn giản trước khi đến, để bạn có thể đến theo lịch trình của mình.'},
  'oq-faq-q7': {en:'Can I book directly for better prices?',
                vn:'Tôi có thể đặt trực tiếp để có giá tốt hơn không?'},
  'oq-faq-a7': {en:'Yes. Direct bookings through our website are usually more affordable since they avoid third-party platform fees.',
                vn:'Có. Đặt phòng trực tiếp qua website của chúng tôi thường tiết kiệm hơn vì tránh được phí nền tảng bên thứ ba.'},

  /* ── GALLERY ──────────────────────────────────────────────────── */
  'gal-tag':          {en:'Gallery',                   vn:'Thư viện ảnh'},
  'gal-title':        {en:'See the<br><em>space</em>', vn:'Khám phá<br><em>không gian</em>'},
  'gal-cta-h':        {en:'View full gallery at MiaCasa Hanoi →',      vn:'Xem thư viện đầy đủ tại MiaCasa Hà Nội →'},
  'gal-cta-oq':       {en:'View full gallery at MiaCasa Old Quarter →', vn:'Xem thư viện đầy đủ tại MiaCasa Phố Cổ →'},
  'tease-tag':        {en:'A Glimpse Inside',          vn:'Nhìn qua không gian'},
  'tease-title':      {en:'A peek<br><em>inside</em>', vn:'Nhìn <em>bên trong</em>'},
  'tease-sub':        {en:'Handcrafted spaces designed to feel lived-in and effortlessly beautiful.',
                       vn:'Không gian thủ công mang cảm giác gần gũi và đẹp tự nhiên.'},
  'h-gal-tag':        {en:'Gallery',                   vn:'Thư viện ảnh'},
  'h-gal-title':      {en:'Inside<br><em>MiaCasa Hanoi</em>', vn:'Bên trong<br><em>MiaCasa Hà Nội</em>'},
  'oq-gal-tag':       {en:'Gallery',                   vn:'Thư viện ảnh'},
  'oq-gal-title':     {en:'Inside<br><em>MiaCasa Old Quarter</em>', vn:'Bên trong<br><em>MiaCasa Phố Cổ</em>'},

  /* ── HOUSE RULES ──────────────────────────────────────────────── */
  'sec-rules':        {en:'House Rules',                     vn:'Nội quy'},
  'rules-title':      {en:'A few things to keep in <em>mind</em>', vn:'Một vài điều cần <em>lưu ý</em>'},
  'rules-sub':        {en:'To ensure everyone has a wonderful stay, we ask all guests to respect these simple guidelines.',
                       vn:'Để đảm bảo mọi người có kỳ lưu trú tuyệt vời, chúng tôi đề nghị khách tuân thủ các quy định đơn giản sau.'},
  'rule-checkinout':  {en:'Check-in / Check-out',            vn:'Nhận / Trả phòng'},
  'rule-cio-1':       {en:'Check-in from 2:00 PM (self check-in)',           vn:'Nhận phòng từ 14:00 (tự check-in)'},
  'rule-cio-2':       {en:'MiaCasaHanoi: check-out by 12:00 PM (noon)',      vn:'MiaCasaHanoi: trả phòng trước 12:00 (trưa)'},
  'rule-cio-3':       {en:'MiaCasaOldQuarter: check-out by 11:00 AM',        vn:'MiaCasaOldQuarter: trả phòng trước 11:00'},
  'rule-cio-4':       {en:'Early/late check-in available on request',        vn:'Nhận / trả phòng sớm / muộn theo yêu cầu'},
  'rule-cio-5':       {en:'Luggage storage available at MiaCasaHanoi — longer durations may incur an extra charge',
                       vn:'Có thể gửi hành lý tại MiaCasaHanoi — thời gian dài có thể tính thêm phí'},
  'rule-noise':       {en:'Noise & Guests',                  vn:'Tiếng ồn & Khách'},
  'rule-noise-1':     {en:'Quiet hours 10:00 PM – 7:00 AM',                  vn:'Giờ yên tĩnh 22:00 – 7:00'},
  'rule-noise-2':     {en:'No unregistered overnight guests',                vn:'Không đón khách qua đêm chưa đăng ký'},
  'rule-noise-3':     {en:'Be mindful of neighbours',                        vn:'Tôn trọng hàng xóm'},
  'rule-noise-4':     {en:'Groups of 4+ need prior notice',                  vn:'Nhóm từ 4 người trở lên cần thông báo trước'},
  'rule-smoking':     {en:'Smoking & Pets',                  vn:'Hút thuốc & Thú cưng'},
  'rule-smoke-1':     {en:'No smoking indoors',                              vn:'Không hút thuốc trong nhà'},
  'rule-smoke-2':     {en:'Balcony/terrace smoking only',                    vn:'Chỉ hút thuốc ở ban công / sân thượng'},
  'rule-smoke-3':     {en:'Pets welcome — additional charge applies, please inform the host in advance',
                       vn:'Chào đón thú cưng — phụ phí áp dụng, vui lòng báo chủ nhà trước'},
  'rule-smoke-4':     {en:'Candles permitted with care',                     vn:'Cho phép dùng nến cẩn thận'},
  'rule-propcare':    {en:'Property Care',                   vn:'Bảo quản tài sản'},
  'rule-prop-1':      {en:'Treat the space as your own home',                vn:'Đối xử với không gian như ngôi nhà của bạn'},
  'rule-prop-2':      {en:'Report damages promptly',                         vn:'Báo cáo hư hỏng ngay lập tức'},
  'rule-prop-3':      {en:'No shoes inside — slippers provided',             vn:'Không đi giày trong nhà — có dép'},
  'rule-prop-4':      {en:'Use designated rubbish bins',                     vn:'Dùng thùng rác đúng nơi quy định'},
  'rule-legal':       {en:'Legal Requirement',               vn:'Yêu cầu pháp lý'},
  'rule-legal-1':     {en:'Vietnamese law requires all guests to provide a copy of their passport or national ID',
                       vn:'Pháp luật Việt Nam yêu cầu tất cả khách phải cung cấp bản sao hộ chiếu hoặc CMND/CCCD'},
  'rule-legal-2':     {en:'Please send a photo to the host via WhatsApp or email before or upon check-in',
                       vn:'Vui lòng gửi ảnh cho chủ nhà qua WhatsApp hoặc email trước hoặc khi nhận phòng'},
  'rule-legal-3':     {en:'Bookings cannot be confirmed without this document',
                       vn:'Đặt phòng không thể xác nhận nếu thiếu tài liệu này'},
  'rule-legal-4':     {en:'Information is used solely for local authority registration',
                       vn:'Thông tin chỉ dùng để đăng ký với cơ quan chức năng địa phương'},
  'rule-payment':     {en:'Payments & Cancellation',         vn:'Thanh toán & Hủy phòng'},
  'rule-pay-1':       {en:'Free cancellation up to 48h prior',              vn:'Miễn phí hủy trước 48 giờ'},
  'rule-pay-2':       {en:'Bank transfer or PayPal accepted',               vn:'Chấp nhận chuyển khoản ngân hàng hoặc PayPal'},
  'rule-pay-3':       {en:'Security deposit for long stays',                vn:'Đặt cọc bảo đảm cho lưu trú dài ngày'},
  'rule-eco':         {en:'Eco Guidelines',                  vn:'Hướng dẫn sinh thái'},
  'rule-eco-1':       {en:'Turn off A/C when leaving',                       vn:'Tắt điều hoà khi ra ngoài'},
  'rule-eco-2':       {en:'Mineral water provided (2 bottles per room per stay)',
                       vn:'Cung cấp nước khoáng (2 chai mỗi phòng mỗi lần ở)'},
  'rule-eco-3':       {en:'We minimise single-use plastics where possible',  vn:'Chúng tôi giảm thiểu đồ nhựa dùng một lần'},
  'rule-eco-4':       {en:'Towel reuse encouraged',                          vn:'Khuyến khích tái sử dụng khăn tắm'},

  /* ── COMPARE STAYS SECTION (homepage) ────────────────────────── */
  'compare-tag':     {en:'Compare Stays',                   vn:'So sánh chỗ nghỉ'},
  'compare-title':   {en:'Not sure<br><em>which to choose?</em>',
                      vn:'Chưa biết<br><em>nên chọn nơi nào?</em>'},
  'compare-sub':     {en:'Both are women-owned, locally run, and book direct for the best price. The difference is in the vibe.',
                      vn:'Cả hai đều do phụ nữ làm chủ, vận hành địa phương, và đặt trực tiếp để có giá tốt nhất. Sự khác biệt nằm ở không khí.'},
  'compare-h-title': {en:'Quiet, local, residential',       vn:'Yên tĩnh, đậm chất địa phương'},
  'compare-h-li1':   {en:'Near Train Street &amp; Văn Miếu', vn:'Gần Phố Tàu Hỏa &amp; Văn Miếu'},
  'compare-h-li2':   {en:'3 private en-suite rooms · up to 3 guests each', vn:'3 phòng riêng có phòng tắm · tối đa 3 khách mỗi phòng'},
  'compare-h-li3':   {en:'Best for couples, solo travelers, remote workers', vn:'Phù hợp cho cặp đôi, khách solo, người làm việc từ xa'},
  'compare-h-li4':   {en:'From 750,000₫ / night',           vn:'Từ 750.000₫ / đêm'},
  'compare-h-cta':   {en:'Explore MiaCasa Hanoi →',         vn:'Khám phá MiaCasa Hà Nội →'},
  'compare-oq-title':{en:'Central, vibrant, Old Quarter',   vn:'Trung tâm, sôi động, Phố Cổ'},
  'compare-oq-li1':  {en:'Heart of Hoàn Kiếm · steps from the lake', vn:'Trung tâm Hoàn Kiếm · ngay cạnh hồ'},
  'compare-oq-li2':  {en:'Entire apartment · 3 queen beds · up to 6 guests', vn:'Toàn bộ căn hộ · 3 giường đôi · tối đa 6 khách'},
  'compare-oq-li3':  {en:'Best for families, groups, Old Quarter lovers', vn:'Phù hợp cho gia đình, nhóm bạn, người yêu Phố Cổ'},
  'compare-oq-li4':  {en:'From 1,200,000₫ / night',         vn:'Từ 1.200.000₫ / đêm'},
  'compare-oq-cta':  {en:'Explore Old Quarter →',           vn:'Khám phá MiaCasa Phố Cổ →'},

};

/* ── Engine ────────────────────────────────────────────────────────────────── */
var currentLang = (function(){
  try{ return localStorage.getItem('mia_lang')||'en'; }catch(e){ return 'en'; }
})();

function setLang(lang){
  currentLang = lang;
  try{ localStorage.setItem('mia_lang', lang); }catch(e){}
  var en = document.getElementById('lang-en');
  var vn = document.getElementById('lang-vn');
  if(en) en.classList.toggle('active', lang==='en');
  if(vn) vn.classList.toggle('active', lang==='vn');
  applyTranslations();
}

function applyTranslations(){
  var lang = currentLang;
  // data-t  → textContent
  document.querySelectorAll('[data-t]').forEach(function(el){
    var e = TRANSLATIONS[el.getAttribute('data-t')];
    if(e && e[lang]!==undefined) el.textContent = e[lang];
  });
  // data-th → innerHTML  (supports <em> <br> etc.)
  document.querySelectorAll('[data-th]').forEach(function(el){
    var e = TRANSLATIONS[el.getAttribute('data-th')];
    if(e && e[lang]!==undefined) el.innerHTML = e[lang];
  });
  // page-specific hooks
  _hooks.forEach(function(fn){ try{ fn(lang); }catch(e){ console.warn('hook err:',e.message); } });
}

var _hooks = [];
function registerTranslationHook(fn){ _hooks.push(fn); }

document.addEventListener('DOMContentLoaded', function(){
  applyTranslations();
  setTimeout(applyTranslations, 150);
});
