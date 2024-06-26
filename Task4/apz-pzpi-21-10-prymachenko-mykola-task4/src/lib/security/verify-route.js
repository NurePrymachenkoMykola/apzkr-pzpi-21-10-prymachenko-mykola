import {AuthController} from "@controllers/auth.controller";
const publicRoutes = [
    '/authentication',
]

function isRoutePublic(route) {
    for (let i = 0; i < publicRoutes.length; i++) {
        if (route.includes(publicRoutes[i])) {
            return true;
        }
    }
    return false;
}

export async function verifyRouteSecurity(url, token) {
    if (isRoutePublic(url)) {
        return {
            isPublic: true,
        };
    }

    const res = await AuthController.verify(token);
    return res;
}