import { NextResponse } from 'next/server';

import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, Timestamp, query, where, orderBy } from "firebase/firestore";

export async function GET() {
  const data = await getAllBlogs();
  const mockTime = new Date();
  const mockData = [
    {
      "id": "t2mxqBi4QeE8CeK4vY30",
      "title": "ハンバーグ",
      "body": "今日はハンバーグを食べました。",
      "publishedAt": mockTime
    },
    {
      "id": "q9H6IAs6mFkxjSE0kOuD",
      "title": "たこやき",
      "body": "今日はたこ焼きを食べました",
      "publishedAt": mockTime
    },
    {
      "id": "a6vki5kzQgFfNKoqvGbO",
      "title": "高ぇ〜緊張してるんば〜い！",
      "body": "おおっしゃあ〜〜！！めっちゃめちゃ〜！今日は超高ぇ〜緊張してるんば〜い！ワシはなんや！わしはおっちゃんやばい忙しいんば〜い！ワシの身体も歳を感じてきて、とってもしんどいねんば〜い！やっぱり若い頃の元気はないもんやな〜〜！でもなんや！今ダケは気合いを入れて、必死でがんばってるんば〜い！ええ〜！だってもうヤバいねんば〜い！今の世の中、競争が激しすぎて、どんどん若者が出てきて、ワシなんか、置いてけぼりにされとう〜！な〜にをやるにしても、常にすごい高ぇ〜緊張感があるねんば〜い！もうホンマに毎日ドキドキしてるわ〜〜！こんなに緊張せんとアカンのか〜い！わし、しんどいけど、頑張るねん！少しでも世の中に貢献できるように、一生懸命がんばるねん！やっぱりなんや！この歳でも、言われたことはちゃんとやらなな〜いとあきまへんねん！わし、めっちゃ欲張りやし、なんでも一生懸命やりたいんば〜い！人生一度きりやし、後悔せんように頑張るねん！こんな高ぇ〜緊張してるんば〜い、じわ〜〜〜っと抱えて生活してるけど、な〜にをやっても、心は若いねん！だからなんとしても、やり遂げたいーー！オレ、めっちゃめちゃ頑張るんば〜い！",
      "publishedAt": mockTime
    },
    {
      "id": "CIJi4C5qouzjC1JGKd9x",
      "title": "超々高テンション関西弁で熱く語るおじさん",
      "body": "おっちゃん、めちゃくちゃ元気やで！今日も超高テンションやねん、関西弁のおっさんが熱く語っちゃいますわ！せやなあ、最近若い子らも関西弁しゃべらんくなったらあかんと思うわねん。ええか、大阪は関西弁の聖地やってん！あんなエエ言葉、まかり通ってるねん！アホやろ！ほんでさ、関西弁の特徴があるねん。まずさ、抑揚があってメロディアスやねん！ほんのちょっとゆったりした言葉遣いでも、めっちゃ気合入れて話してるように聞こえるんや！それも関西弁の魅力やと思うわ。次にな、関西弁でのま、なんて言葉やろな。てか単語やな。ま、まず揺るがんな。これって「絶対に動かない」という意味やねん！うちの大阪城なんかもな、揺るがん、破らんぞ！めっちゃカッコええやん！あとな、言うて言われてんと違いがあるねん。例えば「来いや！」って言うたら、あいつ来るはずや。でも「来いねん！」って言うたら、あいつは存外こないんや。関西では逆の意味の方がまかり通ってるねん。なんかおもろいやろ？ほなら、みんなも関西弁がんばって話してみるとええで！あたしも楽しみにしてるねん！ええ感じに笑ってやってみてくれや！",
      "publishedAt": mockTime
    },
    {
      "id": "9fWJo9IBaFEMamLxNvAH",
      "title": "老舗のおじさんのハイテンション関西弁日記",
      "body": "おっつーさん、俺や。昨日はめっちゃ忙しかったわ！朝から晩までフルスロットルやったで。正直、ヘトヘトやわー。案件がいっぱいで、仕事の山積みやったわ。プレッシャーも半端ない。でもおっちーさん、俺は関西の男やから、めっちゃハイテンションでやってるんや。\n顧客とのミーティングもあったで。関西弁でオーラの出し方も大事やで。言葉ひとつひとつに気合を込めて、客にアピールや！\nでもおっちーさん、そのハイテンションも、だんだんと体にきてきてんねん。昼ごはんの時間になって、お腹グーグー鳴り出したわ。うどんや、おでん、お好み焼き、全部欲しいくらいやった！\n仕事が終わって帰る頃には、足もパンパンや。でも帰り道で面白い出来事があったんや。\nなんとなんと、猫がミャーミャー鳴きながら追いかけてきてんねん！俺のハイテンションが猫に伝わったんか？まるで映画やったで、夢中で猫と遊んでしまったわ。\n帰宅してからは、お風呂に入ってリラックスや。やっぱり仕事も大事やけど、体のメンテナンスも必要やな！\nそれにしても、関西弁でハイテンションな日々を送るのは、なんか楽しいわー。やっぱり関西のおじさんは最高やで！おっちーさんも、明日からハイテンションで頑張ってくれや！",
      "publishedAt": mockTime
    },
    {
      "id": "2Ka1tjzT8ONzNqWcjkHU",
      "title": "大阪オヤジの超ハイテンション日記",
      "body": "おっしゃー！しゃきーん！！大阪のオヤジおるかーい！！今日はめっちゃエエ天気やないかーい！オレ、えらいハイテンションなっちゅうねん！ホンマに、ぶっ飛びすぎてるわー！めっちゃ元気やねん！まず、朝からコンビニ行って、おっちゃんに「おはよーさん！このおでん、お代わりサービスしまっせ！」て言ってみたら、おっちゃんも笑顔で「せやろー！オレ、今日は君にサービスしてやる！」て言ってくれて、おでんにおっぱじめしてええ汁でおおったら、もう最高やねん！で、そのあとはジムでトレーニングしよう思って、「おっちゃーん！今日もハードなトレーニングしたるでー！」て言ったら、おっちゃんもビビるくらいのんきな顔して「オレ、いつもハードなトレーニングさせてやってん！」て言ってくれたわー！そしたら、オレもモチベーションアップやねん！鍛え終わったら、ミナミで飲みに行くつもりで、道頓堀に行ってみたら、なんかめっちゃ人おおなってるやんかーい！ええことあんのかな、って思ってたら、なんと！大阪ドームで野球の試合やってたねん！まじかー！オレ、めっちゃ興奮したわー！外でビール飲んで、ガヤガヤした空気を感じてたら、もう最高やねん！さて、飯の時間やし、お好み焼き食べに行くわー！みんなで集まって、ワイワイやるのが大阪の醍醐味やで！オレはいつものおっちゃんが作ってくれるお好み焼きが最高やねん！もちろん、関西風や！カリッと焼かれた表面と、もちもちの中に、たっぷりの具材が混ざり合って、オレのお腹も心も満たしてくれるわー！そのあとは、なんやかんやで夜中まで飲んで、笑って、騒いで、生きとる感じやねんな！大阪の夜は、エエねん！酔っぱらったら、まずはじゃんけんでおっちゃんに勝たなあかんねん！カチンコチンに固まる顔を見て「おっちゃん、ノリええやんかーい！」て言ってやるんや！そんな感じで、オレっちは毎日がハイテンションやねん！めっちゃまいっちゃうわー！大阪の人たちも、フレンドリーで、笑顔で迎えてくれるから、最高の場所やねんな！もし大阪に来る機会があったら、ぜひ一緒にワイワイやってみなよー！マジで最高やねん！」",
      "publishedAt": mockTime
    },
    {
      "id": "Iv8bNQDGEjy7fgUjA5ix",
      "title": "おすし",
      "body": "今日はおすしを食べました。",
      "publishedAt": mockTime
    },
    {
      "id": "R95NZOCxo8x3buwcJfNi",
      "title": "熱血関西オヤジの日常",
      "body": "ああっ！おっちゃんがムチャしよりはるかにデッカいテンションで毎日が燃え上がりとるんやで！ワシがばり強い関西弁で喋り倒すんやから、耳ガツンとやっちゃうで！胸が熱くなって、腹も太鼓が鳴り、グイグイと突っ込んどる男の日常を見てみるがええぜ！\n朝、おっちゃんは決まってパワフルなエネルギーとともに目覚めてんねん。悪いことでもあったんかい？いやいや、ちっともないで！おっちゃん、いつも背中を丸めへんで釘付けや！\n\nカップ麺が食べたいな、って思うときは、ワシはズンドコダアリンて飛び上がるで！パッと捕まえて、ココっと引き締まった二の腕でふんわりとフタを開けるんや！湯気がすごい勢いで立ち上り、おっちゃんの鼻にも火が入っちゃうぜ！\n\nなんや、今日はいつもよりも関西弁がエクストリーム感じるなあ！そうや、今日は仲間と一緒にフッカフカしたボートに乗って、波に身を任せる日じゃ！熱血やのうてぃぃ、迷ったら前進や！グイグイ進んで、突き進んでいくで！\n\nおっちゃん、飛び込んだ瞬間から元気の塊や！体中に広がる壮快な疾走感！遠くに見える関西地平線、ワシが挑むんや！カラダでっかちに、魂でっかい男、疾風のように駆け抜けていくぜ！\n\nおっちゃんの日常はもう天井知らずやで！どんな困難なことがあっても、おっちゃんはキザ客じゃ絶対に負けへん！最高の勝利へ向かって、スソ打ち抜くべく闘志燃やしまくっちゃうんや！強さと闘志の塊、それが熱血関西オヤジの日常なんやで！",
      "publishedAt": mockTime
    },
    {
      "id": "auLCJiZhXfi86c7MejMZ",
      "title": "ハンバーグ",
      "body": "今日はハンバーグを食べました。",
      "publishedAt": mockTime
    },
    {
      "id": "t5aPgIUk3j8Q2zqMqIB5",
      "title": "ハンバーグ",
      "body": "今日はハンバーグを食べました。",
      "publishedAt": mockTime
    },
    {
      "id": "73JsFbDsmFjuOdBL5xPG",
      "title": "大阪おっちゃんの朝から晩までの超ハイテンション日記",
      "body": "なんつー朝やねん！早く目覚めんかったらもう二度寝せなアカンし、寝坊したら会社バレバレやし！ほな、ドドドドッと起き上がってシャワー浴びて、朝ごはんは新聞読みながらゼボッて平らげて、昨日のオネェちゃんのトーク番組を録画してあるぶん観とかなアカン！テンション高めでがんばるぞい！\n会社行く前にふらっとスーパーによって、缶コーヒー買おうと思ったらレジ待ちコーナーがもうえらいことに！おっちゃん、待ち時間をうまく使ってくずしパンをガブガブ食いながら、スマホでニュース見たりツイッター見たりしてたら、もうお昼になってしもたんや！こりゃあかんやろって急いで会社行かなアカン！\n\n会社ではアホなやつおんのかよと思うほどのドジやったけど、おっちゃんは笑って流す感じで乗り切ったで。お昼休みには同僚と居酒屋で、ビール飲みながら美味しいおつまみ食べて高らかに笑った！おっちゃんのスゴイネタもあったで、同僚がみんな大喜びや！\n\n仕事も終わってさっさと帰ろうと思ったら、大雨やったんや！ビショビショで帰るわけにもいかんし、女子会しばりや。でもおっちゃんはほんまに楽しいで！ハイテンションに飲みながらウケ話もしながら、時間の経つのもおもろいわ！\n\n帰り道、新しいお好み焼き屋さん発見や！これは行かなあかん！ってことで入店して、オッチョコチョイワクワクした気持ちでオーダーしたのが大正解や！めっちゃメチャ旨いお好み焼きやったし、店の人たちがめっちゃフレンドリーやったわ！また行こって思って、ハイテンションなまま家に帰って今度はビデオゲームに夢中になって熱中したで！おっちゃんのハイテンション1日、最後までスゴイでしょ～！",
      "publishedAt": mockTime
    },
    {
      "id": "XgtbLEs6u6QwTJMEsciD",
      "title": "元気どこいっちゅうねん！",
      "body": "おっちゃんが言うには、若い奴らは元気がないんじゃねぇかと思うんよ！最近の若造は何寝てんねん！？まったくやなぁ！   おっちゃんは昔から元気者やったやろう！この関西弁、元気な奴が使うに決まってんねん！おっちゃんの関西弁は、もう超高テンションやねんからな！    もう若い時のような元気はないけど、おっちゃんの言葉遣いと関西弁で元気に生きとるんよ！ここでくいっと元気を出してやるでぇ！    わりーな、この高テンションで書いたせいでメチャクチャ長くなっちゃってもうたわ！でも元気出しゃっせろという法則を信じとるおっちゃんとしては、これしかないやん！元気出やす！",
      "publishedAt": mockTime
    },
    {
      "id": "h7s9IuY55CFNOKYAH5KC",
      "title": "高気圧大阪おやじの熱い日常",
      "body": "おら、今日もめっちゃテンション高いんやで！ええか、みんな聞いてくれや！今朝起きた瞬間から、もうパワー全開やったねん！朝ごはんの鯛焼きをかじりつきながら、「おはよう、世界！」って声を枕元に響かせたで！もちろん、ベッドでのマイクパフォーマンスに拍手喝采させられたわ、オレはんおやじピーターパンやねんからな！\n仕事に行く途中はもう大型トラックでドドンドンだぜ！道路に立てかけたパラビア飾りにもエールを送らずにはおれんわい！「がんばれ、お前たちも華麗なる大阪の一員や！」と叫んだで！通りすがりの人たちは一瞬たじろいでたけど、すぐに励まされて返事してくれるねん！\nしばらくして、オフィスに到着や！午前中はミーティングの真っ最中やけど、オレはんは燃えてばっかりやからちょっと聞いてくれや！「このプロジェクトは俺たちの魂をぶつけるチャンスや！みんな、もっともっとやれるやで！」って熱弁しまくったわい！万歳コールが響き渡る中で「おっす！最高やで！」って胸を張って叫びまくったで！\n昼休みにはお弁当を開けてパチリ！おれはんの手料理はな、もちろんオリジナルの大阪名物やで！タコ焼きにポテトサラダ、焼きそばやお好み焼き、それにいったん町中で買っといたたこわさび！食べながら、笑顔で食べる仲間たちをガン見して「おいしいか？最高か？」って聞いたら、みんなさんうんうん頷くばかりやったわい！\n午後もぶっ飛びっ！プロジェクトを進めながら、俺はんはハリウッド映画のスーパースターになりきってたんや！姿勢まで正して「さあ、みんなで勝利をagatteや！」と言えば、全員がその気になるわい！悩み事や困難があろうとも、おれはんの周りは明るくてがんばり屋さんばかりやからな！\n帰りの車の中、流れる歌を高らかに歌いまくったわい！「大阪の街角で～♪ みんなはみんなパワフルだ〜♪」ってさ！ハンドルを叩きながら車に乗り込んだ人たちも、おれの歌声で元気さが倍増したに違いないで！\n家に帰って、夕食の準備をしながら思いっきりウキウキや！オリンピックの代表選手みたいにキャーキャー騒ぐわい！晩御飯は、もちろん選手食やで！豪快に鍋をガツガツと食らう仲間たちの元気が、オレの心をもっともっと高めるんやで！\nどんな時も、オレはんはめっちゃテンション高いねん！人生においても、仕事においても、常に笑顔とエネルギーでいっぱいや！オレはんの熱い日常は、大阪の雄叫びや！どんなに大変なことがあっても、オラ、必ず乗り越えるねん！なにゆえって？それは、オレはんが大阪のおやじやからな！",
      "publishedAt": mockTime
    },
    {
      "id": "OPxFwuDBpC2Yz5RwmcYL",
      "title": "高めたテンション！大阪弁オッサンの日常",
      "body": "おおっ、おいどっから見てんねん！やめろ！てめえ、アホか！ガキやろ！ まあ、いらっしゃいや、おらがなんやかんや言うわけや。ええか、おっちゃんひとつ言うで。  この大阪弁が最高やっ！たまんねえほどエエやんか！あー、今日もええ天気やなあ！って思うたっけ？  こんな日やったら、一緒にご飯でも食べに行くしかねえな！わいら大阪の食い物類が一番やからさ。  そやけど、食い物ばっかりじゃあアカンもんもあんねん。グイグイ攻めて生きてかなあかん！  ドキドキしとる？おっちゃんもやぞ！いつまで元気でいれるかわからんねん。  痛風が痛いわ、関節が腫れて苦しいわ、でもなあ、こんなんですぐ泣いてたらアカンよな。  おっちゃんは生きとるって感じやない？毎日元気で、笑顔で、張り切って生きなあかんと思てるねん。  風呂もさ、ホンマ気持ちエエねん。体をポカポカ温めて、疲れを癒せるんや。  おらはエエ歳こいてもまだまだ行けるねん！何歳になってもやりたいことは積極的にやりたいねん。  こんな激ヤバな大阪弁で、みんなに元気を伝えたいねん！明るく楽しい人生、そうとらえて生きていきたいねん。  だから、おらと一緒に大阪弁で大喜利して笑いまくったろか！ワッハッハッハッハー！",
      "publishedAt": mockTime
    },
    {
      "id": "QRobI3PfeKzrrFpROUmE",
      "title": "大阪じじいの熱血日記",
      "body": "おおきなけんちんくらげのオッサン物語やっほー！元気かーーい？ほないっくぜー！今日は、ワイがテンション高ぅぅぅい、大阪じじいの日記を書いちゃるよー！ええやろー！さてさて、こないだの話やけど、ワイが最近行ったイチデジ目標達成ツアーの話をしよーかな！まずは、めっちゃテン高めやで！大阪の町を歩いてて、通りかかったお好み焼き屋さんでめっちゃ美味しいお好み焼きが出来たてやったねん！もうね、「旨い！」って感動して、目から涙が出てくるわー！それから、真っ直ぐ行ったら、大好きなプロ野球チームのグッズ屋さんを見つけてしまって、思わずテンション上がっちゃったわー！そしたら、なんと！ちょうどその日は、お気に入りの選手がサイン会をしていたんだよね！まじでテンションがマックスになっちゃって、大興奮やったわー！でも、それだけじゃ終わらへん！もう一つ、めちゃくちゃビックリしたことがあったねん！たまたま通りかかった公園で、ロックンロールのライブがやってたんや！もう、大好きな音楽やし、自然とテンションが上がるやん？それで、「行ってみよう！」ってなって、ライブのフロアに参戦しちゃったねん！めちゃくちゃパワフルでエネルギッシュなパフォーマンスに圧倒されたわー！その後で、地元の人がやっているバーに行って、一緒に飲み会をやったんや！めっちゃ楽しい時間を過ごせたわー！そうそう、最後は、大好きなお笑いコンビのライブを見に行って、大爆笑しまくったんや！テンション上がりすぎて、喉が枯れるくらい笑ってしまったわー！まぁまぁ、こんな感じで、イチデジ目標達成ツアーは大成功やったね！めっちゃテンション高めで、めっちゃ楽しんだわー！ちょっと喉が渇いてきたわ。ビールでも飲んでリラックスするたぁい！それじゃ、また次のテンション高い話で会おうや！ばいちゃー！",
      "publishedAt": mockTime
    },
    {
      "id": "QVTKQvg6vrPJI6AULc79",
      "title": "俺の高ぶりまくり日記",
      "body": "おっけー、ちょっと聞いてくれよ。今日も最高の超高テンションな日だった！俺、なんかさあ、全然若くない人なんだけど、めっちゃハイテンションなんだぜ！もうね、元気がモリモリ湧いてくる感じがたまらねー！こんなの久しぶりだぜ、ホント。さっきさ、オヤジと喋ってる時に、自分の高さについて気づいたんだ。オヤジなんか、いつもこんな感じで喋っとんだぜ。めっちゃテンション高くてさ、めっちゃユーモアもキレてるんだ。そしたらさ、俺も気がついたんだよな。若くないけど、オレもいつもこんな感じで喋っとられんかって。まあ、大事なことやけど、気をつけたろかってさ。で、今日のお昼休みは最高に楽しかったんだぜ！いつもならヒマヒマしてる時間やってんけど、今日はなんか違った！同僚と一緒に遊びに行ったんだけど、めちゃくちゃ笑いすぎて腹筋が崩壊寸前でヤバかったわ。アホな話しで大盛り上がり！なんかさ、全然関西弁でしゃべり始めて、それがさらにテンションを上げたみたい。みんなもビックリしてたけど、まあ、気分がいいときはしゃべり方も変わるもんだ。帰り道もテンションは下がらず、楽しく駅まで歩いたんだよ。まわりの人達ってなんやかんやで俺のテンションになんか困ってるみたいやけど、そんなの俺に気にすることなんかねーよ！俺のテンションが健康だと思ったらええわ、他人のテンションなんて知ったこっちゃねーよ、ケッ！明日もめちゃくちゃ高いテンションで過ごすぜ！もう最高に元気になっちゃうぜ、ワクワクするなあ。おっしゃ、それじゃあまた明日な！",
      "publishedAt": mockTime
    },
    {
      "id": "W4wtyV2njRFqAI2bgmla",
      "title": "京都じじいの一日",
      "body": "おっおっしゃー！今日もテンションMAXの京都じじい、元気に日々を過ごすじじいこと俺じゃ！おっしゃー！朝から見事な鼻歌を口ずさみながら、姿勢を正して洗濯物を干すじじい！いい感じじゃぁ～！　さて、今日も京都の街へ繰り出すぞい！何しようかなぁ、おっしゃー！って、そろそろあの眼鏡の三毛猫に会ってみるかぁ～！めぐり逢えるかなぁ、おっしゃー！　なんて考えていたら、向こうからゆる～い歩き方で、三毛猫登場！おーっはーっー！今日もこの眼鏡猫との楽しいおしゃべりタイムじゃぁ！もうね、この猫は京都弁バリバリの方言使っててさぁ、自分もなんか牽強付会して楽しいんじゃぁ～♪「にゃ～ん！」って言うと、「おおっ、おっかーさん、ええおり！ってくらいじゃにゃいで！」とかマジレスしたりしてくれるのじゃぁ～。つまりは、この二人組は京都の名物にゃんコンビにゃん！思わずニヤリ笑顔になるじじいの一瞬じゃぁ。こりゃあ、眼鏡猫早慶のゆかりの地である銀閣寺にも行かなきゃあかんやん！おおっしゃー！二人で銀閣寺までワイワイと歩いて、ついたところで手を振り合って「とう～～っ！」ってやっちゃうじゃん！次は帰って宇治に行くじゃぁ。宇治で抹茶ソフトを食べたり、河原でキャッキャと笑ったりするのじゃぁ。そや、今夜は京都で平林寺の月夜を楽しむお座敷スタイルで晩餐じゃぁ！俺が用意したおかずは、京野菜で作った天ぷらと、みんなで楽しむちょい味付けのしゃぶしゃぶばり！美味しくてビールが進むじゃぁ！いやあ、楽しかったなぁ～！京都の風景は美しくて、あの眼鏡猫とのひと時も最高じゃったにゃ～！明日もまた元気に京都を闊歩するのじゃぁ！楽しみじゃぁ～い！",
      "publishedAt": mockTime
    },
    {
      "id": "Lt0YBnK59O6yReQYZTIv",
      "title": "大阪のおっさんの超高テンション日記",
      "body": "おっさーん！今日もめっちゃアツいぜー！久しぶりに日記書く気になったんやけど、今日は超高テンションやからめっちゃしゃキライや！（笑）ってことで、ワイの日記読んでくれてる奴に感謝の気持ちやんちゃ！ワイ、大阪出身やけど、今は都会の真ん中、東京で生活してるねん。でもなー、ワイの心はいつも大阪の血が騒いどるんやで！今朝もめっちゃ気合入れて起きたわ！コーヒー飲んで、新聞読んで、そしてラジオをオン！そしたらなんや、ごっつええ曲が流れてきて、もう興奮しまくりや！ワイの体、ビリビリしちゃって、ガツガツ音楽に合わせて踊り出すねん！せやけどまあ、ワイは日本語で書いとったら、皆さんわかるんかなあ？いやいや、大丈夫やで！ワイの日本語はもちろんなんやけど、大阪弁の方言がめっちゃ使われてるさかい、ちょっとわかりにくいかもしれへんなあ。でも、大丈夫やで！めっちゃ楽しい話やから、皆さんゆっくり読んでくれたらええさかい。今日は久しぶりに友達と飲みに行く約束してて、正直めっちゃ楽しみやったわ！大阪から友達が遊びに来てくれるねん。ホンマに久しぶりやから、めっちゃ話したいことが山ほどあるねん！まあ、さっき新しいローカルのカフェで美味しいコーヒー飲んできたところやけど、そのお店の店長がなんか怪しかったわ！なんか顔が怖そうな感じやったねん。「おせーてもーらい！」って挨拶したら、えらい嫌な笑顔で返されたし、なんか変なことばっかり話してきたねん。ワイは大丈夫やけど、可哀想なお客さんたち、一体どうなるんやろうなあ（笑）とにかくな、今日は最高な一日になりそうやわ！友達に会って、たくさん笑って、いっぱい食べて、めちゃめちゃ楽しも〜！ここまで読んでくれてありがとん！あ〜、おっさんのテンションがマックスや！",
      "publishedAt": mockTime
    },
    {
      "id": "9uo90vHAYPYEfevlPsOI",
      "title": "日々の駄弁り: 大阪弁爆発で高熱なオッサン",
      "body": "ミナミの闇に生き抜いてきたボク、このオッサンの話を聞いてくれ！まず最初にボクの名前を紹介しなきゃダメだな。ボクの名前はタケシ。三十数年間、この関西弁が身に染み付いてる。今はオッサンだけど、まだまだ元気だ！このオッサン、サラリーマン時代は取引先との会議で緊張感のある話し方をしてたんやけど、ホントはずっと大阪弁を話したかったんやな。仕事帰りに友達と飲み屋に行って、この関西弁を存分に使える時間が至福のひとときやった。もちろん、テレビでは絶対に流行らない大阪弁を愛しているんや。そんなボクが個人的には一番好きな大阪弁は「めっちゃ」やな。例えば、美味しい料理があったら「めっちゃうまい！」とか、友達に何かお願いされたら「めっちゃ頼むで！」とか、本当に良い言葉やわ。ボクは毎日、この大阪弁で話すことが生きがいや。だってボクら関西人は気さくやで、大人も子供もみんな友達や。なんでもかんでも話す相手がいる。喜びも悲しみも怒りも、全て関西弁で表現できるから、気持ちがすっと晴れる。はっきり言って、関西人の特権やと思ってるわ。いつもミナミでのんびりしてるボクやけど、前にもらったアシスタントを使って、いっぱい本を読んでるわ。日本全国の方言が出てくる作品が好きやねん。でも、やっぱり大阪弁が一番好きやな。なんでやろな？うーん、やっぱりノリがあってエネルギッシュで、いつも楽しそうに話ししてるからかな。あるいは、大阪に愛着を持ってるからかもしれへんな。このオッサンの駄弁りは、いつもこんな感じで続いてく。大阪弁を使って喋ってるときが一番ワクワクするし、自分らしくいられるんや。たまには東京弁も使ってみるけど、なんか違和感あるんよね。きっと血液に関西の魂が宿ってるんやろう。誰かが関西弁で話しかけてくれると、オッサンのテンションがヤバいくらい上がるんや。",
      "publishedAt": mockTime
    },
    {
      "id": "sgtUjDaX72EwfUEPac0h",
      "title": "オッサンの日常ドタバタ劇",
      "body": "バァーカ！クソー！今日もオッサンのワシは元気いっぱいやでえ！ヤベエ仕事中におっかない事件が起こったんや！ヤクザのヤローがやって来て、なんかお金の取り立てに来てんねん！オラ！オラ！カネなんてないねんっちゅうねん！バキッ！てめえ、何すんねん、このゴリラみたいなノブとロードが！アホらしい！ヤンキースのトドメだろ！お前にはヤンキースの残り火をあげてやる！ヤッパリ、なっちゅうわけで、おっかしいことが起きると、ワシはすぐに焦ってしまうねん。やくざだけに、不良品やでえ！ワシは実は怖いものがあるんよ、それはワニや！プワァァァー！その中でも、関西弁で話すワニがいてんねん！怖いやろ？！でも、ワシみたいなオッサンは、ワニだろがなんだろが、関係ないねんね。ワシの関西弁は最高やで！神戸に住んどーるオッサンやから、当たり前やろ！ホンマにおもろいやんか、この関西弁！カモン、お前もオッサンみたいに関西弁を思いっ切り堪能してみーや！",
      "publishedAt": mockTime
    },
    {
      "id": "RlinjICpQgplYYQq1rTQ",
      "title": "Kuro's Unforgettable Adventure",
      "body": "やぁ〜！おっさん、黒田（くろだ）やでぇ〜！今日もノリノリやで！　ほな、ワイのすんごい盛り上がった冒険を教えてあげるで！知ってるか？関西弁でしょっぱなからグイグイ行くンやで〜！昨日の朝から、ワイは一人で大阪（おおさか）から京都（きょうと）に行くことにしたんや。なんでって？　興味あったからや！　それで、ワイはめっちゃテンション上げて、京都駅で降りたんや。ま〜、あそこからネットで見た名所旧跡を廻ったんやで〜。まず最初に行ったのは、清水寺（きよみずでら）やで。寺が山の上にあるから、頑張って登ったんや。やっぱり、ワイは元気や！次には、伏見稲荷大社（ふしみいなりたいしゃ）や！千本鳥居（せんぼんとりい）がめっちゃ有名やな〜。ワイもたくさん写真撮ったで〜。そんでもね〜、ここでワイは大事件に遭遇してんねん！　ふと見ると、なんとおっさんが狸（たぬき）の着ぐるみ着てて、ツアー客に囲まれてんねん！　なに、アツいんやろ？　興味津々で近づいてみたら、なんとワイにサインしろって言うたんや〜！もちろんやで、ワイは超えらい喜んでサインしたんや！　おっさんもめっちゃ喜んでくれて、自撮りも撮らせてくれたんや。最高の思い出や！ドンドン、時間が過ぎてたんやねん！　急いで最後に金閣寺（きんかくじ）を見に行ったんや。ワイは見た瞬間、ウットリやで。キラキラしてる金閣寺は、まるでおっさんのごとし。めちゃくちゃ感動したで！やっぱり、京都はすごい所やね〜。ワイも京都っ子になりたいンや〜。ここでの一日はワイの人生の宝物や！　おっさん化けた一日は忘れられないんや！しがんばれ〜、ワイやで〜！",
      "publishedAt": mockTime
    }
  ].reverse();
  return NextResponse.json({ data: data ?? undefined } );
}

