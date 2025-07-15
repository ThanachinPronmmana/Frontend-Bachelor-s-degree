import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const BankDialog = ({ open, onClose, data, onConfirm, onReject }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>รายละเอียดการโอนเงิน</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p><strong>รหัสรายการ:</strong> {data.id}</p>
          <p><strong>ผู้ซื้อ:</strong> {data.buyer}</p>
          <p><strong>ผู้ขาย:</strong> {data.seller}</p>
          <p><strong>อสังหา:</strong> {data.property}</p>
          <p><strong>จำนวนเงิน:</strong> {data.amount}</p>
          <p><strong>วันที่โอน:</strong> {data.date}</p>
          <p><strong>สถานะ:</strong> {data.status}</p>

          <div className="mt-4">
            <p className="font-semibold mb-1">หลักฐานการโอน:</p>
            <img
              src={data.slip}
              alt="Bank Slip"
              className="w-full h-auto rounded-md border"
            />
          </div>

          <div className="flex gap-2 pt-4 justify-end">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={onReject}
            >
              ปฏิเสธ
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={onConfirm}
            >
              อนุมัติ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BankDialog;
