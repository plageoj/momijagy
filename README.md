# ましなもみじ (momijagy)

広島大学学生情報の森「もみじ」が多少マシになる拡張機能です。

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## インストール

[Chrome Web Store](https://chrome.google.com/webstore/detail/%E3%81%BE%E3%81%97%E3%81%AA%E3%82%82%E3%81%BF%E3%81%98/bngbbjmfooocodklnppanoopdddpfloh) からのインストールが便利です。

## 開発に参加する

### 開発環境

開発には以下のソフトウェアが必要です。

node.js 12 以降

デバッグ用に最新の Google Chrome / Chromium / Microsoft Edge が必要です。

### セットアップ

```bash
git clone git@github.com:plageoj/momijagy.git
cd momijagy
npm install
```

### ビルド

下記コマンドでビルドを行います。

```bash
npm run build
```

## デバッグ用拡張機能の登録

ビルドを行うとプロジェクトルートに `/dist` フォルダが生成されます。
[chrome://extensions](chrome://extensions) を開き、デベロッパーモードを有効にした後、
「パッケージ化されていない拡張機能を読み込む」ボタンを押し、`dist` フォルダを指定してください。
これでデバッグ用の拡張機能が取り込まれます。

すでにウェブストアから「ましなもみじ」をインストールしている場合は、動作が競合しますので、ウェブストア版を無効にしておくことをお勧めします。

## デバッグ

下記コマンドを実行すると開発用モードになり、ソースコードの変更を検知して自動でビルドするようになります。

```bash
npm run dev
```

拡張機能ページにあるリロードボタンを押し、もみじのサイトを再読み込みすると拡張機能の変更が反映されます。

