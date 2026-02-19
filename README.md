# Amplify Gen2 + Next.js お問い合わせフォーム

AWS Amplify Gen2とNext.jsで構築したシンプルな問い合わせフォームです。

## 機能

- メールアドレスとお問い合わせ内容を入力
- バックエンドのLambda関数経由でSNSトピックにメッセージを送信
- SNSトピックから先は手動でカスタマイズ可能（メール通知、Slack連携など）

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. Amplifyバックエンドのデプロイ:
```bash
npx ampx sandbox
```

3. 開発サーバーの起動:
```bash
npm run dev
```

4. ブラウザで http://localhost:3000 を開く

## デプロイ後の設定

デプロイ後、SNSトピックに対して以下のような設定が可能です:

- メール通知の設定
- SMS通知の設定
- Lambda関数のトリガー設定
- SQSキューへの配信

SNSトピックのARNは `amplify_outputs.json` の `custom.topicArn` で確認できます。

## 本番環境へのデプロイ

```bash
npx ampx pipeline-deploy --branch main --app-id <your-app-id>
```
