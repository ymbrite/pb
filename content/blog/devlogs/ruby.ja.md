---
title: 漢字にルビを振る
slug: ruby
description: 漢字にルビを振ることについての考察
published: 2025/08/28
lang: ja
tags:
  - ルビ
  - 漢字
---

授業中で急にルビがどうやって付くのか気になったので、調べてみた。Wordの中ではルビを振る機能があるけど、Wordを使ってノートをとるのは無理すぎ。Obsidianの中で試した後、ルビはHTMLそのままの機能だと思わなかった。

# ルビとは
ルビは欧米からのもの。当時西洋活版印刷術における「小さい活字のサイズ」の名称である。
| Diamond<br>~4.5pt | Pearl<br>~5pt | Ruby<br>~5.5pt | Nonpareil<br>~6pt | Minion<br>~7pt | Brevier<br>~8pt |
|-------------------|---------------|----------------|-------------------|----------------|----------------|
| Bourgeois<br>~9pt | Long Primer<br>~10pt | Small Pica<br>~11pt | Pica<br>~12pt | Great Primer<br>~18pt |   |

| Key | Type      | Description |
| --- | --------- | ----------- |
| 1   | Wonderful | Table       |
| 2   | Wonderful | Data        |
| 3   | Wonderful | Website     |


1. 日本が近代印刷を導入した明治期、西洋の _ruby_（5.5pt 前後）の活字を「漢字の読みを振る小仮名」に使った。
2. そのまま「ルビ」と呼ばれるようになり、今日では **注音文字（フリガナ）** 全般を指すようになった。
3. 現代の HTML/CSS も、この日本語印刷文化を取り入れて仕様化された。

## Markdown中のルビ

HTMLの中で元々付いた機能ですので、Nuxt Content で特に設定しなくても使えます。

```md
<ruby>漢字<rt>かんじ</rt></ruby>
```

<!-- ルビを振るの段落をくれ -->


元々付いた機能元々付いた機能元々付いた機能元々付いた機能元々付いた機能元々付いた機能元々付いた機能元々付いた機能元々付いた機能

## @nuxt/content Hookによる自動変換

{漢字|かんじ}
