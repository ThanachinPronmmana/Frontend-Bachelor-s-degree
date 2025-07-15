import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DepositDialog = ({ open, onClose, data, onConfirm, onReject }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>รายละเอียดการมัดจำ</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>ผู้ซื้อ:</strong> {data.buyer}</p>
          <p><strong>ผู้ขาย:</strong> {data.seller}</p>
          <p><strong>อสังหาริมทรัพย์:</strong> {data.property}</p>
          <p><strong>จำนวนเงิน:</strong> {data.amount}</p>
          <p><strong>วันที่โอน:</strong> {data.date}</p>
          <p><strong>สถานะปัจจุบัน:</strong> {data.status}</p>
        </div>

        <DialogFooter className="flex justify-end gap-2 pt-4">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;
