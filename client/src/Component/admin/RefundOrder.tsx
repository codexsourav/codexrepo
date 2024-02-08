import { Booking } from "@/Interfaces/booking"
import makeApi from "@/Lib/makeApi"
import { showAsyncToast, showAsyncToastError, showAsyncToastSuccess } from "@/Lib/showToast"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function RefundOrder({ data, reload }: { data: Booking[], reload: Function }) {
    const chengeStatus = async (key: string) => {
        const id = showAsyncToast("Loading...");
        try {
            await makeApi({ path: "/api/bookings/refund/mark/" + key, method: "POST" });
            showAsyncToastSuccess(id, "Payment Refund Marked");
            reload();
        } catch (error) {
            showAsyncToastError(id, "Payment Refund Marked Error");

        }
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Order Id</TableHead>
                        <TableHead>RazorPay ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead className="text-right">Make Complete</TableHead>
                    </TableRow>
                </TableHeader>
                {data.map((e, i) => <TableBody key={e._id + i}>
                    <TableRow >
                        <TableCell className="font-medium">{e.orderId}</TableCell>
                        <TableCell>{e.paymentInfo.razorpay_payment_id}</TableCell>
                        <TableCell>{Math.round(e.amount)}.00 RS</TableCell>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>{e.mobile}</TableCell>
                        <TableCell className="text-right"><Button onClick={() => chengeStatus(e?._id)}>Mark PAY</Button></TableCell>
                    </TableRow>
                </TableBody>)}
            </Table>

        </div>
    )
}
export default RefundOrder