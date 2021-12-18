function e(x, y) {
    for (let i = Math.max(x, y); i > 0; i--) {
        if (x % i === 0 && y % i === 0) {
            return i;
        }
    }
}
