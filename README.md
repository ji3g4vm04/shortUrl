# 縮網址生產器

![shortUrlMaker](https://github.com/ji3g4vm04/shortUrl/blob/main/public/shortUrlCover.png?raw=true)

## 功能

- 輸入的原始網址轉換成縮網址
- 複製當前的縮網址
- 透過縮網址轉址
- 翻閱過去才成縮址的原始網址
- 複製過去完成的縮網址

## 使用流程

1.  透過 git clone 將專案下載至本地端

2.  透過終端機將移動至專案資料夾

3.  安裝所有需要的套件

4.  新增.env 檔案，並設置 MongoDB 的環境變數與密碼

5.  在終端機輸入以下程式碼

```
 npm start
```

6. 出現以下訊息則表示執行成功

`This app is running on port:3000
connect successful!`

## 開發工具

- 若要透過 npm start 運行此專案，後頭有 i 的套件必須要安裝

* @types/express ^4.17.17
* dotenv "^16.0.3 i
* express "^4.18.2 i
* express-handlebars ^6.0.7 i
* mongoose ^7.0.0 i
* ts-node ^10.9.1
* typescript ^4.9.5
