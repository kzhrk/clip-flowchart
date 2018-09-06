Clip Flowchart
===

[mermaid.js](https://mermaidjs.github.io/)でレンダリングしたフローチャートを[puppeteer](https://github.com/GoogleChrome/puppeteer)でスクリーンショット画像を出力するツール。

## how to use

- `chart`ディレクトリにmermaidのスクリプトファイルを追加
- `npm start`で`dist`ディレクトリにPNG画像を出力

http://localhost:3333/ でmermaidのレンダリング確認。

`npm start`はport引数でlocalhostのPort番号変更が可能。

```
$ npm start -- --port 3000
```
