<div align=center>

# osu! Rankdle

</div>

![image](https://user-images.githubusercontent.com/46410314/212985159-1ac02873-2609-42df-8ea4-ad2c850cd5ca.png)

osu! Rankdle is a website, inspired by [rankdle](https://rankdle.com), but adapted for [osu!](https://osu.ppy.sh).

Similarly to rankdle, which is inspired of couse by the original [wordle](https://www.nytimes.com/games/wordle/index.html/), you get to play once a day, and it refreshes every 24 hours.

osu! Rankdle works slightly differently, in that rather than having a set 3 guesses every day, you technically have unlimited guesses. You have an HP bar, and every day it refreshes to 2,000. The farther away you are from the correct rank, the more points you lose. It's a game of how far you can go in one day.

To prevent frustration, every player will have minimum 3 tries per day. If on the first or second guess they lose all their HP, you'll be offered a mulligan and your HP will be reset to 2000. At any point if they guess more than three times, and their HP hits zero, the day ends and their streak is over.

# Development

I wrote a [bash script](https://github.com/clxxiii/osu-rankdle/blob/main/setup.sh) to set up the dev environment for you:
```bash
wget -O - https://raw.githubusercontent.com/clxxiii/osu-rankdle/main/setup.sh | sh
```

If you'd rather do it manually, here are the steps to set up the dev environment:

### 1. Clone the repo, cd into the directory
```bash
git clone https://github.com/clxxiii/osu-rankdle.git 

# Or if you'd like to use ssh instead:
git clone git@github.com:clxxiii/osu-rankdle.git

cd osu-rankdle
```
### 2. Install the dependencies
```bash
npm install
```
### 3. Fill out the following variables in `.env`
```env
DATABASE_URL="file:./dev.db" # If you'd like to change this, you can, this is the recommended db location.
```
### 3. Setup the prisma database
```bash
npx prisma generate
npx prisma migrate dev
```
### 4. Run the development server:
```bash
npm run dev
```

