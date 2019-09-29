# ========== START  :: UAT Env ==========
FROM node:11.12.0-slim AS uat-env

RUN mkdir -p /usr/src/app/advisor-portal-frontend
WORKDIR /usr/src/app/advisor-portal-frontend

RUN apt-get update
RUN apt-get install -y libpng-dev libgl1-mesa-glx libxi6

COPY . ./

RUN npm install --unsafe-perm

RUN npm run build:uat

EXPOSE 80

CMD [ "npm", "run", "start:uat", "--", "--port", "80" ]
# ========== END    :: UAT Env ==========

# ========== START  :: Production Env ==========
FROM node:11.12.0-slim AS production-env

RUN mkdir -p /usr/src/app/advisor-portal-frontend
WORKDIR /usr/src/app/advisor-portal-frontend

RUN apt-get update
RUN apt-get install -y libpng-dev libgl1-mesa-glx libxi6

COPY . ./

RUN npm install --unsafe-perm

RUN npm run build:prod

EXPOSE 80

CMD [ "npm", "run", "start:prod", "--", "--port", "80" ]
# ========== END    :: Production Env ==========
