# ***ぬいぐるみショップ(Yuruhuwa)***

## 概要

ぬいぐるみ達に心癒やされる❗、そんなゆるふわなショップです！

※実際に注文しても商品は届きません！！趣味で作ったものです。
___
## イメージ(管理者ユーザー)
![イメージ1](https://user-images.githubusercontent.com/79029696/135965610-2c7d87cc-5d3a-4dc8-9fe1-82b3d1340b8f.png)
![イメージ2](https://user-images.githubusercontent.com/79029696/135965617-797eea1f-8095-46b0-9ab2-b5ac545cd43b.png)
![イメージ3](https://user-images.githubusercontent.com/79029696/135965613-95e7f40d-a282-411c-8696-06978051083c.png)
___

## URL＆テストアカウント

[Yuruhuwa ホーム](https://plush-toy-shop.patapatao.com/)

    email: test@yahoo.co.jp
    password: 111111
___
## 主な使用技術

    TypeScript
    React.js
    Next.js
    Server-Side-Rendering
    Redux-tool-kit
    Semantic UI React
    Sass
    Node.js
    Express.js
    MongoDB
    Json Web Token
    EJS(メール用テンプレとして)

## その他ライブラリ・クラウドサービス
    Stripe
    Swiper
    React-hook-form
    font-awesome
    SendGrid
    Mongoose
    Heroku
    Mongo Cloud
    Cloudinary
___
## 機能一覧

    メール・パスワード認証(バリデーション)

    ユーザー新規登録(Emailに登録リンク送信,バリデーション)

    商品閲覧機能---
        並び替え<サイズ,価格,新着順>
        絞り込み<おすすめ,新商品,ジャンル,値段,サイズ>
        検索
    ---

    商品詳細ページ
    (在庫情報などの詳細、カート入れる、お気に入り登録機能)

    カート機能
    (30分間、商品を保持)

    お気に入り機能

    在庫登録・変更 ---
        名前,
        おすすめ,
        新商品,
        ジャンル,
        値段,
        サイズ,
        在庫数,
        画像<5枚まで>)
        在庫の陳列切り替え
    --- 

    住所登録

    注文履歴
    (注文した商品の状態確認)

    発注履歴
    (住所、発注者の確認)

    商品発送状態確認・変更機能

    決済機能

___
## 環境
### 環境構築
    npx create-next-app --ts
### 本番環境
    Heroku(ホスティング)
    Mongo Cloud(DBサーバー)
    Cloudinary(ストレージ)
    Nodeサーバー(APIサーバー)
___
## 工夫したこと・苦労したこと・反省点
    ECサイトで最低限必要であろう、機能を実装してみました。
    なかなか機能数が多く大変時間がかかりました😅

    ECサイトでは、在庫数などに矛盾が生じてしまうとまずいので、トランザクションやデータの変更などを行う際に、 それ以前にデータの変更がないかなどの確認の処理をいれてから、処理を行うことで、矛盾の防止をすることを心がけました。

     Next.jsのサーバーサイドレンダリングを使いサーバー側でhtmlを組み立てることで、ページの表示速度向上に務めました。

    Reduxを積極的に使い、グローバルステートとして管理することでレンダリング回数の削減とプロップスのバケツリレーの削減に務めました。

    一つ失敗したと思ったのは、next.jsのカスタムサーバーでapiを実装したため、next.jsのAutomatic Static Optimizationの最適化の恩恵が受けられなくなってしまったことです。
    
    UIがいろんな色を使ってしまい統一感がなかったので、使う色の種類を最初からある程度限定しておくべきでした。
___
[製作者の Twitter](https://twitter.com/Patao_program)
