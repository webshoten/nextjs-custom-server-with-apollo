##########################################################
#### ビルドステージ
FROM node:18.17.0-alpine as builder
WORKDIR /work

# ビルド用の依存パッケージをインストール
COPY package*.json ./
RUN npm install -g npm
RUN npm ci

# TypeScript コードをコピーしてビルド
COPY . ./
RUN npm run build

##########################################################
#### 実行用イメージの作成
FROM node:18.17.0-alpine as runner
WORKDIR /work

ENV DATABASE_URL postgresql://booking_owner:pmbkF5JGM9Hn@ep-green-sea-a1babh2r.ap-southeast-1.aws.neon.tech/booking?sslmode=require
EXPOSE 8080

# 本番環境用のパッケージをインストール
COPY package*.json ./
RUN npm ci && npm cache clean --force

# builder からビルド結果だけコピー
COPY --from=builder /work/dist ./dist
COPY --from=builder /work/tsconfig.build.json ./tsconfig.build.json
COPY --from=builder /work/tsconfig.json ./tsconfig.json
COPY --from=builder /work/.next ./.next
COPY --from=builder /work/.env ./.env
RUN chmod 777 tsconfig.build.json
RUN chmod 777 tsconfig.json

# Node.js アプリを起動
CMD ["npm", "run", "start"]