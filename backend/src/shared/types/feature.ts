import type { Router } from "express";

export interface Feature {
  name: string;
  version: string;
  enabled: boolean;
  path: string;
  router: Router;
}
