function sqr_rt(n, a = 0, it = 3) {
    //set variable a as the closest square integer to input
    if (a === 0) {
        for (let i = 0; i * i <= n; i++) {
            a = i;
        }
    }

    //set y to equal value of using Heron's Method
    const y = 0.5 * (a + n / a);

    //return answer after iterations complete
    if (it === 0) {
        return y;
    }

    //re-call function on output to get a more accurate figure (following Heron's Method)
    return sqr_rt(n, y, it - 1);
}
