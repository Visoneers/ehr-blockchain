import { Route, Routes } from "./rotes.type";
import Routers from '../feature-modules'
import { ExcludedPath, ExcludedPaths } from "../utils/validate-token";

export const allRoutes:Routes=[
    new Route('/auth',Routers.AuthRouter),
]
export const excludedPaths: ExcludedPaths = [
    new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/auth/register","POST")
];
