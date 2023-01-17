# This is a bash script for setting up the dev environment.
git clone https://github.com/clxxiii/osu-rankdle.git
cd osu-rankdle
npm install
echo "DATABASE_URL='file:./dev.db'" >> ./.env
npx prisma generate
npx prisma migrate dev
