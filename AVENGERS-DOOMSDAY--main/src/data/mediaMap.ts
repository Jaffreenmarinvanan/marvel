// @ts-nocheck
/**
 * MOVIE_MEDIA — Central registry mapping MCU movie and series slugs
 * to high-resolution posters and official movie logos from the user's MCU folder.
 */

export interface MovieMediaItem {
  image: string;
  logo?: string;
  accent: string;
}

export const MOVIE_MEDIA: Record<string, MovieMediaItem> = {
  "x-men": {
    "image": "https://image.tmdb.org/t/p/w500/k7hRgw3skIZj31t66bbg4t2AIlV.jpg",
    "accent": "#3b82f6"
  },
  "x2-x-men-united": {
    "image": "https://image.tmdb.org/t/p/w500/s49f8263K5D2jA06DCEeD2CnbxZ.jpg",
    "accent": "#0284c7"
  },
  "captain-america-first-avenger": {
    "image": "https://image.tmdb.org/t/p/w500/vSNxAJJMilt84Clqys4Vm7s8X4Y.jpg",
    "accent": "#1d4ed8"
  },
  "agent-carter-s1": {
    "image": "https://image.tmdb.org/t/p/w500/4Qfl8uLGJuiKFtS7bLWU5sBNRp3.jpg",
    "accent": "#c41e3a"
  },
  "agent-carter-s2": {
    "image": "https://image.tmdb.org/t/p/w500/4Qfl8uLGJuiKFtS7bLWU5sBNRp3.jpg",
    "accent": "#ea580c"
  },
  "captain-marvel": {
    "image": "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TLy.jpg",
    "accent": "#eab308"
  },
  "iron-man": {
    "image": "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBM5kPDeVS.jpg",
    "accent": "#c41e3a"
  },
  "incredible-hulk": {
    "image": "https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
    "accent": "#16a34a"
  },
  "iron-man-2": {
    "image": "https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN33GmEPmCtu81KA.jpg",
    "accent": "#c41e3a"
  },
  "thor": {
    "image": "https://image.tmdb.org/t/p/w500/prSfAi1xGrhLQNxVSUFh2xAiGSB.jpg",
    "accent": "#2563eb"
  },
  "the-avengers": {
    "image": "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7KE3Ouoq.jpg",
    "accent": "#3b82f6"
  },
  "thor-dark-world": {
    "image": "https://image.tmdb.org/t/p/w500/bnX5PxvMpMaAzMB2M8m0AWoTtqP.jpg",
    "accent": "#1a1a2e"
  },
  "iron-man-3": {
    "image": "https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
    "accent": "#c41e3a"
  },
  "captain-america-winter-soldier": {
    "image": "https://image.tmdb.org/t/p/w500/5TQ6YDmymBpnF005OyoB7ohZps9.jpg",
    "accent": "#1d4ed8"
  },
  "guardians-of-the-galaxy": {
    "image": "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    "accent": "#9333ea"
  },
  "guardians-of-the-galaxy-vol-2": {
    "image": "https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
    "accent": "#a855f7"
  },
  "daredevil-s1": {
    "image": "https://image.tmdb.org/t/p/w500/QWbPaDxiB6LW4MqBwWGMBsV1NpK.jpg",
    "accent": "#dc2626"
  },
  "daredevil-s2": {
    "image": "https://image.tmdb.org/t/p/w500/QWbPaDxiB6LW4MqBwWGMBsV1NpK.jpg",
    "accent": "#991b1b"
  },
  "jessica-jones-s1": {
    "image": "https://image.tmdb.org/t/p/w500/bvhXBSCGQJCIGSKTSmBZOXpgpBK.jpg",
    "accent": "#7e22ce"
  },
  "avengers-age-of-ultron": {
    "image": "https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg",
    "accent": "#c41e3a"
  },
  "ant-man": {
    "image": "https://image.tmdb.org/t/p/w500/MgUJhSOYVOVV5GOxGP7AVmKTJY.jpg",
    "accent": "#dc2626"
  },
  "luke-cage-s1": {
    "image": "https://image.tmdb.org/t/p/w500/5z95RHAoE1BSfm9hpEUqvFZK1p7.jpg",
    "accent": "#d97706"
  },
  "iron-fist-s1": {
    "image": "https://image.tmdb.org/t/p/w500/AmR3JG1VQVxU8TScJ9BvpERPZl.jpg",
    "accent": "#15803d"
  },
  "captain-america-civil-war": {
    "image": "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNPZoo1Bxsnp.jpg",
    "accent": "#c41e3a"
  },
  "black-widow": {
    "image": "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    "accent": "#dc2626"
  },
  "spider-man-homecoming": {
    "image": "https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    "accent": "#e11d48"
  },
  "punisher-s1": {
    "image": "https://image.tmdb.org/t/p/w500/oSuCaJTM4lyGwzg09c14goyWjgI.jpg",
    "accent": "#475569"
  },
  "doctor-strange": {
    "image": "https://image.tmdb.org/t/p/w500/uGBVAWjjkScRx3HHA0P7Lgt3qnT.jpg",
    "accent": "#f59e0b"
  },
  "the-defenders": {
    "image": "https://image.tmdb.org/t/p/w500/sDpPWF0jaSqMSCvtI3FfGy8rlPi.jpg",
    "accent": "#2563eb"
  },
  "jessica-jones-s2": {
    "image": "https://image.tmdb.org/t/p/w500/bvhXBSCGQJCIGSKTSmBZOXpgpBK.jpg",
    "accent": "#9333ea"
  },
  "black-panther": {
    "image": "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    "accent": "#7e22ce"
  },
  "thor-ragnarok": {
    "image": "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
    "accent": "#f59e0b"
  },
  "luke-cage-s2": {
    "image": "https://image.tmdb.org/t/p/w500/5z95RHAoE1BSfm9hpEUqvFZK1p7.jpg",
    "accent": "#b45309"
  },
  "iron-fist-s2": {
    "image": "https://image.tmdb.org/t/p/w500/AmR3JG1VQVxU8TScJ9BvpERPZl.jpg",
    "accent": "#166534"
  },
  "daredevil-s3": {
    "image": "https://image.tmdb.org/t/p/w500/QWbPaDxiB6LW4MqBwWGMBsV1NpK.jpg",
    "accent": "#7f1d1d"
  },
  "ant-man-and-the-wasp": {
    "image": "https://image.tmdb.org/t/p/w500/fdMEhi7ha0cF9YScn2MXY4i5a4.jpg",
    "accent": "#eab308"
  },
  "avengers-infinity-war": {
    "image": "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "accent": "#7e22ce"
  },
  "punisher-s2": {
    "image": "https://image.tmdb.org/t/p/w500/oSuCaJTM4lyGwzg09c14goyWjgI.jpg",
    "accent": "#334155"
  },
  "jessica-jones-s3": {
    "image": "https://image.tmdb.org/t/p/w500/bvhXBSCGQJCIGSKTSmBZOXpgpBK.jpg",
    "accent": "#6b21a8"
  },
  "avengers-endgame": {
    "image": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    "accent": "#c41e3a"
  },
  "wandavision": {
    "image": "https://6af46f5d969c6488eb240dd5.imgix.net/sandbox/1038150151626692710.jpg",
    "accent": "#9333ea"
  },
  "falcon-and-winter-soldier": {
    "image": "https://image.tmdb.org/t/p/w500/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
    "accent": "#2563eb"
  },
  "loki": {
    "image": "https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    "accent": "#16a34a"
  },
  "what-if-s1": {
    "image": "https://image.tmdb.org/t/p/w500/lztz5X3WDZA9ba5QE8v4jEqvgL2.jpg",
    "accent": "#8b5cf6"
  },
  "shang-chi": {
    "image": "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
    "accent": "#dc2626"
  },
  "eternals": {
    "image": "https://image.tmdb.org/t/p/w500/6AdXwFxSf4J4S5EEdXjrmzjAUDe.jpg",
    "accent": "#d97706"
  },
  "hawkeye": {
    "image": "https://image.tmdb.org/t/p/w500/pqzjCxPVc9TkVgGRWeAoMmyqkZh.jpg",
    "accent": "#7c3aed"
  },
  "spider-man-far-from-home": {
    "image": "https://image.tmdb.org/t/p/w500/4q2hz2m8hubgvijz8Ez0T2Os2Yv.jpg",
    "accent": "#dc2626"
  },
  "spider-man-no-way-home": {
    "image": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "accent": "#c41e3a"
  },
  "moon-knight": {
    "image": "https://image.tmdb.org/t/p/w500/x6FsYvt33846IQnDt7HOBNKBl36.jpg",
    "accent": "#e2e8f0"
  },
  "doctor-strange-in-the-multiverse-of-madness": {
    "image": "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    "accent": "#c9a84c"
  },
  "ms-marvel": {
    "image": "https://image.tmdb.org/t/p/w500/pvXHNMhHkBPCVGQLgItxSzBm5o9.jpg",
    "accent": "#0284c7"
  },
  "she-hulk": {
    "image": "https://image.tmdb.org/t/p/w500/3Kbck1FzPo5mJvkQ7WBrVer2I0I.jpg",
    "accent": "#16a34a"
  },
  "thor-love-and-thunder": {
    "image": "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
    "accent": "#38bdf8"
  },
  "black-panther-wakanda-forever": {
    "image": "https://image.tmdb.org/t/p/w500/sv1xJUazXoQuIDTqnKhkR1RmgMi.jpg",
    "accent": "#9333ea"
  },
  "werewolf-by-night": {
    "image": "https://image.tmdb.org/t/p/w500/8nCRLiXVpF4uNmENaXdCr1VKHKR.jpg",
    "accent": "#dc2626"
  },
  "guardians-holiday-special": {
    "image": "https://image.tmdb.org/t/p/w500/b7p9lFl66GMMObgBExAi2TYp6Ct.jpg",
    "accent": "#16a34a"
  },
  "ant-man-and-the-wasp-quantumania": {
    "image": "https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
    "accent": "#38bdf8"
  },
  "guardians-of-the-galaxy-vol-3": {
    "image": "https://image.tmdb.org/t/p/w500/r2J02Z6Bq0TdBhOFXONVCBkxMm2.jpg",
    "accent": "#ec4899"
  },
  "secret-invasion": {
    "image": "https://image.tmdb.org/t/p/w500/b7WLn2EKYzH3gDrFCnyrWkHDOcC.jpg",
    "accent": "#15803d"
  },
  "loki-s2": {
    "image": "https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    "accent": "#10b981"
  },
  "echo": {
    "image": "https://image.tmdb.org/t/p/w500/wRi8FqCISHGFgcnS0zS2BVME6z8.jpg",
    "accent": "#b91c1c"
  },
  "ironheart": {
    "image": "https://image.tmdb.org/t/p/w500/suwQA2eEJLHDRaJCt0iGF3l6ToI.jpg",
    "accent": "#ea580c"
  },
  "the-marvels": {
    "image": "https://image.tmdb.org/t/p/w500/Ag3D9qXjhJ2FUkrlJ0Cv1pgxqYy.jpg",
    "accent": "#f59e0b"
  },
  "what-if-s2": {
    "image": "https://image.tmdb.org/t/p/w500/lztz5X3WDZA9ba5QE8v4jEqvgL2.jpg",
    "accent": "#9333ea"
  },
  "deadpool-and-wolverine": {
    "image": "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "accent": "#c9a84c"
  },
  "agatha-all-along": {
    "image": "https://image.tmdb.org/t/p/w500/6TPZSJ06OEXehlHQPOzdCKhMLzl.jpg",
    "accent": "#7c3aed"
  },
  "what-if-s3": {
    "image": "https://image.tmdb.org/t/p/w500/lztz5X3WDZA9ba5QE8v4jEqvgL2.jpg",
    "accent": "#4f46e5"
  },
  "captain-america-brave-new-world": {
    "image": "https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
    "accent": "#2563eb"
  },
  "thunderbolts": {
    "image": "https://image.tmdb.org/t/p/w500/A5sxdAVwOdJML3aSFBhW1MJrCAK.jpg",
    "accent": "#dc2626"
  },
  "the-fantastic-four-first-steps": {
    "image": "https://image.tmdb.org/t/p/w500/9Dc0Q4BQPJ29GmJe26MvAIHDaRa.jpg",
    "accent": "#0284c7"
  },
  "daredevil-born-again-s1": {
    "image": "https://image.tmdb.org/t/p/w500/AtKeLPJPWb0YU8Ws3cDiflLpSMr.jpg",
    "accent": "#b91c1c"
  },
  "wonder-man": {
    "image": "https://image.tmdb.org/t/p/w500/wqUgOaOcVb0b5giCWYKCNaYCDmZ.jpg",
    "accent": "#a855f7"
  },
  "daredevil-born-again-s2": {
    "image": "https://image.tmdb.org/t/p/w500/AtKeLPJPWb0YU8Ws3cDiflLpSMr.jpg",
    "accent": "#991b1b"
  },
  "eyes-of-wakanda": {
    "image": "https://image.tmdb.org/t/p/w500/jKuDyqx7jrjiUaM95eLWPLIkMQa.jpg",
    "accent": "#059669"
  },
  "spider-man-brand-new-day": {
    "image": "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
    "accent": "#dc2626"
  },
  "visionquest": {
    "image": "https://image.tmdb.org/t/p/w500/WGyAyBPncfuu8MZhLY9RtfZPM0.jpg",
    "accent": "#0284c7"
  },
  "avengers-doomsday": {
    "image": "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "accent": "#15803d"
  },
  "avengers-secret-wars": {
    "image": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    "accent": "#c9a84c"
  }
};

export function getMovieMedia(slug: string): MovieMediaItem {
  return (
    MOVIE_MEDIA[slug] || {
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80',
      accent: '#c9a84c',
    }
  );
}
