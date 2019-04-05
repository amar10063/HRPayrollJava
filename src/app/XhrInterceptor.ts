import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,

} from '@angular/common/http';

export class XhrInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const xhr = req.clone({
            headers: req.headers.set('X-Requested-With', 'XMLHttp`Request')
        });
        return next.handle(xhr);

    }
}