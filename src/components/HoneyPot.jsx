export default function HoneyPot({ register }) {
    return (
        <input
            {...register("_extra_field")}
            type="text"
            style={{
                position: "absolute",
                left: "-9999px"
            }}
        />
    );
}