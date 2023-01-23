export const sliderMin = 1;
export const sliderMax = 2000000;

export const day0 = new Date('01/20/23 05:00:00 UTC');

export const getDay = () => Math.ceil((Date.now() - day0.getTime()) / (24 * 60 * 60 * 1000));
/*
 These are magic functions that
 take the input slider position
 and makes it more natural
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

// const a = 1243.80809498;
// const b = 1.00000369137;

// export const exponential = (x: number): number => {
// 	if (x == sliderMax) return sliderMax;

// 	return Math.round(a * Math.pow(b, x) - a + 1);
// };

// export const inverse = (x: number): number => {
// 	if (x == sliderMax) return sliderMax;

// 	const sub1 = Math.log(x) / Math.log(b);
// 	const sub2 = Math.log(a) / Math.log(b);
// 	return sub1 / sub2;
// };

/*
  SUPER SPECIAL SHOUTOUT TIME
  
  Cytusine built this formula from scratch
  after giving him an idea of what I wanted
  the function to look like, and it works
  perfectly!.
*/
export const penalty = (guess: number, rank: number): number => {
	const blue = 1 - Math.min(guess, rank) / Math.max(guess, rank);
	const red = 1 / (1 + Math.max(0, Math.min(4.5 - Math.log10(guess), 4.5 - Math.log10(rank))));
	const green = 1 / (1 + Math.max(0, Math.min(Math.log10(guess) - 4.5, Math.log10(rank)) - 4.5));

	return Math.round(red * blue * green * 1500);
};
