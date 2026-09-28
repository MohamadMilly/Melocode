import { Response } from "express";
import { AuthenticatedRequest } from "../types/index.js";
import * as pathService from "../services/pathService.js";
import { Module } from "@app/types";

export const getAllPaths = async (req: AuthenticatedRequest, res: Response) => {
  const paths = await pathService.getAllPaths();
  res.json({ paths });
};

export const getModulesForPath = async (
  req: AuthenticatedRequest<
    { slug: string },
    unknown,
    unknown,
    { include?: string }
  >,
  res: Response<{ modules: Module[] }>,
) => {
  const { slug } = req.params;
  
  const includeLessons = req.query.include === "lessons";
  const userId =
    req.authStatus === "Authorized" ? req.currentUser?.id : undefined;
  const modules = await pathService.getModulesForPath({
    slug,
    includeLessons,
    userId,
  });
  res.json({ modules });
};
