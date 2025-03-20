import fs from 'fs'
import accessLogJson from './accessLog.json'
//import { defineEventHandler, readBody } from 'h3';
import { Request, Response } from 'express';

// expressについて
// https://qiita.com/fe_js_engineer/items/b052918f64b2df554d0f
// https://zenn.dev/b1essk/articles/ssr-with-react-express

export const getPortfolio = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // リクエストパラメータからポートフォリオIDを取得
      const { portfolioId } = req.params;
  
      // ポートフォリオIDを元に、ポートフォリオを取得するパラメータを設定
      // ポートフォリオに紐づくプロフィールと、いいねを取得する
      const searchMethod = {
        where: { id: portfolioId },
        include: {
          profile: true,
          like: true,
        },
      };
  
      const portfolio: Portfolio = await prisma.portfolios.findUniqueOrThrow(searchMethod);
  
      res.send({ portfolio });
    } catch (error) {
      next(error);
    }
  };