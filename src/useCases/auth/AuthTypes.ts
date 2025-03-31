import { User } from "@/entities/User";
import { HttpResponse } from "../protocols";
import { IAuthDTO } from "./AuthDTO";

export type LoginType = Omit<IAuthDTO, 'password'> | string;

export type UserType = Omit<User, 'password'>

export type HandleType = HttpResponse<UserType | LoginType | void | string | null>;