import { CloudUploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

function TemplatePage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center">
      <div className="w-[400px] h-[400px] bg-no-repeat bg-[-800px_-1200px] bg-[url('/images/iconempty.svg')]"></div>
      <h4 className="font-extrabold text-xl">Chưa có văn bản</h4>
      <p className="text-[#65696E]">Khai báo mẫu văn bản để sử dụng nhanh khi cần soạn và in tài liệu, hợp đồng, các quyết định của tổ chức như khen thưởng, kỷ luật, bổ nhiệm cán bộ,...</p>
      <Button type="primary" icon={<CloudUploadOutlined />}>
        Tải lên mẫu văn bản
      </Button>
      </div>
  );
}

export default TemplatePage;
