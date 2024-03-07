FROM public.ecr.aws/lambda/nodejs:18 as builder
WORKDIR /usr/app
COPY package.json tsconfig.json src  ./
RUN npm install
RUN npm run build