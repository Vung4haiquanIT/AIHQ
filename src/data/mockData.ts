import { DocumentItem, VideoClip } from '../types';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Công ước của Liên hợp quốc về Luật Biển (UNCLOS 1982) - Các điều khoản trọng tâm bảo vệ chủ quyền',
    category: 'unclos',
    summary: 'Tóm tắt các quy định về lãnh hải, vùng đặc quyền kinh tế (EEZ) và thềm lục địa theo UNCLOS 1982.',
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
ĐOÀN KẾT - HIỆP ĐỒNG - CƠ ĐỘNG - QUYẾT THẮNG
--------------------------------------------------
1. Vùng lãnh hải: Quốc gia ven biển có chủ quyền đối với vùng biển nằm ngoài lãnh thổ và nội thủy của mình...
2. Vùng đặc quyền kinh tế (EEZ): Rộng không quá 200 hải lý tính từ đường cơ sở, quốc gia ven biển có quyền chủ quyền về thăm dò, khai thác, bảo tồn và quản lý tài nguyên thiên nhiên.
3. Tàu thuyền nước ngoài thực hiện quyền qua lại không gây hại (innocent passage) phải tuân thủ nghiêm ngặt luật pháp quốc gia ven biển và luật pháp quốc tế.`,
    date: '22/09/2026',
    author: 'Bộ Tư lệnh Vùng 4 Hải Quân',
    downloads: 1420
  },
  {
    id: 'doc-2',
    title: 'Luật Biển Việt Nam năm 2012 và quy định thực thi pháp luật trên biển',
    category: 'phap_luat_bien',
    summary: 'Quy định chi tiết về hoạt động tuần tra, kiểm soát, xử lý tàu thuyền nước ngoài vi phạm chủ quyền.',
    content: `Điều 14 Luật Biển Việt Nam:
1. Tàu thuyền các nước được hưởng quyền qua lại không gây hại trong lãnh hải Việt Nam.
2. Đối với tàu quân sự nước ngoài khi vào lãnh hải Việt Nam phải thông báo trước theo quy định của pháp luật Việt Nam.
3. Các hành vi kéo giàn khoan trái phép, thăm dò tài nguyên không phép trong EEZ và thềm lục địa Việt Nam bị xử lý nghiêm theo pháp luật quốc gia và quốc tế.`,
    date: '20/09/2026',
    author: 'Cục Pháp chế - Bộ Quốc phòng',
    downloads: 980
  },
  {
    id: 'doc-3',
    title: 'Hướng dẫn công tác CTĐ - CTCT trong sẵn sàng chiến đấu và bảo vệ chủ quyền biển đảo',
    category: 'ctd_ctct',
    summary: 'Nâng cao bản lĩnh chính trị, tinh thần quyết chiến quyết thắng cho cán bộ, chiến sĩ Hải quân.',
    content: `1. Quán triệt sâu sắc Nghị quyết Đại hội Đảng toàn quốc và Nghị quyết Đảng bộ Quân chủng Hải quân.
2. Tăng cường giáo dục chính trị tư tưởng, xây dựng ý chí "Kiên quyết, kiên trì bảo vệ chủ quyền biển, đảo".
3. Đảm bảo công tác thi đua khen thưởng kịp thời đối với các tập thể, cá nhân hoàn thành xuất sắc nhiệm vụ trực ban chiến đấu.`,
    date: '18/09/2026',
    author: 'Cục Chính trị Hải quân',
    downloads: 750
  },
  {
    id: 'doc-4',
    title: 'Điều lệnh quản lý bộ đội Hải quân nhân dân Việt Nam',
    category: 'dieu_lenh',
    summary: 'Các quy định về lễ tiết tác phong, trực sẵn sàng chiến đấu trên tàu chiến đấu mặt nước.',
    content: `1. Chế độ trực chiến trên tàu: Duy trì nghiêm ngặt kíp chiến đấu 1, kíp chiến đấu 2.
2. Lễ tiết tác phong quân nhân: Chấp hành tuyệt đối mệnh lệnh người chỉ huy, đoàn kết lập công xuất sắc.`,
    date: '15/09/2026',
    author: 'Bộ Tham mưu Hải quân',
    downloads: 1120
  }
];

export const INITIAL_NEWS = [
  { id: 'n-1', title: 'Hướng dẫn sử dụng Trợ lý AI Hải quân', date: '22/09/2026', category: 'Hướng dẫn' },
  { id: 'n-2', title: 'Cập nhật tài liệu tuyên truyền và pháp luật biển tháng 9/2026', date: '20/09/2026', category: 'Tài liệu' },
  { id: 'n-3', title: 'Quy định mới về công tác bảo vệ chủ quyền biển đảo và ứng phó tình huống trên biển', date: '18/09/2026', category: 'Chỉ đạo' },
  { id: 'n-4', title: 'Tài liệu học tập Nghị quyết 20-NQ/TW về kinh tế biển', date: '15/09/2026', category: 'Học tập' }
];

export const INITIAL_CLIPS: VideoClip[] = [
  { id: 'clip-1', title: 'video1.mp4', duration: 15, thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=300', type: 'video' },
  { id: 'clip-2', title: 'tau_hai_quan.mp4', duration: 28, thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=300', type: 'video' },
  { id: 'clip-3', title: 'bien_dong.jpg', duration: 5, thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300', type: 'image' },
  { id: 'clip-4', title: 'logo_162.png', duration: 5, thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', type: 'image' },
  { id: 'clip-5', title: 'nhac_nen.mp3', duration: 60, thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300', type: 'audio' }
];

export const PROMPT_SUGGESTIONS = [
  {
    title: 'Cảnh báo tàu nước ngoài vi phạm',
    prompt: 'Soạn nội dung phát loa cảnh báo bằng tiếng Trung và tiếng Việt đối với tàu nước ngoài xâm phạm vùng đặc quyền kinh tế Việt Nam theo UNCLOS 1982.'
  },
  {
    title: 'Xử lý tình huống kéo giàn khoan trái phép',
    prompt: 'Phân tích các căn cứ pháp lý và đề xuất tham mưu xử lý tình huống tàu nước ngoài kéo giàn khoan vào vùng biển Việt Nam.'
  },
  {
    title: 'Tóm tắt Công ước UNCLOS 1982',
    prompt: 'Tóm tắt các điều khoản cốt lõi của UNCLOS 1982 liên quan đến quyền của quốc gia ven biển tại vùng đặc quyền kinh tế và thềm lục địa.'
  },
  {
    title: 'Soạn giáo án sinh hoạt CTĐ-CTCT',
    prompt: 'Soạn đề cương sinh hoạt chính trị tư tưởng chủ đề: "Kiên quyết, kiên trì bảo vệ chủ quyền biển, đảo thiêng liêng của Tổ quốc".'
  }
];
