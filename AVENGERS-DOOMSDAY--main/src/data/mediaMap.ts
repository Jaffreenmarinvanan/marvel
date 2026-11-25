// @ts-nocheck
/**
 * MOVIE_MEDIA — Central registry mapping all 128 MCU & Marvel movie/series slugs
 * to verified high-resolution Pinterest posters and official local logos.
 */

export interface MovieMediaItem {
  image: string;
  logo?: string;
  accent: string;
}

export const MOVIE_MEDIA: Record<string, MovieMediaItem> = {
  "blade-1998": {
    "image": "https://i.pinimg.com/736x/19/d9/9d/19d99d0522c4457e627f103a26e2433e.jpg",
    "accent": "#b91c1c"
  },
  "x-men": {
    "image": "https://i.pinimg.com/736x/e5/cd/52/e5cd5212bae919919d6b8491aca632a6.jpg",
    "accent": "#3b82f6"
  },
  "blade-ii": {
    "image": "https://i.pinimg.com/736x/84/ce/2d/84ce2d8ce87ce84dc8d9f4d51ead2d28.jpg",
    "accent": "#991b1b"
  },
  "spider-man-2002": {
    "image": "https://i.pinimg.com/736x/48/4b/8f/484b8f1cf95ff2ee83b5e10e80ec8875.jpg",
    "accent": "#ef4444"
  },
  "daredevil-2003": {
    "image": "https://i.pinimg.com/736x/ef/25/f3/ef25f302b5747740390bf275b0f502cd.jpg",
    "accent": "#b91c1c"
  },
  "x2-x-men-united": {
    "image": "https://i.pinimg.com/736x/96/31/b7/9631b70c06676c5f6243244a9ba47dc5.jpg",
    "accent": "#0284c7"
  },
  "hulk-2003": {
    "image": "https://i.pinimg.com/736x/c7/1d/6e/c71d6e3fe10a9826a7f42ffe21634820.jpg",
    "accent": "#16a34a"
  },
  "the-punisher-2004": {
    "image": "https://i.pinimg.com/736x/12/d6/6c/12d66cafe80ad9b48869a748296f0869.jpg",
    "accent": "#171717"
  },
  "spider-man-2-2004": {
    "image": "https://i.pinimg.com/736x/af/a5/4f/afa54fb7fe826d849b6d532d46fb3346.jpg",
    "accent": "#ef4444"
  },
  "blade-trinity": {
    "image": "https://i.pinimg.com/736x/17/78/77/177877f06d6ec6d39379b9b35b4ca01c.jpg",
    "accent": "#7f1d1d"
  },
  "elektra-2005": {
    "image": "https://i.pinimg.com/736x/31/ac/df/31acdf52f08220d68e9b862a212626f5.jpg",
    "accent": "#991b1b"
  },
  "fantastic-four-2005": {
    "image": "https://i.pinimg.com/736x/4f/3e/f6/4f3ef6b8ed9201d7c5fcfb15a50268dd.jpg",
    "accent": "#0ea5e9"
  },
  "x-men-the-last-stand": {
    "image": "https://i.pinimg.com/736x/44/bf/1d/44bf1db9bb0f21cd8e8261621584ee6e.jpg",
    "accent": "#dc2626"
  },
  "ghost-rider-2007": {
    "image": "https://i.pinimg.com/736x/08/5e/b8/085eb8e327e90140b2222c2644a91f9a.jpg",
    "accent": "#ea580c"
  },
  "spider-man-3-2007": {
    "image": "https://i.pinimg.com/736x/63/4e/11/634e111422d053cf2c7c9a56f9a6d03f.jpg",
    "accent": "#ef4444"
  },
  "fantastic-four-rise-of-the-silver-surfer": {
    "image": "https://i.pinimg.com/736x/6f/7c/4c/6f7c4cf8df5ea684d5e7854092d61ab8.jpg",
    "accent": "#64748b"
  },
  "iron-man": {
    "image": "https://i.pinimg.com/736x/14/85/b5/1485b5a78274180bcce4a0fce0ef3c4a.jpg",
    "accent": "#c41e3a",
    "logo": "/mcu/logos/iron-man.jpg"
  },
  "incredible-hulk": {
    "image": "https://i.pinimg.com/736x/02/5b/1b/025b1bf3ffec96d6479b597ea552bd96.jpg",
    "accent": "#16a34a",
    "logo": "/mcu/logos/incredible-hulk.jpg"
  },
  "punisher-war-zone": {
    "image": "https://i.pinimg.com/736x/f6/d6/94/f6d694fd4f9927ad1b620ad1f5d13679.jpg",
    "accent": "#1e293b"
  },
  "x-men-origins-wolverine": {
    "image": "https://i.pinimg.com/736x/4b/46/af/4b46affd0a4612dd6831329e20288a41.jpg",
    "accent": "#eab308"
  },
  "iron-man-2": {
    "image": "https://i.pinimg.com/736x/ca/38/84/ca3884c70e5d3058befb49a9f6030406.jpg",
    "accent": "#c41e3a"
  },
  "thor": {
    "image": "https://i.pinimg.com/736x/40/2c/2e/402c2eab887f68bb3151385cac0571be.jpg",
    "accent": "#2563eb",
    "logo": "/mcu/logos/thor.jpg"
  },
  "x-men-first-class": {
    "image": "https://i.pinimg.com/736x/e9/d7/a0/e9d7a0f5bb4a4bd0bfa8d431da998f88.jpg",
    "accent": "#fbbf24"
  },
  "captain-america-first-avenger": {
    "image": "https://i.pinimg.com/736x/c3/a4/1b/c3a41bf5f2e30e8bbe4b0f8a896613bb.jpg",
    "accent": "#1d4ed8"
  },
  "ghost-rider-spirit-of-vengeance": {
    "image": "https://i.pinimg.com/736x/ae/7d/d6/ae7dd6c5803fd5f5553ac39890695a7d.jpg",
    "accent": "#ea580c"
  },
  "the-avengers": {
    "image": "https://i.pinimg.com/736x/3c/b4/28/3cb428f7b5e7246ee9c2727862e423e4.jpg",
    "accent": "#3b82f6",
    "logo": "/mcu/logos/the-avengers.jpg"
  },
  "the-amazing-spider-man": {
    "image": "https://i.pinimg.com/736x/b1/33/f1/b133f1337b70258e1596ac9a88a8855a.jpg",
    "accent": "#ef4444"
  },
  "iron-man-3": {
    "image": "https://i.pinimg.com/736x/43/12/2f/43122f1057f55bd715fbb509c0b466c9.jpg",
    "accent": "#c41e3a"
  },
  "the-wolverine": {
    "image": "https://i.pinimg.com/736x/09/47/85/094785b4cbfbfccf7b56b0a6ad752ef0.jpg",
    "accent": "#eab308"
  },
  "agents-of-shield": {
    "image": "https://i.pinimg.com/736x/a7/ca/3f/a7ca3faa3b63dd1e653d0efde04adb6b.jpg",
    "accent": "#1e3a8a"
  },
  "thor-dark-world": {
    "image": "https://i.pinimg.com/736x/b1/ee/3c/b1ee3c2cec6beb74ce55d799885dd630.jpg",
    "accent": "#1a1a2e",
    "logo": "/mcu/logos/thor-dark-world.jpg"
  },
  "captain-america-winter-soldier": {
    "image": "https://i.pinimg.com/736x/77/1e/81/771e818d4d3788983f6ec2b438fd7add.jpg",
    "accent": "#1d4ed8"
  },
  "the-amazing-spider-man-2": {
    "image": "https://i.pinimg.com/736x/5b/af/4e/5baf4ec151c96c71e71d06f9c36bc064.jpg",
    "accent": "#ef4444"
  },
  "x-men-days-of-future-past": {
    "image": "https://i.pinimg.com/736x/ea/0a/0a/ea0a0ae5dca2ecaa823aa377e8faa572.jpg",
    "accent": "#6d28d9"
  },
  "guardians-of-the-galaxy": {
    "image": "https://i.pinimg.com/736x/38/1f/fe/381ffea487dd456a6a7094d77429aade.jpg",
    "accent": "#9333ea",
    "logo": "/mcu/movie logo/708120741415477117.jpg"
  },
  "agent-carter-s1": {
    "image": "https://i.pinimg.com/736x/95/94/fd/9594fd5b83c67a99528098955638f344.jpg",
    "accent": "#c41e3a"
  },
  "daredevil-s1": {
    "image": "https://i.pinimg.com/736x/05/77/26/057726b52cb5f11b984858b63a021b71.jpg",
    "accent": "#dc2626"
  },
  "avengers-age-of-ultron": {
    "image": "https://i.pinimg.com/736x/7b/08/c4/7b08c49accdc728b16797a4bd39b7f27.jpg",
    "accent": "#c41e3a",
    "logo": "/mcu/logos/avengers-age-of-ultron.jpg"
  },
  "ant-man": {
    "image": "https://i.pinimg.com/736x/b5/13/97/b51397ef3d7b6ae817f4b7ae857ea570.jpg",
    "accent": "#dc2626",
    "logo": "/mcu/movie logo/834995587162588661.jpg"
  },
  "jessica-jones-s1": {
    "image": "https://i.pinimg.com/736x/d6/16/8b/d6168b522798cd26e90224bb2d1d6ad3.jpg",
    "accent": "#7e22ce"
  },
  "agent-carter-s2": {
    "image": "https://i.pinimg.com/736x/84/fc/7e/84fc7e7333e428f2c1c60f72725894e5.jpg",
    "accent": "#ea580c"
  },
  "deadpool": {
    "image": "https://i.pinimg.com/736x/87/a4/6b/87a46bc1264f942f2a9976d4f5b6129c.jpg",
    "accent": "#dc2626"
  },
  "daredevil-s2": {
    "image": "https://i.pinimg.com/736x/f8/c8/bd/f8c8bd6e371e7d9b4f2c204d9cc81c77.jpg",
    "accent": "#991b1b"
  },
  "captain-america-civil-war": {
    "image": "https://i.pinimg.com/736x/45/1c/97/451c97801dacffe00eb7314e843ec5e3.jpg",
    "accent": "#c41e3a"
  },
  "x-men-apocalypse": {
    "image": "https://i.pinimg.com/736x/6e/0b/1f/6e0b1fa3008386299d9c73a2d89113e3.jpg",
    "accent": "#7c3aed"
  },
  "luke-cage-s1": {
    "image": "https://i.pinimg.com/736x/49/d9/00/49d900d86f30cd8a9577e647e8fd4873.jpg",
    "accent": "#d97706"
  },
  "doctor-strange": {
    "image": "https://i.pinimg.com/736x/e3/37/64/e33764da14fe6b2440b466a5e4ab0385.jpg",
    "accent": "#f59e0b"
  },
  "legion": {
    "image": "https://i.pinimg.com/736x/ab/19/4e/ab194eefce9688ff828840ea5b0d6997.jpg",
    "accent": "#9333ea"
  },
  "logan": {
    "image": "https://i.pinimg.com/736x/a9/2a/96/a92a96911bc6e1ffb92a98c67271fb24.jpg",
    "accent": "#eab308"
  },
  "iron-fist-s1": {
    "image": "https://i.pinimg.com/736x/f5/1a/4c/f51a4cc02ab2f8311fb1438dbb6abb17.jpg",
    "accent": "#15803d"
  },
  "guardians-of-the-galaxy-vol-2": {
    "image": "https://i.pinimg.com/736x/c9/79/58/c97958d3cc1f0e8d312f069a34578998.jpg",
    "accent": "#a855f7"
  },
  "spider-man-homecoming": {
    "image": "https://i.pinimg.com/736x/3e/21/0f/3e210fc25cc1c0de448c02ac77c8bbf1.jpg",
    "accent": "#e11d48"
  },
  "the-defenders": {
    "image": "https://i.pinimg.com/736x/a2/82/6f/a2826fd6381c2c7152f2835bd6175775.jpg",
    "accent": "#2563eb"
  },
  "inhumans": {
    "image": "https://i.pinimg.com/736x/10/e1/91/10e1910cf470c6402a728f90b28303e1.jpg",
    "accent": "#1e293b"
  },
  "the-gifted": {
    "image": "https://i.pinimg.com/736x/4d/a8/9a/4da89a13028e09ca3abaf7f7f8a34f6e.jpg",
    "accent": "#059669"
  },
  "thor-ragnarok": {
    "image": "https://i.pinimg.com/736x/1a/46/33/1a46337640ae16ba9d58f61a73fcf050.jpg",
    "accent": "#f59e0b"
  },
  "punisher-s1": {
    "image": "https://i.pinimg.com/736x/5f/e6/9d/5fe69dbf96cf86436ee122755ebca3bb.jpg",
    "accent": "#475569"
  },
  "runaways": {
    "image": "https://i.pinimg.com/736x/d8/3e/af/d83eaf1a07c976ec6002f68a568c77e6.jpg",
    "accent": "#ec4899"
  },
  "black-panther": {
    "image": "https://i.pinimg.com/736x/94/ea/8e/94ea8e36ed6403d1979f7e3890d9d8fa.jpg",
    "accent": "#7e22ce",
    "logo": "/mcu/movie logo/823314375616961191.jpg"
  },
  "jessica-jones-s2": {
    "image": "https://i.pinimg.com/736x/5e/67/8d/5e678dfea8e5fc30344433932a7ddda1.jpg",
    "accent": "#9333ea"
  },
  "avengers-infinity-war": {
    "image": "https://i.pinimg.com/736x/d6/9b/b7/d69bb7bb25627168812ba2015cd26312.jpg",
    "accent": "#7e22ce",
    "logo": "/mcu/logos/avengers-infinity-war.jpg"
  },
  "deadpool-2": {
    "image": "https://i.pinimg.com/736x/1a/78/12/1a7812645acabefa923197054c270a87.jpg",
    "accent": "#b91c1c"
  },
  "cloak-and-dagger": {
    "image": "https://i.pinimg.com/736x/ed/be/e9/edbee93cf28c9669eba9683d14618339.jpg",
    "accent": "#4f46e5"
  },
  "luke-cage-s2": {
    "image": "https://i.pinimg.com/736x/25/a8/c2/25a8c2fb68c41d46f07915759e99d2b7.jpg",
    "accent": "#b45309"
  },
  "ant-man-and-the-wasp": {
    "image": "https://i.pinimg.com/736x/38/c5/b2/38c5b249ada153c84851714ba3a9c9b8.jpg",
    "accent": "#eab308",
    "logo": "/mcu/logos/ant-man-and-the-wasp.jpg"
  },
  "iron-fist-s2": {
    "image": "https://i.pinimg.com/736x/42/68/25/42682544fa9d6aa10eaaf9a4a43474e4.jpg",
    "accent": "#166534"
  },
  "venom": {
    "image": "https://i.pinimg.com/736x/d1/47/83/d147834c40992ebe3185ddb1227b9785.jpg",
    "accent": "#0f172a"
  },
  "daredevil-s3": {
    "image": "https://i.pinimg.com/736x/b8/61/ba/b861ba8dc008061bae557802c68d80cf.jpg",
    "accent": "#7f1d1d"
  },
  "spider-man-into-the-spider-verse": {
    "image": "https://i.pinimg.com/736x/7a/dc/4f/7adc4fb12c2b64ea4066d04e3d0769cc.jpg",
    "accent": "#0284c7"
  },
  "punisher-s2": {
    "image": "https://i.pinimg.com/736x/81/1f/a2/811fa2e00944f1caff420aaa36c290d7.jpg",
    "accent": "#334155"
  },
  "captain-marvel": {
    "image": "https://i.pinimg.com/736x/cc/ac/2d/ccac2df9d1e38fc97fe47b54a9ff1875.jpg",
    "accent": "#eab308",
    "logo": "/mcu/logos/captain-marvel.jpg"
  },
  "avengers-endgame": {
    "image": "https://i.pinimg.com/736x/ae/75/23/ae7523829d0e94a4afe6a045ad3031fe.jpg",
    "accent": "#c41e3a",
    "logo": "/mcu/movie logo/1016054365932245679.jpg"
  },
  "dark-phoenix": {
    "image": "https://i.pinimg.com/736x/9b/99/1b/9b991b1e1248b1c7b22e44b857340d5e.jpg",
    "accent": "#ef4444"
  },
  "jessica-jones-s3": {
    "image": "https://i.pinimg.com/736x/36/ed/80/36ed804f18f2d34b9c3dfa283e065764.jpg",
    "accent": "#6b21a8"
  },
  "spider-man-far-from-home": {
    "image": "https://i.pinimg.com/736x/cd/2e/10/cd2e10795c9ce6221e2cc4a3122115cc.jpg",
    "accent": "#dc2626"
  },
  "the-new-mutants": {
    "image": "https://i.pinimg.com/736x/85/55/b2/8555b2747768edee6ac1180fa17bfc3d.jpg",
    "accent": "#1e3a5f"
  },
  "helstrom": {
    "image": "https://i.pinimg.com/736x/c3/80/b3/c380b367f40b2904408d972259944494.jpg",
    "accent": "#0f172a"
  },
  "wandavision": {
    "image": "/mcu/movie logo/1038150151626692710.jpg",
    "accent": "#9333ea"
  },
  "falcon-and-winter-soldier": {
    "image": "https://i.pinimg.com/736x/d9/7c/ad/d97cada172a1ed72ab768e87208aefcd.jpg",
    "accent": "#2563eb"
  },
  "loki": {
    "image": "/mcu/logos/loki-poster.jpg",
    "accent": "#16a34a"
  },
  "black-widow": {
    "image": "https://i.pinimg.com/736x/14/3e/63/143e63496959ee4b31a740fa7f7fa530.jpg",
    "accent": "#dc2626"
  },
  "what-if-s1": {
    "image": "https://i.pinimg.com/736x/7b/29/63/7b2963c297c1b9694336c19836a97ad6.jpg",
    "accent": "#8b5cf6"
  },
  "shang-chi": {
    "image": "https://i.pinimg.com/736x/9e/05/6c/9e056cc64177e772823123847d04967a.jpg",
    "accent": "#dc2626"
  },
  "venom-let-there-be-carnage": {
    "image": "https://i.pinimg.com/736x/75/f2/a4/75f2a498d4e799252a76111be54ed116.jpg",
    "accent": "#b91c1c"
  },
  "eternals": {
    "image": "https://i.pinimg.com/736x/c7/ef/32/c7ef32dd2fc8a28ae9bef742cfefffae.jpg",
    "accent": "#d97706",
    "logo": "/mcu/movie logo/1038150151626692411.jpg"
  },
  "hit-monkey": {
    "image": "https://i.pinimg.com/736x/04/b3/4c/04b34c6a301ab813bfdf09ee19246f64.jpg",
    "accent": "#dc2626"
  },
  "hawkeye": {
    "image": "https://i.pinimg.com/736x/8e/59/c5/8e59c5b44f818a32f17fe246e1f9fdb0.jpg",
    "accent": "#7c3aed"
  },
  "spider-man-no-way-home": {
    "image": "https://i.pinimg.com/736x/27/a6/2c/27a62ca525e7b2db52c9524dfaa8b965.jpg",
    "accent": "#c41e3a"
  },
  "moon-knight": {
    "image": "https://i.pinimg.com/736x/05/23/9c/05239c46d7417441d5d2f777929c2ce8.jpg",
    "accent": "#e2e8f0"
  },
  "morbius": {
    "image": "https://i.pinimg.com/736x/34/f5/5e/34f55e25c29693da13bd72e79e05df06.jpg",
    "accent": "#6d28d9"
  },
  "doctor-strange-in-the-multiverse-of-madness": {
    "image": "https://i.pinimg.com/736x/eb/60/36/eb60364a303242d844c33174b28ba843.jpg",
    "accent": "#c9a84c"
  },
  "ms-marvel": {
    "image": "https://i.pinimg.com/736x/1b/02/a2/1b02a2c9beed708e4d0bc127e146814b.jpg",
    "accent": "#0284c7"
  },
  "thor-love-and-thunder": {
    "image": "https://i.pinimg.com/736x/62/ea/f9/62eaf9ab61fe06441dca84b862a00d80.jpg",
    "accent": "#38bdf8"
  },
  "i-am-groot-s1": {
    "image": "https://i.pinimg.com/736x/ed/33/a2/ed33a2f970a4b416ecffdbad05d301a2.jpg",
    "accent": "#a16207"
  },
  "she-hulk": {
    "image": "https://i.pinimg.com/736x/90/30/22/9030229d8bbcd409a1e9ad7e0efe7d1f.jpg",
    "accent": "#16a34a"
  },
  "werewolf-by-night": {
    "image": "https://i.pinimg.com/736x/93/b7/b0/93b7b01e752d6d4b930fbfd947bad8d1.jpg",
    "accent": "#dc2626"
  },
  "black-panther-wakanda-forever": {
    "image": "https://i.pinimg.com/736x/bc/1c/7d/bc1c7da4560fbf208a89ba1b519719ad.jpg",
    "accent": "#9333ea"
  },
  "guardians-holiday-special": {
    "image": "https://i.pinimg.com/736x/bb/75/f2/bb75f29e17cfd5a6c185574f04e19bf4.jpg",
    "accent": "#16a34a"
  },
  "ant-man-and-the-wasp-quantumania": {
    "image": "https://i.pinimg.com/736x/89/c3/28/89c3280e16ae54b7653e4889f04d5bc0.jpg",
    "accent": "#38bdf8"
  },
  "guardians-of-the-galaxy-vol-3": {
    "image": "https://i.pinimg.com/736x/c7/29/eb/c729eb40c63933916e7a30bd80e7081a.jpg",
    "accent": "#ec4899"
  },
  "spider-man-across-the-spider-verse": {
    "image": "https://i.pinimg.com/736x/2c/15/a7/2c15a75189ec5e8f421b1b605a1f4c1f.jpg",
    "accent": "#ec4899"
  },
  "secret-invasion": {
    "image": "https://i.pinimg.com/736x/af/5e/a8/af5ea8656359c83d68d23d10122ef02d.jpg",
    "accent": "#15803d"
  },
  "i-am-groot-s2": {
    "image": "https://i.pinimg.com/736x/bb/e2/9d/bbe29d1d213309a2f09fc79e14835b2f.jpg",
    "accent": "#166534"
  },
  "loki-s2": {
    "image": "https://i.pinimg.com/736x/eb/7b/d8/eb7bd8a1cb4c7d4f74cf167a56e694b5.jpg",
    "accent": "#10b981"
  },
  "the-marvels": {
    "image": "https://i.pinimg.com/736x/99/dd/eb/99ddeb40a9e52d0b201f61456133fb96.jpg",
    "accent": "#f59e0b"
  },
  "what-if-s2": {
    "image": "https://i.pinimg.com/736x/21/69/7b/21697b3dc889e30d205b4fa99010f787.jpg",
    "accent": "#9333ea"
  },
  "echo": {
    "image": "https://i.pinimg.com/736x/36/a0/f5/36a0f5189894720011bc02832cb1e091.jpg",
    "accent": "#b91c1c"
  },
  "madame-web-2024": {
    "image": "https://i.pinimg.com/736x/94/a8/44/94a844f24fd47ff4ec957686fe24ff05.jpg",
    "accent": "#be123c"
  },
  "deadpool-and-wolverine": {
    "image": "https://i.pinimg.com/736x/af/60/51/af60514a37807cdece3de6ce7809451d.jpg",
    "accent": "#c9a84c"
  },
  "eyes-of-wakanda-series": {
    "image": "https://i.pinimg.com/736x/0a/e4/3d/0ae43dec3db88e066276dd49300c256a.jpg",
    "accent": "#7c2d12"
  },
  "agatha-all-along": {
    "image": "https://i.pinimg.com/736x/31/20/c4/3120c4e32ce0008ddaaa939ab6ebb702.jpg",
    "accent": "#7c3aed"
  },
  "venom-the-last-dance": {
    "image": "https://i.pinimg.com/736x/62/04/c6/6204c67260fa0299fe889e0f6d70c919.jpg",
    "accent": "#1e293b"
  },
  "what-if-s3": {
    "image": "https://i.pinimg.com/736x/28/cc/e9/28cce930f4c153997820686f7cd0ddc1.jpg",
    "accent": "#4f46e5"
  },
  "kraven-the-hunter-2024": {
    "image": "https://i.pinimg.com/736x/54/c4/09/54c4096aab01a03d49ef11f516b1673e.jpg",
    "accent": "#78350f"
  },
  "wonder-man": {
    "image": "https://i.pinimg.com/736x/28/63/ce/2863cea3ac49f0dbf8627630d5726523.jpg",
    "accent": "#a855f7"
  },
  "your-friendly-neighborhood-spider-man": {
    "image": "https://i.pinimg.com/736x/e0/04/75/e00475168a20ea8fe0ee7a9880724031.jpg",
    "accent": "#b91c1c"
  },
  "captain-america-brave-new-world": {
    "image": "https://i.pinimg.com/736x/28/b6/33/28b633409736b38713784b3f512ec40d.jpg",
    "accent": "#2563eb"
  },
  "daredevil-born-again-s1": {
    "image": "https://i.pinimg.com/736x/2a/15/c1/2a15c1380acd36cabee36ecbf9cd5a0f.jpg",
    "accent": "#b91c1c"
  },
  "thunderbolts": {
    "image": "https://i.pinimg.com/736x/f2/da/db/f2dadb0f89b9a88a7fe32b06f16575e1.jpg",
    "accent": "#dc2626"
  },
  "ironheart": {
    "image": "https://i.pinimg.com/736x/50/71/83/5071833f100f9395bd5f03f16008014d.jpg",
    "accent": "#ea580c"
  },
  "the-fantastic-four-first-steps": {
    "image": "https://i.pinimg.com/736x/83/11/a9/8311a9f3aa775f78374188a3f8b12dd7.jpg",
    "accent": "#0284c7"
  },
  "eyes-of-wakanda": {
    "image": "https://i.pinimg.com/736x/da/45/89/da4589a117e277e2b5062d96ebeca74b.jpg",
    "accent": "#059669"
  },
  "marvel-zombies": {
    "image": "https://i.pinimg.com/736x/db/07/f0/db07f01346a5c504d8160c4c1d4415c7.jpg",
    "accent": "#15803d"
  },
  "avengers-doomsday": {
    "image": "https://i.pinimg.com/736x/05/07/bc/0507bca589673f9052fb1e20c5592914.jpg",
    "accent": "#15803d"
  },
  "spider-man-brand-new-day": {
    "image": "https://i.pinimg.com/736x/87/3e/d7/873ed7a35be330c04b352486bfd97e47.jpg",
    "accent": "#dc2626",
    "logo": "/mcu/logos/spider-man.jpg"
  },
  "visionquest": {
    "image": "https://i.pinimg.com/736x/f6/c4/36/f6c43696503f798aa31e6e9743bc7135.jpg",
    "accent": "#0284c7"
  },
  "daredevil-born-again-s2": {
    "image": "https://i.pinimg.com/736x/53/2d/7c/532d7c2c8b6ef991f6a364224bfe5323.jpg",
    "accent": "#991b1b"
  },
  "avengers-secret-wars": {
    "image": "https://i.pinimg.com/736x/5e/6c/11/5e6c11f6ab3df315a873ebf5b1b0cf01.jpg",
    "accent": "#c9a84c"
  }
};

export function getMovieMedia(slug: string): MovieMediaItem {
  return (
    MOVIE_MEDIA[slug] || {
      image: '/mcu/logos/the-avengers.jpg',
      accent: '#c9a84c',
    }
  );
}