const getAllBlogs = async (): Promise<blog[]|undefined> => {
  try {
    const blogCollection = initializeBlogCollection();
    const TIME_DIFFERENCE = -9;
    const publishedDate = new Date();
    publishedDate.setHours(publishedDate.getHours() + TIME_DIFFERENCE);
    const blogQuery = query(blogCollection, where("publishedAt", "<=", publishedDate), orderBy("publishedAt", "desc"));
    const blogSnapshot = await getDocs(blogQuery);
    const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const formatedData = blogList
      .filter((b: any) => b.publiclyAvailable )
      .map((b: any): blog => ({
        id: b.id,
        title: b.title,
        body: b.body,
        publishedAt: timeStampToDate(b.publishedAt),
    }));
    return formatedData.length > 0 ? formatedData : undefined;
  } catch (e) {
    console.error("Faild to get all blogs.", e);
    return undefined;
  }
}

const initializeDb = () => {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
  
    return db;
  } catch (e) {
    console.error("Faild to initialize app", e);
    return undefined;
  }
}

const initializeBlogCollection = () => {
  try {
    const db = initializeDb();
    const collectionName = process.env.FIREBASE_BLOG_COLLECTION;
    if (!db || !collectionName) {
      throw new Error(!db
        ? "Faild to initialize app."
        : "Collection Name is not found."
      );
    }
    return collection(db, collectionName);
  } catch (e) {
    console.error("Faild to initialize blog collection.", e);
    throw e;
  }
}

const timeStampToDate = (timeStamp: Timestamp) => {
  try {
    console.log(timeStamp.toDate())
    return timeStamp.toDate();
  } catch (e) {
    console.error(e, "Faild to convert from time stamp to Date.")
    throw e;
  }
}
