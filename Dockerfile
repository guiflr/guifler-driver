FROM public.ecr.aws/lambda/nodejs:18 as builder
WORKDIR /usr/app
COPY src ./src
COPY package.json tsconfig.json jest.config.ts server.ts .env ./
COPY prisma ./prisma
RUN npm install
RUN npm run build
RUN npm run prisma:generate
RUN npm run prisma:migrate
RUN npm run prisma:seed
RUN npm run test
    
FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/* ./
CMD ["server.handler"]