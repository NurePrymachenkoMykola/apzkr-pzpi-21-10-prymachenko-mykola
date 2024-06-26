import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AuthRoles} from "../../auth-roles";
import {ROLES_KEY} from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<AuthRoles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        const res = requiredRoles.some((role) => user.role === role);
        if (!res) {
            return true; // testing
            throw new ForbiddenException('Forbidden resource. You don\'t have access!')
        }
        return res;
    }
}