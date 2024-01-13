import { memo } from "react"
import Rating from "react-rating";
import { MdOutlineStarPurple500 } from "react-icons/md";

function RatingBox({ value, onChange, readonly = true, size }: { value: number, readonly?: boolean, onChange?: ((value: number) => void) | undefined, size?: number }) {
    return <> <Rating fullSymbol={<MdOutlineStarPurple500 color="#FFC200" size={size} />} emptySymbol={<MdOutlineStarPurple500 color="#ffffff54" size={size} />} initialRating={value} readonly={readonly} onChange={onChange} /></>;
}
export default memo(RatingBox);
