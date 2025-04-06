import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {
    path:'products/product-details/:id',
    renderMode: RenderMode.Client
  },
  {
    path:'checkout/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
