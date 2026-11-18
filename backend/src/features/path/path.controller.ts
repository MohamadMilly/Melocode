import type {
  AuthStatus,
  GetPathModulesResponseDto,
  GetPathsResponseDto,
} from "@app/types";
import type { Response } from "express";
import type { AuthenticatedRequest } from "../../shared/types/auth.types.js";
import { pathService } from "./path.service.js";

export const getAllPaths = async (
  _req: AuthenticatedRequest,
  res: Response<GetPathsResponseDto>,
) => {
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
  res: Response<GetPathModulesResponseDto>,
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

  res.json({
    modules,
    authStatus: req.authStatus as AuthStatus,
  });
};
