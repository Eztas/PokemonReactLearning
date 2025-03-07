function LookMore(isReloading, getAllPokemons) {
    return (
        <div className="look-more">
            {isReloading ? (
                <div className='load-more'>Now Loading…</div>
            ): (
                <button className='load-more' onClick={getAllPokemons}>
                    もっとみる！
                </button>
            )}
        </div>
    )
}

export default LookMore;