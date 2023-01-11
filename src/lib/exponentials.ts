export const sliderMin = 1;
export const sliderMax = 2000000;

/*
 These are magic functions that
 take the input slider position
 and makes it more natural

 It also makes the guess penalty
 more fair, since the difference
 between 890k and 900k
 is a lot smaller than 20k and 10k
*/
export const exponential = (x: number) => {
	if (x == sliderMax) return sliderMax;
	return Math.round(Math.pow(1.2053, Math.pow(x, 0.3)));
};

export const inverse = (x: number) => {
	if (x == sliderMax) return sliderMax;
	const sub = Math.log(x) / Math.log(1.2053);
	return Math.pow(sub, 3) * Math.pow(sub, 1 / 3);
};
