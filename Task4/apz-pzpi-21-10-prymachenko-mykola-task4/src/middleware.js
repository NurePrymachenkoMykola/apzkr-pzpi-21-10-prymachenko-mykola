import { NextResponse } from 'next/server'
import {verifyRouteSecurity} from "./lib/security/verify-route";

export async function middleware(req) {
    const url = req.url;

    const accessToken = req.cookies.get('access_token');

    const user = await verifyRouteSecurity(url, accessToken?.value);
    if (user.error) {
        return NextResponse.redirect(new URL('/authentication', req.url));
    } else {
        if (url.includes('authentication') && accessToken) {
            console.log(1, accessToken, user, url);
            return NextResponse.redirect(new URL('/home', req.url));
        }
        const headers = new Headers(req.headers);
        headers.set('user', JSON.stringify(user));
        const response = NextResponse.next({
            request: {
                headers
            }
        });

        return response;
    }
}

export const config = {
    matcher: ['/contacts', '/:path/'],
}
// See "Matching Paths" below to learn more
