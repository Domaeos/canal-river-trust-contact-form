function HoneyPot({ register }) {
    return (
        <input
            {...register('_extra_field')}
            name="_extra_field"
            type="text"
            data-testid="honeypot"
            style={{
                position: 'absolute',
                left: '-9999px',
            }}
        />
    );
}

export default HoneyPot;
